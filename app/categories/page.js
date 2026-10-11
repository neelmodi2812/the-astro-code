import CategoriesClient from "./(categories)"

/**
 * Categories Page (Server Component)
 * 
 * Future server-side code (e.g. database category fetch, dynamic article counts,
 * real-time planetary metrics) can be executed in this server component.
 */
export default async function CategoriesPage() {
  return <CategoriesClient />
}
