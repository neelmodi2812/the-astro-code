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
    name: { gu: "રોહિતભાઈ પારેખ", en: "Rohitbhai Parekh" },
    initials: { gu: "રો", en: "RP" },
    email: "rohit.parekh@example.com",
    phone: { gu: "+૯૧ ૯૮૭૬૫ ૪૩૨૧૦", en: "+91 98765 43210" },
    membershipBadge: {
      gu: "સુવર્ણ સાધક સભ્ય (Gold Vedic Member)",
      en: "Gold Vedic Member"
    },
    subtitle: {
      gu: "॥ ૐ શ્રી ગણેશાય નમઃ ॥ • તમારું વ્યક્તિગત આધ્યાત્મિક કેન્દ્ર",
      en: "॥ Om Shree Ganeshay Namah ॥ • Your Personal Vedic Sanctuary"
    },
    birthDetails: {
      city: { gu: "અમદાવાદ, ગુજરાત", en: "Ahmedabad, Gujarat" },
      dateTime: {
        gu: "૧૪ ઓક્ટોબર ૧૯૮૮ • સવારે ૦૬:૪૫ વાગ્યે",
        en: "14 October 1988 • 06:45 AM"
      },
      rashi: { gu: "તુલા (Libra)", en: "Libra (Tula)" },
      lagna: { gu: "કન્યા (Virgo)", en: "Virgo (Kanya)" },
      nakshatra: { gu: "સ્વાતિ (ચરણ ૩)", en: "Swati (Pada 3)" }
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
      value: { gu: "૩ કુંડળીઓ", en: "3 Charts" },
      subtitle: { gu: "રોહિત, નીતા, આરવ", en: "Rohit, Nita, Aarav" },
      icon: "history_edu",
      accent: "primary",
      href: "/dashboard/kundli",
      cta: { gu: "વોલ્ટ જુઓ →", en: "View Vault →" }
    },
    {
      id: "orders",
      title: { gu: "MyShop ઓર્ડર્સ", en: "Active Orders" },
      value: { gu: "૧ ઓર્ડર રવાના", en: "1 In-Transit" },
      subtitle: { gu: "૫-મુખી રુદ્રાક્ષ માળા", en: "5-Mukhi Rudraksha" },
      badge: { gu: "ટ્રેક કરો", en: "Track" },
      icon: "local_shipping",
      accent: "secondary",
      href: "/dashboard/orders",
      cta: { gu: "ઓર્ડર જુઓ →", en: "View Orders →" }
    },
    {
      id: "consultation",
      title: { gu: "આગામી પરામર્શ", en: "Next Consultation" },
      value: { gu: "આવતીકાલે, ૫:૩૦", en: "Tomorrow, 5:30 PM" },
      subtitle: { gu: "ડૉ. વિશાલ મોદી", en: "Dr. Vishal Modi" },
      icon: "calendar_month",
      accent: "tertiary",
      href: "/dashboard/consultations",
      cta: { gu: "મીટિંગ લિંક →", en: "Join Link →" }
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
      badge: "૩",
      href: "/dashboard/kundli",
      icon: "menu_book"
    },
    {
      id: "orders",
      label: { gu: "મારા ઓર્ડર્સ & ટ્રેકિંગ (Orders)", en: "My Orders & Tracking" },
      badge: { gu: "૧ સક્રિય", en: "1 Active" },
      href: "/dashboard/orders",
      icon: "shopping_bag"
    },
    {
      id: "consultations",
      label: { gu: "જ્યોતિષ પરામર્શ (Consultations)", en: "Consultations Vault" },
      href: "/dashboard/consultations",
      icon: "video_chat",
      alert: true
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
    date: { gu: "સોમવાર, ૨૧ એપ્રિલ ૨૦૨૫", en: "Monday, 21 April 2025" },
    heading: {
      gu: "તુલા રાશિ - ચંદ્રદેવનું ૯મા ભાવમાં ભ્રમણ: ઉચ્ચ લાભ યોગ",
      en: "Libra (Tula) - Moon in 9th House: High Fortune & Gains"
    },
    shortSummary: {
      gu: "આજે તમારા ભાગ્ય ભાવમાં ચંદ્રનું ભ્રમણ આર્થિક નિર્ણયો માટે અનુકૂળ છે. બપોરે ૧૨:૧૫ થી ૦૧:૪૫ નો સમય સર્વોત્તમ લાભ ચોઘડિયું છે.",
      en: "Moon's transit through your 9th house is auspicious for financial choices. Peak window: 12:15 PM - 1:45 PM (Labh Choghadiya)."
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
    list: [
      {
        id: "rohit",
        relation: { gu: "સ્વયં (Self)", en: "Self" },
        name: { gu: "રોહિતભાઈ પારેખ", en: "Rohitbhai Parekh" },
        dob: { gu: "૧૪/૧૦/૧૯૮૮ • ૦૬:૪૫ AM", en: "14/10/1988 • 06:45 AM" },
        city: { gu: "અમદાવાદ", en: "Ahmedabad" },
        initial: { gu: "તુ", en: "Tu" },
        rashiLagna: { gu: "તુલા / કન્યા", en: "Libra / Virgo" },
        nakshatra: { gu: "સ્વાતિ (ચરણ ૩)", en: "Swati (Pada 3)" },
        dasha: { gu: "ગુરુ-શનિ (વિંશોત્તરી)", en: "Jupiter-Saturn" },
        isSelf: true
      },
      {
        id: "nita",
        relation: { gu: "પત્ની (Spouse)", en: "Spouse" },
        name: { gu: "નીતાબેન પારેખ", en: "Nitaben Parekh" },
        dob: { gu: "૨૨/૦૩/૧૯૯૧ • ૧૧:૨૦ AM", en: "22/03/1991 • 11:20 AM" },
        city: { gu: "રાજકોટ", en: "Rajkot" },
        initial: { gu: "વૃ", en: "Vru" },
        rashiLagna: { gu: "વૃષભ / મિથુન", en: "Taurus / Gemini" },
        nakshatra: { gu: "રોહિણી (ચરણ ૧)", en: "Rohini (Pada 1)" },
        dasha: { gu: "બુધ-શુક્ર (વિંશોત્તરી)", en: "Mercury-Venus" },
        isSelf: false
      },
      {
        id: "aarav",
        relation: { gu: "પુત્ર (Child)", en: "Child" },
        name: { gu: "આરવ પારેખ", en: "Aarav Parekh" },
        dob: { gu: "૦૭/૦૮/૨૦૧૮ • ૦૪:૧૫ PM", en: "07/08/2018 • 04:15 PM" },
        city: { gu: "અમદાવાદ", en: "Ahmedabad" },
        initial: { gu: "ધ", en: "Dha" },
        rashiLagna: { gu: "ધન / વૃશ્ચિક", en: "Sagittarius / Scorpio" },
        nakshatra: { gu: "મૂળ (ચરણ ૨)", en: "Mula (Pada 2)" },
        dasha: { gu: "કેતુ-ચંદ્ર (વિંશોત્તરી)", en: "Ketu-Moon" },
        isSelf: false
      }
    ]
  },

  activeOrder: {
    title: { gu: "સક્રિય ઓર્ડર ટ્રેકિંગ", en: "Active Order Tracking" },
    orderNumber: "#TAC-89241",
    date: { gu: "૧૮ એપ્રિલ ૨૦૨૫", en: "18 April 2025" },
    statusBadge: { gu: "રવાના થયેલ (In-Transit)", en: "In-Transit" },
    productName: {
      gu: "સિદ્ધ નેપાળી ૫-મુખી રુદ્રાક્ષ માળા (૧૦૮ દાણા)",
      en: "Siddh Nepali 5-Mukhi Rudraksha Mala (108 Beads)"
    },
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCm3Ey83ekmCJR_8Z4c9l8I4wekhBDfkHv2ulhGO7XHPb22K4nFzZ-Wm0jXotT4IfFZOOHRhwXSp2DGgQxOPDq9JYecJGMou3YTQZVnoFhRY1NACWMQ7CpSavlfW9hWsRqzu-ZjQu7-EjNvW27Q-fA7wBCTneL4HugA3RpQZq527Y_IE091xC7lawItI3Tw-bfxRmN-h4Cx_ttGTLHCIBp1WmBRZkGLKPA_9sZxB80DKv5Tm-iq4HKk",
    price: "₹૨,૪૫૦",
    priceEn: "₹2,450",
    courier: "BlueDart (BD89421)",
    currentStage: {
      gu: "સ્ટેજ ૩: કુરિયરમાં રવાના (અંદાજિત ડિલિવરી: ૨૨ એપ્રિલ)",
      en: "Stage 3: Dispatched via BlueDart (Est. Delivery: 22 April)"
    },
    steps: [
      { num: 1, title: { gu: "ઓર્ડર સ્વીકાર્યો", en: "Placed" }, date: "18 Apr", status: "completed" },
      { num: 2, title: { gu: "પ્રાણ પ્રતિષ્ઠા", en: "Consecrated" }, date: "19 Apr", status: "completed" },
      { num: 3, title: { gu: "રવાના થયેલ", en: "In Transit" }, courier: "BlueDart", status: "active" },
      { num: 4, title: { gu: "ડિલિવરી", en: "Delivered" }, date: "22 Apr", status: "pending" }
    ],
    shippingAddress: {
      gu: "બોડકદેવ, અમદાવાદ, ગુજરાત - ૩૮૦૦૫૪",
      en: "Bodakdev, Ahmedabad, Gujarat - 380054"
    }
  },

  ordersHistory: [
    {
      id: "TAC-89241",
      date: { gu: "૧૮ એપ્રિલ ૨૦૨૫", en: "18 April 2025" },
      product: {
        gu: "સિદ્ધ નેપાળી ૫-મુખી રુદ્રાક્ષ માળા (૧૦૮ દાણા) + સર્ટિફિકેટ",
        en: "Siddh Nepali 5-Mukhi Rudraksha Mala (108 Beads) + Consecration Certificate"
      },
      price: "₹૨,૪૫૦",
      priceEn: "₹2,450",
      status: "in-transit",
      statusText: { gu: "રવાના થયેલ (In-Transit)", en: "In-Transit" },
      courier: "BlueDart: BD89421"
    },
    {
      id: "TAC-78190",
      date: { gu: "૨૮ માર્ચ ૨૦૨૫", en: "28 March 2025" },
      product: {
        gu: "પંચધાતુ શ્રી યંત્ર (૩ ઇંચ ગોલ્ડ પ્લેટેડ)",
        en: "Panchdhatu Shri Yantra (3-inch Gold Plated)"
      },
      price: "₹૧,૨૯૯",
      priceEn: "₹1,299",
      status: "delivered",
      statusText: { gu: "સફળ ડિલિવર થયેલ", en: "Delivered" },
      courier: "DTDC: DT77102"
    },
    {
      id: "TAC-65412",
      date: { gu: "૧૪ ફેબ્રુઆરી ૨૦૨૫", en: "14 February 2025" },
      product: {
        gu: "પ્રમાણિત કુદરતી સ્ફટિક માળા (૧૦૮ દાણા)",
        en: "Certified Natural Sphatik Mala (108 Beads)"
      },
      price: "₹૧,૮૫૦",
      priceEn: "₹1,850",
      status: "delivered",
      statusText: { gu: "સફળ ડિલિવર થયેલ", en: "Delivered" },
      courier: "BlueDart: BD43291"
    }
  ],

  upcomingConsultation: {
    badge: { gu: "લાઇવ વિડિયો પરામર્શ", en: "Live Video Session" },
    countdown: { gu: "૨૨ કલાક બાકી", en: "22 Hours Left" },
    astrologer: { gu: "ડૉ. વિશાલ મોદી", en: "Dr. Vishal Modi" },
    title: {
      gu: "કારકિર્દી & વ્યાપાર યોગ પરામર્શ",
      en: "Career & Business Yoga Consultation"
    },
    dateValue: { gu: "૨૧ એપ્રિલ ૨૦૨૫, સોમવાર", en: "21 April 2025, Monday" },
    timeValue: { gu: "સાંજે ૦૫:૩૦ (૪૫ મિનિટ)", en: "05:30 PM (45 Minutes)" },
    platformValue: "Google Meet HD Link",
    meetUrl: "https://meet.google.com/demo-astro-code"
  },

  consultationsHistory: [
    {
      id: "c-101",
      date: { gu: "૨૧ એપ્રિલ ૨૦૨૫, ૫:૩૦ PM", en: "21 April 2025, 5:30 PM" },
      astrologer: { gu: "ડૉ. વિશાલ મોદી", en: "Dr. Vishal Modi" },
      topic: { gu: "કારકિર્દી & વ્યાપાર યોગ પરામર્શ", en: "Career & Business Yoga Consultation" },
      status: "upcoming",
      statusText: { gu: "આગામી (Upcoming)", en: "Upcoming" }
    },
    {
      id: "c-092",
      date: { gu: "૧૦ જાન્યુઆરી ૨૦૨૫", en: "10 January 2025" },
      astrologer: { gu: "ડૉ. વિશાલ મોદી", en: "Dr. Vishal Modi" },
      topic: { gu: "શનિ સાડાસાતી પ્રભાવ & શાસ્ત્રોક્ત ઉપાય", en: "Shani Sade Sati Impact & Vedic Remedies" },
      status: "completed",
      statusText: { gu: "સંપન્ન થયેલ (Completed)", en: "Completed" },
      prescriptionNote: {
        gu: "દર શનિવારે પીપળાના વૃક્ષ નીચે સરસવના તેલનો દીવો કરવો અને હનુમાન ચાલીસાના ૭ પાઠ કરવા.",
        en: "Light a mustard oil lamp under Peepal tree on Saturdays and recite Hanuman Chalisa 7 times."
      }
    },
    {
      id: "c-081",
      date: { gu: "૧૫ નવેમ્બર ૨૦૨૪", en: "15 November 2024" },
      astrologer: { gu: "પંડિત રમેશ શાસ્ત્રી", en: "Pandit Ramesh Shastri" },
      topic: { gu: "ગૃહ વાસ્તુ & શાંતિ પૂજા સંકલ્પ", en: "Home Vastu & Shanti Puja Resolution" },
      status: "completed",
      statusText: { gu: "સંપન્ન થયેલ (Completed)", en: "Completed" },
      prescriptionNote: {
        gu: "ઈશાન ખૂણામાં જળ તત્વની સ્થાપના અને ગંગાજળ છંટકાવ કરવો.",
        en: "Establish water element in North-East direction and sprinkle holy Ganga water."
      }
    }
  ],

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
