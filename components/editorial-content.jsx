"use client"

import * as React from "react"
import Link from "next/link"
import { SafeImage } from "@/components/ui/safe-image"
import {
  User,
  Clock,
  ChevronRight,
  Sparkles
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function EditorialContent({
  featuredArticles,
  jyotirlingasSection = {},
  jyotirlingas,
  astroInsightsSection = {},
  astroInsights,
  onArticleClick
}) {
  return (
    <div className="flex flex-col gap-8">
      {/* 1. FEATURED 2-CARD ROW */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featuredArticles.map((article) => (
          <Link
            key={article.id}
            href={`/article/${article.id || "hero-1"}`}
            className="group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fdc72d]"
          >
            <Card
              className="pt-0 overflow-hidden shadow-sm group-hover:shadow-lg transition-all duration-300 border-border/70 flex flex-col justify-between h-full group-hover:border-[#fdc72d]/60 bg-card dark:bg-[#181916]"
            >
              <div className="relative h-56 overflow-hidden">
                <SafeImage
                  src={article.image}
                  fallbackSrc="/images/bahucharaji-temple.jpg"
                  alt={article.imageAlt || article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-black shadow-md border ${article.tagColor || "bg-[#fdc72d] text-[#1b1c1a] border-[#eab318]"}`}>
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
        ))}
      </div>

      {/* 2. 12 JYOTIRLINGA SPECIAL SHOWCASE */}
      <Card className="p-6 sm:p-7 shadow-sm border-border/70 bg-card dark:bg-[#181916] rounded-xl">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-border">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-6 bg-[#fdc72d] rounded-full inline-block" />
            <h2 className="text-xl sm:text-2xl text-foreground font-bold">
              {jyotirlingasSection.title || "ધાર્મિક કથાઓ & બાર જ્યોતિર્લિંગ દર્શન"}
            </h2>
          </div>
          <Link
            href="#jyotirling"
            className="text-xs sm:text-sm text-[#8a6800] dark:text-[#fdc72d] font-bold hover:underline inline-flex items-center gap-0.5"
          >
            {jyotirlingasSection.viewAll || "બધા જુઓ"} <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {jyotirlingas.map((item) => (
            <Link
              key={item.id}
              href={`/article/${item.id || "jyotirling-1"}`}
              className="flex flex-col group cursor-pointer rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fdc72d]"
            >
              <div className="relative h-44 rounded-xl overflow-hidden mb-3 border border-border/50">
                <SafeImage
                  src={item.image}
                  fallbackSrc={item.id === "jyotirling-1" ? "/images/somnath-mahadev-temple.jpg" : item.id === "jyotirling-2" ? "/images/mahakaleshwar-temple.jpg" : "/images/bahucharaji-temple.jpg"}
                  alt={item.imageAlt || item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute bottom-2 left-2 bg-[#fdc72d] text-[#1b1c1a] text-xs px-2.5 py-0.5 rounded-md font-black shadow-xs border border-[#eab318]">
                  {item.title}
                </span>
              </div>

              <h4 className="text-sm font-semibold text-foreground group-hover:text-[#8a6800] dark:group-hover:text-[#fdc72d] line-clamp-2 leading-snug">
                {item.heading}
              </h4>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                {item.summary}
              </p>
            </Link>
          ))}
        </div>
      </Card>

      {/* 3. VEDIC ASTROLOGY & NUMEROLOGY DEEP INSIGHTS */}
      <div className="rounded-xl p-6 sm:p-7 shadow-sm bg-card dark:bg-[#181916] border-l-4 border-[#fdc72d] border-r border-t border-b border-border/70">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-border">
          <div>
            <span className="text-[11px] text-[#8a6800] dark:text-[#fdc72d] font-black uppercase tracking-wider">
              {astroInsightsSection.badge || "વૈદિક જ્યોતિષ ગાઈડ"}
            </span>
            <h3 className="text-xl sm:text-2xl text-foreground font-bold mt-0.5">
              {astroInsightsSection.heading || "જ્યોતિષશાસ્ત્ર & અંકશાસ્ત્ર માર્ગદર્શન"}
            </h3>
          </div>
          <Sparkles className="h-6 w-6 text-[#d9a100]" />
        </div>

        <div className="space-y-4">
          {astroInsights.map((insight) => (
            <Link
              key={insight.id}
              href={`/article/${insight.id || "feat-1"}`}
              className="flex flex-col sm:flex-row gap-4 items-start group cursor-pointer p-2 rounded-lg hover:bg-muted/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fdc72d]"
            >
              <div className="relative w-full sm:w-36 h-24 rounded-xl overflow-hidden shrink-0 border border-border/60">
                <SafeImage
                  src={insight.image}
                  fallbackSrc="/images/sacred-vedic-hero.jpg"
                  alt={insight.title}
                  fill
                  sizes="144px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="bg-[#fdc72d] text-[#1b1c1a] text-[11px] px-2.5 py-0.5 rounded-md font-black shadow-xs border border-[#eab318]">
                    {insight.tag}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {insight.timeAgo}
                  </span>
                </div>
                <h4 className="text-sm sm:text-base text-foreground font-bold group-hover:text-[#8a6800] dark:group-hover:text-[#fdc72d] transition-colors leading-snug">
                  {insight.title}
                </h4>
                <p className="text-xs text-muted-foreground line-clamp-2 mt-1 leading-relaxed">
                  {insight.summary}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
