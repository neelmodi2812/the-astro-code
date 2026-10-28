import { API_BASE_URL, DEFAULT_LANG } from "./config"
import { tokenStore } from "./token-store"

/**
 * Error thrown for every non-2xx response or network failure.
 * `errors` carries Laravel's field-level validation messages when present.
 */
export class ApiError extends Error {
  constructor(message, { status = 0, errors = null, data = null } = {}) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.errors = errors
    this.data = data
  }
}

function buildUrl(path, query) {
  const cleanPath = path.startsWith("/") ? path : `/${path}`
  const url = new URL(`${API_BASE_URL}${cleanPath}`)
  Object.entries(query || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value))
    }
  })
  return url.toString()
}

/**
 * Low-level request used by every service.
 *
 * @param {string} path      Relative path from ENDPOINTS.
 * @param {object} [options]
 * @param {string} [options.method]  HTTP verb (default GET).
 * @param {object} [options.query]   Query-string params.
 * @param {object} [options.body]    JSON body.
 * @param {string} [options.lang]    'gu' | 'en' — sent as ?lang= and Accept-Language.
 * @param {string|null} [options.token]  Overrides the stored token (server-side use).
 * @param {object} [options.next]    Next.js fetch options, e.g. { revalidate: 60 }.
 */
export async function apiRequest(path, options = {}) {
  const { method = "GET", query, body, lang = DEFAULT_LANG, token, next, signal } = options
  const authToken = token === undefined ? tokenStore.get() : token

  let response
  try {
    response = await fetch(buildUrl(path, { lang, ...query }), {
      method,
      headers: {
        Accept: "application/json",
        "Accept-Language": lang,
        ...(body ? { "Content-Type": "application/json" } : {}),
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
      next,
      signal,
    })
  } catch (error) {
    throw new ApiError(error?.message || "Network error", { status: 0 })
  }

  let payload = null
  try {
    payload = await response.json()
  } catch {
    /* empty or non-JSON body */
  }

  if (!response.ok || payload?.status === false) {
    if (response.status === 401 && typeof window !== "undefined") {
      tokenStore.clear()
    }
    throw new ApiError(payload?.message || `Request failed (${response.status})`, {
      status: response.status,
      errors: payload?.errors ?? null,
      data: payload,
    })
  }

  return payload
}

export const api = {
  get: (path, options) => apiRequest(path, { ...options, method: "GET" }),
  post: (path, body, options) => apiRequest(path, { ...options, method: "POST", body }),
  put: (path, body, options) => apiRequest(path, { ...options, method: "PUT", body }),
  delete: (path, body, options) => apiRequest(path, { ...options, method: "DELETE", body }),
}
