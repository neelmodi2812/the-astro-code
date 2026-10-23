import { formatDate } from "./home"

const both = (value) => ({ gu: value, en: value })

const CHOGHADIYA_INFO = {
  amrit: { nature: { gu: "શ્રેષ્ઠ ફળદાયી", en: "Best (Amrit)" }, work: { gu: "તમામ પ્રકારના શુભ મંગલ કાર્યો", en: "All auspicious undertakings & ceremonies" }, badgeVariant: "emerald" },
  shubh: { nature: { gu: "શુભ", en: "Auspicious (Shubh)" }, work: { gu: "પૂજા, જપ અને ધાર્મિક કાર્યો", en: "Worship, chanting and religious work" }, badgeVariant: "emerald" },
  labh: { nature: { gu: "અતિ શુભ", en: "Highly Auspicious" }, work: { gu: "વ્યાપાર, અભ્યાસ અને આયોજન", en: "Business, study and planning" }, badgeVariant: "gold" },
  laabh: { nature: { gu: "અતિ શુભ", en: "Highly Auspicious" }, work: { gu: "વ્યાપાર, અભ્યાસ અને આયોજન", en: "Business, study and planning" }, badgeVariant: "gold" },
  chal: { nature: { gu: "સામાન્ય", en: "Movable (Chal)" }, work: { gu: "પ્રવાસ અને હળવા કાર્યો", en: "Travel and light errands" }, badgeVariant: "muted" },
  udveg: { nature: { gu: "તણાવપૂર્ણ", en: "Tense" }, work: { gu: "નવા કાર્યો ટાળવા", en: "Avoid starting new work" }, badgeVariant: "muted" },
  kaal: { nature: { gu: "અશુભ", en: "Inauspicious (Kaal)" }, work: { gu: "નવી શરૂઆત સખત રીતે ટાળવી", en: "Strictly avoid new commitments" }, badgeVariant: "destructive" },
  rog: { nature: { gu: "અશુભ", en: "Inauspicious (Rog)" }, work: { gu: "વિવાદ ટાળો, આરામ કરો", en: "Avoid disputes; take rest" }, badgeVariant: "destructive" },
}

const STATUS_VARIANT = { shubh: "emerald", ashubh: "destructive", samanya: "muted" }

const WEEKDAYS = {
  gu: ["રવિવાર (Sunday)", "સોમવાર (Monday)", "મંગળવાર (Tuesday)", "બુધવાર (Wednesday)", "ગુરુવાર (Thursday)", "શુક્રવાર (Friday)", "શનિવાર (Saturday)"],
  en: ["Sunday (Ravivara)", "Monday (Somavara)", "Tuesday (Mangalavara)", "Wednesday (Budhavara)", "Thursday (Guruvara)", "Friday (Shukravara)", "Saturday (Shanivara)"],
}

function adaptChoghadiya(slots) {
  return slots.map((slot) => {
    const info = CHOGHADIYA_INFO[String(slot.name_en).toLowerCase()]
    return {
      name: { gu: slot.name_gu, en: slot.name_en },
      time: slot.time,
      nature: info?.nature ?? both(""),
      work: info?.work ?? both(""),
      badgeVariant: info?.badgeVariant ?? STATUS_VARIANT[slot.status] ?? "muted",
    }
  })
}

/**
 * Today's /panchang + /astrology/horoscope/daily → the shape of PANCHANG_DATA.
 * Only sections the backend owns are replaced; city list, monthly calendar, festival spotlight
 * and sidebar widgets stay as bundled content. Only the Ahmedabad entry is live (single-location data).
 */
export function mergePanchang(base, { panchang, horoscopes }, lang) {
  const merged = { ...base }

  if (panchang) {
    const date = panchang.date ? new Date(`${panchang.date}T00:00:00`) : null
    const weekday = date ? { gu: WEEKDAYS.gu[date.getDay()], en: WEEKDAYS.en[date.getDay()] } : null

    merged.coreAngas = {
      ...base.coreAngas,
      dateLine: both(
        `${formatDate(panchang.date, lang)}${panchang.samvat ? ` • ${panchang.samvat}` : ""}`
      ),
      limbs: base.coreAngas.limbs.map((limb, index) => {
        const live = [panchang.tithi, panchang.nakshatra, panchang.yoga, panchang.karan, null][index]
        if (index === 4) {
          return weekday ? { ...limb, name: weekday, timing: both("") } : limb
        }
        return live ? { ...limb, name: both(live), timing: both("") } : limb
      }),
    }

    const times = { sunrise: panchang.sunrise, sunset: panchang.sunset, moonrise: panchang.moonrise, moonset: panchang.moonset }
    merged.celestialTimings = {
      ...base.celestialTimings,
      items: base.celestialTimings.items.map((item) => (times[item.id] ? { ...item, time: times[item.id] } : item)),
    }
    merged.cities = base.cities.map((city) =>
      city.id === "ahmedabad"
        ? {
            ...city,
            sunrise: panchang.sunrise || city.sunrise,
            sunset: panchang.sunset || city.sunset,
            moonrise: panchang.moonrise || city.moonrise,
            moonset: panchang.moonset || city.moonset,
          }
        : city
    )

    const day = Array.isArray(panchang.choghadiya_day) ? panchang.choghadiya_day : []
    const night = Array.isArray(panchang.choghadiya_night) ? panchang.choghadiya_night : []
    merged.choghadiyaSection = {
      ...base.choghadiyaSection,
      ...(day.length ? { dayList: adaptChoghadiya(day) } : {}),
      ...(night.length ? { nightList: adaptChoghadiya(night) } : {}),
      liveBanner: panchang.active_choghadiya
        ? { ...base.choghadiyaSection.liveBanner, activeName: both(panchang.active_choghadiya), timeRange: both(""), verdict: both("") }
        : base.choghadiyaSection.liveBanner,
    }

    merged.muhuratSection = {
      ...base.muhuratSection,
      shubhList: base.muhuratSection.shubhList.map((item, index) =>
        index === 0 && panchang.abhijit_muhurta ? { ...item, time: panchang.abhijit_muhurta } : item
      ),
      inauspiciousList: base.muhuratSection.inauspiciousList.map((item, index) =>
        index === 0 && panchang.rahu_kaal ? { ...item, time: panchang.rahu_kaal } : item
      ),
    }
  }

  if (Array.isArray(horoscopes) && horoscopes.length) {
    merged.rashifalSection = {
      ...base.rashifalSection,
      signs: horoscopes.map((h) => ({
        id: h.sign,
        name: both(h.sign_name),
        color: both(h.lucky_color ? `${lang === "gu" ? "શુભ" : "Lucky"}: ${h.lucky_color}` : ""),
        forecast: both(h.summary),
        luck: h.lucky_number ? `#${h.lucky_number}` : "—",
      })),
    }
  }

  return merged
}
