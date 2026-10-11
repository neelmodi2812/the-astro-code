import { redirect } from "next/navigation"

/**
  * Dynamic fallback route for /product/[id] -> redirects to /myshop/product/[id]
  */
export default async function ProductRedirectPage({ params }) {
  const { id } = await params
  redirect(`/myshop/product/${id}`)
}
