"use client"

import * as React from "react"
import Link from "next/link"

import { SafeImage } from "@/components/ui/safe-image"
import {
  ShoppingBag,
  ShoppingCart,
  CheckCircle2,
  ChevronRight,
  Star,
  Check
} from "lucide-react"

import { Button } from "@/components/ui/button"

/** A "5.0 (0)" row is noise; only show ratings that have reviews behind them. */
const hasReviews = (item) => /[1-9१-९૧-૯]/.test(String(item.reviewCount ?? ""))

export function SpiritualStoreShowcase({
  storeSection = {},
  products = [],
  onAddToCart,
  lang = "gu"
}) {
  const [addedMap, setAddedMap] = React.useState({})

  const handleAdd = (product) => {
    setAddedMap((prev) => ({ ...prev, [product.id]: true }))
    if (onAddToCart) onAddToCart(product)
    setTimeout(() => {
      setAddedMap((prev) => ({ ...prev, [product.id]: false }))
    }, 2000)
  }

  return (
    <section className="rounded-2xl p-4 sm:p-8 bg-card dark:bg-[#1c1d1a] border-2 border-[#008376]/25 dark:border-[#008376]/40 shadow-sm transition-colors">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-4 border-b border-border/70">
        <div>
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <span className="bg-[#008376] text-white text-[11px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 rounded shadow-2xs">
              {storeSection.badge || (lang === "gu" ? "MYSHOP વિશિષ્ટ સંગ્રહ" : "MYSHOP EXCLUSIVE COLLECTION")}
            </span>
            <span className="text-xs sm:text-sm font-bold text-[#008376] dark:text-[#38b2a3] flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" />
              <span>{storeSection.purityBadge || (lang === "gu" ? "૧૦૦% શુદ્ધ & વૈદિક વિધિથી સિદ્ધ" : "100% Pure & Vedic Consecrated")}</span>
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mt-2 sm:mt-3 tracking-tight">
            {storeSection.heading || (lang === "gu" ? "પ્રમાણિત પૂજા સામગ્રી & રત્ન સંગ્રહ" : "Certified Puja Samagri & Sacred Gemstones")}
          </h3>
        </div>

        <div>
          <Link
            href="/myshop"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-[#008376] hover:bg-[#00685d] text-white font-bold text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>{storeSection.viewAllButton || (lang === "gu" ? "આધ્યાત્મિક સ્ટોર જુઓ" : "View Spiritual Store")}</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Grid: 1 product per row on mobile screen (stacked), 2 on tablet, 4 on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-5 sm:mt-6">
        {products.map((item) => {
          const isAdded = addedMap[item.id]
          return (
            <article
              key={item.id}
              className="relative rounded-xl border border-border/70 overflow-hidden bg-card dark:bg-[#181916] hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between"
            >
              {/* Product Image */}
              <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-white dark:bg-[#151613] border-b border-border/50">
                <Link href={`/myshop/product/${item.id}`} className="relative block w-full h-full">
                  <SafeImage
                    src={item.image}
                    fallbackSrc="https://dummyjson.com/image/200x100"
                    alt={item.imageAlt || item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-contain p-2.5 sm:p-3 group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                {/* Top-Left Category Badge */}
                {Boolean(item?.badge && String(item.badge).trim() !== "") && (
                  <span className="absolute top-2.5 left-2.5 z-10 bg-[#008376] text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-sm pointer-events-none">
                    {item.badge}
                  </span>
                )}

                {/* Top-Right Discount Badge */}
                {Boolean(item?.discount && String(item.discount).trim() !== "" && item.discount !== "0%" && item.discount !== "-0%") && (
                  <span className="absolute top-2.5 right-2.5 z-10 bg-[#fdc72d] text-[#0e3934] text-xs font-bold px-2.5 py-1 rounded-md shadow-sm border border-[#eab318] pointer-events-none">
                    {item.discount}
                  </span>
                )}
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  {/* Rating Stars */}
                  {hasReviews(item) && (
                    <div className="flex items-center gap-1 mb-1.5">
                      <div className="flex text-[#fdc72d]">
                        <Star className="h-3.5 w-3.5 fill-current" />
                        <Star className="h-3.5 w-3.5 fill-current" />
                        <Star className="h-3.5 w-3.5 fill-current" />
                        <Star className="h-3.5 w-3.5 fill-current" />
                        <Star className="h-3.5 w-3.5 fill-current" />
                      </div>
                      <span className="text-xs font-bold text-muted-foreground ml-1">
                        {item.rating} {item.reviewCount}
                      </span>
                    </div>
                  )}

                  {/* Title */}
                  <Link href={`/myshop/product/${item.id}`} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008376] rounded-sm block">
                    <h4 className="font-bold text-sm sm:text-base text-foreground group-hover:text-[#008376] dark:group-hover:text-[#38b2a3] hover:underline transition-colors leading-snug line-clamp-2 min-h-[2.6em]">
                      {item.name}
                    </h4>
                  </Link>

                  {/* Subtitle / Description */}
                  {item.subtitle && (
                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1 mt-1 leading-normal">
                      {item.subtitle}
                    </p>
                  )}
                </div>

                {/* Price and Cart Action */}
                <div className="flex items-center justify-between gap-2 pt-3 border-t border-border/50">
                  <div className="flex flex-col min-w-0">
                    <span className="text-base sm:text-lg font-bold text-[#008376] dark:text-[#38b2a3] truncate">
                      {item.price}
                    </span>
                    {item.originalPrice && (
                      <span className="line-through text-xs sm:text-sm text-muted-foreground truncate">
                        {item.originalPrice}
                      </span>
                    )}
                  </div>

                  <Button
                    size="sm"
                    className={`relative z-10 h-8.5 sm:h-9 px-3.5 sm:px-4 rounded-lg text-xs sm:text-sm font-bold transition-all shadow-2xs shrink-0 cursor-pointer ${
                      isAdded
                        ? "bg-emerald-600 text-white"
                        : "bg-[#fdc72d] hover:bg-[#eab318] text-[#0e3934]"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleAdd(item)
                    }}
                  >
                    {isAdded ? (
                      <>
                        <Check className="h-3.5 w-3.5 mr-1" />
                        <span>{lang === "gu" ? "ઉમેરાયું" : "Added"}</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="h-3.5 w-3.5 mr-1" />
                        <span>{storeSection.addButtonText || (lang === "gu" ? "ઉમેરો" : "Add")}</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
