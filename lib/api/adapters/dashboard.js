import { DASHBOARD_DATA, getDynamicCosmicTransit } from "@/lib/data/dashboard-data"
import { toLocalDigits } from "./shop"

const both = (value) => ({ gu: value, en: value })

const RELATION_LABELS = {
  self: { gu: "સ્વયં (Self)", en: "Self" },
  spouse: { gu: "જીવનસાથી (Spouse)", en: "Spouse" },
  child: { gu: "સંતાન (Child)", en: "Child" },
  parent: { gu: "માતા-પિતા (Parent)", en: "Parent" },
  sibling: { gu: "ભાઈ-બહેન (Sibling)", en: "Sibling" },
  other: { gu: "અન્ય (Other)", en: "Other" },
}

const ORDER_STATUS_TEXT = {
  placed: { gu: "ઓર્ડર સ્વીકાર્યો", en: "Order Placed" },
  confirmed: { gu: "પ્રાણ પ્રતિષ્ઠા ચાલુ", en: "Being Consecrated" },
  processing: { gu: "પ્રાણ પ્રતિષ્ઠા ચાલુ", en: "Being Consecrated" },
  shipped: { gu: "રવાના થયેલ (In-Transit)", en: "In-Transit" },
  delivered: { gu: "સફળ ડિલિવર થયેલ", en: "Delivered" },
  cancelled: { gu: "રદ થયેલ", en: "Cancelled" },
}

const ORDER_STAGE = { placed: 1, confirmed: 2, processing: 2, shipped: 3, delivered: 4 }

const CONSULTATION_TOPICS = {
  kundali: { gu: "કુંડળી વિશ્લેષણ", en: "Kundali Analysis" },
  career: { gu: "કારકિર્દી & નોકરી માર્ગદર્શન", en: "Career & Job Guidance" },
  marriage: { gu: "લગ્ન & કુંડળી મિલન", en: "Marriage & Matchmaking" },
  health: { gu: "સ્વાસ્થ્ય & ગ્રહદોષ નિવારણ", en: "Health & Planetary Remedies" },
  vastu: { gu: "વાસ્તુ દોષ નિવારણ", en: "Vastu Shastra Consultation" },
  business: { gu: "વેપાર & ધનવૃદ્ધિ માર્ગદર્શન", en: "Business & Financial Growth" },
}

const ASTROLOGER = DASHBOARD_DATA.upcomingConsultation.astrologer
const PLACEHOLDER_IMAGE = "/logo.png"

const formatDate = (iso, lang, withTime = false) => {
  if (!iso) return "—"
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return "—"
  return date.toLocaleString(lang === "gu" ? "gu-IN" : "en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    ...(withTime ? { hour: "numeric", minute: "2-digit" } : {}),
  })
}

const bilingualDate = (iso, withTime = false) => ({
  gu: formatDate(iso, "gu", withTime),
  en: formatDate(iso, "en", withTime),
})

const rupees = (amount) => ({
  gu: `₹${toLocalDigits(Number(amount).toLocaleString("en-IN"), "gu")}`,
  en: `₹${Number(amount).toLocaleString("en-IN")}`,
})

