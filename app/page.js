import * as React from "react"
import HomeClient from "./(home)"

/**
 * The Astro Code - Home Landing Page (Server Component)
 * 
 * Note: Temporarily rendering the clean circle animator preview as requested.
 * Uncomment `<HomeClient />` when done reviewing.
 */
export default async function HomePage() {
  // To restore home page: return <HomeClient />

  return (
    <HomeClient />
  )
}
