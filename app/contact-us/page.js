import ContactUsClient from "./(contact-us)"
import { JsonLd } from "@/components/seo-structured-data"

/**
 * Contact Us Page (Server Component)
 * 
 * Injects LocalBusiness & ContactPage Structured Data for Local SEO & Google Maps indexing.
 */
export default async function ContactUsPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://theastrocode.com"

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "The Astro Code - Vedic Astrology Center",
    "image": `${siteUrl}/the_astro_code_golden_yantra_logo.png`,
    "telephone": "+91-9825000000",
    "email": "contact@theastrocode.com",
    "url": `${siteUrl}/contact-us`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Pakwan Cross Road, Bodakdev",
      "addressLocality": "Ahmedabad",
      "addressRegion": "Gujarat",
      "postalCode": "380054",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "23.0450",
      "longitude": "72.5186"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "19:00"
      }
    ],
    "priceRange": "₹₹"
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "હોમ",
        "item": siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "સંપર્ક કરો",
        "item": `${siteUrl}/contact-us`
      }
    ]
  }

  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={breadcrumbSchema} />
      <ContactUsClient />
    </>
  )
}
