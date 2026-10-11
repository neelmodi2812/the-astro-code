/**
 * The Astro Code - Vedic Spiritual Store (MyShop) Data Architecture
 * 
 * Provides complete bilingual localization (Gujarati 'gu' and English 'en')
 * for authentic gemstones, energized rudrakshas, yantras, malas, and sacred items.
 */

export const SHOP_DATA_GU = {
  breadcrumb: {
    home: "હોમ",
    shop: "MyShop વૈદિક આધ્યાત્મિક સ્ટોર"
  },
  topTrustBar: {
    consecrated: "૧૦૦% પ્રાણ પ્રતિષ્ઠિત અને લેબ પ્રમાણિત સામગ્રી",
    shipping: "સમગ્ર ભારતમાં ફ્રી શિપિંગ ઉપલબ્ધ"
  },
  hero: {
    badge: "પવિત્ર વૈદિક સંસ્કાર સંગ્રહ અને આધ્યાત્મિક શોપ",
    title: "દિવ્ય રત્ન, રૂદ્રાક્ષ અને સિદ્ધ સાધના સામગ્રી સંગ્રહ",
    subtitle: "૧૦૦% શુદ્ધ, પ્રમાણિત તથા પ્રકાંડ આચાર્યો દ્વારા વૈદિક મંત્રોચ્ચારથી અભિમંત્રિત આધ્યાત્મિક ઉપકરણો. તમારા ઘરમાં સકારાત્મક ઊર્જા, આયુષ્ય અને સમૃદ્ધિનું મંગલ આગમન. (૧૦૦% Lab Tested & Consecrated)",
    searchPlaceholder: "હેતુ શોધો: ધન વૃદ્ધિ, શાંતિ, ગ્રહ દોષ, નજર રક્ષા...",
    searchButton: "શોધો",
    sealTitle: "શ્રી સિદ્ધિ કવચમ્",
    sealSubtitle: "પ્રાણ પ્રતિષ્ઠિત ગેરંટી"
  },
  trustBadges: [
    {
      id: "genuine",
      icon: "ShieldCheck",
      title: "૧૦૦% અસલી & સિદ્ધ",
      subtitle: "વિધિવત પ્રાણ પ્રતિષ્ઠિત"
    },
    {
      id: "lab",
      icon: "Award",
      title: "લેબોરેટરી સર્ટિફિકેટ",
      subtitle: "સરકારી માન્ય રિપોર્ટ"
    },
    {
      id: "shipping",
      icon: "Truck",
      title: "મફત શિપિંગ (Free)",
      subtitle: "સુરક્ષિત અખંડ પેકેજિંગ"
    },
    {
      id: "returns",
      icon: "RotateCcw",
      title: "૭ દિવસ સરળ રિટર્ન",
      subtitle: "સંપૂર્ણ સંતોષ ખાતરી"
    }
  ],
  quickCategoriesTitle: "મુખ્ય આધ્યાત્મિક શ્રેણીઓ",
  viewAllCategories: "બધા વર્ગો જુઓ",
  quickCategories: [
    { id: "gemstones", name: "રત્નો", subtitle: "Gemstone", icon: "Gem", count: 24 },
    { id: "rudraksha", name: "રૂદ્રાક્ષ", subtitle: "Rudraksha", icon: "CircleDot", count: 18 },
    { id: "malas", name: "રૂદ્રાક્ષ માળા", subtitle: "Mala (108)", icon: "Sparkles", count: 12 },
    { id: "yantras", name: "શ્રી યંત્ર", subtitle: "Shree Yantra", icon: "Pyramid", count: 15 },
    { id: "sphatik", name: "સ્ફટિક માળા", subtitle: "Sphatik", icon: "Diamond", count: 9 },
    { id: "kavach", name: "રક્ષા કવચ", subtitle: "Kavach", icon: "Shield", count: 14 }
  ],
  sidebar: {
    categoryFilterTitle: "કેટેગરી પસંદગી",
    reset: "રીસેટ",
    categories: [
      { id: "all", label: "બધી સામગ્રી (All)", count: 78 },
      { id: "gemstones", label: "રત્નો & ઉપરત્નો (Gemstones)", count: 24 },
      { id: "rudraksha", label: "પ્રાકૃતિક રૂદ્રાક્ષ (1 to 14 Mukhi)", count: 18 },
      { id: "malas", label: "સિદ્ધ રૂદ્રાક્ષ માળા & જાપ માળા", count: 12 },
      { id: "yantras", label: "સિદ્ધ શ્રી યંત્ર & પિત્તળ સામગ્રી", count: 15 },
      { id: "sphatik", label: "સ્ફટિક & રત્ન બ્રેસલેટ્સ", count: 9 },
      { id: "kavach", label: "વાસ્તુ ફેંગશુઈ & સુરક્ષા કવચ", count: 14 }
    ],
    purposeFilterTitle: "લાભ / હેતુ અનુસાર",
    purposes: [
      { id: "all", label: "બધા હેતુ" },
      { id: "peace", label: "શાંતિ & એકાગ્રતા" },
      { id: "wealth", label: "વ્યાપાર-ધન વૃદ્ધિ" },
      { id: "planetary", label: "કુંડળી ગ્રહ દોષ શાંતિ" },
      { id: "kaalsarp", label: "કાલસર્પ / શનિ સાડાસાતી" },
      { id: "protection", label: "નજર રક્ષા & આરોગ્ય" }
    ],
    priceFilterTitle: "કિંમત શ્રેણી (બજેટ)",
    priceRanges: [
      { id: "below500", label: "₹૫૦૦ નીચે (Below ₹500)", min: 0, max: 499 },
      { id: "500to1500", label: "₹૫૦૦ - ₹૧,૫૦૦ (સૌથી લોકપ્રિય)", min: 500, max: 1500 },
      { id: "1500to5000", label: "₹૧,૫૦૦ - ₹૫,૦૦૦", min: 1501, max: 5000 },
      { id: "above5000", label: "₹૫,૦૦૦ થી વધુ (દુર્લભ રત્નો)", min: 5001, max: 999999 }
    ],
    authenticityCard: {
      title: "પ્રમાણિત વિશ્વાસ પત્ર",
      desc: "અમારા તમામ રત્ન અને રૂદ્રાક્ષ શાસ્ત્રોક્ત વિધિથી સિદ્ધ કરવામાં આવે છે. દરેક આઇટમ સાથે સત્તાવાર લેબ પ્રમાણપત્ર આપવામાં આવે છે.",
      approvedBy: "મુખ્ય જ્યોતિષી દ્વારા માન્ય",
      astrologer: "ડૉ. વિશાલ મોદી"
    },
    helpCard: {
      title: "કયો રત્ન ધારણ કરવો?",
      desc: "કુંડળી વિશ્લેષણ વિના અયોગ્ય રત્ન નુકસાન કરી શકે છે. અમારા નિષ્ણાત સાથે ચર્ચા કરો.",
      cta: "જ્યોતિષી પરામર્શ બુક કરો"
    }
  },
  featuredProduct: {
    id: "nepali-5-mukhi-mala",
    badge: "વિશેષ પસંદગી (Hot Deal)",
    discount: "૪૦% OFF",
    originBadge: "૧૦૦% નેપાળી ઓરિજિનલ",
    rating: 4.9,
    reviewsCount: "૧૪૨ શ્રદ્ધાળુઓની સમીક્ષાઓ",
    name: "સિદ્ધ નેપાળી ૫-મુખી રૂદ્રાક્ષ માળા (108 દાણા)",
    subtitle: "Energized Nepali 5-Mukhi Rudraksha Mala for Peace, Wisdom & Health",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtZ1yNlZ9ugVCl43nF5a9UuQKBIsFuIhp_iKW2cCE00hlnx84uuDtOOGGI4lK1cjKrVk6vrk_ayeALp-bRkrP_Ur4xEFjkLF-W4Yr1ElEkfoTpA0mwhLmSJBmrtxzI8fnLQ5P-pH6c-9vkeWNL3QM-UFfa4s0MKG6n81wZrSvfhZBiZsjvAYGoKCADowWESYLp-WGBUd9HrT8jMatNnKYd76Tl-SE2S4nA9OFx_GHU5wVKsx2_dFGq",
    usps: [
      { text: "ગંગાજળથી શુદ્ધિકૃત", icon: "Droplets" },
      { text: "શિવ સ્તોત્ર અભિમંત્રિત", icon: "Flame" },
      { text: "ઓરિજિનલ લેબ સર્ટિફિકેટ", icon: "FileCheck" },
      { text: "સુરક્ષિત ગંગાજળ સાથે ડિલિવરી", icon: "Truck" }
    ],
    price: 1499,
    originalPrice: 2499,
    savingsText: "તમે બચાવો ₹૧,૦૦૦ (સર્વશ્રેષ્ઠ ઑફર)",
    addToCart: "કાર્ટમાં ઉમેરો",
    buyNow: "હમણાં જ ખરીદો",
    category: "malas",
    purpose: "peace"
  },
  catalogSection: {
    title: "લોકપ્રિય સિદ્ધ સામગ્રી કલેક્શન",
    subtitle: "બધા ૧૦૦% સરકારી માન્યતા પ્રાપ્ત",
    sortByLabel: "ક્રમબદ્ધ કરો:",
    sortOptions: [
      { value: "popular", label: "સૌથી લોકપ્રિય (Popularity)" },
      { value: "price-asc", label: "ભાવ: ઓછાથી વધુ (Price Low to High)" },
      { value: "price-desc", label: "ભાવ: વધુથી ઓછા (Price High to Low)" },
      { value: "newest", label: "નવું આગમન (Newest First)" },
      { value: "rating", label: "ગ્રાહક રેટિંગ (Customer Reviews)" }
    ],
    liveStockBadge: "લાઇવ સ્ટોક",
    totalProductsPrefix: "કુલ",
    totalProductsSuffix: "આધ્યાત્મિક ઉત્પાદનો"
  },
  products: [
    {
      id: "pukhraj-gemstone",
      name: "પીળો પોખરાજ રત્ન (Yellow Sapphire)",
      subtitle: "ગુરુ ગ્રહ કૃપા, ૩.૫ કેરેટ પ્રાકૃતિક સિદ્ધ રત્ન",
      badge: "શુદ્ધ લેબ સર્ટિફાઇડ",
      rating: 4.9,
      reviewsCount: 84,
      price: 3250,
      originalPrice: 4500,
      savings: "૨૮% બચત",
      category: "gemstones",
      purpose: "wealth",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDYiqOzSA0udwBL8h2kSm8H5e0WEH7sbiFyQzgE2cdEFTkouS3KFbIvJkRgBnyth8nBt28TlSZ31U-IVgZElyoZYICNZeKdg76eMK5fHW7phZ4Kp8VbXir0N9vIFEVmX0lbwTqL7KrvteiVIU-HCHExmko1jLKMORqB8Y1xn5ha6W_xz8RTXlVcVJMBGmcx8bAughuouF_6bULwHQAePG4YHF12RqwoY2d2J_JVCi-jZwMKoNhMCbqT",
      details: "૩.૫ કેરેટ ઉત્તમ ગુણવત્તાવાળો કુદરતી પીળો પોખરાજ. ગુરુ (બૃહસ્પતિ) ગ્રહની અનુકૂળતા, શિક્ષણ, ધનવૃદ્ધિ અને પારિવારિક સુખ માટે અત્યંત શુભ."
    },
    {
      id: "1-mukhi-rudraksha",
      name: "૧-મુખી નેપાળી રૂદ્રાક્ષ (કાજુ દાણો)",
      subtitle: "વિશેષ શિવ આશીર્વાદ & ધ્યાન એકાગ્રતા",
      badge: "શિવ સ્વરૂપ દુર્લભ",
      rating: 5.0,
      reviewsCount: 116,
      price: 4999,
      originalPrice: 7000,
      savings: "૨૮% બચત",
      category: "rudraksha",
      purpose: "peace",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzkLjubBYmBPDkQO_HcKCCkNpsoXwlSbsR8zrashNESWCDoKAmPTMJlheBmA19_qGiQCe0mc6iyJ82m3RRQ6guQ_3Icyyl8jxkgY4DBig5OK6yTMGm_KmXDe2wcx9WSHUjz_vjo2frtF17SghEVehFH3dzSQbGbuzuWb5H-SsI3ScneY9jpq9GAqxjd7RrjzeiMMnjK6mprWuMTwg6nd5EmTSv3BBCyrl_ly3AJouQEGDwnne__Tb4"
    },
    {
      id: "shree-mahalakshmi-yantra",
      name: "શ્રી મહાલક્ષ્મી યંત્ર (અષ્ટધાતુ)",
      subtitle: "ધન-ધાન્ય, લક્ષ્મી પ્રાપ્તિ અને વ્યાપાર વૃદ્ધિ",
      badge: "અષ્ટધાતુ ૧૦૦% સિદ્ધ",
      rating: 4.8,
      reviewsCount: 95,
      price: 999,
      originalPrice: 1500,
      savings: "૩૩% બચત",
      category: "yantras",
      purpose: "wealth",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDhx4XrwCBGeFO1B6N37r6AVwn743Gg9CIlQX9BU1JrjhWI8njW296TFjxJkGXH-Bhee5cJ5mqkoWxEuPm-RhGscWiNw-lhxuYqs0e-KlFl0xT_uGWP5hIZegLu1IIalhHPB_c0BCmYLyiAeODFBnrXSGJtg0KfUzSqgZKj9LfHmQz6ruItp_aOlzq332jwauXdcNhXrmcQlkEJJb0eGKX-33D9WptLYVjLOKmiDNeNh8cTlQp2Ar0J"
    },
    {
      id: "sphatik-mala-108",
      name: "ઓરિજિનલ સ્ફટિક માળા (૧૦૮ મણકા)",
      subtitle: "માનસિક શાંતિ, ક્રોધ નિયંત્રણ અને શીતળતા",
      badge: "શુદ્ધ હિમાલયી સ્ફટિક",
      rating: 4.7,
      reviewsCount: 63,
      price: 1100,
      originalPrice: 1600,
      savings: "૩૧% બચત",
      category: "sphatik",
      purpose: "peace",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAt-5RG8OqS86JWWxtnobzJGADzynxT-TL1IuRIZl6_QSSE9ToiXWBkBtYMyT1WxDt5ZHz4s8wUGyftHuvIsTlH7My0bmWjc2skF4u_5yfMSwCyleHfcPXubFbstBPWBez6woO4d-XUXb9NMHi6nv8bTq3hkuZzU6Yug3dCbSN_r4DfpKEy4Xk-O1TU3PfJfDALGL_ceS5ohCl1wB-aw8W-WGtsrtA07Ldraq_ir5NisDfWZiFZLyVq"
    },
    {
      id: "navagraha-raksha-kavach",
      name: "પંચધાતુ લકી રક્ષા કવચ (નવગ્રહ)",
      subtitle: "નજરદોષ મુક્તિ, અદ્રશ્ય નકારાત્મકતાથી રક્ષણ",
      badge: "નવગ્રહ રક્ષા",
      rating: 4.9,
      reviewsCount: 102,
      price: 2100,
      originalPrice: 2800,
      savings: "૨૫% બચત",
      category: "kavach",
      purpose: "protection",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCiMfx5SOiFyjpiV8RJuG7rqHZ9peFb3ruWVUidgHVPf4hqCd1K-fqbWv9nSlGmAFIbY7K5xQAMdXOFYJ8bo4AgimUEOh62iHIPsfSr5u27-sRq1IBHZEbxMjxgRYgWzuR8ZHHqLkHHoZS43CrFOC3AMXnu40ioEtGXITPdyOtDLj7EkYOGwVBHhxwfJr_qiyxgi_dRN1bSQuCYAbTacdz8wRqr7AYX__rYxBCpfLHTLrDtQKmsc1ZS"
    },
    {
      id: "manik-gemstone-ruby",
      name: "માણેક રત્ન (Natural Ruby - સૂર્ય)",
      subtitle: "સરકારી નોકરી, માન-પ્રતિષ્ઠા અને આત્મવિશ્વાસ",
      badge: "સૂર્ય રત્ન સર્ટિફાઇડ",
      rating: 4.8,
      reviewsCount: 71,
      price: 3800,
      originalPrice: 5200,
      savings: "૨૬% બચત",
      category: "gemstones",
      purpose: "planetary",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCBKS6fh-rzbtqqtCgKPsc3aPmypAg3Nkx0xSzygNlb2t8e53JJnXNpiDFsNW-NQ1N6lfNd02afh8-dfJlCOo1_8wNtgXPb4HKehahz5xMeSRff7RuSocs2-n30ZeMztQpfhfCgmrZLgHlb4IaufFv87EUBAuo1ry6hSXajJsyYSVNhmKTuVL-I865o5m7BVSCjfhPHJMOvCH0tdgq5XF-vflD3_scWmyl3mWFm50qsEBpmS-6o1TdT"
    },
    {
      id: "siddha-parad-shivling",
      name: "સિદ્ધ પારદ શિવલિંગ (Pure Mercury Shivling)",
      subtitle: "વાસ્તુ દોષ નિવારણ, કાલસર્પ અને પિતૃ દોષ મુક્તિ",
      badge: "શાસ્ત્રોક્ત પારદ ૮ સંસ્કાર",
      rating: 4.9,
      reviewsCount: 88,
      price: 1850,
      originalPrice: 2600,
      savings: "૨૮% બચત",
      category: "yantras",
      purpose: "kaalsarp",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDhx4XrwCBGeFO1B6N37r6AVwn743Gg9CIlQX9BU1JrjhWI8njW296TFjxJkGXH-Bhee5cJ5mqkoWxEuPm-RhGscWiNw-lhxuYqs0e-KlFl0xT_uGWP5hIZegLu1IIalhHPB_c0BCmYLyiAeODFBnrXSGJtg0KfUzSqgZKj9LfHmQz6ruItp_aOlzq332jwauXdcNhXrmcQlkEJJb0eGKX-33D9WptLYVjLOKmiDNeNh8cTlQp2Ar0J"
    },
    {
      id: "gomti-chakra-kuber-potli",
      name: "સિદ્ધ ગોમતી ચક્ર & કુબેર લક્ષ્મી પોટલી (૧૧ નંગ)",
      subtitle: "તિજોરી-ગલ્લામાં રાખવાથી અવિરત ધન પ્રવાહ",
      badge: "કુબેર આશીર્વાદ",
      rating: 4.8,
      reviewsCount: 112,
      price: 550,
      originalPrice: 850,
      savings: "૩૫% બચત",
      category: "kavach",
      purpose: "wealth",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCiMfx5SOiFyjpiV8RJuG7rqHZ9peFb3ruWVUidgHVPf4hqCd1K-fqbWv9nSlGmAFIbY7K5xQAMdXOFYJ8bo4AgimUEOh62iHIPsfSr5u27-sRq1IBHZEbxMjxgRYgWzuR8ZHHqLkHHoZS43CrFOC3AMXnu40ioEtGXITPdyOtDLj7EkYOGwVBHhxwfJr_qiyxgi_dRN1bSQuCYAbTacdz8wRqr7AYX__rYxBCpfLHTLrDtQKmsc1ZS"
    },
    {
      id: "shyam-tulsi-kanthi-mala",
      name: "શ્યામ તુલસી કંઠી માળા (Double Layered)",
      subtitle: "ભક્તિ ભાવ, માનસિક શુદ્ધિ અને આરોગ્ય રક્ષણ",
      badge: "હરિપ્રિયા તુલસી",
      rating: 4.9,
      reviewsCount: 94,
      price: 450,
      originalPrice: 650,
      savings: "૩૦% બચત",
      category: "malas",
      purpose: "peace",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtZ1yNlZ9ugVCl43nF5a9UuQKBIsFuIhp_iKW2cCE00hlnx84uuDtOOGGI4lK1cjKrVk6vrk_ayeALp-bRkrP_Ur4xEFjkLF-W4Yr1ElEkfoTpA0mwhLmSJBmrtxzI8fnLQ5P-pH6c-9vkeWNL3QM-UFfa4s0MKG6n81wZrSvfhZBiZsjvAYGoKCADowWESYLp-WGBUd9HrT8jMatNnKYd76Tl-SE2S4nA9OFx_GHU5wVKsx2_dFGq"
    }
  ],
  pranPratishthaSteps: {
    tag: "શાસ્ત્રોક્ત વિધિ વિધાન",
    title: "અમારી પવિત્ર પ્રાણ પ્રતિષ્ઠા પ્રક્રિયા",
    subtitle: "સામાન્ય પથ્થર કે બીજમાંથી દિવ્ય ફળદાયી ઉપકરણ બનવા સુધીના ચાર અત્યંત કઠિન અને પવિત્ર સોપાન:",
    steps: [
      {
        num: "૧",
        title: "પ્રાકૃતિક અસલી પસંદગી",
        desc: "નેપાળ અને મ્યાનમારની ખાણોમાંથી પ્રત્યક્ષ નિરીક્ષણ કરી ઉત્તમ ગુણવત્તાવાળા પ્રાકૃતિક રત્ન-રૂદ્રાક્ષની પસંદગી કરવામાં આવે છે."
      },
      {
        num: "૨",
        title: "ગંગાજળ & પંચામૃત અભિષેક",
        desc: "વૈદિક બ્રાહ્મણો દ્વારા શુદ્ધ હરિદ્વાર ગંગાજળ, ગાયનું દૂધ, મધ અને પંચામૃત વડે અશુદ્ધિઓ દૂર કરી પવિત્રીકરણ કરાય છે."
      },
      {
        num: "૩",
        title: "મંત્રોચ્ચાર પ્રાણ પ્રતિષ્ઠા",
        desc: "શુભ મુહૂર્તમાં ૧,૧૦૦ શિવ ગાયત્રી કે ગ્રહ બીજ મંત્રોચ્ચારથી સામગ્રીને જાગ્રત કરી ઊર્જાવાન (Prana Energized) બનાવવામાં આવે છે."
      },
      {
        num: "૪",
        title: "લેબ પ્રમાણપત્ર & ડિલિવરી",
        desc: "સરકારી માન્યતા પ્રાપ્ત જેમ્સ લેબ ટેસ્ટ સર્ટિફિકેટ સાથે ગંગાજળની નાની બોટલ મૂકી સુરક્ષિત રીતે સીલ પેક ડિલિવરી કરાય છે."
      }
    ]
  },
  astrologerCta: {
    tag: "નિઃશુલ્ક પ્રાથમિક માર્ગદર્શન",
    title: "કયો રત્ન કે રૂદ્રાક્ષ તમારા માટે ઉત્તમ છે?",
    desc: "તમારી જન્મકુંડળી, જન્મતારીખ અને વર્તમાન મહાદશા અનુસાર ચોક્કસ નિવારણ જાણવા માટે જ્યોતિષાચાર્ય ડૉ. વિશાલ મોદી સાથે સીધી વાત કરો.",
    phoneText: "+૯૧ ૭૯ ૪૦૦૦ ૮૧૦૮",
    phoneHref: "tel:+917940008108",
    whatsappText: "વોટ્સએપ પર પૂછો",
    whatsappHref: "https://wa.me/919825000000"
  },
  cartNotice: {
    added: "કાર્ટમાં ઉમેરાયું!",
    addedDesc: "આઇટમ સફળતાપૂર્વક આપના કાર્ટમાં ઉમેરી દેવામાં આવી છે."
  }
}

