"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  Package,
  Truck,
  Check,
  FileText,
  Navigation,
  ArrowLeft,
  ShoppingBag,
  ExternalLink,
  RotateCcw,
  Clock,
  Sparkles,
  ShieldCheck,
  ChevronRight
} from "lucide-react"

import { useLanguage } from "@/components/language-provider"
import { withDashboardData } from "@/components/dashboard-gate"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

function OrdersClient({ data }) {
  const router = useRouter()
  const { lang } = useLanguage()
  const isEn = lang === "en"

  // Filter tab: "all" | "active" | "delivered"
  const [filter, setFilter] = React.useState("all")

  const counts = {
    all: data.ordersHistory.length,
    active: data.ordersHistory.filter((o) => o.status === "in-transit").length,
    delivered: data.ordersHistory.filter((o) => o.status === "delivered").length,
  }

  const filteredOrders = data.ordersHistory.filter((order) => {
    if (filter === "active") return order.status === "in-transit"
    if (filter === "delivered") return order.status === "delivered"
    return true
  })

  return (
    <DashboardShell breadcrumbKey="orders">
      <div className="space-y-6">
        
        {/* Page Heading & Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-foreground tracking-tight flex items-center gap-2.5">
              <Package className="h-6 w-6 text-[#8a6800] dark:text-[#fdc72d]" />
              <span>{data.breadcrumb.orders[lang] || data.breadcrumb.orders.gu}</span>
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              {isEn
                ? "Track your consecrated Vedic items, gemstones, and puja orders with BlueDart tracking."
                : "તમારી સિદ્ધ પૂજા સામગ્રી, રુદ્રાક્ષ અને રત્નોના ઓર્ડરનું લાઈવ ટ્રેકિંગ અને ઇન્વોઇસ."}
            </p>
          </div>

          {/* Filter Tabs & Shop Action */}
          <div className="flex items-center gap-2 flex-wrap self-start sm:self-auto">
            <div className="inline-flex p-1 bg-muted/60 dark:bg-[#20211d] rounded-xl border border-border/50 text-xs font-bold">
              <button
                onClick={() => setFilter("all")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  filter === "all" ? "bg-[#fdc72d] text-[#1b1c1a] shadow-xs" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {isEn ? `All (${counts.all})` : `તમામ (${counts.all})`}
              </button>
              <button
                onClick={() => setFilter("active")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  filter === "active" ? "bg-[#fdc72d] text-[#1b1c1a] shadow-xs" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {isEn ? `In-Transit (${counts.active})` : `રવાના (${counts.active})`}
              </button>
              <button
                onClick={() => setFilter("delivered")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  filter === "delivered" ? "bg-[#fdc72d] text-[#1b1c1a] shadow-xs" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {isEn ? `Delivered (${counts.delivered})` : `ડિલિવર થયેલ (${counts.delivered})`}
              </button>
            </div>

            <Button
              onClick={() => router.push("/myshop")}
              size="sm"
              className="h-8 px-3 text-xs font-bold gap-1.5 bg-[#fdc72d] hover:bg-[#eab318] text-[#1b1c1a] shadow-2xs cursor-pointer"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              <span>{isEn ? "Vedic Shop" : "વૈદિક શોપ"}</span>
            </Button>
          </div>
        </div>

        {/* ACTIVE IN-TRANSIT ORDER VISUALIZER */}
        {!data.activeOrder.isPlaceholder && (filter === "all" || filter === "active") && (
          <div className="bg-card dark:bg-[#181914] rounded-2xl p-5 sm:p-6 border border-border/70 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/50 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-muted-foreground">
                  {isEn ? `Order ID: ${data.activeOrder.orderNumber}` : `ઓર્ડર ક્રમાંક: ${data.activeOrder.orderNumber}`}
                </span>
                <span className="text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">
                  {data.activeOrder.date[lang] || data.activeOrder.date.gu}
                </span>
              </div>
              <Badge className="bg-[#fdc72d] text-[#1b1c1a] text-xs font-bold self-start sm:self-auto">
                {data.activeOrder.statusBadge[lang] || data.activeOrder.statusBadge.gu}
              </Badge>
            </div>

            {/* Product Info */}
            <div className="bg-muted/40 dark:bg-[#20211d] rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4 border border-border/50">
              <Link href="/myshop/product/nepali-5-mukhi-mala" className="shrink-0 group/order-img">
                <img
                  src={data.activeOrder.imageUrl}
                  alt="Rudraksha"
                  className="w-20 h-20 rounded-lg object-cover shadow-2xs group-hover/order-img:scale-105 transition-transform duration-300 border border-border/50 cursor-pointer"
                />
              </Link>
              <div className="flex-1 text-center sm:text-left min-w-0">
                <span className="text-[10px] font-bold text-[#8a6800] dark:text-[#fdc72d] uppercase tracking-wider block">
                  {isEn ? "Lab Certified Sacred Item" : "લેબ સર્ટિફાઇડ પૂજા સામગ્રી"}
                </span>
                <Link href="/myshop/product/nepali-5-mukhi-mala">
                  <h3 className="font-bold text-sm sm:text-base text-foreground mt-0.5 hover:text-[#00685d] dark:hover:text-[#fdc72d] transition-colors cursor-pointer">
                    {data.activeOrder.productName[lang] || data.activeOrder.productName.gu}
                  </h3>
                </Link>
                <p className="text-xs text-muted-foreground mt-1">
                  {isEn ? "Consecrated by Pandit Ramesh Shastri with Vedic rituals." : "પંડિત રમેશ શાસ્ત્રી દ્વારા અભિમંત્રિત • પ્રાણ પ્રતિષ્ઠિત"}
                </p>
              </div>
              <div className="text-right shrink-0">
                <div className="text-xl font-black text-foreground">
                  {isEn ? data.activeOrder.priceEn : data.activeOrder.price}
                </div>
                <span className="text-[11px] text-[#00685d] dark:text-[#6ed8c8] font-bold block">
                  {isEn ? "Prepaid (Paid)" : "પ્રીપેડ ઓર્ડર (પેઇડ)"}
                </span>
              </div>
            </div>

            {/* 4-Step Visual Timeline */}
            <div className="pt-2 px-3">
              <div className="grid grid-cols-4 relative">
                <div className="absolute top-4 left-6 right-6 h-1 bg-muted dark:bg-[#252622] -z-0">
                  <div className="h-full bg-[#fdc72d] w-2/3 transition-all" />
                </div>

                {data.activeOrder.steps.map((st, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center z-10 space-y-1">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow ${
                        st.status === "completed"
                          ? "bg-[#00685d] text-white"
                          : st.status === "active"
                          ? "bg-[#fdc72d] text-[#1b1c1a] ring-4 ring-[#fdc72d]/30"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {st.status === "completed" ? (
                        <Check className="h-4 w-4" />
                      ) : st.status === "active" ? (
                        <Truck className="h-4 w-4" />
                      ) : (
                        <span>{st.num}</span>
                      )}
                    </div>
                    <span className="text-xs font-bold text-foreground">
                      {st.title[lang] || st.title.gu}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-medium">
                      {st.courier ? st.courier : st.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Strip */}
            <div className="pt-3 border-t border-border/50 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
                <Navigation className="h-3.5 w-3.5 text-[#8a6800] dark:text-[#fdc72d] shrink-0" />
                <span>{isEn ? "Delivery Address: " : "ડિલિવરી સરનામું: "}</span>
                <strong className="text-foreground">{data.activeOrder.shippingAddress[lang] || data.activeOrder.shippingAddress.gu}</strong>
              </span>

              <div className="flex items-center gap-2">
                <Button
                  onClick={() => {
                    toast.success(isEn ? "Downloading PDF Invoice for #TAC-89241" : "ઓર્ડર #TAC-89241 નું ઇન્વોઇસ ડાઉનલોડ થયું!")
                  }}
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs font-bold border-border hover:bg-muted/60 cursor-pointer gap-1.5"
                >
                  <FileText className="h-3.5 w-3.5" />
                  <span>{isEn ? "Download Invoice" : "ઇન્વોઇસ ડાઉનલોડ"}</span>
                </Button>

                <Button
                  onClick={() => {
                    toast.info(isEn ? "BlueDart Tracking: BD89421 in transit from Ahmedabad hub." : "બ્લુડાર્ટ ટ્રેકિંગ: BD89421 અમદાવાદ હબથી રવાના થયેલ છે.")
                  }}
                  size="sm"
                  className="h-8 bg-[#fdc72d] hover:bg-[#eab318] text-[#1b1c1a] text-xs font-bold cursor-pointer gap-1.5 shadow-2xs"
                >
                  <Truck className="h-3.5 w-3.5" />
                  <span>{isEn ? "Live Tracking (BD89421)" : "લાઈવ ટ્રેકિંગ"}</span>
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ALL ORDERS LIST TABLE / CARDS */}
        <div className="bg-card dark:bg-[#181914] rounded-2xl p-5 sm:p-6 border border-border/70 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-foreground">
            {isEn ? "Order History & Invoices" : "ઓર્ડર ઇતિહાસ & જૂના ઓર્ડર્સ"}
          </h2>

          <div className="space-y-3">
            {filteredOrders.map((ord) => (
              <div
                key={ord.id}
                className="p-4 bg-muted/30 dark:bg-[#20211d] rounded-xl border border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#fdc72d]/50 transition-all"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2.5">
                    <span className="font-extrabold text-xs text-foreground">#{ord.id}</span>
                    <span className="text-muted-foreground text-xs">•</span>
                    <span className="text-xs text-muted-foreground">{ord.date[lang] || ord.date.gu}</span>
                    <Badge
                      className={`text-[10px] font-bold ${
                        ord.status === "in-transit"
                          ? "bg-[#fdc72d] text-[#1b1c1a]"
                          : "bg-[#00685d] text-white"
                      }`}
                    >
                      {ord.statusText[lang] || ord.statusText.gu}
                    </Badge>
                  </div>
                  <h3 className="font-bold text-sm text-foreground">
                    {ord.product[lang] || ord.product.gu}
                  </h3>
                  <span className="text-xs text-muted-foreground block">
                    {ord.courier}
                  </span>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0">
                  <div className="text-base font-black text-foreground">
                    {isEn ? ord.priceEn : ord.price}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => {
                        toast.success(isEn ? `Invoice downloaded for #${ord.id}` : `ઓર્ડર #${ord.id} નું ઇન્વોઇસ ડાઉનલોડ થયું!`)
                      }}
                      variant="outline"
                      size="sm"
                      className="h-7 text-[11px] font-bold border-border hover:bg-muted/60 cursor-pointer gap-1"
                    >
                      <FileText className="h-3 w-3" />
                      <span>{isEn ? "Invoice" : "ઇન્વોઇસ"}</span>
                    </Button>
                    <Button
                      onClick={() => router.push("/myshop")}
                      variant="ghost"
                      size="sm"
                      className="h-7 text-[11px] font-bold text-[#8a6800] dark:text-[#fdc72d] hover:bg-[#fdc72d]/20 cursor-pointer"
                    >
                      {isEn ? "Re-Order" : "ફરી મંગાવો"}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </DashboardShell>
  )
}

export default withDashboardData(OrdersClient)
