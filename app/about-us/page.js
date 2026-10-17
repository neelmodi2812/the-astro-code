import AboutUsClient from "./(about-us)"
import { JsonLd } from "@/components/seo-structured-data"

/**
 * About Us Page (Server Component)
 * 
 * Injects Google E-E-A-T Person & AboutPage Structured Data
 */
export default async function AboutUsPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://theastrocode.com"

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/about-us#dr-vishal-modi`,
    "name": "Dr. Vishal Modi",
    "alternateName": "ડૉ. વિશાલ મોદી",
    "jobTitle": "Vedic Astrologer, Puranic Scholar & Gold Medalist (Ph.D. Jyotish Shastra)",
    "description": "૨૦+ વર્ષોનો ગહન સંશોધન અનુભવ, ૫૦,૦૦૦+ કુંડળી વિશ્લેષણ, ૧૦૦+ રાષ્ટ્રીય સન્માન. સંસ્કૃત મહાવિદ્યાલય ગોલ્ડ મેડાલિસ્ટ વૈદિક જ્યોતિષાચાર્ય.",
    "url": `${siteUrl}/about-us`,
    "image": `${siteUrl}/images/hero-astrologer-1.jpg`,
    "worksFor": {
      "@type": "Organization",
      "name": "The Astro Code",
      "url": siteUrl,
    },
    "alumniOf": "Sanskrit Mahavidyalaya",
    "knowsAbout": [
      "Vedic Astrology",
      "Jyotish Shastra",
      "Janam Kundali Analysis",
      "Vastu Shastra",
      "Numerology",
      "Panchang Calculations",
      "Puranic Research"
    ],
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "હોમ",
        "item": siteUrl,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "અમારા વિશે",
        "item": `${siteUrl}/about-us`,
      },
    ],
  }

  return (
    <>
      <JsonLd data={personSchema} />
      <JsonLd data={breadcrumbSchema} />
      <AboutUsClient />
    </>
  )
}
