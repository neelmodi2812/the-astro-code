export { cn } from "cn"

/**
 * Maps for converting between ASCII (0-9) and Gujarati (૦-૯) numerals.
 */
const GU_TO_ASCII = {
  "૦": "0", "૧": "1", "૨": "2", "૩": "3", "૪": "4",
  "૫": "5", "૬": "6", "૭": "7", "૮": "8", "૯": "9"
}

const ASCII_TO_GU = {
  "0": "૦", "1": "૧", "2": "૨", "3": "૩", "4": "૪",
  "5": "૫", "6": "૬", "7": "૭", "8": "૮", "9": "૯"
}

/**
 * Converts all numeric digits in any string or number to Gujarati numerals (૦-૯).
 */
export function toGujaratiDigits(val) {
  if (val === null || val === undefined) return ""
  return String(val).replace(/[0-9]/g, (d) => ASCII_TO_GU[d] || d)
}

/**
 * Converts all Gujarati numerals (૦-૯) in any string or number to standard ASCII digits (0-9).
 */
export function toAsciiDigits(val) {
  if (val === null || val === undefined) return ""
  return String(val).replace(/[૦-૯]/g, (d) => GU_TO_ASCII[d] || d)
}

/**
 * Central Number Formatter Helper (formatDigits):
 * Converts digits to Gujarati (૦-૯) when lang === 'gu', and standard ASCII digits (0-9) when lang === 'en'.
 * Handles strings, numbers, and bilingual { gu, en } objects. Preserves all surrounding characters,
 * time indicators (AM/PM), separators, and labels.
 *
 * @param {string|number|object} val - The value containing digits to format
 * @param {string} lang - 'gu' for Gujarati numerals or 'en' for ASCII digits
 * @returns {string} Cleanly formatted string in the target language's numeral script
 */
export function formatDigits(val, lang = "gu") {
  if (val === null || val === undefined) return ""
  
  // If a bilingual object { gu: "...", en: "..." } is passed
  if (typeof val === "object" && !Array.isArray(val)) {
    const localized = val[lang] ?? val.gu ?? val.en ?? ""
    return formatDigits(localized, lang)
  }

  const str = String(val)
  if (lang === "en") {
    return toAsciiDigits(str)
  }
  return toGujaratiDigits(str)
}

/**
 * Formats a number with locale commas and converts digits according to language.
 *
 * @param {number|string} val - Number to format
 * @param {string} lang - 'gu' or 'en'
 * @returns {string} Formatted number string
 */
export function formatNumber(val, lang = "gu") {
  if (val === null || val === undefined) return ""
  if (typeof val === "number") {
    const formatted = val.toLocaleString("en-IN")
    return lang === "gu" ? toGujaratiDigits(formatted) : formatted
  }
  return formatDigits(val, lang)
}
