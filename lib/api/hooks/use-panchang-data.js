"use client"

import * as React from "react"
import { PANCHANG_DATA } from "@/lib/data/panchang-data"
import { contentService } from "../services/content"
import { astrologyService } from "../services/astrology"
import { mergePanchang } from "../adapters/panchang"

/**
 * Daily-panchang page data: bundled copy and layout, with the panchang, choghadiya,
 * celestial timings and rashifal replaced by live API data. Either request failing keeps its static section.
 *
 * `date` is an ISO day ("2026-11-01"); omit it for today. The result carries `status`:
 * "ready", "loading" (a new date is being fetched; the previous day stays on screen) or
 * "unavailable" (the backend has no panchang for that date).
 */
export function usePanchangData(lang, date = null) {
  const [live, setLive] = React.useState(null)

  React.useEffect(() => {
    let cancelled = false

    const panchangRequest = date
      ? contentService.panchang.detail(date, lang, { token: null })
      : contentService.panchang.today(lang, { token: null })

    Promise.all([
      panchangRequest.then((r) => r.data).catch(() => null),
      astrologyService.dailyHoroscope(date ? { date } : {}, lang).then((r) => r.data).catch(() => null),
    ]).then(([panchang, horoscopes]) => {
      if (cancelled) return
      if (panchang || horoscopes || date) setLive({ lang, date, panchang, horoscopes })
    })

    return () => {
      cancelled = true
    }
  }, [lang, date])

  return React.useMemo(() => {
    if (!live || live.lang !== lang) return { ...PANCHANG_DATA, status: "loading" }
    const merged = mergePanchang(PANCHANG_DATA, live, lang)
    if (live.date !== date) return { ...merged, status: "loading" }
    return { ...merged, status: date && !live.panchang ? "unavailable" : "ready" }
  }, [live, lang, date])
}
