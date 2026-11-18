"use client"

import * as React from "react"
import Link from "next/link"
import { SafeImage } from "@/components/ui/safe-image"
import {
  User,
  Clock,
  ChevronRight,
  Sparkles,
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"

export function EditorialContent({
  featuredArticles = [],
  jyotirlingasSection = {},
  jyotirlingas = [],
  astroInsightsSection = {},
  astroInsights = [],
  onArticleClick,
  isLoading = false,
  lang = "gu",
}) {
  const showFeaturedSkeleton = isLoading || !featuredArticles || featuredArticles.length === 0
  const showJyotirlingaSkeleton = isLoading || !jyotirlingas || jyotirlingas.length === 0
  const showAstroSkeleton = isLoading || !astroInsights || astroInsights.length === 0

  return (
    <div className="flex flex-col gap-8">
      {/* 1. FEATURED 2-CARD ROW */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {showFeaturedSkeleton ? (
          // Shadcn Skeleton Cards for Featured Row
          Array.from({ length: 2 }).map((_, i) => (
            <Card
              key={i}
              className="pt-0 overflow-hidden shadow-sm border-border/70 flex flex-col justify-between h-full bg-card dark:bg-[#1c1d1a]"
            >
              {/* Image Skeleton */}
              <div className="relative h-56 overflow-hidden bg-muted/40 dark:bg-muted/20">
                <Skeleton className="w-full h-full rounded-none" />
                <div className="absolute top-3 left-3">
                  <Skeleton className="h-6 w-20 rounded-md bg-[#fdc72d]/40" />
                </div>
              </div>

              {/* Card Body Skeleton */}
              <CardContent className="flex-1 flex flex-col justify-between p-5 sm:p-6 space-y-4">
                <div className="space-y-2.5">
                  <Skeleton className="h-6 w-full rounded" />
                  <Skeleton className="h-6 w-3/4 rounded" />
                  <div className="space-y-1.5 pt-1.5">
                    <Skeleton className="h-3.5 w-full rounded" />
                    <Skeleton className="h-3.5 w-4/5 rounded" />
                  </div>
                </div>

                {/* Footer Skeleton */}
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex items-center gap-2">
                    <Skeleton className="size-4 rounded-full" />
                    <Skeleton className="h-3.5 w-24 rounded" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Skeleton className="size-3.5 rounded" />
                    <Skeleton className="h-3.5 w-14 rounded" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          featuredArticles.map((article) => (
            <Link
              key={article.id}
              href={`/article/${article.id || article.slug || "hero-1-bahuchar-maa-pragatya"}`}
              className="group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fdc72d]"
            >
              <Card
                className="pt-0 overflow-hidden shadow-sm group-hover:shadow-lg transition-all duration-300 border-border/70 flex flex-col justify-between h-full group-hover:border-[#fdc72d]/60 bg-card dark:bg-[#1c1d1a]"
              >
                <div className="relative h-56 overflow-hidden">
                  <SafeImage
                    src={article.image}
                    fallbackSrc="/images/bahucharaji-temple.jpg"
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 420px, 420px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-black shadow-md border ${article.tagColor || "bg-[#fdc72d] text-[#0e3934] border-[#eab318]"}`}>
                      {article.tag}
                    </span>
                  </div>
                </div>

                <CardContent className="flex-1 flex flex-col justify-between p-5 sm:p-6">
                  <div>
                    <h3 className="text-base sm:text-lg text-foreground font-bold group-hover:text-[#8a6800] dark:group-hover:text-[#fdc72d] transition-colors mb-2 leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-4">
                      {article.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Avatar className="size-4 shrink-0">
                        <AvatarFallback className="bg-[#fdc72d]/20 text-[#8a6800] dark:text-[#fdc72d] font-bold text-[8px]">
                          <User className="size-2.5" />
                        </AvatarFallback>
                      </Avatar>
                      {article.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {article.readTime}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>

      {/* 2. 12 JYOTIRLINGA SPECIAL SHOWCASE */}
      <Card className="p-6 sm:p-7 shadow-sm border-border/70 bg-card dark:bg-[#1c1d1a] rounded-xl">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-border">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-6 bg-[#fdc72d] rounded-full inline-block" />
            <h2 className="text-xl sm:text-2xl text-foreground font-bold">
              {jyotirlingasSection.title || (lang === "gu" ? "ધાર્મિક કથાઓ & બાર જ્યોતિર્લિંગ દર્શન" : "Sacred Stories & 12 Jyotirlinga Darshan")}
            </h2>
          </div>
          <Link
            href="/categories"
            className="text-xs sm:text-sm text-[#8a6800] dark:text-[#fdc72d] font-bold hover:underline inline-flex items-center gap-0.5"
          >
            {jyotirlingasSection.viewAll || (lang === "gu" ? "બધા જુઓ" : "View All")} <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {showJyotirlingaSkeleton ? (
            // Shadcn Skeleton for 3 Jyotirlinga Cards
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex flex-col space-y-3">
                <div className="relative h-44 rounded-xl overflow-hidden border border-border/50 bg-muted/40 dark:bg-muted/20">
                  <Skeleton className="w-full h-full rounded-none" />
                  <div className="absolute bottom-2 left-2">
                    <Skeleton className="h-5 w-24 rounded-md bg-[#fdc72d]/40" />
                  </div>
                </div>
                <Skeleton className="h-5 w-4/5 rounded" />
                <div className="space-y-1.5">
                  <Skeleton className="h-3.5 w-full rounded" />
                  <Skeleton className="h-3.5 w-2/3 rounded" />
                </div>
              </div>
            ))
          ) : (
            jyotirlingas.map((item) => (
              <Link
                key={item.id}
                href={`/article/${item.id || item.slug || "somnath-mahadev-pratham-jyotirling"}`}
                className="flex flex-col group cursor-pointer rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fdc72d]"
              >
                <div className="relative h-44 rounded-xl overflow-hidden mb-3 border border-border/50">
                  <SafeImage
                    src={item.image}
                    fallbackSrc={String(item.id || item.slug || "").includes("somnath") ? "/images/somnath-mahadev-temple.jpg" : String(item.id || item.slug || "").includes("mahakal") ? "/images/mahakaleshwar-temple.jpg" : "/images/bahucharaji-temple.jpg"}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 280px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute bottom-2 left-2 bg-[#fdc72d] text-[#0e3934] text-xs px-2.5 py-1 rounded-md font-bold shadow-xs border border-[#eab318] leading-none">
                    {item.title}
                  </span>
                </div>

                <h3 className="text-base font-bold text-foreground group-hover:text-[#8a6800] dark:group-hover:text-[#fdc72d] line-clamp-2 leading-snug">
                  {item.heading}
                </h3>
                <p className="text-sm text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed">
                  {item.summary}
                </p>
              </Link>
            ))
          )}
        </div>
      </Card>

      {/* 3. VEDIC ASTROLOGY & NUMEROLOGY DEEP INSIGHTS */}
      <div className="rounded-xl p-6 sm:p-7 shadow-sm bg-card dark:bg-[#1c1d1a] border-l-4 border-[#fdc72d] border-r border-t border-b border-border/70">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-border">
          <div>
            <span className="text-xs text-[#8a6800] dark:text-[#fdc72d] font-bold uppercase tracking-wider">
              {astroInsightsSection.badge || (lang === "gu" ? "વૈદિક જ્યોતિષ ગાઈડ" : "Vedic Astrology Guide")}
            </span>
            <h2 className="text-xl sm:text-2xl text-foreground font-bold mt-0.5">
              {astroInsightsSection.heading || (lang === "gu" ? "જ્યોતિષશાસ્ત્ર & અંકશાસ્ત્ર માર્ગદર્શન" : "Astrology & Numerology Insights")}
            </h2>
          </div>
          <Sparkles className="h-6 w-6 text-[#d9a100]" />
        </div>

        <div className="space-y-3">
          {showAstroSkeleton ? (
            // Shadcn Skeleton for 3 Insight Rows
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-start p-3 rounded-xl border border-border/50 bg-muted/20"
              >
                <div className="relative w-full sm:w-44 h-36 sm:h-28 rounded-xl overflow-hidden shrink-0 border border-border/60 bg-muted/40">
                  <Skeleton className="w-full h-full rounded-none" />
                </div>
                <div className="flex-1 space-y-2 w-full pt-1">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-20 rounded-md bg-[#fdc72d]/40" />
                    <Skeleton className="h-3.5 w-16 rounded" />
                  </div>
                  <Skeleton className="h-5 w-4/5 rounded" />
                  <div className="space-y-1 pt-1">
                    <Skeleton className="h-3.5 w-full rounded" />
                    <Skeleton className="h-3.5 w-2/3 rounded" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            astroInsights.map((insight) => (
              <Link
                key={insight.id}
                href={`/article/${insight.id || "feat-1"}`}
                className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-start group cursor-pointer p-3 rounded-xl hover:bg-muted/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fdc72d]"
              >
                <div className="relative w-full sm:w-44 h-36 sm:h-28 rounded-xl overflow-hidden shrink-0 border border-border/60">
                  <SafeImage
                    src={insight.image}
                    fallbackSrc="/images/sacred-vedic-hero.jpg"
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, 176px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
                    <span className="bg-[#fdc72d] text-[#0e3934] text-xs px-2.5 py-1 rounded-md font-bold shadow-xs border border-[#eab318] leading-none">
                      {insight.tag}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      {insight.timeAgo}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg text-foreground font-bold group-hover:text-[#8a6800] dark:group-hover:text-[#fdc72d] transition-colors leading-snug">
                    {insight.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1.5 leading-relaxed">
                    {insight.summary}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
