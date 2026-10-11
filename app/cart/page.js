import { redirect } from "next/navigation"

/**
 * Convenience Redirect from /cart to /myshop/cart
 */
export default function CartRedirectPage() {
  redirect("/myshop/cart")
}
