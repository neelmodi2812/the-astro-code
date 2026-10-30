/**
 * Structured Data (Schema.org JSON-LD) Component
 * 
 * Injects Google-compliant rich snippet metadata for maximum search indexing,
 * knowledge graph recognition, and site search integration.
 */
export function GlobalJsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://theastrocode.com"

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    "name": "The Astro Code",
    "alternateName": "ધ એસ્ટ્રો કોડ",
    "url": siteUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${siteUrl}/logo.png`,
      "width": 800,
      "height": 800,
      "caption": "The Astro Code Logo"
    },
    "image": `${siteUrl}/logo.png`,
    "description": "Vedic Astrology, Daily Panchang, Choghadiya, Consecrated Spiritual Artifacts, and Personalized Kundali Analysis Portal.",
    "founder": {
      "@type": "Person",
      "name": "Dr. Vishal Modi",
      "jobTitle": "Vedic Astrologer & Puranic Scholar (Ph.D. Jyotish Shastra, Gold Medalist)",
      "url": `${siteUrl}/about-us`
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Pakwan Cross Road, Bodakdev",
      "addressLocality": "Ahmedabad",
      "addressRegion": "Gujarat",
      "postalCode": "380054",
      "addressCountry": "IN"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+91-9825000000",
        "contactType": "Customer Service & Consultation Inquiries",
        "areaServed": "IN",
        "availableLanguage": ["Gujarati", "Hindi", "English"]
      }
    ],
    "sameAs": [
      "https://youtube.com/@TheAstroCode",
      "https://instagram.com/theastrocode",
      "https://facebook.com/theastrocode"
    ]
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    "name": "The Astro Code",
    "alternateName": "The Astro Code — Unlock Happiness | વૈદિક જ્યોતિષ & પંચાંગ",
    "url": siteUrl,
    "inLanguage": ["gu", "en"],
    "publisher": {
      "@id": `${siteUrl}/#organization`
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteUrl}/myshop?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema).replace(/</g, "\\u003c"),
        }}
      />
    </>
  )
}

/**
 * Reusable JSON-LD Structured Data Script
 * Implements official Next.js 16 recommendation with unicode XSS protection.
 *
 * @see https://nextjs.org/docs/app/guides/json-ld
 */
export function JsonLd({ data }) {
  if (!data) return null
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  )
}
