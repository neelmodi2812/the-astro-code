/**
 * The Astro Code - Astrological & Editorial Data Architecture
 * 
 * Supports full bilingual localization (Gujarati 'gu' and English 'en').
 * When the backend API is ready, these functions will fetch live data from the API endpoint URL.
 */

export const ASTRO_DATA_GU = {
  config: {
    appName: "The Astro Code",
    tagline: "UNLOCK HAPPINESS",
    spiritualInvocation: "॥ શ્રી ગણેશાય નમઃ ॥",
    founder: {
      name: "ડૉ. વિશાલ મોદી",
      title: "Ph.D. જ્યોતિષશાસ્ત્ર • ગોલ્ડ મેડાલિસ્ટ",
      description: "તમારી કુંડળીનું સચોટ વિશ્લેષણ, કારકિર્દી, વિવાહ અને સ્વાસ્થ્ય બાબતે પ્રત્યક્ષ માર્ગદર્શન મેળવો.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZFBXexCd0t6yOz7CMbXbM6FnzEAd207Dy7jPa_kJvzRXjiigq5gHQUQdqToeXFlFI1deo_Ab4OVv2fNPBiBiAYTfDte0SilYEqr1arECX02LB3fnkH_gfCsLJ3BK2H9bZBAgugnR5nqVAA9QuPEOzVhbo6lbXYh3iSNON0FMQWcAV3XH-2NpDnao1PPZqsTYeul4tflFK62pT3AksEJEmjqPmOir_HhqtcbLsuXkRwlmuirfcUmgf",
      phone: "+૯૧ ૯૮૨૫૦ ૦૦૦૦૦",
      whatsappUrl: "https://wa.me/919825000000",
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
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMWfSaYXAy1lsWGdvjsxa6hcdTvTgJDfgE8wfMjFChjn8scg_n-jUSUcbtEYMAsZ4NovgMoaR7HxO9JE7AacA-QPL9-_5SOyhajoKXK1pv89ypKUMh_J9ZTt48hR7kv0u5sbs4DdVi1_665a2HNovHnvawvQBvAN3UqIg_BfZMEZ4e3tYzFxchTcpL3lO0pDHama5vLn2k-3EOoCvLB6_SlMYip_DqVdJ1aPZ7n22ZmdY8Nt9HgIE4",
      imageAlt: "Sacred idol of Shri Bahuchar Maa adorned in rich red and gold silk attire"
    },
    {
      id: "hero-2",
      tag: "શ્રી બહુચર માં નું રજવાડું",
      title: "ચુંવાળમાં શ્રી બહુચરાજીનું પ્રાગટ્ય અને પ્રગટ પરચાઓ",
      author: "Dr.Vishal Modi",
      date: "April 11, 2025",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAiEOcs6lCu7yCuLG3mzCwDhO1FrGt_SKNh3dB0fMxJDCze0zfm4FDM-qvoKHefNjPRt2slwgnklqehWcWvb7tNJJZiSEsg4xauWKIeKq4KGKqIkprHflPpm9whVP-J_hqKLLibHPS-8098jTIB33-0lmjsCq5I4sE1x_StwAkdrV6XcHwYw-Bejh88-BAlzu5S_gksf2ymyML2ZHUVrD5cMZXlgY3gJvXYqHcMzDlINTA2yRcxExzS",
      imageAlt: "Magnificent entrance gate and marble spires of Bahucharaji Temple"
    },
    {
      id: "hero-3",
      tag: "શ્રી બહુચર માં નું રજવાડું",
      title: "જાણો શ્રી બહુચર માઁ વરખડીના વૃક્ષ નીચે જ કેમ પ્રગટ થયા?",
      author: "Dr.Vishal Modi",
      date: "April 10, 2025",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhQs079295nlOD1CX6fWKDz7V8Co7Fne_qMT_ikE9oNLUgFaPwhSSesMYN72UwUN0K9QK7dqpVAndlpQ-PNSUdqooV02prsOL7HY5clJZCY4zjN1QZK1eqilmy6IeXDBTVzDGMC9Tw2haxb9vy2UXsFm3klG5S0vU_lKuGDHL-aVZILr8tIKetU1dQ67eKDMYe2YRi6eQ9bLTO63nFCZmNgHGddYMvYWCEN5Fx0GltT4lXdYZ4-bTG",
      imageAlt: "Ancient sacred Varkhadi tree within the temple courtyard of Bahucharaji"
    },
    {
      id: "hero-4",
      tag: "શ્રી બહુચર માં નું રજવાડું",
      title: "માં બહુચરને લાડુનો ગોખ કેમ ભરવામાં આવે છે ?",
      author: "Dr.Vishal Modi",
      date: "April 9, 2025",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCT1OeWbqv8mxJZ8O8ttDVXsIDknFrswb4pYefHYy9bIvfC1EgjLCoSYSUSvR7xp3VAa3jQ3tT3eVSCOt_NXGvXSJYWINO41u11Sxb4Vyn9QEJm9QN4GqPzweHi8-RTpBoX3pygPnJWkQ0rKAQjMCceEEt2b-wYGKVw0ESTgliRF4Kngmp88pYzQbUI3NLvwZKRz8A7_TbAQjRc5h1M5ZyCs5GUTjO2Usy_75O7CB9ECGiAeM50vX3e",
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
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCiBaTaLuyH2OHV_92s77HLcR2Lr-PSrXA3Czitw7ItH3w1BYm7CJDHzbwdvkogdABerBxta8GwWTketDLd5Ni1lE5f_KOwjOjThklFkCmk2zEFcKAlp1s5hSGT2B5DvXk-bTlGXDFUVYpeJuJtbgkG7E_bjpXl1yERHe2wVj_3DnFV5U42rzInV7gilgL5dVIjB1r3q2mhwqHim7XLlDcmFS64aRP4pns6ocfo-h_S7XxHsAOEoCCS",
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
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCrh_3-7eJgxSpNAHPLRV9JAXz0HE7vZ3xt11xHz3ZunOnnMXjVwDCOucsKMYnvpeL45Oz2aheLxhJA9XHW6lV7icMLc-3MyXWknbrteMZQmutfuPyPM30rTpn2GKCDtiTnxHUtJGXvt91qXEmehhuVLcpjG04-pHYSKGM8jJ5nDUhZu7lPzt0oXucGrDuRcJycGtijpT9M04CX-kSVw6O2c9ubABTiw8dP04WA99PdWS47VnWNN2pY",
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
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgoqW5Ax-IzST1XPudbkwO-GeCid31lg8_GaUvKwzgZpLGK6AfwLsYc_W8GtBntXFmhdeWH8z1MYiI4eirTo7DpqGTorcgAIf6_tlcSUGSgk9Xl9EoXOPHK8xW1HOLEx-HOFF2fcnlEufQBywDYTTQprSacg8-Y5zO1wfZ3FHSnv6THe-rkW5_lLPOEpfdLknROaNYu0GjkzkEDqmb5FWJegUYpKO5qOV8mc9bn4AkzBPaePrUmVwA"
    },
    {
      id: "jyotirling-2",
      title: "મહાકાલેશ્વર ઉજ્જૈન",
      heading: "ભસ્મ આરતીનું રહસ્ય અને કાળ પર વિજય મેળવવાની પદ્ધતિ",
      summary: "ક્ષિપ્રા તટે કાળના અધિપતિ શિવના આશીર્વાદ અને દૈવી ભસ્મ...",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA20di33ZcB_-NFQysM-tFtZJ2LktYl6CmW01aO15iW2PYWBwo7C1-Q_jNePynNPRfxseWqpX3nuVImRH1v3is0v49gMn93oZgRydKRzTgF0B3fgVTILzf1M2DR2vekEuhM0Hoc2CnSauJqlZFG0_Y0ypXmpqJES6e7-tpS1BIfxKkQID2IRf6GG7nrLZdZc2DY6c83yvakAK-MMnTXvnpWT0I0a6avhqDFM4mS09YGp2bj7eIABLWO"
    },
    {
      id: "jyotirling-3",
      title: "દ્વારકાધીશ જગત મંદિર",
      heading: "સુવર્ણ ધ્વજા પૂજન વિધિ અને બાવન ગજની ધ્વજાનું આધ્યાત્મિક મહત્વ",
      summary: "ગોમતી સંગમ તીર્થે મોક્ષદાયી કૃષ્ણ ભક્તિ અને બાવન ગજની ધ્વજા...",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBXt4Pw8lHi-CSKoTeekwd1wsMXgsrqYbK0ZKivag-STr_R91vgi08lwAGj-WvOPe9Gg7MAWziJkF0Y40_qvc6fUeOEGIO3WFsEFx4uD-uTFg8cdTWH5EwojDRiTpu8KRvrOy14bzFGrRoGwIskfk4Bq9kcd9QOa_qiBSHINovT_Qc5K1BNyq-WmbSXDU1uoqUOMs-yMnNDX0JrcTEEyBicI83c2gHNv7aJNXVYgPBdQ15QXQr68wQ7"
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
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtOuNijzr4DSfcjtL96PAP_5rGNjwzR-oRGpJCvp1VxjSoSZvHqHqoIPsx9InFY8Uqp6q2tAdgGWUkE4qONU4ryrZ7ZqrwbOXrVaJvMCh_rN48Oqtdvj5erKBF083yTTojp1bM-rV4FvkeqaAYzpNLlfzXfOncGmNp_sk9OlFCWHstlX5LsYZ-MENP9I5qOjzETdwdP6T7eE4wyHoYgWyrP5SOw3JqoOe539y2pyatEfif_BlA55vX"
    },
    {
      id: "insight-2",
      tag: "અંકશાસ્ત્ર રહસ્ય",
      timeAgo: "ગઈકાલે",
      title: "તમારી જન્મતારીખ મુજબ જાણો તમારો મૂળાંક અને ભાગ્યાંક: કારકિર્દી અને ધનલાભના સંકેતો",
      summary: "૧ થી ૯ અંકના સ્વામી ગ્રહો અને તમારા માટે અનુકૂળ શુભ વાર, દિશા અને રત્ન પસંદગી.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBnxM-xr9U-bWxDFBWluwadkPtHdTvknwM3nEv3fKRYU1VY3RGFhhKysG1mvKYxZdjxhJIlsEZCqNMNS0CaZnET9rt40f-4rHNzsEwCT-5XH-IxE10_fChXF8DCX5OgImCzm8qQ_idFiJ1YCH4DWb19DhhX4dYeKgqHByXQEfpoAo_utpSdgjqZZEd5T1_G-3gvlPjzhvg598gvFeARQ5PiYIyLr5NP0HzT3-1rU2Q3qUxFteAYVjXD"
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
    title: "વાંચકોની પસંદ - MOST POPULAR"
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
    button: "જોડાવો (Free)",
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
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZFBXexCd0t6yOz7CMbXbM6FnzEAd207Dy7jPa_kJvzRXjiigq5gHQUQdqToeXFlFI1deo_Ab4OVv2fNPBiBiAYTfDte0SilYEqr1arECX02LB3fnkH_gfCsLJ3BK2H9bZBAgugnR5nqVAA9QuPEOzVhbo6lbXYh3iSNON0FMQWcAV3XH-2NpDnao1PPZqsTYeul4tflFK62pT3AksEJEmjqPmOir_HhqtcbLsuXkRwlmuirfcUmgf",
      phone: "+91 98250 00000",
      whatsappUrl: "https://wa.me/919825000000",
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
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMWfSaYXAy1lsWGdvjsxa6hcdTvTgJDfgE8wfMjFChjn8scg_n-jUSUcbtEYMAsZ4NovgMoaR7HxO9JE7AacA-QPL9-_5SOyhajoKXK1pv89ypKUMh_J9ZTt48hR7kv0u5sbs4DdVi1_665a2HNovHnvawvQBvAN3UqIg_BfZMEZ4e3tYzFxchTcpL3lO0pDHama5vLn2k-3EOoCvLB6_SlMYip_DqVdJ1aPZ7n22ZmdY8Nt9HgIE4",
      imageAlt: "Sacred idol of Shri Bahuchar Maa adorned in rich red and gold silk attire"
    },
    {
      id: "hero-2",
      tag: "Shri Bahuchar Maa Rajwadu",
      title: "Divine Appearance of Shri Bahucharaji in Chunval and Holy Miracles",
      author: "Dr. Vishal Modi",
      date: "April 11, 2025",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAiEOcs6lCu7yCuLG3mzCwDhO1FrGt_SKNh3dB0fMxJDCze0zfm4FDM-qvoKHefNjPRt2slwgnklqehWcWvb7tNJJZiSEsg4xauWKIeKq4KGKqIkprHflPpm9whVP-J_hqKLLibHPS-8098jTIB33-0lmjsCq5I4sE1x_StwAkdrV6XcHwYw-Bejh88-BAlzu5S_gksf2ymyML2ZHUVrD5cMZXlgY3gJvXYqHcMzDlINTA2yRcxExzS",
      imageAlt: "Magnificent entrance gate and marble spires of Bahucharaji Temple"
    },
    {
      id: "hero-3",
      tag: "Shri Bahuchar Maa Rajwadu",
      title: "Why Did Shri Bahuchar Maa Manifest Under the Sacred Varkhadi Tree?",
      author: "Dr. Vishal Modi",
      date: "April 10, 2025",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhQs079295nlOD1CX6fWKDz7V8Co7Fne_qMT_ikE9oNLUgFaPwhSSesMYN72UwUN0K9QK7dqpVAndlpQ-PNSUdqooV02prsOL7HY5clJZCY4zjN1QZK1eqilmy6IeXDBTVzDGMC9Tw2haxb9vy2UXsFm3klG5S0vU_lKuGDHL-aVZILr8tIKetU1dQ67eKDMYe2YRi6eQ9bLTO63nFCZmNgHGddYMvYWCEN5Fx0GltT4lXdYZ4-bTG",
      imageAlt: "Ancient sacred Varkhadi tree within the temple courtyard of Bahucharaji"
    },
    {
      id: "hero-4",
      tag: "Shri Bahuchar Maa Rajwadu",
      title: "Why is the Sacred Niche of Ladu (Sweet Offering) Filled for Maa Bahuchar?",
      author: "Dr. Vishal Modi",
      date: "April 9, 2025",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCT1OeWbqv8mxJZ8O8ttDVXsIDknFrswb4pYefHYy9bIvfC1EgjLCoSYSUSvR7xp3VAa3jQ3tT3eVSCOt_NXGvXSJYWINO41u11Sxb4Vyn9QEJm9QN4GqPzweHi8-RTpBoX3pygPnJWkQ0rKAQjMCceEEt2b-wYGKVw0ESTgliRF4Kngmp88pYzQbUI3NLvwZKRz8A7_TbAQjRc5h1M5ZyCs5GUTjO2Usy_75O7CB9ECGiAeM50vX3e",
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
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCiBaTaLuyH2OHV_92s77HLcR2Lr-PSrXA3Czitw7ItH3w1BYm7CJDHzbwdvkogdABerBxta8GwWTketDLd5Ni1lE5f_KOwjOjThklFkCmk2zEFcKAlp1s5hSGT2B5DvXk-bTlGXDFUVYpeJuJtbgkG7E_bjpXl1yERHe2wVj_3DnFV5U42rzInV7gilgL5dVIjB1r3q2mhwqHim7XLlDcmFS64aRP4pns6ocfo-h_S7XxHsAOEoCCS",
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
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCrh_3-7eJgxSpNAHPLRV9JAXz0HE7vZ3xt11xHz3ZunOnnMXjVwDCOucsKMYnvpeL45Oz2aheLxhJA9XHW6lV7icMLc-3MyXWknbrteMZQmutfuPyPM30rTpn2GKCDtiTnxHUtJGXvt91qXEmehhuVLcpjG04-pHYSKGM8jJ5nDUhZu7lPzt0oXucGrDuRcJycGtijpT9M04CX-kSVw6O2c9ubABTiw8dP04WA99PdWS47VnWNN2pY",
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
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgoqW5Ax-IzST1XPudbkwO-GeCid31lg8_GaUvKwzgZpLGK6AfwLsYc_W8GtBntXFmhdeWH8z1MYiI4eirTo7DpqGTorcgAIf6_tlcSUGSgk9Xl9EoXOPHK8xW1HOLEx-HOFF2fcnlEufQBywDYTTQprSacg8-Y5zO1wfZ3FHSnv6THe-rkW5_lLPOEpfdLknROaNYu0GjkzkEDqmb5FWJegUYpKO5qOV8mc9bn4AkzBPaePrUmVwA"
    },
    {
      id: "jyotirling-2",
      title: "Mahakaleshwar Ujjain",
      heading: "Secrets of Bhasma Aarti and Victory Over Time and Mortality",
      summary: "Blessings of the Lord of Time Mahakal on Shipra riverbanks with holy Bhasma ritual...",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA20di33ZcB_-NFQysM-tFtZJ2LktYl6CmW01aO15iW2PYWBwo7C1-Q_jNePynNPRfxseWqpX3nuVImRH1v3is0v49gMn93oZgRydKRzTgF0B3fgVTILzf1M2DR2vekEuhM0Hoc2CnSauJqlZFG0_Y0ypXmpqJES6e7-tpS1BIfxKkQID2IRf6GG7nrLZdZc2DY6c83yvakAK-MMnTXvnpWT0I0a6avhqDFM4mS09YGp2bj7eIABLWO"
    },
    {
      id: "jyotirling-3",
      title: "Dwarkadhish Jagat Mandir",
      heading: "Golden Flag Puja Ritual and Spiritual Eminence of the 52-Yard Dhwaja",
      summary: "Liberating Krishna devotion where holy Gomti meets ocean in Dwarka holy city...",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBXt4Pw8lHi-CSKoTeekwd1wsMXgsrqYbK0ZKivag-STr_R91vgi08lwAGj-WvOPe9Gg7MAWziJkF0Y40_qvc6fUeOEGIO3WFsEFx4uD-uTFg8cdTWH5EwojDRiTpu8KRvrOy14bzFGrRoGwIskfk4Bq9kcd9QOa_qiBSHINovT_Qc5K1BNyq-WmbSXDU1uoqUOMs-yMnNDX0JrcTEEyBicI83c2gHNv7aJNXVYgPBdQ15QXQr68wQ7"
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
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtOuNijzr4DSfcjtL96PAP_5rGNjwzR-oRGpJCvp1VxjSoSZvHqHqoIPsx9InFY8Uqp6q2tAdgGWUkE4qONU4ryrZ7ZqrwbOXrVaJvMCh_rN48Oqtdvj5erKBF083yTTojp1bM-rV4FvkeqaAYzpNLlfzXfOncGmNp_sk9OlFCWHstlX5LsYZ-MENP9I5qOjzETdwdP6T7eE4wyHoYgWyrP5SOw3JqoOe539y2pyatEfif_BlA55vX"
    },
    {
      id: "insight-2",
      tag: "Numerology Secrets",
      timeAgo: "Yesterday",
      title: "Discover Your Root and Destiny Number by Birthdate: Indicators of Career & Prosperity",
      summary: "Ruling planets of numbers 1 to 9, favorable days, directions, and gemstone recommendations.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBnxM-xr9U-bWxDFBWluwadkPtHdTvknwM3nEv3fKRYU1VY3RGFhhKysG1mvKYxZdjxhJIlsEZCqNMNS0CaZnET9rt40f-4rHNzsEwCT-5XH-IxE10_fChXF8DCX5OgImCzm8qQ_idFiJ1YCH4DWb19DhhX4dYeKgqHByXQEfpoAo_utpSdgjqZZEd5T1_G-3gvlPjzhvg598gvFeARQ5PiYIyLr5NP0HzT3-1rU2Q3qUxFteAYVjXD"
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
    title: "Readers' Choice - MOST POPULAR"
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

/**
 * Service API Wrapper (Async)
 * Supports future remote REST / GraphQL API URL with language query param.
 */
export async function getAstroLandingData(lang = "gu") {
  const apiUrl = process.env.NEXT_PUBLIC_ASTRO_API_URL
  if (apiUrl) {
    try {
      const res = await fetch(`${apiUrl}/landing-data?lang=${lang}`, { next: { revalidate: 60 } })
      if (res.ok) {
        return await res.json()
      }
    } catch (err) {
      console.warn("Backend API not reachable, using localized fallback:", err)
    }
  }

  return getAstroData(lang)
}

// Backwards-compatible named exports
export const ASTRO_CONFIG = ASTRO_DATA_GU.config
export const TOP_BAR_DATA = ASTRO_DATA_GU.topBar
export const NAV_LINKS = ASTRO_DATA_GU.navLinks
export const CATEGORY_PILLS = ASTRO_DATA_GU.categories
export const LIVE_TICKER_DATA = ASTRO_DATA_GU.ticker
export const HERO_STORIES = ASTRO_DATA_GU.heroStories
export const FEATURED_ARTICLES = ASTRO_DATA_GU.featuredArticles
export const JYOTIRLINGA_DATA = ASTRO_DATA_GU.jyotirlingas
export const ASTRO_INSIGHTS = ASTRO_DATA_GU.astroInsights
export const PANCHANG_DETAILS = ASTRO_DATA_GU.panchang
export const STORE_PRODUCTS = ASTRO_DATA_GU.products
export const POPULAR_STORIES = ASTRO_DATA_GU.popular
export const SOCIAL_STATS = ASTRO_DATA_GU.social
