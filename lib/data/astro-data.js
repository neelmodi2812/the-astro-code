/**
 * The Astro Code - Astrological & Editorial Data Architecture
 * 
 * Supports full bilingual localization (Gujarati 'gu' and English 'en').
 * When the backend API is ready, these functions will fetch live data from the API endpoint URL.
 */

/**
 * Centralized Official Contact & Social Media Channels
 */
export const SITE_CONTACT = {
  phoneDisplay: {
    gu: "+૯૧ ૯૮૨૫૦ ૨૬૩૮૮",
    en: "+91 98250 26388"
  },
  whatsappRaw: "919825026388",
  whatsappNumber: "+91 98250 26388",
  whatsappUrl: "https://wa.me/919825026388",
  email: "contact@theastrocode.com",
  social: {
    facebook: "https://facebook.com/theastrocode",
    youtube: "https://youtube.com/@theastrocode",
    whatsappChannel: "https://whatsapp.com/channel/0029VaAstroCode",
    instagram: "https://instagram.com/theastrocode"
  }
}

/**
 * Returns a pre-filled WhatsApp direct link to the official centralized number
 */
export function getWhatsAppUrl(customMessage = "") {
  if (!customMessage) return SITE_CONTACT.whatsappUrl
  return `https://wa.me/${SITE_CONTACT.whatsappRaw}?text=${encodeURIComponent(customMessage)}`
}

