/**
 * The Astro Code - User Dashboard Data Model
 * Comprehensive Bilingual Data (Gujarati 'gu' & English 'en')
 */

export const DASHBOARD_DATA = {
  breadcrumb: {
    home: { gu: "હોમ", en: "Home" },
    account: { gu: "મારું એકાઉન્ટ", en: "My Account" },
    dashboard: { gu: "ડેશબોર્ડ (User Dashboard)", en: "Vedic Dashboard" },
    kundli: { gu: "કુંડળી વોલ્ટ (Kundli Vault)", en: "Kundli Vault" },
    orders: { gu: "મારા ઓર્ડર્સ (My Orders)", en: "My Orders & Tracking" },
    consultations: { gu: "જ્યોતિષ પરામર્શ (Consultations)", en: "Consultation Vault" },
    wishlist: { gu: "મારી વિશલિસ્ટ (Wishlist)", en: "My Wishlist" },
    addresses: { gu: "મારા સરનામાં (Addresses)", en: "Saved Addresses" },
    settings: { gu: "પ્રોફાઇલ & સેટિંગ્સ (Settings)", en: "Profile & Settings" }
  },

  topPanchangBar: {
    nakshatra: {
      gu: "આજનું નક્ષત્ર: રોહિણી",
      en: "Today's Nakshatra: Rohini"
    },
    rahuKaal: {
      gu: "રાહુકાળ: ૧૬:૩૦ - ૧૮:૦૦",
      en: "Rahu Kaal: 4:30 PM - 6:00 PM"
    },
    choghadiya: {
      gu: "શુભ ચોઘડિયું: અમૃત",
      en: "Shubh Choghadiya: Amrit"
    }
  },

  userProfile: {
    name: { gu: "સાધક", en: "Devotee" },
    initials: { gu: "સા", en: "D" },
    email: "",
    phone: { gu: "—", en: "—" },
    membershipBadge: {
      gu: "વૈદિક સભ્ય",
      en: "Vedic Member"
    },
    subtitle: {
      gu: "॥ ૐ શ્રી ગણેશાય નમઃ ॥ • તમારું વ્યક્તિગત આધ્યાત્મિક કેન્દ્ર",
      en: "॥ Om Shree Ganeshay Namah ॥ • Your Personal Vedic Sanctuary"
    },
    birthDetails: {
      city: { gu: "—", en: "—" },
      dateTime: {
        gu: "—",
        en: "—"
      },
      rashi: { gu: "—", en: "—" },
      lagna: { gu: "—", en: "—" },
      nakshatra: { gu: "—", en: "—" }
    }
  },

  headerActions: {
    addKundli: { gu: "નવી કુંડળી ઉમેરો", en: "Add New Kundli" },
    joinRoom: { gu: "પરામર્શ રૂમમાં જોડાઓ", en: "Join Consultation Room" }
  },

  metrics: [
    {
      id: "kundlis",
      title: { gu: "મારી કુંડળીઓ", en: "My Kundlis" },
      value: { gu: "૦ કુંડળી", en: "0 Charts" },
      subtitle: { gu: "વોલ્ટ ખાલી છે", en: "Vault is empty" },
      icon: "history_edu",
      accent: "primary",
      href: "/dashboard/kundli",
      cta: { gu: "વોલ્ટ જુઓ →", en: "View Vault →" }
    },
    {
      id: "orders",
      title: { gu: "MyShop ઓર્ડર્સ", en: "Active Orders" },
      value: { gu: "૦ સક્રિય", en: "0 Active" },
      subtitle: { gu: "કોઈ સક્રિય ઓર્ડર નથી", en: "No active orders" },
      badge: { gu: "ટ્રેક કરો", en: "Track" },
      icon: "local_shipping",
      accent: "secondary",
      href: "/dashboard/orders",
      cta: { gu: "ઓર્ડર જુઓ →", en: "View Orders →" }
    },
    {
      id: "consultation",
      title: { gu: "આગામી પરામર્શ", en: "Next Consultation" },
      value: { gu: "કોઈ નહીં", en: "None booked" },
      subtitle: { gu: "પરામર્શ બુક કરો", en: "Book consultation" },
      icon: "calendar_month",
      accent: "tertiary",
      href: "/dashboard/consultations",
      cta: { gu: "બુકિંગ →", en: "Book →" }
    },
    {
      id: "transit",
      title: { gu: "દૈનિક ગોચર સ્કોર", en: "Cosmic Score" },
      value: { gu: "૮૮% અનુકૂળ", en: "88% Auspicious" },
      subtitle: { gu: "ચંદ્ર ૯મા ભાવમાં", en: "Moon in 9th House" },
      icon: "auto_awesome",
      accent: "amber",
      href: "/dainik-panchang",
      cta: { gu: "પંચાંગ →", en: "Panchang →" }
    }
  ],

  navItems: [
    {
      id: "overview",
      label: { gu: "ઓવરવ્યૂ & ડેશબોર્ડ (Overview)", en: "Dashboard Overview" },
      href: "/dashboard",
      icon: "dashboard"
    },
    {
      id: "kundli-vault",
      label: { gu: "મારી કુંડળીઓ (My Kundli Vault)", en: "My Kundli Vault" },
      badge: "૦",
      href: "/dashboard/kundli",
      icon: "menu_book"
    },
    {
      id: "orders",
      label: { gu: "મારા ઓર્ડર્સ & ટ્રેકિંગ (Orders)", en: "My Orders & Tracking" },
      badge: { gu: "૦ સક્રિય", en: "0 Active" },
      href: "/dashboard/orders",
      icon: "shopping_bag"
    },
    {
      id: "consultations",
      label: { gu: "જ્યોતિષ પરામર્શ (Consultations)", en: "Consultations Vault" },
      href: "/dashboard/consultations",
      icon: "video_chat",
      alert: false
    },
    {
      id: "settings",
      label: { gu: "પ્રોફાઇલ & સેટિંગ્સ (Settings)", en: "Profile & Settings" },
      href: "/dashboard/settings",
      icon: "manage_accounts"
    }
  ],

  helpline: {
    title: { gu: "જ્યોતિષીય સહાયતા હેલ્પલાઇન", en: "Astrology Support Helpline" },
    desc: {
      gu: "કોઈપણ પ્રશ્ન કે કુંડળી સંબંધી મૂંઝવણ માટે સંપર્ક કરો:",
      en: "Contact us for any query regarding your horoscope or orders:"
    },
    phone: "+૯૧ ૭૯ ૪૦૦૦ ૮૧૦૮",
    phoneEn: "+91 79 4000 8108",
    whatsappText: {
      gu: "WhatsApp પર સંપર્ક કરો",
      en: "Direct WhatsApp Chat"
    }
  },

  japaCounter: {
    title: { gu: "દૈનિક જાપ કાઉન્ટર", en: "Daily Japa Counter" },
    mantra: { gu: "ગાયત્રી મંત્ર (Gayatri Mantra)", en: "Gayatri Mantra" },
    initialCount: 54,
    totalTarget: 108,
    desc: {
      gu: "આજનો સંકલ્પ પૂર્ણ કરવા ૫૪ જાપ બાકી છે.",
      en: "54 beads remaining to complete today's resolution."
    },
    btnLabel: {
      gu: "જાપ મણકો ફેરવો (+૧)",
      en: "Rotate Mala Bead (+1)"
    },
    resetLabel: {
      gu: "રીસેટ",
      en: "Reset"
    }
  },

  dailyTransit: {
    badge: { gu: "આજનું ગોચર સ્નેપશોટ", en: "Daily Transit Snapshot" },
    date: { gu: "આજનું પંચાંગ", en: "Today's Transit" },
    heading: {
      gu: "દૈનિક ગોચર અનુકૂળતા દર્પણ",
      en: "Daily Planetary Transit Snapshot"
    },
    shortSummary: {
      gu: "આજના શુભ ચોઘડિયા અને ગોચર ફળ સાથે તમારા કાર્યોનું આયોજન કરો.",
      en: "Plan your spiritual and day-to-day activities according to today's auspicious planetary transits."
    },
    attributes: [
      {
        icon: "palette",
        label: { gu: "શુભ રંગ", en: "Lucky Color" },
        value: { gu: "પીળો & સફેદ", en: "Yellow & White" }
      },
      {
        icon: "pin",
        label: { gu: "શુભ અંક", en: "Lucky Number" },
        value: { gu: "૬ અને ૩", en: "6 and 3" }
      },
      {
        icon: "explore",
        label: { gu: "શુભ દિશા", en: "Direction" },
        value: { gu: "ઇશાન", en: "North-East" }
      }
    ]
  },

  savedKundlis: {
    title: { gu: "મારી કુંડળીઓ (Saved Kundli Vault)", en: "Saved Kundli Vault" },
    subtitle: {
      gu: "તમારા પરિવારની સંગ્રહિત જન્મપત્રિકાઓ",
      en: "Stored birth horoscopes for your family members"
    },
    list: []
  },

  activeOrder: {
    isPlaceholder: true,
    title: { gu: "સક્રિય ઓર્ડર ટ્રેકિંગ", en: "Active Order Tracking" },
    orderNumber: "—",
    date: { gu: "—", en: "—" },
    statusBadge: { gu: "કોઈ સક્રિય ઓર્ડર નથી", en: "No active order" },
    productName: {
      gu: "વૈદિક શોપમાંથી ખરીદી કરો",
      en: "Browse the Vedic store"
    },
    imageUrl: "/the_astro_code_golden_yantra_logo.png",
    price: "—",
    priceEn: "—",
    courier: "—",
    currentStage: {
      gu: "—",
      en: "—"
    },
    steps: [],
    shippingAddress: {
      gu: "—",
      en: "—"
    }
  },

  ordersHistory: [],

  upcomingConsultation: {
    isPlaceholder: true,
    badge: { gu: "વિડિયો પરામર્શ", en: "Video Session" },
    countdown: { gu: "કોઈ બુકિંગ નથી", en: "None booked" },
    astrologer: { gu: "કોઈ પરામર્શ નથી", en: "No session booked" },
    title: {
      gu: "વિશેષ જ્યોતિષ પરામર્શ બુક કરો",
      en: "Book an Astrological Consultation"
    },
    dateValue: { gu: "—", en: "—" },
    timeValue: { gu: "—", en: "—" },
    platformValue: "Google Meet HD Link",
    meetUrl: "/consultations"
  },

  consultationsHistory: [],

  trustSecurity: {
    title: { gu: "૧૦૦% સુરક્ષિત વૈદિક ડેટા એન્ક્રિપ્શન", en: "100% Secure Vedic Data Encryption" },
    desc: {
      gu: "તમારી જન્મકુંડળી વિગતો ૨૫૬-બીટ SSL દ્વારા સુરક્ષિત છે.",
      en: "Your birth chart data is protected with 256-bit SSL encryption."
    },
    isoBadge: { gu: "ISO પ્રમાણિત", en: "ISO Certified" },
    purityBadge: { gu: "વૈદિક શુદ્ધતા", en: "Vedic Purity" }
  }
}
