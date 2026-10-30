"use client"

import * as React from "react"
import Link from "next/link"
import { toast } from "sonner"
import { Heart, Loader2, Trash2, ShoppingBag } from "lucide-react"

import { useLanguage } from "@/components/language-provider"
import { withDashboardData } from "@/components/dashboard-gate"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { userService } from "@/lib/api"
import { adaptListProduct } from "@/lib/api/adapters/shop"

const GU_DIGITS = ["૦", "૧", "૨", "૩", "૪", "૫", "૬", "૭", "૮", "૯"]
const FALLBACK_URL = "https://dummyjson.com/image/200x100"

function WishlistClient() {
  const { lang } = useLanguage()
  const isEn = lang === "en"
  const [products, setProducts] = React.useState(null)

  const formatPrice = (p) => {
    const formatted = "₹" + Number(p || 0).toLocaleString("en-IN")
    return isEn ? formatted : formatted.replace(/\d/g, (d) => GU_DIGITS[Number(d)])
  }

  React.useEffect(() => {
    let cancelled = false

    userService.wishlist
      .list(lang)
      .then((res) => {
        if (!cancelled) setProducts((res.data || []).map((product) => adaptListProduct(product, lang)))
      })
      .catch((error) => {
        if (!cancelled) {
          setProducts([])
          toast.error(error.message)
        }
      })

    return () => {
      cancelled = true
    }
  }, [lang])

  const handleRemove = async (product) => {
    try {
      await userService.wishlist.remove(product.apiId)
      setProducts((prev) => prev.filter((item) => item.apiId !== product.apiId))
      toast.info(isEn ? "Removed from Wishlist." : "વિશલિસ્ટમાંથી દૂર કરાયું.")
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleAddToCart = (product) => {
    try {
      const stored = localStorage.getItem("astro_cart_items")
      let items = stored ? JSON.parse(stored) : []
      if (!Array.isArray(items)) items = []
      const existingIdx = items.findIndex(
        (i) => i.productId === product.id || i.id === product.id || i.apiId === product.apiId
      )
      if (existingIdx >= 0) {
        items[existingIdx].qty = (items[existingIdx].qty || 1) + 1
      } else {
        items.push({
          id: product.id || product.slug || product.apiId,
          productId: product.id || product.apiId,
          apiId: product.apiId,
          name: product.name,
          subtitle: product.subtitle || "",
          badge: product.badge || "",
          image: product.image || FALLBACK_URL,
          price: product.price,
          originalPrice: product.originalPrice || product.price,
          qty: 1,
          slug: product.slug,
          category: product.category || "all",
        })
      }
      localStorage.setItem("astro_cart_items", JSON.stringify(items))
      try {
        window.dispatchEvent(new Event("astro_cart_updated"))
      } catch {}
      toast.success(
        isEn
          ? `Added "${product.name}" to cart!`
          : `"${product.name}" કાર્ટમાં ઉમેરાઈ ગયું!`
      )
    } catch {
      toast.error(isEn ? "Failed to add to cart" : "કાર્ટમાં ઉમેરવામાં નિષ્ફળ")
    }
  }

  return (
    <DashboardShell breadcrumbKey="wishlist">
      <div className="space-y-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-foreground tracking-tight flex items-center gap-2">
            <Heart className="h-6 w-6 text-[#8a6800] dark:text-[#fdc72d]" />
            <span>{isEn ? "My Wishlist" : "મારી વિશલિસ્ટ"}</span>
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            {isEn ? "Sacred items you saved for later." : "તમે પછી માટે સાચવેલા પવિત્ર ઉત્પાદનો."}
          </p>
        </div>

        {products === null ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : products.length === 0 ? (
          <div className="bg-card dark:bg-[#0d3631] rounded-2xl p-10 border border-border/70 text-center flex flex-col items-center justify-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-muted/60 dark:bg-[#0f3c36] flex items-center justify-center text-muted-foreground">
              <Heart className="h-7 w-7 text-muted-foreground/60" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-foreground">
                {isEn ? "Your wishlist is empty" : "તમારી વિશલિસ્ટ ખાલી છે"}
              </h3>
              <p className="text-xs text-muted-foreground max-w-sm">
                {isEn
                  ? "Explore our Vedic gemstones, energized Rudraksha malas, and sacred puja items to add to your wishlist."
                  : "અમારા વૈદિક રત્નો, સિદ્ધ રુદ્રાક્ષ માળા અને પવિત્ર પૂજા સામગ્રી જુઓ અને મનપસંદ યાદીમાં સાચવો."}
              </p>
            </div>
            <Button
              asChild
              className="mt-2 h-9 px-5 bg-[#fdc72d] hover:bg-[#eab318] text-[#0e3934] font-bold text-xs rounded-xl shadow-2xs gap-1.5 cursor-pointer"
            >
              <Link href="/myshop">
                <ShoppingBag className="h-3.5 w-3.5" />
                <span>{isEn ? "Explore Vedic Shop" : "વૈદિક શોપ જુઓ"}</span>
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {products.map((product) => (
              <div
                key={product.apiId}
                className="bg-card dark:bg-[#0d3631] rounded-2xl p-3.5 border border-border/70 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:border-[#fdc72d]/50 transition-all"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1 w-full">
                  <Link href={`/myshop/product/${product.slug}`} className="shrink-0 group/img">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.image || FALLBACK_URL}
                      alt={product.name}
                      onError={(e) => {
                        e.currentTarget.src = FALLBACK_URL
                      }}
                      className="h-20 w-20 rounded-xl object-cover bg-muted border border-border/50 group-hover/img:scale-105 transition-transform"
                    />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/myshop/product/${product.slug}`}
                      className="text-sm font-bold text-foreground line-clamp-2 hover:text-[#8a6800] dark:hover:text-[#fdc72d] transition-colors"
                    >
                      {product.name}
                    </Link>
                    <p className="text-sm font-black text-[#00685d] dark:text-[#6ed8c8] mt-1">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0 w-full sm:w-auto justify-end pt-1 sm:pt-0 border-t sm:border-t-0 border-border/40">
                  <Button
                    type="button"
                    onClick={() => handleAddToCart(product)}
                    className="h-8 px-3 bg-[#fdc72d] hover:bg-[#eab318] text-[#1b1c1a] font-bold text-xs rounded-xl shadow-2xs gap-1.5 cursor-pointer"
                  >
                    <ShoppingBag className="h-3.5 w-3.5" />
                    <span>{isEn ? "Add to Cart" : "કાર્ટમાં ઉમેરો"}</span>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-xl border-border/60 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 cursor-pointer"
                    onClick={() => handleRemove(product)}
                    aria-label={isEn ? "Remove" : "દૂર કરો"}
                    title={isEn ? "Remove from wishlist" : "વિશલિસ્ટમાંથી દૂર કરો"}
                  >
                    <Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive transition-colors" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardShell>
  )
}

export default withDashboardData(WishlistClient)
