/**
 * The Astro Code - User Dashboard Data Model
 * Comprehensive Bilingual Data (Gujarati 'gu' & English 'en')
 */

/**
 * Calculate dynamic cosmic transit score and attributes based on the current day of the week
 */
export function getDynamicCosmicTransit() {
  const now = new Date();
  const dayIdx = now.getDay(); // 0 = Sunday, 1 = Monday ... 6 = Saturday

  const WEEKDAY_TRANSITS = [
    {
      score: { gu: "૮૯% અનુકૂળ", en: "89% Auspicious" },
      scoreSubtitle: { gu: "સૂર્યદેવ પ્રભાવ • તેજસ્વી યોગ", en: "Sun Alignment • Solar Energy" },
      heading: {
        gu: "સૂર્યનારાયણ પ્રભાવ - આત્મવિશ્વાસ અને શુભ કાર્યો માટે ઉત્તમ સંક્રમણ",
        en: "Solar Alignment - High vitality and favorable for major endeavors",
      },
      summary: {
        gu: "આજે સૂર્યદેવના તેજસ્વી પ્રભાવથી માન-સન્માન, આત્મબળ અને સંકલ્પ શક્તિમાં વધારો થાય છે. સૂર્યોદય સમયના કાર્ય શુભ પરિણામ આપશે.",
        en: "Solar vitality brings clarity, leadership, and strength today. Ideal for spiritual focus and launching auspicious tasks.",
      },
      color: { gu: "કેસરી & લાલ", en: "Saffron & Red" },
      number: { gu: "૧ અને ૯", en: "1 and 9" },
      direction: { gu: "પૂર્વ", en: "East" },
    },
    {
      score: { gu: "૯૧% શાંતિદાયક", en: "91% Serene" },
      scoreSubtitle: { gu: "ચંદ્ર કૃપા • માનસિક શાંતિ", en: "Moon Transit • Mental Clarity" },
      heading: {
        gu: "ચંદ્રદેવ ભ્રમણ - માનસિક શાંતિ, પરિવાર સુખ અને આધ્યાત્મિક સાધના",
        en: "Lunar Harmony - Calming planetary transit for peace and family",
      },
      summary: {
        gu: "આજે ચંદ્રદેવના શુભ પ્રભાવથી માનસિક એકાગ્રતા અને શાંતિ રહેશે. શિવ પૂજન અને ગંગાજળ અભિષેક સર્વશ્રેષ્ઠ રહેશે.",
        en: "A calming lunar window favorable for meditation, family harmony, and peaceful decisions.",
      },
      color: { gu: "શ્વેત & ચાંદી", en: "White & Silver" },
      number: { gu: "૨ અને ૭", en: "2 and 7" },
      direction: { gu: "વાયવ્ય", en: "North-West" },
    },
    {
      score: { gu: "૮૭% ઊર્જાવાન", en: "87% Dynamic" },
      scoreSubtitle: { gu: "મંગળ પ્રભાવ • સંકલ્પ સિદ્ધિ", en: "Mars Transit • Courage & Strength" },
      heading: {
        gu: "મંગળદેવ સંક્રમણ - સાહસ, કાર્ય સિદ્ધિ અને રક્ષણ યોગ",
        en: "Mars Transit - Auspicious courage, determination, and protection",
      },
      summary: {
        gu: "આજે હનુમાનજી અને મંગળ ગ્રહની કૃપાથી વિઘ્નો દૂર થાય છે. મુશ્કેલ કાર્યો પાર પાડવા માટે ઊર્જા ઉત્તમ છે.",
        en: "High spiritual resilience and courage today. Reciting Hanuman Chalisa brings peace and removes obstacles.",
      },
      color: { gu: "લાલ & કેસરી", en: "Coral & Red" },
      number: { gu: "૯ અને ૩", en: "9 and 3" },
      direction: { gu: "દક્ષિણ", en: "South" },
    },
    {
      score: { gu: "૯૨% બુદ્ધિવાન", en: "92% Auspicious" },
      scoreSubtitle: { gu: "બુધાદિત્ય પ્રભાવ • વ્યાપાર યોગ", en: "Mercury Grace • Wisdom & Commerce" },
      heading: {
        gu: "બુધદેવ કૃપા - વિદ્યા, બુદ્ધિ, સંચાર અને વ્યાપાર વૃદ્ધિ યોગ",
        en: "Mercury Grace - Favorable for learning, communication & business",
      },
      summary: {
        gu: "આજે બુદ્ધિ અને વેપારના નિર્ણયો માટે ઉત્તમ દિવસ છે. ગણેશ આરાધના અને મંત્ર જાપથી દરેક કાર્યમાં સફળતા મળે છે.",
        en: "Harmonious planetary energies for financial calculations, studies, and Ganesh worship.",
      },
      color: { gu: "લીલો & પીળો", en: "Emerald & Green" },
      number: { gu: "૫ અને ૬", en: "5 and 6" },
      direction: { gu: "ઉત્તર", en: "North" },
    },
    {
      score: { gu: "૯૫% પરમ શુભ", en: "95% Auspicious" },
      scoreSubtitle: { gu: "ગુરુ કૃપા • જ્ઞાન & સમૃદ્ધિ યોગ", en: "Jupiter Blessing • Wisdom & Abundance" },
      heading: {
        gu: "દેવગુરુ બૃહસ્પતિ પ્રભાવ - જ્ઞાન, આધ્યાત્મિક ઉન્નતિ અને લક્ષ્મી યોગ",
        en: "Brihaspati Grace - Peak spiritual wisdom, prosperity & guidance",
      },
      summary: {
        gu: "આજે ગુરુ ગ્રહનો પરમ કલ્યાણકારી યોગ છે. ધાર્મિક અનુષ્ઠાન, અભ્યાસ અને મોટા નિર્ણયો માટે સર્વોત્તમ મુહૂર્ત છે.",
        en: "Jupiter's benevolence brings divine grace, prosperity, and favorable timing for spiritual consultations.",
      },
      color: { gu: "પીળો & સુવર્ણ", en: "Yellow & Gold" },
      number: { gu: "૩ અને ૭", en: "3 and 7" },
      direction: { gu: "ઇશાન", en: "North-East" },
    },
    {
      score: { gu: "૯૪% સૌભાગ્ય યોગ", en: "94% Auspicious" },
      scoreSubtitle: { gu: "શુક્રદેવ કૃપા • સુખ & ઐશ્વર્ય", en: "Venus Transit • Harmony & Grace" },
      heading: {
        gu: "શુક્રદેવ ભ્રમણ - કલા, વૈભવ, શાંતિ અને સમૃદ્ધિ યોગ",
        en: "Venus Alignment - Favorable for harmony, joy and Lakshmi Puja",
      },
      summary: {
        gu: "આજે માં લક્ષ્મી અને શુક્રદેવની કૃપાથી સુખ-શાંતિમાં વધારો થાય છે. શ્રી સૂક્ત પાઠ અને યંત્ર પૂજન અતિ ફળદાયી રહેશે.",
        en: "Auspicious alignment for abundance, peaceful family interactions, and sacred Lakshmi worship.",
      },
      color: { gu: "શ્વેત & ગુલાબી", en: "White & Pink" },
      number: { gu: "૬ અને ૫", en: "6 and 5" },
      direction: { gu: "અગ્નિ / દક્ષિણ-પૂર્વ", en: "South-East" },
    },
    {
      score: { gu: "૮૬% ધૈર્ય યોગ", en: "86% Steady" },
      scoreSubtitle: { gu: "શનિદેવ પ્રભાવ • કર્માનુસાર રક્ષણ", en: "Saturn Alignment • Discipline & Protection" },
      heading: {
        gu: "શનિદેવ પ્રભાવ - કર્મ શુદ્ધિ, ધૈર્ય અને સંકટ નિવારણ યોગ",
        en: "Saturn Transit - Grounding discipline, focus & karma purification",
      },
      summary: {
        gu: "આજે શનિદેવ અને હનુમાનજીની ઉપાસનાથી કષ્ટ નિવારણ થાય છે. પીપળાની પૂજા અને સરસવના તેલનો દીવો કરવો શુભ રહેશે.",
        en: "Saturn's transit encourages discipline and deep spiritual endurance. Ideal for charity and quiet reflection.",
      },
      color: { gu: "વાદળી & શ્યામ", en: "Navy & Blue" },
      number: { gu: "૮ અને ૪", en: "8 and 4" },
      direction: { gu: "પશ્ચિમ", en: "West" },
    },
  ];

  const current = WEEKDAY_TRANSITS[dayIdx];
  const digits = ["૦", "૧", "૨", "૩", "૪", "૫", "૬", "૭", "૮", "૯"];
  const toGuDigits = (str) => String(str).replace(/\d/g, (d) => digits[Number(d)]);

  const guDateStr = toGuDigits(
    now.toLocaleDateString("gu-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
  );
  const enDateStr = now.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return {
    date: { gu: guDateStr, en: enDateStr },
    score: current.score,
    scoreSubtitle: current.subtitle,
    heading: current.heading,
    summary: current.summary,
    attributes: [
      {
        icon: "palette",
        label: { gu: "શુભ રંગ", en: "Lucky Color" },
        value: current.color,
      },
      {
        icon: "pin",
        label: { gu: "શુભ અંક", en: "Lucky Number" },
        value: current.number,
      },
      {
        icon: "explore",
        label: { gu: "શુભ દિશા", en: "Direction" },
        value: current.direction,
      },
    ],
  };
}

const initialTransit = getDynamicCosmicTransit();

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
      title: { gu: "દૈનિક ગોચર દર્પણ", en: "Cosmic Transit" },
      value: initialTransit.score,
      subtitle: initialTransit.scoreSubtitle,
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
      badge: null,
      href: "/dashboard/kundli",
      icon: "menu_book"
    },
    {
      id: "orders",
      label: { gu: "મારા ઓર્ડર્સ & ટ્રેકિંગ (Orders)", en: "My Orders & Tracking" },
      badge: null,
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
    date: initialTransit.date,
    heading: initialTransit.heading,
    shortSummary: initialTransit.summary,
    attributes: initialTransit.attributes,
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
    imageUrl: "/logo.png",
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