export const SHOP_DATA_EN = {
  breadcrumb: {
    home: "Home",
    shop: "MyShop Vedic Spiritual Store"
  },
  topTrustBar: {
    consecrated: "100% Consecrated & Lab Certified Items",
    shipping: "Free Shipping Across India"
  },
  hero: {
    badge: "Sacred Vedic Heritage Collection & Spiritual Store",
    title: "Divine Gemstones, Rudraksha & Consecrated Spiritual Artifacts",
    subtitle: "100% authentic, certified and energized by learned acharyas with Vedic chants. Invite positive energy, longevity and prosperity into your home. (100% Lab Tested & Consecrated)",
    searchPlaceholder: "Search by purpose: Wealth, Peace, Planetary Dosha, Evil Eye...",
    searchButton: "Search",
    sealTitle: "Shri Siddhi Kavacham",
    sealSubtitle: "Pran Pratishtha Guarantee"
  },
  trustBadges: [
    {
      id: "genuine",
      icon: "ShieldCheck",
      title: "100% Genuine & Energized",
      subtitle: "Ritually Consecrated"
    },
    {
      id: "lab",
      icon: "Award",
      title: "Laboratory Certificate",
      subtitle: "Govt. Approved Report"
    },
    {
      id: "shipping",
      icon: "Truck",
      title: "Free Shipping (Free)",
      subtitle: "Secure Breakage-Proof Packaging"
    },
    {
      id: "returns",
      icon: "RotateCcw",
      title: "7 Days Easy Return",
      subtitle: "Complete Satisfaction Guaranteed"
    }
  ],
  quickCategoriesTitle: "Core Spiritual Categories",
  viewAllCategories: "View All Categories",
  quickCategories: [
    { id: "gemstones", name: "Gemstones", subtitle: "Certified Gems", icon: "Gem", count: 24 },
    { id: "rudraksha", name: "Rudraksha", subtitle: "1-14 Mukhi", icon: "CircleDot", count: 18 },
    { id: "malas", name: "Rudraksha Malas", subtitle: "Mala (108)", icon: "Sparkles", count: 12 },
    { id: "yantras", name: "Shree Yantra", subtitle: "Sacred Plates", icon: "Pyramid", count: 15 },
    { id: "sphatik", name: "Sphatik Malas", subtitle: "Quartz Crystal", icon: "Diamond", count: 9 },
    { id: "kavach", name: "Protection Kavach", subtitle: "Amulets & Vastu", icon: "Shield", count: 14 }
  ],
  sidebar: {
    categoryFilterTitle: "Category Selection",
    reset: "Reset",
    categories: [
      { id: "all", label: "All Items (All)", count: 78 },
      { id: "gemstones", label: "Gemstones & Upratnas", count: 24 },
      { id: "rudraksha", label: "Natural Rudraksha (1 to 14 Mukhi)", count: 18 },
      { id: "malas", label: "Energized Rudraksha & Japa Malas", count: 12 },
      { id: "yantras", label: "Energized Shree Yantra & Brass Items", count: 15 },
      { id: "sphatik", label: "Sphatik Crystals & Gem Bracelets", count: 9 },
      { id: "kavach", label: "Vastu Fengshui & Protection Kavach", count: 14 }
    ],
    purposeFilterTitle: "Filter by Purpose / Benefit",
    purposes: [
      { id: "all", label: "All Purposes" },
      { id: "peace", label: "Peace & Concentration" },
      { id: "wealth", label: "Wealth & Business Growth" },
      { id: "planetary", label: "Planetary Dosha Shanti" },
      { id: "kaalsarp", label: "Kaal Sarp / Shani Sade Sati" },
      { id: "protection", label: "Evil Eye & Health Shield" }
    ],
    priceFilterTitle: "Price Range (Budget)",
    priceRanges: [
      { id: "below500", label: "Below ₹500", min: 0, max: 499 },
      { id: "500to1500", label: "₹500 - ₹1,500 (Most Popular)", min: 500, max: 1500 },
      { id: "1500to5000", label: "₹1,500 - ₹5,000", min: 1501, max: 5000 },
      { id: "above5000", label: "Above ₹5,000 (Rare Gems)", min: 5001, max: 999999 }
    ],
    authenticityCard: {
      title: "Authenticity Guarantee",
      desc: "All our gems and rudrakshas are consecrated strictly according to Vedic scriptures. Every product includes an official laboratory certificate.",
      approvedBy: "Certified by Chief Astrologer",
      astrologer: "Dr. Vishal Modi"
    },
    helpCard: {
      title: "Which Gemstone Should You Wear?",
      desc: "Wearing an incompatible gemstone without horoscopic analysis can lead to adverse effects. Consult with our expert.",
      cta: "Book Astrologer Consultation"
    }
  },
  featuredProduct: {
    id: "nepali-5-mukhi-mala",
    badge: "Special Choice (Hot Deal)",
    discount: "40% OFF",
    originBadge: "100% Nepali Original",
    rating: 4.9,
    reviewsCount: "142 Devotee Reviews",
    name: "Energized Nepali 5-Mukhi Rudraksha Mala (108 Beads)",
    subtitle: "Energized Nepali 5-Mukhi Rudraksha Mala for Peace, Wisdom & Health",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtZ1yNlZ9ugVCl43nF5a9UuQKBIsFuIhp_iKW2cCE00hlnx84uuDtOOGGI4lK1cjKrVk6vrk_ayeALp-bRkrP_Ur4xEFjkLF-W4Yr1ElEkfoTpA0mwhLmSJBmrtxzI8fnLQ5P-pH6c-9vkeWNL3QM-UFfa4s0MKG6n81wZrSvfhZBiZsjvAYGoKCADowWESYLp-WGBUd9HrT8jMatNnKYd76Tl-SE2S4nA9OFx_GHU5wVKsx2_dFGq",
    usps: [
      { text: "Purified with Sacred Gangajal", icon: "Droplets" },
      { text: "Consecrated with Shiva Stotras", icon: "Flame" },
      { text: "Govt. Approved Lab Certificate", icon: "FileCheck" },
      { text: "Delivered with Holy Gangajal Bottle", icon: "Truck" }
    ],
    price: 1499,
    originalPrice: 2499,
    savingsText: "You Save ₹1,000 (Best Offer)",
    addToCart: "Add to Cart",
    buyNow: "Buy Now Instantly",
    category: "malas",
    purpose: "peace"
  },
  catalogSection: {
    title: "Popular Consecrated Artifacts Collection",
    subtitle: "All 100% Govt. Recognized & Lab Certified",
    sortByLabel: "Sort by:",
    sortOptions: [
      { value: "popular", label: "Popularity" },
      { value: "price-asc", label: "Price: Low to High" },
      { value: "price-desc", label: "Price: High to Low" },
      { value: "newest", label: "Newest First" },
      { value: "rating", label: "Customer Reviews" }
    ],
    liveStockBadge: "Live Stock",
    totalProductsPrefix: "Total",
    totalProductsSuffix: "Spiritual Products"
  },
  products: [
    {
      id: "pukhraj-gemstone",
      name: "Natural Yellow Sapphire Gemstone (Pukhraj)",
      subtitle: "Jupiter Blessings, 3.5 Carat Natural Energized Gem",
      badge: "Pure Lab Certified",
      rating: 4.9,
      reviewsCount: 84,
      price: 3250,
      originalPrice: 4500,
      savings: "28% Save",
      category: "gemstones",
      purpose: "wealth",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDYiqOzSA0udwBL8h2kSm8H5e0WEH7sbiFyQzgE2cdEFTkouS3KFbIvJkRgBnyth8nBt28TlSZ31U-IVgZElyoZYICNZeKdg76eMK5fHW7phZ4Kp8VbXir0N9vIFEVmX0lbwTqL7KrvteiVIU-HCHExmko1jLKMORqB8Y1xn5ha6W_xz8RTXlVcVJMBGmcx8bAughuouF_6bULwHQAePG4YHF12RqwoY2d2J_JVCi-jZwMKoNhMCbqT",
      details: "Top quality 3.5 Carat natural yellow sapphire gemstone. Excellent for career growth, intellect, and Jupiter planetary favorability."
    },
    {
      id: "1-mukhi-rudraksha",
      name: "Rare 1-Mukhi Nepali Rudraksha (Half Moon)",
      subtitle: "Special Shiva Grace & Meditation Concentration",
      badge: "Rare Shiva Incarnation",
      rating: 5.0,
      reviewsCount: 116,
      price: 4999,
      originalPrice: 7000,
      savings: "28% Save",
      category: "rudraksha",
      purpose: "peace",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzkLjubBYmBPDkQO_HcKCCkNpsoXwlSbsR8zrashNESWCDoKAmPTMJlheBmA19_qGiQCe0mc6iyJ82m3RRQ6guQ_3Icyyl8jxkgY4DBig5OK6yTMGm_KmXDe2wcx9WSHUjz_vjo2frtF17SghEVehFH3dzSQbGbuzuWb5H-SsI3ScneY9jpq9GAqxjd7RrjzeiMMnjK6mprWuMTwg6nd5EmTSv3BBCyrl_ly3AJouQEGDwnne__Tb4"
    },
    {
      id: "shree-mahalakshmi-yantra",
      name: "Shree Mahalakshmi Yantra (Ashtadhatu)",
      subtitle: "Wealth, Abundance & Business Prosperity",
      badge: "100% Ashtadhatu Energized",
      rating: 4.8,
      reviewsCount: 95,
      price: 999,
      originalPrice: 1500,
      savings: "33% Save",
      category: "yantras",
      purpose: "wealth",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDhx4XrwCBGeFO1B6N37r6AVwn743Gg9CIlQX9BU1JrjhWI8njW296TFjxJkGXH-Bhee5cJ5mqkoWxEuPm-RhGscWiNw-lhxuYqs0e-KlFl0xT_uGWP5hIZegLu1IIalhHPB_c0BCmYLyiAeODFBnrXSGJtg0KfUzSqgZKj9LfHmQz6ruItp_aOlzq332jwauXdcNhXrmcQlkEJJb0eGKX-33D9WptLYVjLOKmiDNeNh8cTlQp2Ar0J"
    },
    {
      id: "sphatik-mala-108",
      name: "Authentic Himalayan Sphatik Mala (108 Beads)",
      subtitle: "Mental Calmness, Anger Control & Cooling Energy",
      badge: "Pure Himalayan Crystal",
      rating: 4.7,
      reviewsCount: 63,
      price: 1100,
      originalPrice: 1600,
      savings: "31% Save",
      category: "sphatik",
      purpose: "peace",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAt-5RG8OqS86JWWxtnobzJGADzynxT-TL1IuRIZl6_QSSE9ToiXWBkBtYMyT1WxDt5ZHz4s8wUGyftHuvIsTlH7My0bmWjc2skF4u_5yfMSwCyleHfcPXubFbstBPWBez6woO4d-XUXb9NMHi6nv8bTq3hkuZzU6Yug3dCbSN_r4DfpKEy4Xk-O1TU3PfJfDALGL_ceS5ohCl1wB-aw8W-WGtsrtA07Ldraq_ir5NisDfWZiFZLyVq"
    },
    {
      id: "navagraha-raksha-kavach",
      name: "Panchdhatu Lucky Raksha Kavach (Navagraha)",
      subtitle: "Ward Off Evil Eye & Negative Astral Energies",
      badge: "Navagraha Shield",
      rating: 4.9,
      reviewsCount: 102,
      price: 2100,
      originalPrice: 2800,
      savings: "25% Save",
      category: "kavach",
      purpose: "protection",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCiMfx5SOiFyjpiV8RJuG7rqHZ9peFb3ruWVUidgHVPf4hqCd1K-fqbWv9nSlGmAFIbY7K5xQAMdXOFYJ8bo4AgimUEOh62iHIPsfSr5u27-sRq1IBHZEbxMjxgRYgWzuR8ZHHqLkHHoZS43CrFOC3AMXnu40ioEtGXITPdyOtDLj7EkYOGwVBHhxwfJr_qiyxgi_dRN1bSQuCYAbTacdz8wRqr7AYX__rYxBCpfLHTLrDtQKmsc1ZS"
    },
    {
      id: "manik-gemstone-ruby",
      name: "Natural Ruby Gemstone (Manik - Surya)",
      subtitle: "Govt Job Success, Honor & Self-Confidence",
      badge: "Certified Sun Gemstone",
      rating: 4.8,
      reviewsCount: 71,
      price: 3800,
      originalPrice: 5200,
      savings: "26% Save",
      category: "gemstones",
      purpose: "planetary",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCBKS6fh-rzbtqqtCgKPsc3aPmypAg3Nkx0xSzygNlb2t8e53JJnXNpiDFsNW-NQ1N6lfNd02afh8-dfJlCOo1_8wNtgXPb4HKehahz5xMeSRff7RuSocs2-n30ZeMztQpfhfCgmrZLgHlb4IaufFv87EUBAuo1ry6hSXajJsyYSVNhmKTuVL-I865o5m7BVSCjfhPHJMOvCH0tdgq5XF-vflD3_scWmyl3mWFm50qsEBpmS-6o1TdT"
    },
    {
      id: "siddha-parad-shivling",
      name: "Energized Parad Shivling (Pure Mercury)",
      subtitle: "Vastu Correction, Kaal Sarp & Pitra Dosha Relief",
      badge: "Scriptural 8-Sanskar Parad",
      rating: 4.9,
      reviewsCount: 88,
      price: 1850,
      originalPrice: 2600,
      savings: "28% Save",
      category: "yantras",
      purpose: "kaalsarp",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDhx4XrwCBGeFO1B6N37r6AVwn743Gg9CIlQX9BU1JrjhWI8njW296TFjxJkGXH-Bhee5cJ5mqkoWxEuPm-RhGscWiNw-lhxuYqs0e-KlFl0xT_uGWP5hIZegLu1IIalhHPB_c0BCmYLyiAeODFBnrXSGJtg0KfUzSqgZKj9LfHmQz6ruItp_aOlzq332jwauXdcNhXrmcQlkEJJb0eGKX-33D9WptLYVjLOKmiDNeNh8cTlQp2Ar0J"
    },
    {
      id: "gomti-chakra-kuber-potli",
      name: "Consecrated Gomti Chakra & Kuber Laxmi Pouch (11 Pcs)",
      subtitle: "Keep in Cash Safe or Vault for Continuous Wealth Flow",
      badge: "Lord Kuber Grace",
      rating: 4.8,
      reviewsCount: 112,
      price: 550,
      originalPrice: 850,
      savings: "35% Save",
      category: "kavach",
      purpose: "wealth",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCiMfx5SOiFyjpiV8RJuG7rqHZ9peFb3ruWVUidgHVPf4hqCd1K-fqbWv9nSlGmAFIbY7K5xQAMdXOFYJ8bo4AgimUEOh62iHIPsfSr5u27-sRq1IBHZEbxMjxgRYgWzuR8ZHHqLkHHoZS43CrFOC3AMXnu40ioEtGXITPdyOtDLj7EkYOGwVBHhxwfJr_qiyxgi_dRN1bSQuCYAbTacdz8wRqr7AYX__rYxBCpfLHTLrDtQKmsc1ZS"
    },
    {
      id: "shyam-tulsi-kanthi-mala",
      name: "Pure Shyam Tulsi Kanthi Mala (Double Strand)",
      subtitle: "Devotional Purity, Inner Peace & Immune Vitality",
      badge: "Holy Basil Wood",
      rating: 4.9,
      reviewsCount: 94,
      price: 450,
      originalPrice: 650,
      savings: "30% Save",
      category: "malas",
      purpose: "peace",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtZ1yNlZ9ugVCl43nF5a9UuQKBIsFuIhp_iKW2cCE00hlnx84uuDtOOGGI4lK1cjKrVk6vrk_ayeALp-bRkrP_Ur4xEFjkLF-W4Yr1ElEkfoTpA0mwhLmSJBmrtxzI8fnLQ5P-pH6c-9vkeWNL3QM-UFfa4s0MKG6n81wZrSvfhZBiZsjvAYGoKCADowWESYLp-WGBUd9HrT8jMatNnKYd76Tl-SE2S4nA9OFx_GHU5wVKsx2_dFGq"
    }
  ],
  pranPratishthaSteps: {
    tag: "Scriptural Vedic Process",
    title: "Our Sacred Pran Pratishtha Rituals",
    subtitle: "Four rigorous and sanctified Vedic milestones transforming natural materials into divine energetic tools:",
    steps: [
      {
        num: "1",
        title: "Natural Authentic Sourcing",
        desc: "Direct selection of pristine natural gemstones and authentic Rudraksha beads from verified sources in Nepal and Myanmar."
      },
      {
        num: "2",
        title: "Gangajal & Panchamrit Abhishek",
        desc: "Consecrated by Vedic priests using authentic Haridwar Gangajal, holy cow milk, pure honey, and Panchamrit to clear latent impurities."
      },
      {
        num: "3",
        title: "Mantra Chanting & Energy Infusion",
        desc: "Awakened during auspicious muhurtas with 1,100 Vedic Gayatri or planetary seed mantras to ensure resonant divine potency."
      },
      {
        num: "4",
        title: "Lab Certification & Tamper-Proof Delivery",
        desc: "Packaged securely with government-recognized gemological lab report and sacred Haridwar Gangajal vial in sealed packing."
      }
    ]
  },
  astrologerCta: {
    tag: "Free Initial Guidance",
    title: "Which Gemstone or Rudraksha is Best For You?",
    desc: "Consult directly with Astrologer Dr. Vishal Modi to identify the exact sacred remedy tailored to your birth chart and current Mahadasha.",
    phoneText: "+91 79 4000 8108",
    phoneHref: "tel:+917940008108",
    whatsappText: "Ask on WhatsApp",
    whatsappHref: "https://wa.me/919825000000"
  },
  cartNotice: {
    added: "Added to Cart!",
    addedDesc: "Item has been successfully added to your sacred cart."
  }
}

