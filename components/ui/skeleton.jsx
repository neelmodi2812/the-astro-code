import * as React from "react"
import { cn } from "cn"

function Skeleton({ className, ...props }) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-muted/70 dark:bg-muted/40 animate-pulse rounded-md", className)}
      {...props}
    />
  )
}

export { Skeleton }