export const ASTRO_DATA_GU = {
  config: {
    appName: "The Astro Code",
    tagline: "UNLOCK HAPPINESS",
    spiritualInvocation: "॥ શ્રી ગણેશાય નમઃ ॥",
    founder: {
      name: "ડૉ. વિશાલ મોદી",
      title: "Ph.D. જ્યોતિષશાસ્ત્ર • ગોલ્ડ મેડાલિસ્ટ",
      description: "તમારી કુંડળીનું સચોટ વિશ્લેષણ, કારકિર્દી, વિવાહ અને સ્વાસ્થ્ય બાબતે પ્રત્યક્ષ માર્ગદર્શન મેળવો.",
      image: "/images/author-dr-vishal-modi.jpg",
      phone: SITE_CONTACT.phoneDisplay.gu,
      whatsappUrl: SITE_CONTACT.whatsappUrl,
      location: "સિંધુ ભવન રોડ, બોડકદેવ, અમદાવાદ, ગુજરાત - ૩૮૦૦૫૪"
    },
    logoUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBl8Ogqc3Lgxek9Poh6T6awNiHzAhMkqB-5xPT0DGQw2IkT_JcEk1jrF2XWfWhUcqqZUaq2yl1BcF9KyKGZG1FSAiWJCqFng25fFCfO60PSuH_WhIrXmepmxQpoTd8-3rYz6AP2u8k4zfujF7gqSn-OOWkejaV7jSUZYd-Vx2sZp3lWu2lhhmj59HfTP35AWQGI3JD_-LdFej4UXcxM7Nt4HhU6_7DSXUONbF2fKEY14WAQjMJ59pJkcLp2sxGLtwmBKA"
  },
  topBar: {
    samvat: "વિક્રમ સંવત ૨૦૮૧ • કાર્તક સુદ પૂનમ",
    sunTimings: "અમદાવાદ સૂર્યોદય: ૦૬:૫૨ • સૂર્યાસ્ત: ૧૭:૫૪",
    shubhMuhurtaTitle: "આજનો શુભ સમય (અમૃત)",
    shubhMuhurta: "૦૮:૧૫ થી ૦૯:૪૦",
    followUs: "અનુસરો:",
    searchPlaceholder: "જ્યોતિષ, કુંડળી, ચોઘડિયા અથવા ગ્રહદોષ શોધો...",
    bookConsultation: "પરામર્શ બુક કરો"
  },
  navLinks: [
    { id: "home", label: "હોમ", href: "/", hasSubmenu: false, active: true },
    { id: "bahuchar-maa-rajwadu", label: "શ્રી બહુચર માં નું રજવાડું", href: "/article/hero-1", hasSubmenu: true },
    { id: "jyotirling", label: "બાર જ્યોતિર્લિંગ", href: "/article/jyotirling-1", hasSubmenu: true },
    { id: "dharmik", label: "ધાર્મિક & સંસ્કાર", href: "/categories", hasSubmenu: true },
    { id: "jyotishshastra", label: "જ્યોતિષશાસ્ત્ર", href: "/categories", hasSubmenu: true },
    { id: "ankashastra", label: "અંકશાસ્ત્ર", href: "/categories", hasSubmenu: true },
    { id: "dainik-panchang", label: "દૈનિક પંચાંગ", href: "/dainik-panchang", hasSubmenu: false },
    { id: "myshop", label: "MyShop સ્ટોર", href: "/myshop", hasSubmenu: false },
    { id: "more", label: "અન્ય", href: "/categories", hasSubmenu: true }
  ],
  categories: [
    { id: "ankashastra", label: "અંકશાસ્ત્ર" },
    { id: "jyotishshastra", label: "જ્યોતિષશાસ્ત્ર" },
    { id: "dharmik", label: "ધાર્મિક" },
    { id: "preranatmak", label: "પ્રેરણાત્મક" },
    { id: "jyotirling", label: "બાર જ્યોતિર્લિંગ" }
  ],
  ticker: {
    badge: "ટ્રેન્ડિંગ",
    headline: "ચૈત્રી સુદ પૂનમ એટલે શ્રી બહુચરમાં નું ચુંવાળ માં પ્રાગટ્ય • સોમનાથ મહાદેવ શ્રાવણ સ્પેશિયલ દર્શન • જાણો આજનું ભાગ્યશાળી ચોઘડિયું",
    currentChoghadiyaLabel: "હાલનું ચોઘડિયું:",
    currentChoghadiya: "લાભ (શુભ કાર્ય માટે ઉત્તમ)",
    sunsetLabel: "સૂર્યાસ્ત:",
    sunset: "૧૮:૫૬",
    seePanchang: "આજનું પંચાંગ જુઓ"
  },
  heroStories: [
    {
      id: "hero-1",
      tag: "શ્રી બહુચર માં નું રજવાડું",
      title: "ચૈત્રી સુદ પૂનમ એટલે શ્રી બહુચરમાં નું ચુંવાળ માં પ્રાગટ્ય .",
      author: "Dr.Vishal Modi",
      date: "April 12, 2025",
      image: "/images/bahucharaji-temple.jpg",
      imageAlt: "Sacred idol of Shri Bahuchar Maa adorned in rich red and gold silk attire"
    },
    {
      id: "hero-2",
      tag: "શ્રી બહુચર માં નું રજવાડું",
      title: "ચુંવાળમાં શ્રી બહુચરાજીનું પ્રાગટ્ય અને પ્રગટ પરચાઓ",
      author: "Dr.Vishal Modi",
      date: "April 11, 2025",
      image: "/images/somnath-mahadev-temple.jpg",
      imageAlt: "Magnificent entrance gate and marble spires of Bahucharaji Temple"
    },
    {
      id: "hero-3",
      tag: "શ્રી બહુચર માં નું રજવાડું",
      title: "જાણો શ્રી બહુચર માઁ વરખડીના વૃક્ષ નીચે જ કેમ પ્રગટ થયા?",
      author: "Dr.Vishal Modi",
      date: "April 10, 2025",
      image: "/images/mahakaleshwar-temple.jpg",
      imageAlt: "Ancient sacred Varkhadi tree within the temple courtyard of Bahucharaji"
    },
    {
      id: "hero-4",
      tag: "શ્રી બહુચર માં નું રજવાડું",
      title: "માં બહુચરને લાડુનો ગોખ કેમ ભરવામાં આવે છે ?",
      author: "Dr.Vishal Modi",
      date: "April 9, 2025",
      image: "/images/bahucharaji-temple.jpg",
      imageAlt: "Pious mountain of white divine sweet laddu offerings"
    }
  ],
  featuredArticles: [
    {
      id: "feat-1",
      tag: "શ્રી બહુચર માં નું રજવાડું",
      tagColor: "bg-[#fdc72d] text-[#1b1c1a]",
      title: "આજે આનંદના ગરબાનો પ્રાગટ્ય દિવસ છે.",
      description: "વલ્લભ ભટ્ટ વિરચિત આનંદના ગરબાનું માહાત્મ્ય, કળિયુગમાં મનોકામના પૂર્તિ માટે અચૂક ફળદાયી પાઠ અને આરાધના વિધિ.",
      author: "Dr. Vishal Modi",
      readTime: "૪ મિનિટ વાચન",
      image: "/images/bahucharaji-temple.jpg",
      imageAlt: "Devotional portrayal of Goddess Bahuchara seated on rooster"
    },
    {
      id: "feat-2",
      tag: "ધાર્મિક",
      tagColor: "bg-[#bb171f] text-white",
      title: "હે માં ! તારા સત્ થી તારા ભક્તોનું મહત્વ વધે છે.",
      description: "માતાજીની અખંડ કૃપા મેળવવાના સાત્વિક નિયમો, શ્રદ્ધા અને સમર્પણની અમૃતગાથા અને આદ્યશક્તિના પરચાની સત્ય ઘટનાઓ.",
      author: "Dr. Vishal Modi",
      readTime: "૫ મિનિટ વાચન",
      image: "/images/somnath-mahadev-temple.jpg",
      imageAlt: "Radiant Hindu goddess Durga riding a golden lion with divine aura"
    }
  ],
  jyotirlingasSection: {
    title: "ધાર્મિક કથાઓ & બાર જ્યોતિર્લિંગ દર્શન",
    viewAll: "બધા જુઓ"
  },
  jyotirlingas: [
    {
      id: "jyotirling-1",
      title: "સોમનાથ મહાદેવ",
      heading: "પ્રથમ જ્યોતિર્લિંગનો અલૌકિક મહિમા અને ચંદ્રદેવની તપસ્યા",
      summary: "પ્રભાસ પાટણની પવિત્ર ભૂમિ પર શિવ સ્તુતિ અને સાગર તટે ધર્મધ્વજા...",
      image: "/images/somnath-mahadev-temple.jpg"
    },
    {
      id: "jyotirling-2",
      title: "મહાકાલેશ્વર ઉજ્જૈન",
      heading: "ભસ્મ આરતીનું રહસ્ય અને કાળ પર વિજય મેળવવાની પદ્ધતિ",
      summary: "ક્ષિપ્રા તટે કાળના અધિપતિ શિવના આશીર્વાદ અને દૈવી ભસ્મ...",
      image: "/images/mahakaleshwar-temple.jpg"
    },
    {
      id: "jyotirling-3",
      title: "દ્વારકાધીશ જગત મંદિર",
      heading: "સુવર્ણ ધ્વજા પૂજન વિધિ અને બાવન ગજની ધ્વજાનું આધ્યાત્મિક મહત્વ",
      summary: "ગોમતી સંગમ તીર્થે મોક્ષદાયી કૃષ્ણ ભક્તિ અને બાવન ગજની ધ્વજા...",
      image: "/images/bahucharaji-temple.jpg"
    }
  ],
  astroInsightsSection: {
    badge: "વૈદિક જ્યોતિષ ગાઈડ",
    heading: "જ્યોતિષશાસ્ત્ર & અંકશાસ્ત્ર માર્ગદર્શન"
  },
  astroInsights: [
    {
      id: "insight-1",
      tag: "જ્યોતિષ વિશ્લેષણ",
      timeAgo: "૧૫ મિનિટ પહેલાં",
      title: "કુંડળીમાં કાલસર્પ અને પિતૃદોષ હોય તો ગભરાશો નહીં: સરળ અને પ્રમાણિત વૈદિક ઉપાયો",
      summary: "જન્મકુંડળીમાં ગ્રહોની પ્રતિકૂળતાને શાંત કરવા માટે રોજિંદા જીવનમાં કરવા જેવા ૫ સાત્વિક નિયમો.",
      image: "/images/sacred-vedic-hero.jpg"
    },
    {
      id: "insight-2",
      tag: "અંકશાસ્ત્ર રહસ્ય",
      timeAgo: "ગઈકાલે",
      title: "તમારી જન્મતારીખ મુજબ જાણો તમારો મૂળાંક અને ભાગ્યાંક: કારકિર્દી અને ધનલાભના સંકેતો",
      summary: "૧ થી ૯ અંકના સ્વામી ગ્રહો અને તમારા માટે અનુકૂળ શુભ વાર, દિશા અને રત્ન પસંદગી.",
      image: "/images/vedic-3d-mandala.jpg"
    }
  ],
  panchang: {
    widgetTitle: "દૈનિક પંચાંગ",
    muhurtaTag: "આજનું મુહૂર્ત",
    samvatTitle: "વિક્રમ સંવત ૨૦૮૧ • ચૈત્ર સુદ પૂનમ",
    choghadiyaStatus: "શુભ ચોઘડિયું",
    activeMuhurta: "અમૃત",
    buttonText: "સંપૂર્ણ કેલેન્ડર & ચોઘડિયા ખોલો",
    rows: [
      { label: "તિથિ", value: "પૂનમ (૧૮:૨૪ સુધી)" },
      { label: "નક્ષત્ર", value: "ચિત્રા નક્ષત્ર" },
      { label: "રાહુકાળ", value: "૧૦:૩૦ થી ૧૨:૦૦ (અશુભ)", isAlert: true },
      { label: "અભિજીત મુહૂર્ત", value: "૧૧:૫૮ થી ૧૨:૪૮ (શુભ)", isAuspicious: true }
    ]
  },
  consultation: {
    bookButton: "કુંડળી વિશ્લેષણ બુક કરો",
    whatsappButton: "WhatsApp પર વાતચીત કરો"
  },
  servicesSection: {
    badge: "શાસ્ત્રોક્ત વૈદિક જ્યોતિષ સેવાઓ",
    heading: "અમારી વિશિષ્ટ જ્યોતિષ અને આધ્યાત્મિક સેવાઓ",
    subheading: "ડૉ. વિશાલ મોદી (Ph.D. ગોલ્ડ મેડાલિસ્ટ) અને વરિષ્ઠ વિદ્વાનો દ્વારા ૧૦૦% શાસ્ત્રોક્ત, ગોપનીય અને સચોટ વ્યક્તિગત માર્ગદર્શન.",
    trustBadges: [
      { id: "confidential", label: "૧૦૦% સંપૂર્ણ ગોપનીયતા", icon: "ShieldCheck" },
      { id: "goldMedalist", label: "Ph.D. ગોલ્ડ મેડાલિસ્ટ જ્યોતિષી", icon: "Award" },
      { id: "experience", label: "૧૮+ વર્ષનો શાસ્ત્રોક્ત અનુભવ", icon: "Clock" },
      { id: "rating", label: "૪.૯/૫ સરેરાશ ભક્ત રેટિંગ", icon: "Star" }
    ],
    filterTabs: [
      { id: "all", label: "બધી સેવાઓ" },
      { id: "kundali", label: "કુંડળી & ભવિષ્ય" },
      { id: "consultation", label: "વિડિયો પરામર્શ" },
      { id: "vastu", label: "વાસ્તુ & અંકશાસ્ત્ર" }
    ],
    items: [
      {
        id: "service-kundali",
        category: "kundali",
        title: "જન્મકુંડળી & સંપૂર્ણ જીવન વિશ્લેષણ",
        tagline: "સૌથી લોકપ્રિય સેવા",
        badgeColor: "emerald",
        icon: "FileText",
        shortDesc: "૧૨ ભાવો, નવમાંશ ચક્ર, મહાદશા અને અંતર્દશાનું સચોટ ગાણિતિક વિશ્લેષણ સાથે કારકિર્દી, ધન અને આરોગ્ય માર્ગદર્શન.",
        highlights: [
          "૧૨ ભાવ & નવમાંશ કુંડળી વિશ્લેષણ",
          "આગામી ૫ વર્ષનું મહાદશા ફળાદેશ",
          "શાસ્ત્રોક્ત સાત્વિક ઉપાયો & રત્ન સલાહ",
          "વિગતવાર રંગીન ડિજિટલ PDF રિપોર્ટ"
        ],
        deliveryTime: "૨૪ થી ૪૮ કલાકમાં ડિલિવરી",
        deliveryFormat: "PDF રિપોર્ટ + ઑડિયો વિશ્લેષણ",
        href: "/dashboard/kundli",
        whatsappText: "નમસ્તે ડૉ. વિશાલ મોદી, મને 'જન્મકુંડળી & સંપૂર્ણ જીવન વિશ્લેષણ' સેવા બુક કરવી છે. કૃપા કરીને પ્રક્રિયા જણાવશો."
      },
      {
        id: "service-matching",
        category: "kundali",
        title: "લગ્ન મેળવક & ગુણ મિલન પરામર્શ",
        tagline: "૩૬ ગુણ મિલન & દાંપત્ય સુમેળ",
        badgeColor: "amber",
        icon: "HeartHandshake",
        shortDesc: "વર અને કન્યાની કુંડળી વચ્ચે અષ્ટકૂટ ૩૬ ગુણ મિલન, નાડી દોષ, ભકૂટ દોષ અને માંગલિક દોષનું ઊંડાણપૂર્વક પરીક્ષણ.",
        highlights: [
          "અષ્ટકૂટ ૩૬ ગુણ મિલન સ્કોર",
          "માંગલિક & નાડી દોષ સાત્વિક પરિહાર",
          "માનસિક અને ભાવનાત્મક તાલમેલ રિપોર્ટ",
          "લગ્ન સંસ્કાર માટે શ્રેષ્ઠ મુહૂર્ત નિર્ધારણ"
        ],
        deliveryTime: "ઇન્સ્ટન્ટ / ૨૪ કલાકમાં",
        deliveryFormat: "તુલનાત્મક મેચિંગ રિપોર્ટ",
        href: "/dashboard/kundli",
        whatsappText: "નમસ્તે, મને વર-કન્યા વચ્ચે 'લગ્ન મેળવક & ૩૬ ગુણ મિલન' પરામર્શ બુક કરવો છે."
      },
      {
        id: "service-video-consultation",
        category: "consultation",
        title: "૧-ઓન-૧ પર્સનલ લાઇવ વિડિયો પરામર્શ",
        tagline: "ડૉ. વિશાલ મોદી સાથે પ્રત્યક્ષ વાતચીત",
        badgeColor: "emerald",
        icon: "Video",
        shortDesc: "ડૉ. વિશાલ મોદી સાથે સીધો ૪૫ મિનિટનો ખાનગી Google Meet કૉલ. તમારા તમામ અંગત પ્રશ્નોનું સમાધાન અને લેખિત પ્રિસ્ક્રિપ્શન.",
        highlights: [
          "૪૫ મિનિટ પ્રત્યક્ષ વિડિયો સેશન",
          "અમર્યાદિત અંગત પ્રશ્નો પૂછવાની છૂટ",
          "લેખિત ઉપાય અને મંત્ર પ્રિસ્ક્રિપ્શન નોટ",
          "સંપૂર્ણ ૧૦૦% ગોપનીયતાની ગેરંટી"
        ],
        deliveryTime: "સ્લોટ બુકિંગ મુજબ (Google Meet)",
        deliveryFormat: "લાઇવ વિડિયો + પ્રિસ્ક્રિપ્શન PDF",
        href: "/dashboard/consultations",
        whatsappText: "નમસ્તે ડૉ. વિશાલ મોદી, મારે '૧-ઓન-૧ પર્સનલ વિડિયો પરામર્શ' સ્લોટ બુક કરવો છે."
      },
      {
        id: "service-dosha-shanti",
        category: "kundali",
        title: "ગ્રહદોષ & કાલસર્પ-સાડાસાતી નિવારણ",
        tagline: "શાસ્ત્રોક્ત પૂજા & યંત્ર ઉપાય",
        badgeColor: "amber",
        icon: "Flame",
        shortDesc: "કાલસર્પ દોષ, શનિ સાડાસાતી, રાહુ-કેતુ ગ્રહણ દોષ અને પિતૃદોષનું વૈદિક નિદાન તથા સિદ્ધ સાત્વિક ઉપાયો દ્વારા શમન.",
        highlights: [
          "કાલસર્પ (૧૨ પ્રકાર) ચોક્કસ નિદાન",
          "શનિ સાડાસાતી & ઢૈય્યા રક્ષા કવચ",
          "પિતૃદોષ શાંતિ અને નારાયણ બલી માર્ગદર્શન",
          "પ્રાણ પ્રતિષ્ઠિત યંત્ર & સ્ફટિક ભલામણ"
        ],
        deliveryTime: "૨૪ થી ૪૮ કલાકમાં",
        deliveryFormat: "દોષ નિવારણ ગાઇડ + વિધિ વિધાન",
        href: "/dashboard/consultations",
        whatsappText: "નમસ્તે, મને 'ગ્રહદોષ / કાલસર્પ શાંતિ નિવારણ' સેવા બાબતે શાસ્ત્રોક્ત ઉપાયો જાણવા છે."
      },
      {
        id: "service-vastu",
        category: "vastu",
        title: "પ્રાચીન વાસ્તુશાસ્ત્ર & ઉર્જા સંતુલન",
        tagline: "કોઈ પણ તોડફોડ વગર ઉપાય",
        badgeColor: "emerald",
        icon: "Compass",
        shortDesc: "ઘર, ઓફિસ, દુકાન કે ફેક્ટરીમાં અષ્ટદિશાનું ઉર્જા સંતુલન. પિરામિડ, સ્ફટિક અને ધાતુઓ દ્વારા વિના તોડફોડ વાસ્તુદોષ શમન.",
        highlights: [
          "૧૦૦% તોડફોડ વગર વૈદિક ઉપાયો",
          "નકશા (Floor Plan) ડિજિટલ વાસ્તુ ઓડિટ",
          "બ્રહ્મસ્થાન, ઈશાન & નૈઋત્ય ઉર્જા શુદ્ધિ",
          "ધંધાકીય વૃદ્ધિ અને સમૃદ્ધિ યંત્ર વિધાન"
        ],
        deliveryTime: "૪૮ કલાકમાં ઓનલાઇન ઓડિટ",
        deliveryFormat: "વાસ્તુ ઓડિટ Blueprint + રેમેડી પ્લાન",
        href: "/dashboard/consultations",
        whatsappText: "નમસ્તે ડૉ. વિશાલ મોદી, મારે મારા ઘર/ઓફિસ માટે 'વાસ્તુશાસ્ત્ર કન્સલ્ટેશન' કરાવવું છે."
      },
      {
        id: "service-numerology",
        category: "vastu",
        title: "વૈદિક અંકશાસ્ત્ર & નામ સુધારણા",
        tagline: "ભાગ્યાંક સુમેળ & બ્રાન્ડ નેમિંગ",
        badgeColor: "amber",
        icon: "Sparkles",
        shortDesc: "મૂળાંક અને ભાગ્યાંકનું ગાણિતિક સંતુલન, નવજાત શિશુનું શુભ નામકરણ, કંપની નેમ સ્પેલિંગ સુધારણા અને લકી નંબર ગાઇડ.",
        highlights: [
          "વ્યક્તિગત મૂળાંક & ભાગ્યાંક ચાર્ટ",
          "નામ સ્પેલિંગ સુધારણા (Name Correction)",
          "નવી કંપની/બ્રાન્ડ માટે શુભ નામ નિર્ધારણ",
          "લકી મોબાઇલ, વાહન અને બેંક એકાઉન્ટ નંબર"
        ],
        deliveryTime: "૨૪ થી ૪૮ કલાકમાં",
        deliveryFormat: "અંકશાસ્ત્ર વિશ્લેષણ રિપોર્ટ PDF",
        href: "/dashboard/consultations",
        whatsappText: "નમસ્તે, મને 'વૈદિક અંકશાસ્ત્ર & નામ સુધારણા' સેવા માટે માર્ગદર્શન જોઈએ છે."
      }
    ],
    bottomCta: {
      badge: "ત્વરિત સહાયતા ઉપલબ્ધ",
      title: "તમારી સમસ્યા મુજબ ચોક્કસ જ્યોતિષીય સેવા પસંદ કરવામાં મૂંઝવણ છે?",
      desc: "ડૉ. વિશાલ મોદી અને અમારી શાસ્ત્રી ટીમ સાથે WhatsApp પર સીધી વાતચીત કરી શ્રેષ્ઠ સેવા અંગે વિનામૂલ્યે માર્ગદર્શન મેળવો.",
      buttonText: "WhatsApp પર પૂછપરછ કરો",
      callText: "+૯૧ ૯૮૨૫૦ ૨૬૩૮૮",
      portalButtonText: "કુંડળી પોર્ટલમાં જાઓ"
    }
  },
  spiritualStoreSection: {
    badge: "MYSHOP વિશિષ્ટ સંગ્રહ",
    purityBadge: "૧૦૦% શુદ્ધ & વૈદિક વિધિથી સિદ્ધ",
    heading: "પ્રમાણિત પૂજા સામગ્રી & રત્ન સંગ્રહ",
    viewAllButton: "આધ્યાત્મિક સ્ટોર જુઓ",
    freeShipping: "મફત શિપિંગ",
    guarantee: "૧૦૦% પ્રાણ પ્રતિષ્ઠિત",
    addButtonText: "ઉમેરો"
  },
  products: [
    {
      id: "prod-1",
      name: "સિદ્ધ પંચમુખી રુદ્રાક્ષ માળા",
      subtitle: "૧૦૮ મણકા, નેપાળી રુદ્રાક્ષ, આયુષ્ય-શાંતિ દાયક",
      badge: "૧૦૦% અસલી",
      discount: "-૨૯%",
      rating: "૫.૦",
      reviewCount: "(૧૪૨)",
      price: "₹ ૮૫૦",
      originalPrice: "₹ ૧,૨૦૦",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8Uij9aals0za132V5pFDRMzc-0Gk8RAW1BA69iR0lxxDp0wktQ27XdDqD2txPL2kAvY-aF0Q0fwnWa_z7cay3R7hbqO0FreYHnxuO-wW1Cjs-yLH1Fzwn5SN_2p23S4_5XwokCiscZQdlQu37htOQUD4DQTYyUMamHq0QsNny4_3ymCIlqSQDMfnTArDO5n7O9sRTdVIBrAq1v28zSVR91PWbeFCwkkCdpVhPTPojl86hN_vBps2x",
      imageAlt: "Authentic energised five mukhi Panchamukhi Rudraksha Mala"
    },
    {
      id: "prod-2",
      name: "પ્રાણ પ્રતિષ્ઠિત શ્રી યંત્ર (તાંબા)",
      subtitle: "ધનવૃદ્ધિ, વેપાર ઉન્નતિ અને વાસ્તુ દોષ નિવારણ",
      badge: "શ્રી લક્ષ્મી કવચ",
      discount: "-૩૧%",
      rating: "૪.૯",
      reviewCount: "(૮૯)",
      price: "₹ ૧,૪૫૦",
      originalPrice: "₹ ૨,૧૦૦",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCxYrhHGxqBaK8Xf70ZYIChs8wfBAm4WSDTcEGbKc1U-zTZPGHTbMDrlhDj2ZaCT8djn6R80J2_RJ-vXTaRH78iUdLAJ0c9QdiVAjc4cAMbNXdAuHeQfcOVsVumpgZNPyQbeUx6Gwn3ABB952ovxFizEJwXNswDRKWK_eV1qVvMOqSRdNxetq3HGRhr6iGwh_kVM6KELA-_fuB4dMosKkFlQtCcjDKbwHvgPBAqheYlwkh16ghpxsbm",
      imageAlt: "Pure brass Shree Yantra with sacred Vedic geometric engravings"
    },
    {
      id: "prod-3",
      name: "ઓરિજિનલ સ્ફટિક માળા",
      subtitle: "માનસિક શાંતિ, એકાગ્રતા અને શીતળતા પ્રદાન કરનાર",
      badge: "શુક પ્રભાવિત",
      discount: "-૩૧%",
      rating: "૫.૦",
      reviewCount: "(૬૫)",
      price: "₹ ૧,૧૦૦",
      originalPrice: "₹ ૧,૬૦૦",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtOuNijzr4DSfcjtL96PAP_5rGNjwzR-oRGpJCvp1VxjSoSZvHqHqoIPsx9InFY8Uqp6q2tAdgGWUkE4qONU4ryrZ7ZqrwbOXrVaJvMCh_rN48Oqtdvj5erKBF083yTTojp1bM-rV4FvkeqaAYzpNLlfzXfOncGmNp_sk9OlFCWHstlX5LsYZ-MENP9I5qOjzETdwdP6T7eE4wyHoYgWyrP5SOw3JqoOe539y2pyatEfif_BlA55vX",
      imageAlt: "Natural clear pure Sphatik Quartz crystal bead meditation rosary"
    },
    {
      id: "prod-4",
      name: "પંચધાતુ લકી રક્ષા કવચ",
      subtitle: "નજરદોષ, નકારાત્મક ઊર્જા અને ગ્રહ પીડા નિવારક",
      badge: "સર્વબાધા મુક્તિ",
      discount: "-૨૫%",
      rating: "૪.૮",
      reviewCount: "(૫૪)",
      price: "₹ ૨,૧૦૦",
      originalPrice: "₹ ૨,૮૦૦",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBnxM-xr9U-bWxDFBWluwadkPtHdTvknwM3nEv3fKRYU1VY3RGFhhKysG1mvKYxZdjxhJIlsEZCqNMNS0CaZnET9rt40f-4rHNzsEwCT-5XH-IxE10_fChXF8DCX5OgImCzm8qQ_idFiJ1YCH4DWb19DhhX4dYeKgqHByXQEfpoAo_utpSdgjqZZEd5T1_G-3gvlPjzhvg598gvFeARQ5PiYIyLr5NP0HzT3-1rU2Q3qUxFteAYVjXD",
      imageAlt: "Sacred Panchdhatu astrological protective pendant kavach"
    }
  ],
  popularSection: {
    title: "વાંચકોની પસંદ"
  },
  popular: [
    {
      rank: "૧",
      title: "શ્રી બહુચર માતાજીની સ્તુતિ અને આરતી ગાવાના અદભુત નિયમો",
      reads: "૧૨,૪૫૦ વાંચન"
    },
    {
      rank: "૨",
      title: "ઘરમાં સુખ-સમૃદ્ધિ માટે કઈ દિશામાં દીવો પ્રગટાવવો શ્રેષ્ઠ છે?",
      reads: "૯,૩૨૦ વાંચન"
    },
    {
      rank: "૩",
      title: "શનિની સાડાસાતી દરમિયાન ભૂલથી પણ ન કરો આ ૩ કાર્યો",
      reads: "૭,૮૫૦ વાંચન"
    }
  ],
  social: [
    { platform: "Facebook", count: "3,233", label: "Fans", color: "text-[#1877F2]" },
    { platform: "X", count: "309", label: "Followers", color: "text-foreground" },
    { platform: "YouTube", count: "1.15K", label: "Subscribers", color: "text-[#FF0000]" }
  ],
  newsletter: {
    tag: "દૈનિક સુવિચાર & રાશિફળ",
    title: "મેળવો દૈનિક રાશિફળ અને શુભ મુહૂર્ત તમારા WhatsApp પર",
    subtitle: "દરરોજ સવારે ૭:૦૦ વાગ્યે પંચાંગ, આજનું ચોઘડિયું અને ભવિષ્યફળ વિનામૂલ્યે મેળવો.",
    phonePrefix: "+૯૧",
    placeholder: "મોબાઇલ નંબર દાખલ કરો...",
    button: "જોડાવો",
    successMessage: "આપનો નંબર સફળતાપૂર્વક નોંધાઈ ગયો છે!"
  },
  footer: {
    about: "ધ એસ્ટ્રો કોડ એક પ્રાચીન વૈદિક જ્ઞાન અને આધુનિક આધ્યાત્મિક જીવનશૈલીનો સંગમ છે. જીવનમાં સકારાત્મક ઉર્જા, સુખ અને શાંતિના માર્ગદર્શન માટે અમે આપની સાથે છીએ.",
    dharmikTitle: "ધાર્મિક & દર્શન",
    jyotishTitle: "જ્યોતિષ & સેવાઓ",
    contactTitle: "સંપર્ક & સમાચાર પત્ર",
    followUs: "અનુસરો:",
    websiteTooltip: "અધિકૃત વેબસાઇટ",
    videoTooltip: "વિડિઓ અને સત્સંગ",
    chatTooltip: "વોટ્સએપ સહાય",
    phoneLabel: "ફોન:",
    emailLabel: "ઇમેઇલ:",
    contactEmail: "contact@theastrocode.com",
    emailNote: "દૈનિક રાશિફળ અને શુભ મુહૂર્ત મેળવો:",
    emailPlaceholder: "તમારું ઇમેઇલ દાખલ કરો...",
    emailButton: "જોડાવો",
    emailSuccess: "આભાર! આપનું સબ્સ્ક્રિપ્શન થઈ ગયું છે.",
    copyright: "© ૨૦૨૫ The Astro Code. સર્વાધિકાર સુરક્ષિત. આધ્યાત્મિક સેવાઓ ભાવિક જનોના હિતાર્થે.",
    aboutUs: "અમારા વિશે",
    privacy: "ગોપનીયતા નીતિ",
    terms: "નિયમો અને શરતો",
    help: "સહાય કેન્દ્ર"
  }
}

