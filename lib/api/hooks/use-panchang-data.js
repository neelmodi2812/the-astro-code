"use client"

import * as React from "react"
import { PANCHANG_DATA } from "@/lib/data/panchang-data"
import { contentService } from "../services/content"
import { astrologyService } from "../services/astrology"
import { mergePanchang } from "../adapters/panchang"

/**
 * Daily-panchang page data: bundled copy and layout, with today's panchang, choghadiya,
 * celestial timings and rashifal replaced by live API data. Either request failing keeps its static section.
 */
export function usePanchangData(lang) {
  const [live, setLive] = React.useState(null)

  React.useEffect(() => {
    let cancelled = false

    Promise.all([
      contentService.panchang.today(lang, { token: null }).then((r) => r.data).catch(() => null),
      astrologyService.dailyHoroscope({}, lang).then((r) => r.data).catch(() => null),
    ]).then(([panchang, horoscopes]) => {
      if (!cancelled && (panchang || horoscopes)) setLive({ lang, panchang, horoscopes })
    })

    return () => {
      cancelled = true
    }
  }, [lang])

  return React.useMemo(
    () => (live && live.lang === lang ? mergePanchang(PANCHANG_DATA, live, lang) : PANCHANG_DATA),
    [live, lang]
  )
}