/**
 * Category metadata for dedicated /myshop/[category] pages
 * Provides bilingual SEO, hero content, and descriptions for each category
 */
const CATEGORY_META_GU = {
  gemstones: {
    slug: "gemstones",
    name: "રત્નો અને ઉપરત્નો",
    nameEn: "Gemstones",
    icon: "Gem",
    heroTitle: "પ્રમાણિત વૈદિક રત્ન સંગ્રહ",
    heroSubtitle: "સરકારી માન્ય લેબ સર્ટિફિકેટ સાથે ૧૦૦% કુદરતી, અસલી અને મંત્ર-સિદ્ધ ગ્રહ રત્નો. ગુરુ ગ્રહ કૃપા, સૂર્ય-શુક્ર-શનિ ગ્રહ દોષ શાંતિ માટે ઉત્તમ.",
    heroBadge: "Lab Certified Vedic Gemstones",
    seoTitle: "પ્રમાણિત રત્નો | Gemstones - MyShop | The Astro Code",
    seoDescription: "૧૦૦% કુદરતી, લેબ ટેસ્ટેડ અને વૈદિક મંત્રોથી અભિમંત્રિત રત્નો. પીળો પોખરાજ, માણેક, પન્ના, નીલમ અને અન્ય ગ્રહ રત્નો.",
    description: "અમારી પાસે ગ્રહ-નક્ષત્ર આધારિત ઉચ્ચ ગુણવત્તાવાળા કુદરતી રત્નો ઉપલબ્ધ છે. દરેક રત્ન સાથે સરકારી માન્ય જેમ્સ લેબ સર્ટિફિકેટ અને ચોક્કસ પ્રાણ પ્રતિષ્ઠા ગેરંટી.",
    productCount: 24
  },
  rudraksha: {
    slug: "rudraksha",
    name: "પ્રાકૃતિક રૂદ્રાક્ષ",
    nameEn: "Rudraksha",
    icon: "CircleDot",
    heroTitle: "નેપાળી અસલી રૂદ્રાક્ષ સંગ્રહ",
    heroSubtitle: "૧-મુખી થી ૧૪-મુખી સુધીના ૧૦૦% ઓરિજિનલ નેપાળી રૂદ્રાક્ષ. દરેક રૂદ્રાક્ષ X-Ray લેબ પ્રમાણિત અને શાસ્ત્રોક્ત વિધિથી સિદ્ધ.",
    heroBadge: "Authentic Nepali Rudraksha",
    seoTitle: "અસલી રૂદ્રાક્ષ | Rudraksha - MyShop | The Astro Code",
    seoDescription: "૧૦૦% ઓરિજિનલ નેપાળી રૂદ્રાક્ષ - ૧ મુખી થી ૧૪ મુખી. X-Ray લેબ ટેસ્ટ સર્ટિફિકેટ સાથે વૈદિક પ્રાણ પ્રતિષ્ઠિત.",
    description: "શિવજીના અશ્રુબિંદુથી ઉત્પન્ન પવિત્ર રૂદ્રાક્ષ. દરેક દાણો X-Ray રિપોર્ટ સાથે ઉપલબ્ધ છે.",
    productCount: 18
  },
  malas: {
    slug: "malas",
    name: "રૂદ્રાક્ષ માળા અને જાપ માળા",
    nameEn: "Rudraksha Malas",
    icon: "Sparkles",
    heroTitle: "સિદ્ધ રૂદ્રાક્ષ અને જાપ માળા સંગ્રહ",
    heroSubtitle: "૧૦૮ દાણાની સિદ્ધ રૂદ્રાક્ષ માળા, તુલસી કંઠી માળા અને જાપ માળાઓ. ધ્યાન-એકાગ્રતા, ભક્તિ અને આધ્યાત્મિક ઉન્નતિ માટે ઉત્તમ.",
    heroBadge: "Energized Prayer Malas",
    seoTitle: "સિદ્ધ માળા | Malas - MyShop | The Astro Code",
    seoDescription: "૧૦૮ દાણાની સિદ્ધ રૂદ્રાક્ષ માળા, તુલસી કંઠી, જાપ માળા. ધ્યાન અને ભક્તિ માટે ઉત્તમ.",
    description: "અમારી તમામ માળાઓ ગંગાજળથી શુદ્ધિકૃત અને શિવ સ્તોત્ર અભિમંત્રિત છે.",
    productCount: 12
  },
  yantras: {
    slug: "yantras",
    name: "શ્રી યંત્ર અને પિત્તળ સામગ્રી",
    nameEn: "Shree Yantra",
    icon: "Pyramid",
    heroTitle: "સિદ્ધ શ્રી યંત્ર અને પૂજા સામગ્રી",
    heroSubtitle: "અષ્ટધાતુ મહાલક્ષ્મી યંત્ર, પારદ શિવલિંગ, નવગ્રહ યંત્ર અને અન્ય પૂજા સામગ્રી. વાસ્તુ સુધાર, ધન-સમૃદ્ધિ અને કાલસર્પ દોષ શાંતિ માટે.",
    heroBadge: "Consecrated Yantras & Sacred Items",
    seoTitle: "શ્રી યંત્ર | Yantras - MyShop | The Astro Code",
    seoDescription: "અષ્ટધાતુ સિદ્ધ શ્રી યંત્ર, મહાલક્ષ્મી યંત્ર, પારદ શિવલિંગ. ધન-સમૃદ્ધિ અને ગ્રહ દોષ શાંતિ.",
    description: "અમારા તમામ યંત્રો અષ્ટધાતુ (૮ ધાતુઓ) માંથી બનાવેલ અને શાસ્ત્રોક્ત વિધિથી સિદ્ધ છે.",
    productCount: 15
  },
  sphatik: {
    slug: "sphatik",
    name: "સ્ફટિક અને ક્રિસ્ટલ માળા",
    nameEn: "Sphatik Malas",
    icon: "Diamond",
    heroTitle: "શુદ્ધ હિમાલયી સ્ફટિક સંગ્રહ",
    heroSubtitle: "૧૦૦% ઓરિજિનલ હિમાલયી સ્ફટિક (Quartz Crystal) માળા અને બ્રેસલેટ. માનસિક શાંતિ, ક્રોધ નિયંત્રણ અને ધ્યાન-એકાગ્રતા માટે શ્રેષ્ઠ.",
    heroBadge: "Pure Himalayan Crystal",
    seoTitle: "સ્ફટિક માળા | Sphatik - MyShop | The Astro Code",
    seoDescription: "૧૦૦% ઓરિજિનલ હિમાલયી સ્ફટિક માળા, ક્રિસ્ટલ બ્રેસલેટ. માનસિક શાંતિ અને ધ્યાન માટે.",
    description: "અમારા સ્ફટિક ઉત્પાદનો ૧૦૦% ઓરિજિનલ Quartz Crystal છે, Indonesian કે Chinese નકલી નથી.",
    productCount: 9
  },
  kavach: {
    slug: "kavach",
    name: "રક્ષા કવચ અને વાસ્તુ સામગ્રી",
    nameEn: "Protection Kavach",
    icon: "Shield",
    heroTitle: "સિદ્ધ રક્ષા કવચ અને વાસ્તુ ઉપકરણો",
    heroSubtitle: "નજરદોષ મુક્તિ, નકારાત્મક ઊર્જા રક્ષણ, વાસ્તુ દોષ નિવારણ અને ધન-પ્રવાહ વૃદ્ધિ માટે સિદ્ધ કવચ, ગોમતી ચક્ર, ફેંગશુઈ સામગ્રી.",
    heroBadge: "Protection & Vastu Items",
    seoTitle: "રક્ષા કવચ | Kavach - MyShop | The Astro Code",
    seoDescription: "સિદ્ધ નવગ્રહ રક્ષા કવચ, ગોમતી ચક્ર, વાસ્તુ ફેંગશુઈ ઉપકરણો. નજર દોષ મુક્તિ અને ધન-વૃદ્ધિ.",
    description: "અમારા કવચ પંચધાતુ/અષ્ટધાતુથી બનેલ અને વૈદિક મંત્ર-સિદ્ધ છે. દરેક આઇટમ પ્રાણ પ્રતિષ્ઠિત ગેરંટી.",
    productCount: 14
  }
}