export const ASTRO_DATA_EN = {
  config: {
    appName: "The Astro Code",
    tagline: "UNLOCK HAPPINESS",
    spiritualInvocation: "॥ Shree Ganeshay Namah ॥",
    founder: {
      name: "Dr. Vishal Modi",
      title: "Ph.D. in Vedic Astrology • Gold Medalist",
      description: "Get personalized horoscope analysis, career, matrimonial, and health consultation directly.",
      image: "/images/author-dr-vishal-modi.jpg",
      phone: SITE_CONTACT.phoneDisplay.en,
      whatsappUrl: SITE_CONTACT.whatsappUrl,
      location: "Sindhu Bhavan Road, Bodakdev, Ahmedabad, Gujarat - 380054"
    },
    logoUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBl8Ogqc3Lgxek9Poh6T6awNiHzAhMkqB-5xPT0DGQw2IkT_JcEk1jrF2XWfWhUcqqZUaq2yl1BcF9KyKGZG1FSAiWJCqFng25fFCfO60PSuH_WhIrXmepmxQpoTd8-3rYz6AP2u8k4zfujF7gqSn-OOWkejaV7jSUZYd-Vx2sZp3lWu2lhhmj59HfTP35AWQGI3JD_-LdFej4UXcxM7Nt4HhU6_7DSXUONbF2fKEY14WAQjMJ59pJkcLp2sxGLtwmBKA"
  },
  topBar: {
    samvat: "Vikram Samvat 2081 • Kartak Sud Poonam",
    sunTimings: "Ahmedabad Sunrise: 06:52 AM • Sunset: 05:54 PM",
    shubhMuhurtaTitle: "Today's Auspicious Time (Amrit)",
    shubhMuhurta: "08:15 AM to 09:40 AM",
    followUs: "Follow:",
    searchPlaceholder: "Search Astrology, Kundali, Choghadiya, or Dosha remedies...",
    bookConsultation: "Book Consultation"
  },
  navLinks: [
    { id: "home", label: "Home", href: "/", hasSubmenu: false, active: true },
    { id: "bahuchar-maa-rajwadu", label: "Shri Bahuchar Maa Rajwadu", href: "/article/hero-1", hasSubmenu: true },
    { id: "jyotirling", label: "12 Jyotirlingas", href: "/article/jyotirling-1", hasSubmenu: true },
    { id: "dharmik", label: "Spiritual & Rituals", href: "/categories", hasSubmenu: true },
    { id: "jyotishshastra", label: "Vedic Astrology", href: "/categories", hasSubmenu: true },
    { id: "ankashastra", label: "Numerology", href: "/categories", hasSubmenu: true },
    { id: "dainik-panchang", label: "Dainik Panchang", href: "/dainik-panchang", hasSubmenu: false },
    { id: "myshop", label: "MyShop Store", href: "/myshop", hasSubmenu: false },
    { id: "more", label: "More", href: "/categories", hasSubmenu: true }
  ],
  categories: [
    { id: "ankashastra", label: "Numerology" },
    { id: "jyotishshastra", label: "Vedic Astrology" },
    { id: "dharmik", label: "Spiritual" },
    { id: "preranatmak", label: "Inspirational" },
    { id: "jyotirling", label: "12 Jyotirlingas" }
  ],
  ticker: {
    badge: "TRENDING",
    headline: "Chaitra Sud Poonam marks Divine Appearance of Shri Bahuchar Maa in Chunval • Somnath Mahadev Shravan Special • Discover Lucky Choghadiya",
    currentChoghadiyaLabel: "Current Choghadiya:",
    currentChoghadiya: "Labh (Auspicious for Important Tasks)",
    sunsetLabel: "Sunset:",
    sunset: "06:56 PM",
    seePanchang: "View Today's Panchang"
  },
  heroStories: [
    {
      id: "hero-1",
      tag: "Shri Bahuchar Maa Rajwadu",
      title: "Chaitri Sud Poonam: Divine Manifestation of Shri Bahuchar Maa in Chunval.",
      author: "Dr. Vishal Modi",
      date: "April 12, 2025",
      image: "/images/bahucharaji-temple.jpg",
      imageAlt: "Sacred idol of Shri Bahuchar Maa adorned in rich red and gold silk attire"
    },
    {
      id: "hero-2",
      tag: "Shri Bahuchar Maa Rajwadu",
      title: "Divine Appearance of Shri Bahucharaji in Chunval and Holy Miracles",
      author: "Dr. Vishal Modi",
      date: "April 11, 2025",
      image: "/images/somnath-mahadev-temple.jpg",
      imageAlt: "Magnificent entrance gate and marble spires of Bahucharaji Temple"
    },
    {
      id: "hero-3",
      tag: "Shri Bahuchar Maa Rajwadu",
      title: "Why Did Shri Bahuchar Maa Manifest Under the Sacred Varkhadi Tree?",
      author: "Dr. Vishal Modi",
      date: "April 10, 2025",
      image: "/images/mahakaleshwar-temple.jpg",
      imageAlt: "Ancient sacred Varkhadi tree within the temple courtyard of Bahucharaji"
    },
    {
      id: "hero-4",
      tag: "Shri Bahuchar Maa Rajwadu",
      title: "Why is the Sacred Niche of Ladu (Sweet Offering) Filled for Maa Bahuchar?",
      author: "Dr. Vishal Modi",
      date: "April 9, 2025",
      image: "/images/bahucharaji-temple.jpg",
      imageAlt: "Pious mountain of white divine sweet laddu offerings"
    }
  ],
  featuredArticles: [
    {
      id: "feat-1",
      tag: "Shri Bahuchar Maa Rajwadu",
      tagColor: "bg-[#fdc72d] text-[#1b1c1a]",
      title: "Today Marks the Auspicious Manifestation Day of Anand No Garbo.",
      description: "The divine significance of Anand No Garbo composed by poet Vallabh Bhatt, sacred recitations for wish fulfillment.",
      author: "Dr. Vishal Modi",
      readTime: "4 min read",
      image: "/images/bahucharaji-temple.jpg",
      imageAlt: "Devotional portrayal of Goddess Bahuchara seated on rooster"
    },
    {
      id: "feat-2",
      tag: "Spiritual",
      tagColor: "bg-[#bb171f] text-white",
      title: "O Mother! By your divine truth, the glory of your devotees shines.",
      description: "Sattvic principles for attaining eternal grace of the divine Mother, immortal tales of devotion and faith.",
      author: "Dr. Vishal Modi",
      readTime: "5 min read",
      image: "/images/somnath-mahadev-temple.jpg",
      imageAlt: "Radiant Hindu goddess Durga riding a golden lion with divine aura"
    }
  ],
  jyotirlingasSection: {
    title: "Sacred Tales & 12 Jyotirlinga Darshan",
    viewAll: "View All"
  },
  jyotirlingas: [
    {
      id: "jyotirling-1",
      title: "Somnath Mahadev",
      heading: "Supernatural Glory of the First Jyotirlinga & Penance of Chandra Deva",
      summary: "Devotion to Lord Shiva on the sacred shores of Prabhas Patan by the roaring Arabian Sea...",
      image: "/images/somnath-mahadev-temple.jpg"
    },
    {
      id: "jyotirling-2",
      title: "Mahakaleshwar Ujjain",
      heading: "Secrets of Bhasma Aarti and Victory Over Time and Mortality",
      summary: "Blessings of the Lord of Time Mahakal on Shipra riverbanks with holy Bhasma ritual...",
      image: "/images/mahakaleshwar-temple.jpg"
    },
    {
      id: "jyotirling-3",
      title: "Dwarkadhish Jagat Mandir",
      heading: "Golden Flag Puja Ritual and Spiritual Eminence of the 52-Yard Dhwaja",
      summary: "Liberating Krishna devotion where holy Gomti meets ocean in Dwarka holy city...",
      image: "/images/bahucharaji-temple.jpg"
    }
  ],
  astroInsightsSection: {
    badge: "Vedic Astrology Guide",
    heading: "Vedic Astrology & Numerology Guidance"
  },
  astroInsights: [
    {
      id: "insight-1",
      tag: "Astrological Analysis",
      timeAgo: "15 mins ago",
      title: "Do Not Fear Kalsarp and Pitru Dosha in Your Kundali: Simple Proven Vedic Remedies",
      summary: "5 practical sattvic disciplines in daily life to pacify challenging planetary configurations.",
      image: "/images/sacred-vedic-hero.jpg"
    },
    {
      id: "insight-2",
      tag: "Numerology Secrets",
      timeAgo: "Yesterday",
      title: "Discover Your Root and Destiny Number by Birthdate: Indicators of Career & Prosperity",
      summary: "Ruling planets of numbers 1 to 9, favorable days, directions, and gemstone recommendations.",
      image: "/images/vedic-3d-mandala.jpg"
    }
  ],
  panchang: {
    widgetTitle: "Daily Panchang",
    muhurtaTag: "Today's Muhurta",
    samvatTitle: "Vikram Samvat 2081 • Chaitra Sud Poonam",
    choghadiyaStatus: "Auspicious Choghadiya",
    activeMuhurta: "Amrit",
    buttonText: "Open Complete Calendar & Choghadiya",
    rows: [
      { label: "Tithi", value: "Poonam (Until 18:24)" },
      { label: "Nakshatra", value: "Chitra Nakshatra" },
      { label: "Rahu Kaal", value: "10:30 to 12:00 (Inauspicious)", isAlert: true },
      { label: "Abhijit Muhurta", value: "11:58 to 12:48 (Auspicious)", isAuspicious: true }
    ]
  },
  consultation: {
    bookButton: "Book Kundali Analysis",
    whatsappButton: "Chat on WhatsApp"
  },
  servicesSection: {
    badge: "AUTHENTIC VEDIC ASTROLOGY SERVICES",
    heading: "Our Premier Astrological & Spiritual Services",
    subheading: "100% scriptural, highly accurate, and confidential personalized guidance by Dr. Vishal Modi (Ph.D. Gold Medalist) and senior Vedic scholars.",
    trustBadges: [
      { id: "confidential", label: "100% Confidentiality Guaranteed", icon: "ShieldCheck" },
      { id: "goldMedalist", label: "Ph.D. Gold Medalist Astrologer", icon: "Award" },
      { id: "experience", label: "18+ Years Scriptural Experience", icon: "Clock" },
      { id: "rating", label: "4.9/5 Average Seeker Rating", icon: "Star" }
    ],
    filterTabs: [
      { id: "all", label: "All Services" },
      { id: "kundali", label: "Kundali & Destiny" },
      { id: "consultation", label: "Video Consultation" },
      { id: "vastu", label: "Vastu & Numerology" }
    ],
    items: [
      {
        id: "service-kundali",
        category: "kundali",
        title: "Janam Kundali & Complete Life Prediction",
        tagline: "Most Popular Service",
        badgeColor: "emerald",
        icon: "FileText",
        shortDesc: "Comprehensive mathematical analysis of 12 Bhavas, Navamsha chart, Mahadasha, and Antardasha with career, wealth, and health forecasts.",
        highlights: [
          "12 Bhavas & Navamsha Chart Analysis",
          "Next 5-Year Mahadasha Predictions",
          "Scriptural Sattvic Remedies & Gemstones",
          "Detailed High-Resolution PDF Dossier"
        ],
        deliveryTime: "Delivery within 24 to 48 Hours",
        deliveryFormat: "PDF Report + Audio Briefing",
        href: "/dashboard/kundli",
        whatsappText: "Hello Dr. Vishal Modi, I would like to book the 'Janam Kundali & Life Prediction' service. Please share details."
      },
      {
        id: "service-matching",
        category: "kundali",
        title: "Kundli Matching & 36 Guna Milan",
        tagline: "36 Guna Milan & Marital Harmony",
        badgeColor: "amber",
        icon: "HeartHandshake",
        shortDesc: "In-depth Ashtakoot 36 Guna Milan, Nadi Dosha, Bhakoot, and Manglik assessment between prospective bride and groom.",
        highlights: [
          "Ashtakoot 36 Guna Compatibility Score",
          "Manglik & Nadi Dosha Mitigation",
          "Psychological & Emotional Harmony Check",
          "Auspicious Vivah Muhurta Selection"
        ],
        deliveryTime: "Instant / Within 24 Hours",
        deliveryFormat: "Comparative Matching Report",
        href: "/dashboard/kundli",
        whatsappText: "Hello, I want to book a 'Kundli Matching & 36 Guna Milan' consultation for marriage."
      },
      {
        id: "service-video-consultation",
        category: "consultation",
        title: "1-on-1 Personal Live Video Consultation",
        tagline: "Direct 1-on-1 with Dr. Vishal Modi",
        badgeColor: "emerald",
        icon: "Video",
        shortDesc: "Direct 45-minute private Google Meet session with Dr. Vishal Modi. In-depth resolution of all life queries with written remedy prescription.",
        highlights: [
          "45-Minute Private Video Session",
          "Ask Unlimited Personal Life Questions",
          "Personalized Remedy & Mantra Prescription",
          "100% Confidentiality & Discretion Guarantee"
        ],
        deliveryTime: "As per booked slot (Google Meet)",
        deliveryFormat: "Live Video + Digital Prescription PDF",
        href: "/dashboard/consultations",
        whatsappText: "Hello Dr. Vishal Modi, I would like to book a 1-on-1 Personal Video Consultation slot."
      },
      {
        id: "service-dosha-shanti",
        category: "kundali",
        title: "Planetary Dosha & Kaal Sarp Shanti",
        tagline: "Scriptural Puja & Yantra Remedies",
        badgeColor: "amber",
        icon: "Flame",
        shortDesc: "Scriptural Vedic diagnosis and pacification of Kaal Sarp Dosha, Shani Sade Sati, Rahu-Ketu afflictions, and Pitru Dosha.",
        highlights: [
          "Precise Diagnosis of 12 Kaal Sarp Types",
          "Shani Sade Sati & Dhaiya Armor",
          "Pitru Dosha Shanti & Puja Guidance",
          "Energized Yantra & Crystal Recommendations"
        ],
        deliveryTime: "Within 24 to 48 Hours",
        deliveryFormat: "Dosha Remedy Prescription Guide",
        href: "/dashboard/consultations",
        whatsappText: "Hello, I need guidance regarding Planetary Dosha / Kaal Sarp Shanti remedies."
      },
      {
        id: "service-vastu",
        category: "vastu",
        title: "Ancient Vastu Shastra & Spatial Harmony",
        tagline: "Remedies Without Demolition",
        badgeColor: "emerald",
        icon: "Compass",
        shortDesc: "Harmonizing the 8 directional energies of residences, commercial establishments, and factories using pyramids and consecrated crystals.",
        highlights: [
          "100% Non-Destructive Vedic Remedies",
          "Architectural Floor Plan Energy Audit",
          "Brahmasthan, Ishan & Nairutya Purification",
          "Commercial Prosperity & Growth Yantras"
        ],
        deliveryTime: "Online Audit within 48 Hours",
        deliveryFormat: "Vastu Audit Blueprint + Remedy Plan",
        href: "/dashboard/consultations",
        whatsappText: "Hello Dr. Vishal Modi, I would like to get a Vastu Shastra consultation for my property."
      },
      {
        id: "service-numerology",
        category: "vastu",
        title: "Vedic Numerology & Name Correction",
        tagline: "Destiny Number Harmony & Brand Naming",
        badgeColor: "amber",
        icon: "Sparkles",
        shortDesc: "Harmonizing Mulank and Bhagyank, auspicious baby naming, business enterprise phonetic spelling optimization, and lucky numbers.",
        highlights: [
          "Personalized Mulank & Bhagyank Synthesis",
          "Phonetic Name Spelling Correction",
          "Auspicious Enterprise & Brand Naming",
          "Lucky Mobile, Vehicle & Account Numbers"
        ],
        deliveryTime: "Within 24 to 48 Hours",
        deliveryFormat: "Numerology Chart & Report PDF",
        href: "/dashboard/consultations",
        whatsappText: "Hello, I want to book a Vedic Numerology & Name Correction consultation."
      }
    ],
    bottomCta: {
      badge: "Instant Assistance Available",
      title: "Unsure which astrological service best addresses your current dilemma?",
      desc: "Connect directly with Dr. Vishal Modi and our Vedic scholars via WhatsApp for complimentary guidance on choosing the right remedy.",
      buttonText: "Inquire via WhatsApp",
      callText: "+91 98250 26388",
      portalButtonText: "Open Kundli Portal"
    }
  },
  spiritualStoreSection: {
    badge: "MYSHOP EXCLUSIVE COLLECTION",
    purityBadge: "100% Pure & Vedic Consecrated",
    heading: "Certified Puja Samagri & Sacred Gemstones",
    viewAllButton: "View Spiritual Store",
    freeShipping: "Free Shipping",
    guarantee: "100% Consecrated",
    addButtonText: "Add"
  },
  products: [
    {
      id: "prod-1",
      name: "Siddha 5-Mukhi Rudraksha Mala",
      subtitle: "108 beads, Nepali Rudraksha, longevity & peace giver",
      badge: "100% Authentic",
      discount: "-29%",
      rating: "5.0",
      reviewCount: "(142)",
      price: "₹ 850",
      originalPrice: "₹ 1,200",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8Uij9aals0za132V5pFDRMzc-0Gk8RAW1BA69iR0lxxDp0wktQ27XdDqD2txPL2kAvY-aF0Q0fwnWa_z7cay3R7hbqO0FreYHnxuO-wW1Cjs-yLH1Fzwn5SN_2p23S4_5XwokCiscZQdlQu37htOQUD4DQTYyUMamHq0QsNny4_3ymCIlqSQDMfnTArDO5n7O9sRTdVIBrAq1v28zSVR91PWbeFCwkkCdpVhPTPojl86hN_vBps2x",
      imageAlt: "Authentic energised five mukhi Panchamukhi Rudraksha Mala"
    },
    {
      id: "prod-2",
      name: "Consecrated Copper Shree Yantra",
      subtitle: "Wealth growth, business prosperity & Vastu dosha removal",
      badge: "Shree Lakshmi Kavach",
      discount: "-31%",
      rating: "4.9",
      reviewCount: "(89)",
      price: "₹ 1,450",
      originalPrice: "₹ 2,100",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCxYrhHGxqBaK8Xf70ZYIChs8wfBAm4WSDTcEGbKc1U-zTZPGHTbMDrlhDj2ZaCT8djn6R80J2_RJ-vXTaRH78iUdLAJ0c9QdiVAjc4cAMbNXdAuHeQfcOVsVumpgZNPyQbeUx6Gwn3ABB952ovxFizEJwXNswDRKWK_eV1qVvMOqSRdNxetq3HGRhr6iGwh_kVM6KELA-_fuB4dMosKkFlQtCcjDKbwHvgPBAqheYlwkh16ghpxsbm",
      imageAlt: "Pure brass Shree Yantra with sacred Vedic geometric engravings"
    },
    {
      id: "prod-3",
      name: "Original Sphatik Crystal Mala",
      subtitle: "Mental peace, concentration & coolness giver",
      badge: "Venus Energized",
      discount: "-31%",
      rating: "5.0",
      reviewCount: "(65)",
      price: "₹ 1,100",
      originalPrice: "₹ 1,600",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtOuNijzr4DSfcjtL96PAP_5rGNjwzR-oRGpJCvp1VxjSoSZvHqHqoIPsx9InFY8Uqp6q2tAdgGWUkE4qONU4ryrZ7ZqrwbOXrVaJvMCh_rN48Oqtdvj5erKBF083yTTojp1bM-rV4FvkeqaAYzpNLlfzXfOncGmNp_sk9OlFCWHstlX5LsYZ-MENP9I5qOjzETdwdP6T7eE4wyHoYgWyrP5SOw3JqoOe539y2pyatEfif_BlA55vX",
      imageAlt: "Natural clear pure Sphatik Quartz crystal bead meditation rosary"
    },
    {
      id: "prod-4",
      name: "Panchdhatu Lucky Raksha Kavach",
      subtitle: "Protection against evil eye, negative energy & planetary afflictions",
      badge: "Obstacle Free",
      discount: "-25%",
      rating: "4.8",
      reviewCount: "(54)",
      price: "₹ 2,100",
      originalPrice: "₹ 2,800",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBnxM-xr9U-bWxDFBWluwadkPtHdTvknwM3nEv3fKRYU1VY3RGFhhKysG1mvKYxZdjxhJIlsEZCqNMNS0CaZnET9rt40f-4rHNzsEwCT-5XH-IxE10_fChXF8DCX5OgImCzm8qQ_idFiJ1YCH4DWb19DhhX4dYeKgqHByXQEfpoAo_utpSdgjqZZEd5T1_G-3gvlPjzhvg598gvFeARQ5PiYIyLr5NP0HzT3-1rU2Q3qUxFteAYVjXD",
      imageAlt: "Sacred Panchdhatu astrological protective pendant kavach"
    }
  ],
  popularSection: {
    title: "Readers' Choice - Most Popular"
  },
  popular: [
    {
      rank: "1",
      title: "Sacred Rules for Chanting Stuti and Aarti of Shri Bahuchar Mataji",
      reads: "12,450 reads"
    },
    {
      rank: "2",
      title: "Which Direction is Best to Light a Diya for Prosperity at Home?",
      reads: "9,320 reads"
    },
    {
      rank: "3",
      title: "Never Do These 3 Things During Shani Sade Sati Period",
      reads: "7,850 reads"
    }
  ],
  social: [
    { platform: "Facebook", count: "3,233", label: "Fans", color: "text-[#1877F2]" },
    { platform: "X", count: "309", label: "Followers", color: "text-foreground" },
    { platform: "YouTube", count: "1.15K", label: "Subscribers", color: "text-[#FF0000]" }
  ],
  newsletter: {
    tag: "DAILY INSPIRATION & HOROSCOPE",
    title: "Get Daily Horoscope and Auspicious Muhurta on WhatsApp",
    subtitle: "Receive Panchang, daily Choghadiya, and future predictions free every morning at 7:00 AM.",
    phonePrefix: "+91",
    placeholder: "Enter Mobile Number...",
    button: "Join (Free)",
    successMessage: "Your phone number has been registered successfully!"
  },
  footer: {
    about: "The Astro Code unites ancient Vedic wisdom with modern spiritual living, guiding seekers toward positivity, happiness, and peace.",
    dharmikTitle: "Spiritual & Darshan",
    jyotishTitle: "Astrology & Services",
    contactTitle: "Contact & Newsletter",
    followUs: "Follow:",
    websiteTooltip: "Official Website",
    videoTooltip: "Videos & Satsang",
    chatTooltip: "WhatsApp Support",
    phoneLabel: "Phone:",
    emailLabel: "Email:",
    contactEmail: "contact@theastrocode.com",
    emailNote: "Get Daily Rashifal and Auspicious Muhurat:",
    emailPlaceholder: "Enter your email address...",
    emailButton: "Subscribe",
    emailSuccess: "Thank you! You are subscribed.",
    copyright: "© 2025 The Astro Code. All Rights Reserved. Spiritual guidance for devotees.",
    aboutUs: "About Us",
    privacy: "Privacy Policy",
    terms: "Terms & Conditions",
    help: "Help Center"
  }
}

/**
 * Returns localized dataset for current language ('gu' or 'en').
 */
export function getAstroData(lang = "gu") {
  return lang === "en" ? ASTRO_DATA_EN : ASTRO_DATA_GU
}

