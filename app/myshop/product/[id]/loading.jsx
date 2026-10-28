import * as React from "react"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProductDetailLoading() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Header Skeleton */}
      <div className="w-full border-b border-border/40 py-3 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Skeleton className="h-8 w-44" />
          <div className="hidden md:flex items-center gap-4">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 w-9 rounded-full" />
            <Skeleton className="h-9 w-9 rounded-full" />
          </div>
        </div>
      </div>

      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex-1">
        {/* Breadcrumb Skeleton */}
        <div className="flex items-center gap-2 mb-6">
          <Skeleton className="h-4 w-12" />
          <span className="text-muted-foreground/40">/</span>
          <Skeleton className="h-4 w-20" />
          <span className="text-muted-foreground/40">/</span>
          <Skeleton className="h-4 w-36" />
        </div>

        {/* Dual Column Layout Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Image Showcase Skeleton */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <Skeleton className="w-full aspect-square rounded-2xl" />
            <div className="grid grid-cols-4 gap-3">
              <Skeleton className="aspect-square rounded-xl" />
              <Skeleton className="aspect-square rounded-xl" />
              <Skeleton className="aspect-square rounded-xl" />
              <Skeleton className="aspect-square rounded-xl" />
            </div>
          </div>

          {/* Right Column: Product Detail & Purchase Skeleton */}
          <div className="lg:col-span-6 flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-28 rounded-full" />
            </div>

            <Skeleton className="h-8 sm:h-10 w-4/5" />
            <Skeleton className="h-5 w-3/5" />

            <div className="flex items-center gap-3 py-2 border-y border-border/50">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-5 w-24" />
            </div>

            <div className="flex items-baseline gap-3">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-16 rounded-md" />
            </div>

            <div className="space-y-2 py-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-4/5" />
            </div>

            {/* CTA Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Skeleton className="h-12 flex-1 rounded-xl" />
              <Skeleton className="h-12 flex-1 rounded-xl" />
            </div>

            {/* Trust Cards */}
            <div className="grid grid-cols-2 gap-3 pt-4">
              <Skeleton className="h-16 rounded-xl" />
              <Skeleton className="h-16 rounded-xl" />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

