/**
 * Single backend for both the Flutter app and this website: Laravel `/api/v1`.
 * Override per environment with NEXT_PUBLIC_API_BASE_URL (no trailing slash).
 */
export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://atest.flutterclone.com/api/v1"
).replace(/\/+$/, "")

export const DEFAULT_LANG = "gu"
