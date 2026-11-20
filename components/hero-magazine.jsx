"use client"

import * as React from "react"
import Link from "next/link"
import { SafeImage } from "@/components/ui/safe-image"
import { Calendar, ArrowUpRight } from "lucide-react"

export function HeroMagazine({ stories = [], onStoryClick }) {
  if (!stories || stories.length === 0) return null

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {stories.map((story) => (
          <Link
            key={story.id}
            href={`/article/${story.id}`}
            onClick={() => onStoryClick && onStoryClick(story)}
            className="group relative flex flex-col rounded-2xl overflow-hidden bg-card dark:bg-[#0c2f2b] border border-border/80 dark:border-emerald-800/40 hover:border-[#fdc72d] dark:hover:border-[#fdc72d] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fdc72d]"
          >
            {/* 1. Image Container with natural 4:3 aspect ratio */}
            {/* Perfectly fits 794x596 and 1000x674 banner images with zero text or subject clipping */}
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-900/10 dark:bg-black/40">
              <SafeImage
                src={story.image}
                fallbackSrc="/images/bahucharaji-temple.jpg"
                alt={story.imageAlt || story.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 25vw, 320px"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity pointer-events-none" />

              {/* Floating Tag Badge */}
              {story.tag && (
                <span className="absolute top-3 left-3 text-[11px] bg-[#fdc72d] text-[#0e3934] px-2.5 py-0.5 rounded-md font-black shadow-md border border-[#eab318] tracking-wide">
                  {story.tag}
                </span>
              )}

              {/* Hover Quick-view pill */}
              <div className="absolute bottom-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 backdrop-blur-xs text-white p-1 rounded-full">
                <ArrowUpRight className="size-3.5 text-[#fdc72d]" />
              </div>
            </div>

            {/* 2. Card Content Area (Below Image) */}
            <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 bg-card dark:bg-[#08201d]">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-[#00685d] dark:group-hover:text-[#fdc72d] transition-colors leading-snug line-clamp-2 mb-3">
                  {story.title}
                </h3>
              </div>

              {/* Meta: Author & Date */}
              <div className="pt-3 border-t border-border/60 dark:border-white/10 flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-semibold text-foreground/80 dark:text-white/80 truncate max-w-[140px] flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-[#fdc72d] shrink-0" />
                  <span className="truncate">{story.author}</span>
                </span>
                <span className="text-[11px] text-muted-foreground shrink-0 flex items-center gap-1">
                  <Calendar className="size-3 text-muted-foreground/70" />
                  {story.date}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
