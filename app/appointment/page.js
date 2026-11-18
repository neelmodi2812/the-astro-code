import { Suspense } from "react"
import AppointmentClient from "./(appointment)"
import { JsonLd } from "@/components/seo-structured-data"

/**
 * Appointment Page (Server Component)
 * 
 * Injects Service & Breadcrumb Structured Data for SEO indexing.
 * Wrapped in Suspense for optimal Cache Components static prerendering.
 */
export default async function AppointmentPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://theastrocode.com"

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Vedic Astrology Consultation with Dr. Vishal Modi",
    "serviceType": "Astrological & Kundali Consultation",
    "provider": {
      "@type": "Person",
      "name": "Dr. Vishal Modi",
      "jobTitle": "Gold Medalist Vedic Astrologer & Vastu Specialist",
      "worksFor": {
        "@type": "Organization",
        "name": "The Astro Code",
        "url": siteUrl
      }
    },
    "areaServed": "Worldwide",
    "availableChannel": [
      {
        "@type": "ServiceChannel",
        "serviceChannelType": "Online Video Consultation (Google Meet)"
      },
      {
        "@type": "ServiceChannel",
        "serviceChannelType": "Direct Phone Call"
      },
      {
        "@type": "ServiceChannel",
        "serviceChannelType": "In-Person Consultation (Bodakdev, Ahmedabad)"
      }
    ],
    "url": `${siteUrl}/appointment`
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
        "name": "પરામર્શ અપોઇન્ટમેન્ટ",
        "item": `${siteUrl}/appointment`
      }
    ]
  }

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />
      <Suspense fallback={null}>
        <AppointmentClient />
      </Suspense>
    </>
  )
}

