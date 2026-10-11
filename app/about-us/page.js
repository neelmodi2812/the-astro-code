import AboutUsClient from "./(about-us)"

/**
 * About Us Page (Server Component)
 * 
 * Future server-side code (e.g. database queries, CMS fetches,
 * dynamic headers or searchParams) can be handled directly in this server component.
 */
export default async function AboutUsPage() {
  return <AboutUsClient />
}
