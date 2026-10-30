"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  BookOpen,
  Package,
  Video,
  Settings,
  Heart,
  MapPin
} from "lucide-react"

import { AstroHeader } from "@/components/astro-header"
import { AstroFooter } from "@/components/astro-footer"
import { useLanguage } from "@/components/language-provider"
import { useHomeData } from "@/lib/api/hooks/use-home-data"
import { useDashboardContext } from "@/components/dashboard-gate"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb"

export function DashboardShell({ children, pageTitle, breadcrumbKey = "dashboard" }) {
  const router = useRouter()
  const pathname = usePathname()
  const { lang, setLang } = useLanguage()
  const siteData = useHomeData(lang)
  const data = useDashboardContext()

  const mobileTabs = [
    { id: "overview", label: { gu: "ડેશબોર્ડ", en: "Dashboard" }, href: "/dashboard", exact: true, icon: LayoutDashboard },
    { id: "kundli", label: { gu: "કુંડળી વોલ્ટ", en: "Kundli" }, href: "/dashboard/kundli", icon: BookOpen },
    { id: "orders", label: { gu: "ઓર્ડર્સ", en: "Orders" }, href: "/dashboard/orders", icon: Package },
    { id: "consultations", label: { gu: "પરામર્શ", en: "Consult" }, href: "/dashboard/consultations", icon: Video },
    { id: "wishlist", label: { gu: "વિશલિસ્ટ", en: "Wishlist" }, href: "/dashboard/wishlist", icon: Heart },
    { id: "addresses", label: { gu: "સરનામાં", en: "Addresses" }, href: "/dashboard/addresses", icon: MapPin },
    { id: "settings", label: { gu: "સેટિંગ્સ", en: "Settings" }, href: "/dashboard/settings", icon: Settings },
  ]

  const checkIsActive = (tab) => {
    if (tab.exact) return pathname === tab.href
    return pathname.startsWith(tab.href)
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5] dark:bg-[#12130f] text-foreground font-sans selection:bg-[#fdc72d]/30">
      
      {/* 1. Global Astro Header */}
      <AstroHeader
        navLinks={siteData.navLinks}
        config={siteData.config}
        topBar={siteData.topBar}
        activeCategory="login"
        onSelectCategory={(id) => {
          if (id === "home") router.push("/")
          else if (id === "about-us") router.push("/about-us")
          else if (id === "dainik-panchang") router.push("/dainik-panchang")
          else if (id === "categories") router.push("/categories")
          else if (id === "contact-us") router.push("/contact-us")
          else if (id === "shop" || id === "cart" || id === "myshop") router.push("/myshop")
        }}
        lang={lang}
        onToggleLang={(newLang) => setLang(newLang)}
      />

      {/* 2. Top Context Breadcrumb Strip */}
      <div className="w-full bg-muted/40 dark:bg-[#1a1b16] py-2 px-4 sm:px-6 lg:px-8 border-b border-border/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-2.5 text-xs">
          <Breadcrumb>
            <BreadcrumbList className="text-xs">
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="hover:text-[#8a6800] dark:text-[#fdc72d] transition-colors">
                  {data.breadcrumb.home[lang] || data.breadcrumb.home.gu}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard" className="hover:text-[#8a6800] dark:text-[#fdc72d] transition-colors">
                  {data.breadcrumb.account[lang] || data.breadcrumb.account.gu}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {breadcrumbKey !== "dashboard" && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard" className="hover:text-[#8a6800] dark:text-[#fdc72d] transition-colors">
                      {data.breadcrumb.dashboard[lang] || data.breadcrumb.dashboard.gu}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </>
              )}
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-bold text-[#8a6800] dark:text-[#fdc72d]">
                  {data.breadcrumb[breadcrumbKey] ? data.breadcrumb[breadcrumbKey][lang] || data.breadcrumb[breadcrumbKey].gu : pageTitle}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

        </div>
      </div>

      {/* 3. Mobile Horizontal Sticky Tab Bar (< lg) */}
      <div className="lg:hidden w-full bg-card dark:bg-[#181914] border-b border-border/60 px-4 py-2 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-2 min-w-max">
          {mobileTabs.map((tab) => {
            const isActive = checkIsActive(tab)
            const Icon = tab.icon
            return (
              <Link
                key={tab.id}
                href={tab.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  isActive
                    ? "bg-[#fdc72d] text-[#1b1c1a] shadow-xs"
                    : "bg-muted/40 dark:bg-[#20211d] text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{tab.label[lang] || tab.label.gu}</span>
              </Link>
            )
          })}
        </div>
      </div>

      {/* 4. Main 2-Column Responsive Dashboard Shell */}
      <main className="flex-1 w-full bg-background pt-5 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* LEFT COLUMN: Persistent Sidebar (hidden on mobile, rendered via DashboardSidebar on lg+) */}
            <div className="hidden lg:block lg:col-span-4 xl:col-span-3">
              <DashboardSidebar />
            </div>

            {/* RIGHT COLUMN: Dedicated Main Page Content */}
            <div className="lg:col-span-8 xl:col-span-9 w-full">
              {children}
            </div>

          </div>
        </div>
      </main>

      {/* 5. Global Astro Footer */}
      <AstroFooter />

    </div>
  )
}
