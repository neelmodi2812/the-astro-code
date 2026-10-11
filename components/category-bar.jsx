"use client"

import * as React from "react"
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function CategoryBar({ categories, activeFilter, onSelectFilter, title = "શ્રી બહુચર માં નું રજવાડું" }) {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-2">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-border">
        <div>
          {/* Breadcrumbs */}
          <Breadcrumb className="mb-1.5">
            <BreadcrumbList className="text-xs font-medium">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/" className="hover:text-[#8a6800] dark:hover:text-[#fdc72d]">
                    Home
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-[#8a6800] dark:text-[#fdc72d] font-bold">
                  {title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Headline */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl text-foreground font-extrabold tracking-tight">
            {title}
          </h1>
        </div>

        {/* Quick Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const isSelected = activeFilter === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => onSelectFilter(cat.id)}
                className={`px-3.5 py-1 rounded text-xs font-bold shadow-xs transition-all border cursor-pointer ${
                  isSelected
                    ? "bg-[#fdc72d] text-[#1b1c1a] border-[#fdc72d] shadow-sm scale-105"
                    : "bg-[#1b1c1a] dark:bg-card text-[#fdc72d] border-[#fdc72d]/40 hover:bg-[#fdc72d] hover:text-[#1b1c1a]"
                }`}
              >
                {cat.label}
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