const initialsOf = (name) =>
  (name || "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("") || "?"

const orderUiStatus = (status) => {
  if (status === "delivered") return "delivered"
  if (status === "cancelled") return "cancelled"
  return "in-transit"
}

const courierText = (order) =>
  [order.courier_name, order.tracking_number].filter(Boolean).join(": ") || "—"

function buildUserProfile(user) {
  const birthLine = [user.date_of_birth && formatDate(user.date_of_birth, "en"), user.time_of_birth]
    .filter(Boolean)
    .join(" • ")

  return {
    ...DASHBOARD_DATA.userProfile,
    name: both(user.name),
    initials: both(initialsOf(user.name)),
    email: user.email,
    phone: both(user.phone || "—"),
    city: user.city || "",
    birthDetails: {
      city: both(user.place_of_birth || "—"),
      dateTime: both(birthLine || "—"),
      rashi: both(user.rashi || "—"),
      lagna: both("—"),
      nakshatra: both(user.nakshatra || "—"),
    },
  }
}

function buildKundliList(kundlis) {
  return kundlis.map((k) => ({
    id: String(k.id),
    relation: RELATION_LABELS[k.relation] || RELATION_LABELS.other,
    name: both(k.name),
    dob: both([formatDate(k.birth_date, "en"), k.birth_time].filter(Boolean).join(" • ")),
    city: both(k.birth_place || "—"),
    initial: both(initialsOf(k.name)),
    rashiLagna: both([k.rashi, k.lagna].filter(Boolean).join(" / ") || "—"),
    nakshatra: both(k.nakshatra || "—"),
    dasha: both("—"),
    isSelf: k.relation === "self",
  }))
}

function buildOrders(orders) {
  const history = orders.map((order) => {
    const total = rupees(order.total_amount)
    return {
      id: order.order_number,
      date: bilingualDate(order.created_at),
      product: both((order.items || []).map((i) => i.product_name).join(", ")),
      price: total.gu,
      priceEn: total.en,
      status: orderUiStatus(order.order_status),
      statusText: ORDER_STATUS_TEXT[order.order_status] || both(order.order_status),
      courier: courierText(order),
    }
  })

  const active = orders.find((o) => orderUiStatus(o.order_status) === "in-transit")

  if (!active) {
    return {
      history,
      activeOrder: {
        ...DASHBOARD_DATA.activeOrder,
        isPlaceholder: true,
        orderNumber: "—",
        date: both("—"),
        statusBadge: { gu: "કોઈ સક્રિય ઓર્ડર નથી", en: "No active order" },
        productName: { gu: "વૈદિક શોપમાંથી ખરીદી કરો", en: "Browse the Vedic store" },
        imageUrl: PLACEHOLDER_IMAGE,
        price: "—",
        priceEn: "—",
        courier: "—",
        currentStage: both("—"),
        steps: [],
        shippingAddress: both("—"),
      },
    }
  }

  const stage = ORDER_STAGE[active.order_status] || 1
  const stepTitles = [
    { gu: "ઓર્ડર સ્વીકાર્યો", en: "Placed" },
    { gu: "પ્રાણ પ્રતિષ્ઠા", en: "Consecrated" },
    { gu: "રવાના થયેલ", en: "In Transit" },
    { gu: "ડિલિવરી", en: "Delivered" },
  ]
  const total = rupees(active.total_amount)
  const firstItem = active.items?.[0]

  return {
    history,
    activeOrder: {
      ...DASHBOARD_DATA.activeOrder,
      isPlaceholder: false,
      orderNumber: `#${active.order_number}`,
      date: bilingualDate(active.created_at),
      statusBadge: ORDER_STATUS_TEXT[active.order_status],
      productName: both((active.items || []).map((i) => i.product_name).join(", ")),
      imageUrl: firstItem?.product_image || PLACEHOLDER_IMAGE,
      price: total.gu,
      priceEn: total.en,
      courier: courierText(active),
      currentStage: ORDER_STATUS_TEXT[active.order_status],
      steps: stepTitles.map((title, i) => ({
        num: i + 1,
        title,
        status: i + 1 < stage ? "completed" : i + 1 === stage ? "active" : "pending",
        ...(i === 0 ? { date: formatDate(active.created_at, "en") } : {}),
        ...(i === 2 && active.courier_name ? { courier: active.courier_name } : {}),
      })),
      shippingAddress: both(
        [active.shipping_address, active.city, active.pincode].filter(Boolean).join(", ")
      ),
    },
  }
}

function buildConsultations(consultations) {
  const history = consultations.map((c) => {
    const upcoming = c.status === "pending" || c.status === "contacted"
    const topic = CONSULTATION_TOPICS[c.problem_category] || both(c.problem_category)
    return {
      id: String(c.id),
      date: bilingualDate(c.created_at, true),
      astrologer: ASTROLOGER,
      topic,
      status: upcoming ? "upcoming" : c.status,
      statusText: upcoming
        ? { gu: "આગામી (Upcoming)", en: "Upcoming" }
        : c.status === "cancelled"
          ? { gu: "રદ થયેલ", en: "Cancelled" }
          : { gu: "સંપન્ન થયેલ (Completed)", en: "Completed" },
      ...(c.prescription_note ? { prescriptionNote: both(c.prescription_note) } : {}),
    }
  })

  const next = history.find((c) => c.status === "upcoming")

  return {
    history,
    upcomingConsultation: next
      ? {
          ...DASHBOARD_DATA.upcomingConsultation,
          isPlaceholder: false,
          countdown: { gu: "પુષ્ટિ બાકી", en: "Awaiting confirmation" },
          astrologer: ASTROLOGER,
          title: next.topic,
          dateValue: next.date,
          timeValue: { gu: "અમારી ટીમ ફોન પર સમય નક્કી કરશે", en: "Our team will call to fix a time" },
          platformValue: "Phone / WhatsApp",
          meetUrl: "/contact-us",
        }
      : { ...DASHBOARD_DATA.upcomingConsultation, isPlaceholder: true, meetUrl: "/contact-us" },
  }
}

/**
 * Live account data → the shape of `DASHBOARD_DATA`, so existing dashboard components keep working.
 * Static copy (labels, panchang bar, japa counter, helpline …) is reused; account data is replaced.
 */
export function buildDashboardData({ user, orders, kundlis, consultations }) {
  const dynamicTransit = getDynamicCosmicTransit()
  const kundliList = buildKundliList(kundlis)
  const { history: ordersHistory, activeOrder } = buildOrders(orders)
  const { history: consultationsHistory, upcomingConsultation } = buildConsultations(consultations)
  const activeOrderCount = ordersHistory.filter((o) => o.status === "in-transit").length

  const metric = (id, patch) => ({
    ...DASHBOARD_DATA.metrics.find((m) => m.id === id),
    ...patch,
  })

  const metrics = [
    metric("kundlis", {
      value: {
        gu: `${toLocalDigits(kundliList.length, "gu")} કુંડળીઓ`,
        en: `${kundliList.length} Chart${kundliList.length === 1 ? "" : "s"}`,
      },
      subtitle: both(kundliList.slice(0, 3).map((k) => k.name.en).join(", ") || "—"),
    }),
    metric("orders", {
      value: {
        gu: `${toLocalDigits(activeOrderCount, "gu")} ઓર્ડર સક્રિય`,
        en: `${activeOrderCount} Active`,
      },
      subtitle: activeOrder.isPlaceholder ? both("—") : activeOrder.productName,
    }),
    metric("consultation", {
      value: upcomingConsultation.isPlaceholder
        ? { gu: "કોઈ નહીં", en: "None booked" }
        : upcomingConsultation.dateValue,
      subtitle: upcomingConsultation.isPlaceholder ? both("—") : upcomingConsultation.astrologer,
    }),
    metric("transit", {
      value: dynamicTransit.score,
      subtitle: dynamicTransit.scoreSubtitle,
    }),
  ]

  const navItems = DASHBOARD_DATA.navItems.map((item) => {
    if (item.id === "kundli-vault") {
      return {
        ...item,
        badge: kundliList.length > 0 ? toLocalDigits(kundliList.length, "gu") : null,
      }
    }
    if (item.id === "orders") {
      return {
        ...item,
        badge: activeOrderCount > 0
          ? { gu: `${toLocalDigits(activeOrderCount, "gu")} સક્રિય`, en: `${activeOrderCount} Active` }
          : null,
      }
    }
    if (item.id === "consultations") {
      return {
        ...item,
        alert: !upcomingConsultation.isPlaceholder,
      }
    }
    return item
  })

  return {
    ...DASHBOARD_DATA,
    userProfile: buildUserProfile(user),
    metrics,
    navItems,
    savedKundlis: { ...DASHBOARD_DATA.savedKundlis, list: kundliList },
    activeOrder,
    ordersHistory,
    upcomingConsultation,
    consultationsHistory,
  }
}
