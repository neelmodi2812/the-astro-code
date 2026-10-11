import { redirect } from "next/navigation"

/**
 * Canonical redirect from /about to /about-us
 * Enforces single canonical route as requested.
 */
export default function AboutRedirect() {
  redirect("/about-us")
}
