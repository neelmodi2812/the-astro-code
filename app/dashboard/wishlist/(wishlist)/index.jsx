"use client"

import * as React from "react"
import Link from "next/link"
import { toast } from "sonner"
import { Heart, Loader2, Trash2 } from "lucide-react"

import { useLanguage } from "@/components/language-provider"
import { withDashboardData } from "@/components/dashboard-gate"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { userService } from "@/lib/api"
import { adaptListProduct } from "@/lib/api/adapters/shop"

function WishlistClient() {
  const { lang } = useLanguage()
  const isEn = lang === "en"
  const [products, setProducts] = React.useState(null)

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
          <div className="bg-card dark:bg-[#0d3631] rounded-2xl p-10 border border-border/70 text-center space-y-3">
            <Heart className="h-10 w-10 mx-auto text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">
              {isEn ? "Your wishlist is empty." : "તમારી વિશલિસ્ટ ખાલી છે."}
            </p>
            <Link href="/myshop" className="inline-flex h-9 items-center rounded-lg bg-[#fdc72d] px-4 text-xs font-bold text-[#0e3934] hover:bg-[#eab318]">
              {isEn ? "Browse the shop" : "શોપ જુઓ"}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {products.map((product) => (
              <div key={product.apiId} className="bg-card dark:bg-[#0d3631] rounded-2xl p-3 border border-border/70 shadow-sm flex items-center gap-3">
                <Link href={`/myshop/product/${product.slug}`} className="shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={product.image} alt={product.name} className="h-20 w-20 rounded-xl object-cover bg-muted" />
                </Link>
                <div className="min-w-0 flex-1">
                  <Link href={`/myshop/product/${product.slug}`} className="text-sm font-bold text-foreground line-clamp-2 hover:text-[#8a6800] dark:hover:text-[#fdc72d]">
                    {product.name}
                  </Link>
                  <p className="text-sm font-black text-[#00685d] dark:text-[#6ed8c8] mt-1">₹{product.price.toLocaleString("en-IN")}</p>
                </div>
                <Button type="button" variant="ghost" size="icon" onClick={() => handleRemove(product)} aria-label={isEn ? "Remove" : "દૂર કરો"}>
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardShell>
  )
}

export default withDashboardData(WishlistClient)
