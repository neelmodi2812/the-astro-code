import { redirect } from "next/navigation"

/**
  * Fallback route for /product -> redirects to /myshop
  */
export default function ProductRootRedirectPage() {
  redirect("/myshop")
}