const CATEGORY_META_EN = {
  gemstones: {
    slug: "gemstones",
    name: "Gemstones & Upratnas",
    nameEn: "Gemstones",
    icon: "Gem",
    heroTitle: "Certified Vedic Gemstone Collection",
    heroSubtitle: "100% natural, authentic, and mantra-energized planetary gemstones with government-approved lab certificates. Perfect for Jupiter blessings, Sun-Venus-Saturn planetary remedies.",
    heroBadge: "Lab Certified Vedic Gemstones",
    seoTitle: "Certified Gemstones | MyShop | The Astro Code",
    seoDescription: "100% Natural, Lab Tested & Vedic Mantra-Energized Gemstones. Yellow Sapphire, Ruby, Emerald, Blue Sapphire and more planetary gems.",
    description: "Premium quality natural gemstones based on planetary positions. Each gemstone comes with a government-approved gems lab certificate and guaranteed Pran Pratishtha.",
    productCount: 24
  },
  rudraksha: {
    slug: "rudraksha",
    name: "Natural Rudraksha",
    nameEn: "Rudraksha",
    icon: "CircleDot",
    heroTitle: "Authentic Nepali Rudraksha Collection",
    heroSubtitle: "100% original Nepali Rudraksha from 1-Mukhi to 14-Mukhi. Every bead is X-Ray lab certified and consecrated through Vedic rituals.",
    heroBadge: "Authentic Nepali Rudraksha",
    seoTitle: "Original Rudraksha | MyShop | The Astro Code",
    seoDescription: "100% Original Nepali Rudraksha - 1 Mukhi to 14 Mukhi. X-Ray Lab Test Certified & Vedic Pran Pratishtha Energized.",
    description: "Sacred Rudraksha beads, born from Lord Shiva's divine tears. Each bead is available with X-Ray verification report.",
    productCount: 18
  },
  malas: {
    slug: "malas",
    name: "Rudraksha & Japa Malas",
    nameEn: "Rudraksha Malas",
    icon: "Sparkles",
    heroTitle: "Energized Rudraksha & Prayer Mala Collection",
    heroSubtitle: "108-bead energized Rudraksha malas, Tulsi Kanthi malas, and Japa malas. Perfect for meditation, devotion, and spiritual advancement.",
    heroBadge: "Energized Prayer Malas",
    seoTitle: "Energized Malas | MyShop | The Astro Code",
    seoDescription: "108-bead energized Rudraksha malas, Tulsi Kanthi, Japa Malas. Ideal for meditation and devotion.",
    description: "All our malas are purified with Gangajal and consecrated with Shiva Stotras.",
    productCount: 12
  },
  yantras: {
    slug: "yantras",
    name: "Shree Yantra & Brass Items",
    nameEn: "Shree Yantra",
    icon: "Pyramid",
    heroTitle: "Consecrated Shree Yantra & Puja Items",
    heroSubtitle: "Ashtadhatu Mahalakshmi Yantra, Parad Shivling, Navagraha Yantra, and more sacred puja items. For Vastu correction, wealth prosperity, and Kaal Sarp dosha shanti.",
    heroBadge: "Consecrated Yantras & Sacred Items",
    seoTitle: "Shree Yantra | MyShop | The Astro Code",
    seoDescription: "Ashtadhatu consecrated Shree Yantra, Mahalakshmi Yantra, Parad Shivling. For wealth and planetary dosha shanti.",
    description: "All our Yantras are made from Ashtadhatu (8 metals) and consecrated through Vedic rituals.",
    productCount: 15
  },
  sphatik: {
    slug: "sphatik",
    name: "Sphatik & Crystal Malas",
    nameEn: "Sphatik Malas",
    icon: "Diamond",
    heroTitle: "Pure Himalayan Sphatik Collection",
    heroSubtitle: "100% original Himalayan Sphatik (Quartz Crystal) malas and bracelets. Best for mental peace, anger control, and meditation focus.",
    heroBadge: "Pure Himalayan Crystal",
    seoTitle: "Sphatik Mala | MyShop | The Astro Code",
    seoDescription: "100% Original Himalayan Sphatik Mala, Crystal Bracelets. For mental peace and meditation.",
    description: "Our Sphatik products are 100% original Quartz Crystal, not Indonesian or Chinese replicas.",
    productCount: 9
  },
  kavach: {
    slug: "kavach",
    name: "Protection Kavach & Vastu Items",
    nameEn: "Protection Kavach",
    icon: "Shield",
    heroTitle: "Consecrated Protection Kavach & Vastu Tools",
    heroSubtitle: "For evil eye removal, negative energy protection, Vastu dosha correction, and wealth flow enhancement. Energized Kavach, Gomti Chakra, Fengshui items.",
    heroBadge: "Protection & Vastu Items",
    seoTitle: "Protection Kavach | MyShop | The Astro Code",
    seoDescription: "Consecrated Navagraha Protection Kavach, Gomti Chakra, Vastu Fengshui items. Evil eye removal & wealth enhancement.",
    description: "Our Kavach items are made from Panchdhatu/Ashtadhatu and consecrated with Vedic mantras. Every item has Pran Pratishtha guarantee.",
    productCount: 14
  }
}

export function getShopData(lang = "gu") {
  return lang === "en" ? SHOP_DATA_EN : SHOP_DATA_GU
}

export function getCategoryMeta(categorySlug, lang = "gu") {
  const meta = lang === "en" ? CATEGORY_META_EN : CATEGORY_META_GU
  return meta[categorySlug] || null
}

export function getAllCategorySlugs() {
  return Object.keys(CATEGORY_META_EN)
}

export function getCategoryProducts(categorySlug, lang = "gu") {
  const shopData = getShopData(lang)
  return shopData.products.filter(p => p.category === categorySlug)
}
