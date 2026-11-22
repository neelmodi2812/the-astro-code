import { notFound } from "next/navigation"
import { contentService } from "@/lib/api/services/content"
import CategoryArticlesClient from "./CategoryArticlesClient"

export async function generateStaticParams() {
  try {
    const res = await contentService.articles.categories("gu", { token: null })
    const list = Array.isArray(res?.data) ? res.data : []
    const slugs = list.map((c) => ({ slug: c.slug }))
    slugs.push({ slug: "jyotirlinga" })
    return slugs
  } catch {
    return [
      { slug: "jyotirling" },
      { slug: "jyotirlinga" },
      { slug: "dharmik" },
      { slug: "jyotishshastra" },
      { slug: "bahuchar-maa-nu-rajwadu" },
      { slug: "preranatmak" },
      { slug: "ankashastra" },
      { slug: "navdurga" },
    ]
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const cleanSlug = slug === "jyotirlinga" ? "jyotirling" : slug

  const CATEGORY_NAMES = {
    jyotirling: { gu: "બાર જ્યોતિર્લિંગ", en: "Twelve Jyotirlingas" },
    dharmik: { gu: "ધાર્મિક", en: "Religious" },
    jyotishshastra: { gu: "જ્યોતિષશાસ્ત્ર", en: "Astrology" },
    "bahuchar-maa-nu-rajwadu": { gu: "શ્રી બહુચર માં નું રજવાડું", en: "Shri Bahuchar Maa Rajwadu" },
    preranatmak: { gu: "પ્રેરણાત્મક", en: "Motivational" },
    ankashastra: { gu: "અંકશાસ્ત્ર", en: "Numerology" },
    navdurga: { gu: "નવદુર્ગાના નવ સ્વરૂપો", en: "Nine Forms of Navdurga" },
  }

  const name = CATEGORY_NAMES[cleanSlug]?.gu || cleanSlug

  return {
    title: `${name} | The Astro Code`,
    description: `${name} શ્રેણીના તમામ આધ્યાત્મિક અને વૈદિક લેખોનું સંપૂર્ણ સંગ્રહ. The Astro Code.`,
    alternates: {
      canonical: `/category/${cleanSlug}`,
    },
    openGraph: {
      title: `${name} | The Astro Code`,
      description: `${name} શ્રેણીના તમામ આધ્યાત્મિક લેખો.`,
      url: `/category/${cleanSlug}`,
      siteName: "The Astro Code",
      locale: "gu_IN",
      type: "website",
    },
  }
}

export default async function CategoryPage({ params }) {
  const { slug } = await params
  const cleanSlug = slug === "jyotirlinga" ? "jyotirling" : slug

  return <CategoryArticlesClient slug={cleanSlug} />
}
