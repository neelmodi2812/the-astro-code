import * as React from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { Skeleton } from "@/components/ui/skeleton"

/**
 * Dedicated Dashboard Loading State (app/dashboard/loading.js)
 * Implements React Suspense fallback for the /dashboard route tree,
 * preserving the persistent sidebar while rendering shadcn Skeleton placeholders.
 */
export default function DashboardLoading() {
  return (
    <DashboardShell breadcrumbKey="dashboard">
      <div className="space-y-6" role="status" aria-label="Loading Dashboard Data">
        {/* Welcome Banner Skeleton */}
        <div className="bg-card dark:bg-[#1c1d1a] rounded-2xl p-5 sm:p-6 border border-border/70 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <Skeleton className="w-12 h-12 rounded-full shrink-0" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-44 rounded-md" />
              <Skeleton className="h-3 w-60 rounded-md" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-32 rounded-lg" />
            <Skeleton className="h-9 w-32 rounded-lg" />
          </div>
        </div>

        {/* 4 Metric KPI Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-card dark:bg-[#1c1d1a] rounded-xl p-4 border border-border/70 shadow-2xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <Skeleton className="h-3 w-24 rounded-md" />
                <Skeleton className="h-8 w-8 rounded-lg" />
              </div>
              <Skeleton className="h-7 w-20 rounded-md" />
              <Skeleton className="h-3 w-32 rounded-md" />
            </div>
          ))}
        </div>

        {/* 2x2 Feature Summary Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-card dark:bg-[#1c1d1a] rounded-2xl p-5 border border-border/70 shadow-2xs space-y-4"
            >
              <div className="flex items-center justify-between pb-2.5 border-b border-border/40">
                <Skeleton className="h-4 w-36 rounded-md" />
                <Skeleton className="h-4 w-16 rounded-md" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-4/5 rounded-md" />
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-border/40">
                <Skeleton className="h-3 w-28 rounded-md" />
                <Skeleton className="h-8 w-24 rounded-lg" />
              </div>
            </div>
          ))}
        </div>

        <span className="sr-only">Dashboard data is loading...</span>
      </div>
    </DashboardShell>
  )
}
