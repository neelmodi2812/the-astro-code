"use client"

import * as React from "react"

const LanguageContext = React.createContext({
  lang: "gu",
  setLang: () => {},
  toggleLang: () => {}
})

const STORAGE_KEY = "astro_lang"

export function LanguageProvider({ children, defaultLang = "gu" }) {
  const [lang, setLangState] = React.useState(defaultLang)

  // On client mount, restore saved language from localStorage or cookie
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved === "en" || saved === "gu") {
        setLangState(saved)
        document.documentElement.lang = saved
        return
      }
      // Check cookie fallback
      const match = document.cookie.match(new RegExp(`(^| )${STORAGE_KEY}=([^;]+)`))
      if (match && (match[2] === "en" || match[2] === "gu")) {
        setLangState(match[2])
        document.documentElement.lang = match[2]
      }
    } catch {
      // Ignore security errors in sandboxed iframes
    }
  }, [])

  // Update language, persist to localStorage, cookie, and update html lang
  const setLang = React.useCallback((newLang) => {
    if (newLang !== "en" && newLang !== "gu") return
    setLangState(newLang)
    try {
      localStorage.setItem(STORAGE_KEY, newLang)
      document.cookie = `${STORAGE_KEY}=${newLang}; path=/; max-age=31536000; SameSite=Lax`
      if (typeof document !== "undefined") {
        document.documentElement.lang = newLang
      }
    } catch {
      // Ignore storage errors
    }
  }, [])

  const toggleLang = React.useCallback(() => {
    setLang(lang === "gu" ? "en" : "gu")
  }, [lang, setLang])

  const value = React.useMemo(
    () => ({
      lang,
      setLang,
      toggleLang
    }),
    [lang, setLang, toggleLang]
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = React.useContext(LanguageContext)
  if (!context) {
    return {
      lang: "gu",
      setLang: () => {},
      toggleLang: () => {}
    }
  }
  return context
}
