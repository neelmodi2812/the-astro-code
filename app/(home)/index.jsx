"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { AstroHeader } from "@/components/astro-header"
import { LiveTicker } from "@/components/live-ticker"
import { VedicPortalHero } from "@/components/vedic-portal-hero"
import { MysticalTempleHero } from "@/components/mystical-temple-hero"
import { CategoryBar } from "@/components/category-bar"
import { HeroMagazine } from "@/components/hero-magazine"
import { EditorialContent } from "@/components/editorial-content"
import { AstroSidebar } from "@/components/astro-sidebar"
import { DevotionalCTA } from "@/components/devotional-cta"
import { AstroFooter } from "@/components/astro-footer"
import { SpiritualStoreShowcase } from "@/components/spiritual-store-showcase"

import {
  getAstroData,
  getAstroLandingData
} from "@/lib/data/astro-data"
import { useLanguage } from "@/components/language-provider"
import { toast } from "@/components/ui/sonner"

export default function HomeClient() {
  const router = useRouter()
  const { lang, setLang } = useLanguage()
  const [data, setData] = React.useState(() => getAstroData(lang))

  React.useEffect(() => {
    setData(getAstroData(lang))
  }, [lang])

  const [activeCategory, setActiveCategory] = React.useState("home")
  const [activeFilter, setActiveFilter] = React.useState(null)
  const [cartItems, setCartItems] = React.useState([])

  // Language switch handler: Updates dataset & HTML lang attribute
  const handleToggleLang = (newLang) => {
    setLang(newLang)
    toast.info(newLang === "en" ? "Language switched to English" : "ભાષા બદલાઈ: ગુજરાતી")
  }

  // API Integration Layer:
  // When backend API URL is configured in NEXT_PUBLIC_ASTRO_API_URL, loads fresh data from endpoint.
  React.useEffect(() => {
    async function loadData() {
      try {
        const liveData = await getAstroLandingData(lang)
        if (liveData) {
          setData(liveData)
        }
      } catch (err) {
        console.warn("Could not fetch remote API data, using localized dataset fallback:", err)
      }
    }
    loadData()
  }, [lang])

  const handleSelectCategory = (catId) => {
    setActiveCategory(catId)
    const matchingCat = data.categories.find((c) => c.id === catId)
    const label = matchingCat ? matchingCat.label : data.navLinks.find((n) => n.id === catId)?.label || catId
    toast.info(lang === "gu" ? `વિભાગ પસંદ કર્યો: ${label}` : `Section selected: ${label}`)
  }

  const handleSelectFilter = (filterId) => {
    setActiveFilter((prev) => (prev === filterId ? null : filterId))
    const filter = data.categories.find((c) => c.id === filterId)
    if (filter) {
      toast.info(lang === "gu" ? `ફિલ્ટર લાગુ કર્યું: ${filter.label}` : `Filter applied: ${filter.label}`)
    }
  }

  const handleAddToCart = (product) => {
    setCartItems((prev) => [...prev, product])
    toast.success(
      lang === "gu"
        ? `"${product.name}" કાર્ટમાં ઉમેરાઈ ગયું!`
        : `"${product.name}" added to cart!`
    )
  }

  const handleArticleClick = (article) => {
    const targetId = article?.id || "hero-1"
    router.push(`/article/${targetId}`)
  }

  // Filter hero stories if a filter is active
  const displayedHeroStories = React.useMemo(() => {
    if (!activeFilter) return data.heroStories
    const filterLabel = data.categories.find((c) => c.id === activeFilter)?.label
    if (!filterLabel) return data.heroStories
    const filtered = data.heroStories.filter(
      (s) => s.tag.toLowerCase().includes(filterLabel.toLowerCase()) || s.title.toLowerCase().includes(filterLabel.toLowerCase())
    )
    return filtered.length > 0 ? filtered : data.heroStories
  }, [data.heroStories, activeFilter, data.categories])

  const currentCategoryTitle = React.useMemo(() => {
    if (activeCategory === "home") {
      return lang === "gu" ? "શ્રી બહુચર માં નું રજવાડું & મુખ્ય સમાચારો" : "Shri Bahuchar Maa Rajwadu & Featured Articles"
    }
    if (activeCategory === "bahuchar-maa-rajwadu") {
      return lang === "gu" ? "શ્રી બહુચર માં નું રજવાડું" : "Shri Bahuchar Maa Rajwadu"
    }
    const navMatch = data.navLinks.find((n) => n.id === activeCategory)
    return navMatch ? navMatch.label : (lang === "gu" ? "શ્રી બહુચર માં નું રજવાડું" : "Shri Bahuchar Maa Rajwadu")
  }, [activeCategory, data.navLinks, lang])

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans transition-colors duration-200">
      {/* 1. Header with 3 tiers (Auspicious strip, Brand & Search, Saffron nav) + Mobile Drawer */}
      <AstroHeader
        config={data.config}
        topBar={data.topBar}
        navLinks={data.navLinks}
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        lang={lang}
        onToggleLang={handleToggleLang}
        cartCount={cartItems.length}
      />

      <main className="flex-1 w-full bg-background">
        {/* 2. Live Panchang & Breaking News Strip (Commented out as requested) */}
        {/* <LiveTicker ticker={data.ticker} /> */}

        {/* 3. Vedic Astrological Portal Hero Section (Version 1 - Commented out) */}
        {/* 
        <VedicPortalHero
          panchang={data.panchang}
          founder={data.config?.founder}
        />
        */}

        {/* 3. Mystical Temple Sunset & Zodiac Meditation Hero Section */}
        <MysticalTempleHero
          panchang={data.panchang}
          founder={data.config?.founder}
        />

        {/* 4. Breadcrumb & Category Filter Pills */}
        <CategoryBar
          categories={data.categories}
          activeFilter={activeFilter}
          onSelectFilter={handleSelectFilter}
          title={currentCategoryTitle}
        />

        {/* 4. Grand 4-Card Hero Magazine Section */}
        <HeroMagazine
          stories={displayedHeroStories}
          onStoryClick={handleArticleClick}
        />

        {/* 5. Main Content: 70% Editorial (Left) + 30% Sidebar (Right) */}
        <section className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column (8 cols): Featured row, 12 Jyotirlingas, Astrology & Numerology */}
            <div className="lg:col-span-8">
              <EditorialContent
                featuredArticles={data.featuredArticles}
                jyotirlingasSection={data.jyotirlingasSection}
                jyotirlingas={data.jyotirlingas}
                astroInsightsSection={data.astroInsightsSection}
                astroInsights={data.astroInsights}
                onArticleClick={handleArticleClick}
              />
            </div>

            {/* Right Column (4 cols): Panchang Wheel, Dr. Vishal Modi Consultation, Popular items */}
            <div className="lg:col-span-4">
              <AstroSidebar
                panchang={data.panchang}
                founder={data.config.founder}
                consultation={data.consultation}
                popularSection={data.popularSection}
                popular={data.popular}
                social={data.social}
                lang={lang}
              />
            </div>
          </div>

          {/* 6. FULL-WIDTH SPIRITUAL STORE & PUJA SAMAGRI SHOWCASE (MYSHOP) */}
          <div className="mt-12">
            <SpiritualStoreShowcase
              storeSection={data.spiritualStoreSection}
              products={data.products}
              onAddToCart={handleAddToCart}
              lang={lang}
            />
          </div>
        </section>

        {/* 6. Devotional WhatsApp Newsletter CTA Banner */}
        <DevotionalCTA newsletter={data.newsletter} />
      </main>

      {/* 7. Comprehensive Vedic Footer */}
      <AstroFooter config={data.config} footer={data.footer} />
    </div>
  )
}
