"use client"

import * as React from "react"

const LanguageContext = React.createContext({
  lang: "gu",
  setLang: () => {},
  toggleLang: () => {}
})

const STORAGE_KEY = "astro_lang"

let currentLangSnapshot = null

function getLangSnapshot() {
  if (typeof window === "undefined") return "gu"
  if (currentLangSnapshot) return currentLangSnapshot
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === "en" || saved === "gu") {
      currentLangSnapshot = saved
      return saved
    }
    const match = document.cookie.match(new RegExp(`(^| )${STORAGE_KEY}=([^;]+)`))
    if (match && (match[2] === "en" || match[2] === "gu")) {
      currentLangSnapshot = match[2]
      return match[2]
    }
  } catch {
    // Ignore security errors in sandboxed environments
  }
  currentLangSnapshot = "gu"
  return currentLangSnapshot
}

const listeners = new Set()
function subscribe(callback) {
  listeners.add(callback)
  const onStorage = (e) => {
    if (e.key === STORAGE_KEY && (e.newValue === "en" || e.newValue === "gu")) {
      currentLangSnapshot = e.newValue
      callback()
    }
  }
  window.addEventListener("storage", onStorage)
  return () => {
    listeners.delete(callback)
    window.removeEventListener("storage", onStorage)
  }
}

export function LanguageProvider({ children, defaultLang = "gu" }) {
  const lang = React.useSyncExternalStore(
    subscribe,
    getLangSnapshot,
    () => defaultLang
  )

  React.useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang
    }
  }, [lang])

  // Update language, persist to localStorage, cookie, and notify listeners
  const setLang = React.useCallback((newLang) => {
    if (newLang !== "en" && newLang !== "gu") return
    currentLangSnapshot = newLang
    try {
      localStorage.setItem(STORAGE_KEY, newLang)
      document.cookie = `${STORAGE_KEY}=${newLang}; path=/; max-age=31536000; SameSite=Lax`
      if (typeof document !== "undefined") {
        document.documentElement.lang = newLang
      }
    } catch {
      // Ignore storage errors
    }
    listeners.forEach((listener) => listener())
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
