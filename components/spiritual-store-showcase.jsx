"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  ShoppingBag,
  ShoppingCart,
  CheckCircle2,
  ChevronRight,
  Star,
  Check,
  ShieldCheck
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function SpiritualStoreShowcase({
  storeSection = {},
  products = [],
  onAddToCart,
  lang = "gu"
}) {
  const router = useRouter()
  const [addedMap, setAddedMap] = React.useState({})

  const handleAdd = (product) => {
    setAddedMap((prev) => ({ ...prev, [product.id]: true }))
    if (onAddToCart) onAddToCart(product)
    setTimeout(() => {
      setAddedMap((prev) => ({ ...prev, [product.id]: false }))
    }, 2000)
  }

  return (
    <section className="rounded-2xl p-6 sm:p-8 bg-card dark:bg-[#181916] border-2 border-[#008376]/25 dark:border-[#008376]/40 shadow-sm transition-colors">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border/70">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="bg-[#008376] text-white text-xs font-bold px-3 py-1 rounded shadow-2xs">
              {storeSection.badge || (lang === "gu" ? "MYSHOP વિશિષ્ટ સંગ્રહ" : "MYSHOP EXCLUSIVE COLLECTION")}
            </span>
            <span className="text-xs sm:text-sm font-bold text-[#008376] dark:text-[#38b2a3] flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" />
              <span>{storeSection.purityBadge || (lang === "gu" ? "૧૦૦% શુદ્ધ & વૈદિક વિધિથી સિદ્ધ" : "100% Pure & Vedic Consecrated")}</span>
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-foreground mt-2.5 tracking-tight">
            {storeSection.heading || (lang === "gu" ? "પ્રમાણિત પૂજા સામગ્રી & રત્ન સંગ્રહ" : "Certified Puja Samagri & Sacred Gemstones")}
          </h3>
        </div>

        <div>
          <Link
            href="/myshop"
            className="inline-flex items-center gap-1.5 bg-[#008376] hover:bg-[#00685d] text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>{storeSection.viewAllButton || (lang === "gu" ? "આધ્યાત્મિક સ્ટોર જુઓ" : "View Spiritual Store")}</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* 4-Card Horizontal Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mt-6">
        {products.map((item) => {
          const isAdded = addedMap[item.id]
          return (
            <article
              key={item.id}
              onClick={() => router.push(`/myshop/product/${item.id}`)}
              className="rounded-xl border border-border/70 overflow-hidden bg-card dark:bg-[#1e1f1b] hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between cursor-pointer"
            >
              {/* Product Image */}
              <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-muted">
                <Link href={`/myshop/product/${item.id}`} className="block w-full h-full">
                  <Image
                    src={item.image}
                    alt={item.imageAlt || item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                {/* Top-Left Category Badge */}
                {item.badge && (
                  <span className="absolute top-2.5 left-2.5 bg-[#008376] text-white text-[11px] font-bold px-2.5 py-0.5 rounded shadow-xs pointer-events-none">
                    {item.badge}
                  </span>
                )}

                {/* Top-Right Discount Badge */}
                {item.discount && (
                  <span className="absolute top-2.5 right-2.5 bg-[#fdc72d] text-[#1b1c1a] text-[11px] font-black px-2.5 py-0.5 rounded shadow-xs border border-[#eab318] pointer-events-none">
                    {item.discount}
                  </span>
                )}
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  {/* Rating Stars */}
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

                  {/* Title */}
                  <Link href={`/myshop/product/${item.id}`}>
                    <h4 className="font-bold text-base text-foreground group-hover:text-[#008376] dark:group-hover:text-[#38b2a3] hover:underline transition-colors leading-snug line-clamp-1">
                      {item.name}
                    </h4>
                  </Link>

                  {/* Subtitle / Description */}
                  {item.subtitle && (
                    <p className="text-xs text-muted-foreground line-clamp-1 mt-1 leading-normal">
                      {item.subtitle}
                    </p>
                  )}
                </div>

                {/* Price and Cart Action */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/60">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-base sm:text-lg font-black text-[#008376] dark:text-[#38b2a3]">
                      {item.price}
                    </span>
                    {item.originalPrice && (
                      <span className="line-through text-xs text-muted-foreground">
                        {item.originalPrice}
                      </span>
                    )}
                  </div>

                  <Button
                    size="sm"
                    className={`h-8 px-3.5 rounded-lg text-xs font-black transition-all shadow-xs cursor-pointer ${
                      isAdded
                        ? "bg-emerald-600 text-white"
                        : "bg-[#fdc72d] hover:bg-[#eab318] text-[#1b1c1a]"
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
