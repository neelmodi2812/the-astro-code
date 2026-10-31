"use client"

import * as React from "react"
import Link from "next/link"

export function HeroMagazine({ stories, onStoryClick }) {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stories.map((story) => (
          <Link
            key={story.id}
            href={`/article/${story.id}`}
            className="group relative h-[400px] rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 border border-[#fdc72d]/40 hover:border-[#fdc72d] cursor-pointer block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fdc72d]"
          >
            {/* Background Image with smooth zoom */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
              style={{ backgroundImage: `url('${story.image}')` }}
              role="img"
              aria-label={story.imageAlt || story.title}
            />

            {/* Dark Gradient Overlay for optimal Gujarati contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />

            {/* Card Content (Aligned to Bottom) */}
            <div className="relative h-full flex flex-col justify-end p-5 text-center">
              <span className="inline-block mx-auto text-xs bg-[#fdc72d] text-[#0e3934] px-2.5 py-1 rounded-md font-black tracking-wider mb-2.5 shadow-xs border border-[#eab318]">
                {story.tag}
              </span>

              <h2 className="text-base sm:text-lg text-white font-bold leading-snug drop-shadow-xs mb-3 group-hover:text-[#fdc72d] transition-colors">
                {story.title}
              </h2>

              <div className="text-xs text-white/80 flex items-center justify-center gap-2">
                <span className="text-[#fdc72d] font-semibold">{story.author}</span>
                <span>•</span>
                <span>{story.date}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
