import * as React from "react"
import { cn } from "cn"

function Skeleton({ className, ...props }) {
  return (
    <div
      aria-hidden="true"
      data-slot="skeleton"
      className={cn("skeleton-shimmer bg-muted/70 dark:bg-muted/60 rounded-md", className)}
      {...props}
    />
  )
}

export { Skeleton }
