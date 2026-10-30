import * as React from "react"
import { Skeleton } from "@/components/ui/skeleton"

export default function ShopLoading() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Bar Skeleton */}
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
        {/* Hero Banner Skeleton */}
        <div className="w-full aspect-[21/9] max-h-72 rounded-2xl overflow-hidden mb-8">
          <Skeleton className="w-full h-full rounded-2xl" />
        </div>

        {/* Quick Categories Bar Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-20 rounded-xl" />
          ))}
        </div>

        {/* Dual Column Layout Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left Sidebar Skeleton */}
          <div className="hidden lg:block lg:col-span-3 space-y-4">
            <Skeleton className="h-10 w-full rounded-xl" />
            <Skeleton className="h-64 w-full rounded-xl" />
            <Skeleton className="h-48 w-full rounded-xl" />
          </div>

          {/* Right Product Grid Skeleton */}
          <div className="lg:col-span-9 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-border/60">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-8 w-36 rounded-lg" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden border border-border/70 bg-card p-0 flex flex-col justify-between"
                >
                  <Skeleton className="h-52 w-full rounded-none" />
                  <div className="p-3.5 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <Skeleton className="h-3.5 w-1/3 rounded" />
                      <Skeleton className="h-5 w-4/5 rounded" />
                      <Skeleton className="h-3 w-1/2 rounded" />
                    </div>
                    <div className="pt-2 border-t border-border/60 flex items-center justify-between">
                      <Skeleton className="h-6 w-20 rounded" />
                      <Skeleton className="h-8 w-24 rounded-lg" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

