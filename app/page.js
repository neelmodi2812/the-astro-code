import * as React from "react"
import HomeClient from "./(home)"

export const metadata = {
  alternates: {
    canonical: "/",
  },
}

/**
 * The Astro Code - Home Landing Page (Server Component)
 */
export default async function HomePage() {
  return (
    <HomeClient />
  )
}
