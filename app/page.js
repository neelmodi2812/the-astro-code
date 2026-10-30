import * as React from "react"
import { cacheLife } from "next/cache"
import HomeClient from "./(home)"
import { contentService } from "@/lib/api/services/content"

export const metadata = {
  alternates: {
    canonical: "/",
  },
}

async function getCachedHomeFeed() {
  "use cache"
  cacheLife("minutes")
  try {
    const res = await contentService.home.feed("gu", { token: null })
    return res?.data ?? null
  } catch (err) {
    if (
      typeof err?.message === "string" &&
      (err.message.includes("prerender") || err.message.includes("fetch() rejects"))
    ) {
      return null
    }
    console.warn("Home feed prefetch unavailable:", err?.message || err)
    return null
  }
}

/**
 * The Astro Code - Home Landing Page (Server Component)
 */
export default async function HomePage() {
  const initialFeed = await getCachedHomeFeed()

  return (
    <HomeClient initialFeed={initialFeed} />
  )
}

