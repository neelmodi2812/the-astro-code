"use client"

import * as React from "react"
import Image from "next/image"
import { Sparkles } from "lucide-react"

/**
 * SafeImage component that prevents black boxes and broken images.
 * Automatically handles onError by falling back to fallbackSrc,
 * and if that fails, renders a dignified Vedic gradient placeholder.
 */
export function SafeImage({
  src,
  fallbackSrc = "/images/somnath-mahadev-temple.jpg",
  alt = "The Astro Code Vedic Image",
  className = "",
  fill = false,
  width,
  height,
  priority = false,
  sizes,
  ...props
}) {
  const [currentSrc, setCurrentSrc] = React.useState(src || fallbackSrc)
  const [hasError, setHasError] = React.useState(false)

  React.useEffect(() => {
    setCurrentSrc(src || fallbackSrc)
    setHasError(false)
  }, [src, fallbackSrc])

  const handleError = () => {
    if (currentSrc !== fallbackSrc && fallbackSrc) {
      setCurrentSrc(fallbackSrc)
    } else {
      setHasError(true)
    }
  }

  if (hasError || !currentSrc) {
    return (
      <div
        className={`bg-gradient-to-br from-[#2a2416] via-[#1a1b18] to-[#121310] flex flex-col items-center justify-center p-3 text-center border border-[#fdc72d]/20 ${
          fill ? "absolute inset-0 w-full h-full" : "w-full h-full min-h-[120px]"
        } ${className}`}
      >
        <div className="w-9 h-9 rounded-full bg-[#fdc72d]/15 text-[#fdc72d] flex items-center justify-center mb-1.5 shadow-xs">
          <Sparkles className="h-4 w-4 text-[#fdc72d]" />
        </div>
        <span className="text-[11px] font-bold text-[#fdc72d] line-clamp-1 max-w-[85%]">
          {alt || "The Astro Code"}
        </span>
      </div>
    )
  }

  return (
    <Image
      src={currentSrc}
      alt={alt}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      sizes={sizes}
      priority={priority}
      onError={handleError}
      className={className}
      {...props}
    />
  )
}
