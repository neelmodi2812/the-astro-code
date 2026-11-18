"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  Package,
  Truck,
  Check,
  FileText,
  Navigation,
  ShoppingBag,
  Calendar,
} from "lucide-react"

import { useLanguage } from "@/components/language-provider"
import { withDashboardData } from "@/components/dashboard-gate"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const STEP_DESCRIPTIONS = [
  {
    gu: "ઓર્ડર સ્વીકારાયો • સંસ્કાર પૂજા માટે નોંધણી",
    en: "Order received & sanctification queue allocated",
  },
  {
    gu: "શાસ્ત્રોક્ત મંત્રોચ્ચાર અને પ્રાણ પ્રતિષ્ઠા સંપન્ન",
    en: "Vedic Pran Pratishtha & mantra consecration",
  },
  {
    gu: "સુરક્ષિત પેકિંગ સાથે કુરિયર દ્વારા રવાના",
    en: "Dispatched with consecrated tamper-proof seal",
  },
  {
    gu: "આપના પૂજા સ્થાન માટે સુરક્ષિત ડિલિવરી",
    en: "Delivered to your sacred space",
  },
]

function OrdersClient({ data }) {
  const router = useRouter()
  const { lang } = useLanguage()
  const isEn = lang === "en"
  const GU_DIGITS = ["૦", "૧", "૨", "૩", "૪", "૫", "૬", "૭", "૮", "૯"]
  const toDigits = (n) => (isEn ? String(n) : String(n).replace(/\d/g, (d) => GU_DIGITS[Number(d)]))

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

  // Stepper calculations
  const steps = data.activeOrder.steps || []
  const currentStepIdx = steps.findIndex((s) => s.status === "active")
  const progressPct =
    steps.length > 1
      ? currentStepIdx >= 0
        ? (currentStepIdx / (steps.length - 1)) * 100
        : steps.every((s) => s.status === "completed")
        ? 100
        : 0
      : 0

  return (
    <DashboardShell breadcrumbKey="orders">
      <div className="space-y-4 sm:space-y-6">
        
        {/* Page Heading & Shop Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center justify-between sm:block gap-3">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-foreground tracking-tight flex items-center gap-2 sm:gap-2.5">
                <Package className="h-5 w-5 sm:h-6 sm:w-6 text-[#8a6800] dark:text-[#fdc72d] shrink-0" />
                <span>{data.breadcrumb.orders[lang] || data.breadcrumb.orders.gu}</span>
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 hidden sm:block">
                {isEn
                  ? "Track your consecrated Vedic items, gemstones, and puja orders with live tracking."
                  : "તમારી સિદ્ધ પૂજા સામગ્રી, રુદ્રાક્ષ અને રત્નોના ઓર્ડરનું લાઈવ ટ્રેકિંગ અને ઇન્વોઇસ."}
              </p>
            </div>

            <Button
              onClick={() => router.push("/myshop")}
              size="sm"
              className="h-8 sm:h-9 px-3 sm:px-4 text-xs font-bold gap-1.5 bg-[#fdc72d] hover:bg-[#eab318] text-[#0e3934] rounded-xl shadow-2xs cursor-pointer sm:hidden shrink-0"
            >
              <ShoppingBag className="size-3.5" data-icon="inline-start" />
              <span>{isEn ? "Vedic Shop" : "વૈદિક શોપ"}</span>
            </Button>
          </div>

          <p className="text-xs text-muted-foreground sm:hidden">
            {isEn
              ? "Track your consecrated Vedic items, gemstones, and puja orders."
              : "તમારી સિદ્ધ પૂજા સામગ્રી, રુદ્રાક્ષ અને રત્નોના ઓર્ડરનું લાઈવ ટ્રેકિંગ."}
          </p>

          <Button
            onClick={() => router.push("/myshop")}
            className="hidden sm:inline-flex h-9 px-4 text-xs font-bold gap-1.5 bg-[#fdc72d] hover:bg-[#eab318] text-[#0e3934] rounded-xl shadow-2xs cursor-pointer shrink-0"
          >
            <ShoppingBag className="size-3.5" data-icon="inline-start" />
            <span>{isEn ? "Vedic Shop" : "વૈદિક શોપ"}</span>
          </Button>
        </div>

        {/* Filter Tabs Bar */}
        <div className="border-b border-border/50 pb-2.5 overflow-x-auto scrollbar-none">
          <div className="inline-flex p-1 bg-muted/60 dark:bg-[#0f3c36] rounded-xl border border-border/50 text-xs font-bold max-w-full">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 sm:px-3.5 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                filter === "all" ? "bg-[#fdc72d] text-[#0e3934] shadow-xs" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {isEn ? `All (${counts.all})` : `તમામ (${toDigits(counts.all)})`}
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`px-3 sm:px-3.5 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                filter === "active" ? "bg-[#fdc72d] text-[#0e3934] shadow-xs" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {isEn ? `In-Transit (${counts.active})` : `રવાના (${toDigits(counts.active)})`}
            </button>
            <button
              onClick={() => setFilter("delivered")}
              className={`px-3 sm:px-3.5 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                filter === "delivered" ? "bg-[#fdc72d] text-[#0e3934] shadow-xs" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {isEn ? `Delivered (${counts.delivered})` : `ડિલિવર થયેલ (${toDigits(counts.delivered)})`}
            </button>
          </div>
        </div>

        {/* ACTIVE IN-TRANSIT ORDER VISUALIZER */}
        {!data.activeOrder.isPlaceholder && (filter === "all" || filter === "active") && (
          <div className="bg-card dark:bg-[#0d3631] rounded-2xl p-3.5 sm:p-6 border border-border/70 shadow-sm space-y-4 sm:space-y-5">
            {/* Order Meta Header - Clean mobile wrapping */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-border/50 pb-3">
              <div className="flex items-center justify-between sm:justify-start gap-2 min-w-0">
                <div className="flex items-center gap-1.5 min-w-0">
                  <Package className="h-4 w-4 text-[#8a6800] dark:text-[#fdc72d] shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-foreground truncate">
                    {isEn ? "Order " : "ઓર્ડર "}
                    <span className="font-mono text-muted-foreground">{data.activeOrder.orderNumber}</span>
                  </span>
                </div>
                {/* Mobile status badge */}
                <Badge className="sm:hidden bg-[#fdc72d] text-[#0e3934] text-[11px] font-extrabold px-2.5 py-0.5 rounded-full shrink-0">
                  {data.activeOrder.statusBadge[lang] || data.activeOrder.statusBadge.gu}
                </Badge>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1 text-[11px] sm:text-xs">
                  <Calendar className="h-3.5 w-3.5 shrink-0" />
                  <span>{data.activeOrder.date[lang] || data.activeOrder.date.gu}</span>
                </div>
                {/* Desktop status badge */}
                <Badge className="hidden sm:inline-flex bg-[#fdc72d] text-[#0e3934] text-xs font-extrabold px-2.5 py-0.5 rounded-full shrink-0">
                  {data.activeOrder.statusBadge[lang] || data.activeOrder.statusBadge.gu}
                </Badge>
              </div>
            </div>

            {/* Product Info Box */}
            <div className="bg-muted/40 dark:bg-[#0f3c36] rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 border border-border/50">
              <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                <Link href="/myshop" className="shrink-0 group/order-img">
                  <Image
                    src={data.activeOrder.imageUrl || "https://dummyjson.com/image/200x100"}
                    alt=""
                    width={80}
                    height={80}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shadow-2xs group-hover/order-img:scale-105 transition-transform duration-300 border border-border/50 cursor-pointer bg-card"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] sm:text-xs font-bold text-[#8a6800] dark:text-[#fdc72d] uppercase tracking-wider block truncate">
                    {isEn ? "Lab Certified Sacred Item" : "લેબ સર્ટિફાઇડ પૂજા સામગ્રી"}
                  </span>
                  <Link href="/myshop">
                    <h3 className="font-bold text-sm sm:text-base text-foreground mt-0.5 hover:text-[#00685d] dark:hover:text-[#fdc72d] transition-colors cursor-pointer line-clamp-2">
                      {data.activeOrder.productName[lang] || data.activeOrder.productName.gu}
                    </h3>
                  </Link>
                  <p className="text-[11px] sm:text-xs text-muted-foreground mt-1 line-clamp-1">
                    {isEn ? "Consecrated with Vedic rituals." : "પંડિત રમેશ શાસ્ત્રી દ્વારા અભિમંત્રિત • પ્રાણ પ્રતિષ્ઠિત"}
                  </p>
                </div>
              </div>

              {/* Price Block */}
              <div className="flex items-center justify-between sm:flex-col sm:items-end border-t border-border/40 sm:border-0 pt-2 sm:pt-0 shrink-0">
                <div className="text-lg sm:text-xl font-black text-foreground">
                  {isEn ? data.activeOrder.priceEn : data.activeOrder.price}
                </div>
                <span className="text-[11px] sm:text-xs text-[#00685d] dark:text-[#6ed8c8] font-bold block">
                  {isEn ? "Prepaid (Paid)" : "પ્રીપેડ ઓર્ડર (પેઇડ)"}
                </span>
              </div>
            </div>

            {/* Visual Timeline Section */}
            <div>
              {/* MOBILE TIMELINE (< sm) - Clean, no text collisions */}
              <div className="sm:hidden space-y-3 pt-1">
                {/* Mini Progress Bar Nodes */}
                <div className="bg-muted/40 dark:bg-[#0f3c36] p-2.5 rounded-xl border border-border/50">
                  <div className="flex items-center justify-between relative px-2">
                    {/* Connecting background line */}
                    <div className="absolute top-1/2 left-6 right-6 -translate-y-1/2 h-1 bg-border/70 -z-0">
                      <div
                        className="h-full bg-[#fdc72d] transition-all duration-300"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>

                    {steps.map((st, idx) => {
                      const isCompleted = st.status === "completed"
                      const isActive = st.status === "active"
                      return (
                        <div
                          key={idx}
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold z-10 shadow-xs transition-transform ${
                            isCompleted
                              ? "bg-[#00685d] text-white"
                              : isActive
                              ? "bg-[#fdc72d] text-[#0e3934] ring-3 ring-[#fdc72d]/40 scale-110"
                              : "bg-background text-muted-foreground border border-border/60"
                          }`}
                        >
                          {isCompleted ? (
                            <Check className="h-3 w-3" />
                          ) : isActive ? (
                            <Truck className="h-3 w-3" />
                          ) : (
                            <span>{toDigits(st.num)}</span>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Vertical Step Details */}
                <div className="space-y-2 px-1 pt-1">
                  {steps.map((st, idx) => {
                    const isCompleted = st.status === "completed"
                    const isActive = st.status === "active"
                    const isLast = idx === steps.length - 1
                    const fallbackDesc = STEP_DESCRIPTIONS[idx]
                      ? (STEP_DESCRIPTIONS[idx][lang] || STEP_DESCRIPTIONS[idx].gu)
                      : ""

                    return (
                      <div key={idx} className="flex items-start gap-3 relative">
                        {/* Vertical connector line */}
                        {!isLast && (
                          <div
                            className={`absolute left-3.5 top-6 bottom-0 w-0.5 -ml-[1px] ${
                              isCompleted ? "bg-[#00685d]" : "bg-muted dark:bg-[#113f39]"
                            }`}
                          />
                        )}

                        {/* Step Icon circle */}
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 shadow-xs z-10 ${
                            isCompleted
                              ? "bg-[#00685d] text-white"
                              : isActive
                              ? "bg-[#fdc72d] text-[#0e3934] ring-3 ring-[#fdc72d]/30"
                              : "bg-muted/70 dark:bg-[#1a1c18] text-muted-foreground border border-border/60"
                          }`}
                        >
                          {isCompleted ? (
                            <Check className="h-3.5 w-3.5" />
                          ) : isActive ? (
                            <Truck className="h-3.5 w-3.5" />
                          ) : (
                            <span className="text-[11px]">{toDigits(st.num)}</span>
                          )}
                        </div>

                        {/* Step Content */}
                        <div className="flex-1 min-w-0 pb-3">
                          <div className="flex items-center justify-between gap-2">
                            <span
                              className={`text-xs font-bold ${
                                isActive
                                  ? "text-[#8a6800] dark:text-[#fdc72d]"
                                  : isCompleted
                                  ? "text-foreground"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {st.title[lang] || st.title.gu}
                            </span>
                            {isActive ? (
                              <Badge className="bg-[#fdc72d]/20 text-[#8a6800] dark:text-[#fdc72d] border border-[#fdc72d]/40 text-[10px] px-1.5 py-0 font-extrabold shrink-0">
                                {isEn ? "Current" : "ચાલુ સ્થિતિ"}
                              </Badge>
                            ) : isCompleted ? (
                              <span className="text-[10px] font-bold text-[#00685d] dark:text-[#6ed8c8]">
                                {isEn ? "Completed" : "સંપન્ન"}
                              </span>
                            ) : null}
                          </div>
                          <span className="text-[11px] text-muted-foreground block mt-0.5 leading-tight">
                            {st.courier ? st.courier : st.date ? st.date : fallbackDesc}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* DESKTOP HORIZONTAL STEPPER (sm+) */}
              <div className="hidden sm:block pt-2 px-3">
                <div className="grid grid-cols-4 relative">
                  <div className="absolute top-4 left-6 right-6 h-1 bg-muted dark:bg-[#113f39] -z-0">
                    <div
                      className="h-full bg-[#fdc72d] transition-all duration-300"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>

                  {steps.map((st, idx) => (
                    <div key={idx} className="flex flex-col items-center text-center z-10 space-y-1 px-1">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow ${
                          st.status === "completed"
                            ? "bg-[#00685d] text-white"
                            : st.status === "active"
                            ? "bg-[#fdc72d] text-[#0e3934] ring-4 ring-[#fdc72d]/30"
                            : "bg-muted text-muted-foreground border border-border/50"
                        }`}
                      >
                        {st.status === "completed" ? (
                          <Check className="h-4 w-4" />
                        ) : st.status === "active" ? (
                          <Truck className="h-4 w-4" />
                        ) : (
                          <span>{toDigits(st.num)}</span>
                        )}
                      </div>
                      <span className="text-xs font-bold text-foreground">
                        {st.title[lang] || st.title.gu}
                      </span>
                      <span className="text-xs text-muted-foreground font-medium">
                        {st.courier ? st.courier : st.date}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Strip (Address + Buttons) */}
            <div className="pt-3 border-t border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-start gap-2 text-xs text-muted-foreground min-w-0">
                <Navigation className="h-4 w-4 text-[#8a6800] dark:text-[#fdc72d] shrink-0 mt-0.5" />
                <div className="leading-snug min-w-0">
                  <span className="text-muted-foreground">{isEn ? "Delivery Address: " : "ડિલિવરી સરનામું: "}</span>
                  <span className="text-foreground font-bold break-words">{data.activeOrder.shippingAddress[lang] || data.activeOrder.shippingAddress.gu}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:flex sm:items-center gap-2 w-full sm:w-auto shrink-0">
                <Button
                  onClick={() => {
                    toast.success(isEn ? `Downloading PDF Invoice for ${data.activeOrder.orderNumber}` : `ઓર્ડર ${data.activeOrder.orderNumber} નું ઇન્વોઇસ ડાઉનલોડ થયું!`)
                  }}
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto h-9 text-xs font-bold border-border hover:bg-muted/60 cursor-pointer gap-1.5 justify-center rounded-xl"
                >
                  <FileText className="h-3.5 w-3.5" />
                  <span>{isEn ? "Download Invoice" : "ઇન્વોઇસ ડાઉનલોડ"}</span>
                </Button>

                <Button
                  onClick={() => {
                    toast.info(isEn ? "BlueDart Tracking: Dispatched with BlueDart (Tracking ID: BD89421)" : "લાઈવ ટ્રેકિંગ: બ્લુડાર્ટ કુરિયર દ્વારા રવાના (ટ્રેકિંગ: BD89421)")
                  }}
                  size="sm"
                  className="w-full sm:w-auto h-9 bg-[#fdc72d] hover:bg-[#eab318] text-[#0e3934] text-xs font-bold cursor-pointer gap-1.5 shadow-2xs justify-center rounded-xl"
                >
                  <Truck className="h-3.5 w-3.5" />
                  <span>{isEn ? "Live Tracking (BD89421)" : "લાઈવ ટ્રેકિંગ (BD89421)"}</span>
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ALL ORDERS LIST TABLE / CARDS */}
        <div className="bg-card dark:bg-[#0d3631] rounded-2xl p-3.5 sm:p-6 border border-border/70 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-foreground">
              {isEn ? "Order History & Invoices" : "ઓર્ડર ઇતિહાસ & જૂના ઓર્ડર્સ"}
            </h2>
            <span className="text-xs text-muted-foreground font-medium">
              {isEn ? `${filteredOrders.length} Orders` : `${toDigits(filteredOrders.length)} ઓર્ડર્સ`}
            </span>
          </div>

          {counts.all === 0 ? (
            <div className="py-12 px-4 text-center flex flex-col items-center justify-center space-y-3 bg-muted/20 rounded-xl border border-dashed border-border/60">
              <div className="w-14 h-14 rounded-full bg-muted/60 dark:bg-[#0f3c36] flex items-center justify-center text-muted-foreground">
                <Package className="h-7 w-7 text-muted-foreground/60" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-foreground">
                  {isEn ? "No order found" : "કોઈ ઓર્ડર મળ્યો નથી"}
                </h3>
                <p className="text-xs text-muted-foreground max-w-sm">
                  {isEn
                    ? "You haven't placed any orders yet. Discover our sacred energized Rudrakshas, gemstones, and puja items."
                    : "તમે હજુ સુધી કોઈ ઓર્ડર આપ્યો નથી. અમારા વૈદિક રુદ્રાક્ષ, રત્નો અને પવિત્ર પૂજા સામગ્રી જુઓ."}
                </p>
              </div>
              <Button
                onClick={() => router.push("/myshop")}
                className="mt-2 h-9 px-5 bg-[#fdc72d] hover:bg-[#eab318] text-[#0e3934] font-bold text-xs rounded-xl shadow-2xs gap-1.5 cursor-pointer"
              >
                <ShoppingBag className="h-3.5 w-3.5" />
                <span>{isEn ? "Explore Vedic Shop" : "વૈદિક શોપ જુઓ"}</span>
              </Button>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="py-10 text-center text-xs text-muted-foreground">
              {isEn ? "No orders found in this filter." : "આ ફિલ્ટરમાં કોઈ ઓર્ડર મળ્યા નથી."}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredOrders.map((ord) => {
                const hasCourier = ord.courier && ord.courier !== "—" && ord.courier !== "-"
                return (
                  <div
                    key={ord.id}
                    className="p-3.5 sm:p-4 bg-muted/30 dark:bg-[#20211d] rounded-xl border border-border/50 hover:border-[#fdc72d]/50 transition-all space-y-2.5"
                  >
                    {/* Top Row: Order ID + Status Badge */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <Package className="h-3.5 w-3.5 text-[#8a6800] dark:text-[#fdc72d] shrink-0" />
                        <span className="font-mono font-bold text-xs text-foreground truncate">
                          #{ord.id}
                        </span>
                      </div>
                      <Badge
                        className={`text-[10px] font-bold shrink-0 px-2 py-0.5 rounded-full ${
                          ord.status === "in-transit"
                            ? "bg-[#fdc72d] text-[#0e3934]"
                            : "bg-[#00685d] text-white"
                        }`}
                      >
                        {ord.statusText[lang] || ord.statusText.gu}
                      </Badge>
                    </div>

                    {/* Middle: Product Name & Meta Info */}
                    <div className="space-y-1">
                      <h3 className="font-bold text-sm text-foreground line-clamp-2 leading-snug">
                        {ord.product[lang] || ord.product.gu}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 shrink-0" />
                          <span className="whitespace-nowrap">{ord.date[lang] || ord.date.gu}</span>
                        </div>
                        {hasCourier && (
                          <>
                            <span>•</span>
                            <div className="flex items-center gap-1 text-[#8a6800] dark:text-[#fdc72d] font-semibold">
                              <Truck className="h-3 w-3 shrink-0" />
                              <span className="whitespace-nowrap">{ord.courier}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Bottom Row: Price + Action Buttons */}
                    <div className="flex items-center justify-between gap-3 pt-2.5 border-t border-border/40">
                      <div>
                        <div className="text-base sm:text-lg font-black text-foreground">
                          {isEn ? ord.priceEn : ord.price}
                        </div>
                        <span className="text-[10px] text-muted-foreground block">
                          {isEn ? "Total Amount (Paid)" : "કુલ કિંમત (પેઇડ)"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <Button
                          onClick={() => {
                            toast.success(
                              isEn
                                ? `Invoice downloaded for #${ord.id}`
                                : `ઓર્ડર #${ord.id} નું ઇન્વોઇસ ડાઉનલોડ થયું!`
                            )
                          }}
                          variant="outline"
                          size="sm"
                          className="h-8 px-2.5 text-xs font-bold border-border hover:bg-muted/60 cursor-pointer gap-1.5 rounded-lg"
                        >
                          <FileText className="h-3.5 w-3.5" />
                          <span>{isEn ? "Invoice" : "ઇન્વોઇસ"}</span>
                        </Button>

                        <Button
                          onClick={() => router.push("/myshop")}
                          size="sm"
                          className="h-8 px-3 text-xs font-bold bg-[#fdc72d]/15 hover:bg-[#fdc72d]/25 text-[#8a6800] dark:text-[#fdc72d] border border-[#fdc72d]/30 cursor-pointer rounded-lg"
                        >
                          {isEn ? "Re-Order" : "ફરી મંગાવો"}
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  )
}

export default withDashboardData(OrdersClient)
