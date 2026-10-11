import ShopClient from "./(myshop)"

/**
 * Vedic Spiritual Store / MyShop Page (Server Component)
 * 
 * Follows the established project architecture where page.js is a server component,
 * enabling future server actions, dynamic database queries, CMS fetches, or searchParams handling.
 */
export default async function MyShopPage() {
  return <ShopClient />
}
