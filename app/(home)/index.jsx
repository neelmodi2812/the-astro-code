"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { AstroHeader } from "@/components/astro-header"

import { VedicPortalHero } from "@/components/vedic-portal-hero"

import { CategoryBar } from "@/components/category-bar"
import { HeroMagazine } from "@/components/hero-magazine"
import { EditorialContent } from "@/components/editorial-content"
import { AstroSidebar } from "@/components/astro-sidebar"
import { DevotionalCTA } from "@/components/devotional-cta"
import { AstroFooter } from "@/components/astro-footer"
import { SpiritualStoreShowcase } from "@/components/spiritual-store-showcase"
import { OurServicesSection } from "@/components/our-services-section"

import { useHomeData } from "@/lib/api/hooks/use-home-data"
import { useCategorySections } from "@/lib/api/hooks/use-nav-menu"
import { adaptHeroStory } from "@/lib/api/adapters/home"
import { useLanguage } from "@/components/language-provider"
import { toast } from "@/components/ui/sonner"

export default function HomeClient({ initialFeed = null }) {
  const router = useRouter()
  const { lang, setLang } = useLanguage()
  const data = useHomeData(lang, initialFeed)
  const categorySections = useCategorySections(lang)

  const [activeCategory, setActiveCategory] = React.useState("home")
  const [activeFilter, setActiveFilter] = React.useState(null)
  const [cartItems, setCartItems] = React.useState([])

  // Language switch handler: Updates dataset & HTML lang attribute
  const handleToggleLang = (newLang) => {
    setLang(newLang)
    toast.info(newLang === "en" ? "Language switched to English" : "ભાષા બદલાઈ: ગુજરાતી")
  }

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
    const targetId = article?.slug || article?.id || "hero-1-bahuchar-maa-pragatya"
    router.push(`/article/${targetId}`)
  }

  // A category pill shows that category's own latest articles; no pill shows the featured hero stories.
  const displayedHeroStories = React.useMemo(() => {
    if (!activeFilter) return data.heroStories
    const section = categorySections?.find((sec) => sec.category.slug === activeFilter)
    if (!section) return data.heroStories
    return section.articles.slice(0, 4).map((a) => adaptHeroStory(a, lang))
  }, [data.heroStories, activeFilter, categorySections, lang])

  // Sub-heading follows the selected category pill instead of always naming one category
  const currentCategoryTitle = React.useMemo(() => {
    const filter = activeFilter && data.categories.find((c) => c.id === activeFilter)
    if (filter) return filter.label
    return lang === "gu" ? "મુખ્ય લેખો અને સમાચારો" : "Featured Articles & Latest News"
  }, [activeFilter, data.categories, lang])

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

        {/* 3. Vedic Astrological Portal Hero Section (Version 1) */}
        <VedicPortalHero
          panchang={data.panchang}
          founder={data.config?.founder}
        />

        {/* 3. Mystical Temple Sunset & Zodiac Meditation Hero Section (Version 2 - Inactive) */}
        {/*
        <MysticalTempleHero
          panchang={data.panchang}
          founder={data.config?.founder}
        />
        */}

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

          {/* 6. OUR ASTROLOGICAL & SPIRITUAL SERVICES SECTION */}
          <div className="mt-12 border-t border-border/60 pt-4">
            <OurServicesSection
              servicesSection={data.servicesSection}
              lang={lang}
            />
          </div>

          {/* 7. FULL-WIDTH SPIRITUAL STORE & PUJA SAMAGRI SHOWCASE (MYSHOP) */}
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
