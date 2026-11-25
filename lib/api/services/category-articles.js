const LAST_SUCCESS_MAX_AGE = 10 * 60_000

function getRecentArticles(key) {
  try {
    const entry = JSON.parse(sessionStorage.getItem(key))
    if (Array.isArray(entry?.articles) && Date.now() - entry.savedAt < LAST_SUCCESS_MAX_AGE) {
      return entry.articles
    }
  } catch {}
  return null
}

export async function fetchCategoryArticles(slug, lang, { size = 50, signal } = {}) {
  const query = new URLSearchParams({ slug, lang, size: String(size) })
  const key = `astro:category-articles:${query}`

  try {
    const response = await fetch(`/api/articles/category?${query}`, { signal })
    if (!response.ok) throw new Error("Unable to load category articles")

    const { data } = await response.json()
    if (!Array.isArray(data)) throw new Error("Invalid category articles response")
    try {
      sessionStorage.setItem(key, JSON.stringify({ savedAt: Date.now(), articles: data }))
    } catch {}
    return data
  } catch (error) {
    if (signal?.aborted) throw error
    const recent = getRecentArticles(key)
    if (recent !== null) return recent
    throw error
  }
}
