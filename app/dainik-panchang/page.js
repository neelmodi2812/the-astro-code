import DainikPanchangClient from "./(dainik-panchang)"

/**
 * Dainik Panchang Page (Server Component)
 * 
 * Future server-side code (e.g. database queries, live astronomical API calls,
 * dynamic coordinates, server time) can be seamlessly executed in this server component.
 */
export default async function DainikPanchangPage() {
  return <DainikPanchangClient />
}
