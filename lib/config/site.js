import { SITE_CONTACT, getWhatsAppUrl } from "./contact"

export { SITE_CONTACT, getWhatsAppUrl }

export function getSiteShell(lang = "gu") {
  const isEn = lang === "en"
  return {
    config: {
      appName: "The Astro Code",
      tagline: isEn ? "UNLOCK HAPPINESS • VEDIC SPIRITUAL PORTAL" : "UNLOCK HAPPINESS • વૈદિક અધ્યાત્મ પોર્ટલ",
      spiritualInvocation: isEn ? "॥ Shree Ganeshay Namah ॥" : "॥ શ્રી ગણેશાય નમઃ ॥",
      founder: {
        name: isEn ? "Dr. Vishal Modi" : "ડૉ. વિશાલ મોદી",
        title: isEn ? "Ph.D. in Vedic Astrology • Gold Medalist" : "Ph.D. જ્યોતિષશાસ્ત્ર • ગોલ્ડ મેડાલિસ્ટ",
        description: isEn
          ? "Get personalized horoscope analysis, career, matrimonial, and health consultation directly."
          : "તમારી કુંડળીનું સચોટ વિશ્લેષણ, કારકિર્દી, વિવાહ અને સ્વાસ્થ્ય બાબતે પ્રત્યક્ષ માર્ગદર્શન મેળવો.",
        image: "/images/author-dr-vishal-modi.jpg",
        phone: isEn ? SITE_CONTACT.phoneDisplay.en : SITE_CONTACT.phoneDisplay.gu,
        whatsappUrl: SITE_CONTACT.whatsappUrl,
        location: isEn
          ? "Sindhu Bhavan Road, Bodakdev, Ahmedabad, Gujarat - 380054"
          : "સિંધુ ભવન રોડ, બોડકદેવ, અમદાવાદ, ગુજરાત - ૩૮૦૦૫૪",
      },
      logoUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBl8Ogqc3Lgxek9Poh6T6awNiHzAhMkqB-5xPT0DGQw2IkT_JcEk1jrF2XWfWhUcqqZUaq2yl1BcF9KyKGZG1FSAiWJCqFng25fFCfO60PSuH_WhIrXmepmxQpoTd8-3rYz6AP2u8k4zfujF7gqSn-OOWkejaV7jSUZYd-Vx2sZp3lWu2lhhmj59HfTP35AWQGI3JD_-LdFej4UXcxM7Nt4HhU6_7DSXUONbF2fKEY14WAQjMJ59pJkcLp2sxGLtwmBKA",
    },
    topBar: {
      samvat: isEn ? "Vikram Samvat 2081 • Chaitra Sud Poonam" : "વિક્રમ સંવત ૨૦૮૧ • ચૈત્ર સુદ પૂનમ",
      sunTimings: isEn ? "Ahmedabad Sunrise: 06:52 • Sunset: 17:54" : "અમદાવાદ સૂર્યોદય: ૦૬:૫૨ • સૂર્યાસ્ત: ૧૭:૫૪",
      shubhMuhurtaTitle: isEn ? "Today's Auspicious Muhurta" : "આજનો શુભ સમય",
      shubhMuhurta: "૦૮:૧૫ થી ૦૯:૪૦",
      followUs: isEn ? "Follow:" : "અનુસરો:",
      searchPlaceholder: isEn ? "Search astrology, kundali, choghadiya..." : "જ્યોતિષ, કુંડળી, ચોઘડિયા અથવા ગ્રહદોષ શોધો...",
      bookConsultation: isEn ? "Book Consultation" : "પરામર્શ બુક કરો",
    },
    navLinks: [
      { id: "home", label: isEn ? "Home" : "હોમ", href: "/", hasSubmenu: false, active: true },
      { id: "dainik-panchang", label: isEn ? "Dainik Panchang" : "દૈનિક પંચાંગ", href: "/dainik-panchang", hasSubmenu: false },
      { id: "myshop", label: isEn ? "MyShop Store" : "MyShop સ્ટોર", href: "/myshop", hasSubmenu: false },
      { id: "more", label: isEn ? "More" : "વધુ", href: "/categories", hasSubmenu: true },
    ],
    categories: [],
    ticker: {
      badge: isEn ? "TRENDING" : "ટ્રેન્ડિંગ",
      headline: isEn ? "Welcome to The Astro Code - Unlock Happiness with Vedic Astrology" : "ધ એસ્ટ્રો કોડમાં આપનું સ્વાગત છે - શાસ્ત્રોક્ત વૈદિક જ્યોતિષ અને પવિત્ર દર્શન",
      currentChoghadiyaLabel: isEn ? "Current Choghadiya:" : "હાલનું ચોઘડિયું:",
      currentChoghadiya: isEn ? "Amrit (Auspicious)" : "અમૃત (શુભ કાર્ય માટે ઉત્તમ)",
      sunsetLabel: isEn ? "Sunset:" : "સૂર્યાસ્ત:",
      sunset: "૧૮:૫૬",
      seePanchang: isEn ? "View Today's Panchang" : "આજનું પંચાંગ જુઓ",
    },
    heroStories: [],
    featuredArticles: [],
    jyotirlingasSection: {
      title: isEn ? "Sacred Tales & 12 Jyotirlinga Darshan" : "ધાર્મિક કથાઓ & બાર જ્યોતિર્લિંગ દર્શન",
      viewAll: isEn ? "View All" : "બધા જુઓ",
    },
    jyotirlingas: [],
    astroInsightsSection: {
      badge: isEn ? "Vedic Astrology Guide" : "વૈદિક જ્યોતિષ ગાઈડ",
      heading: isEn ? "Astrology & Numerology Guidance" : "જ્યોતિષશાસ્ત્ર & અંકશાસ્ત્ર માર્ગદર્શન",
    },
    astroInsights: [],
    panchang: {
      widgetTitle: isEn ? "Daily Panchang" : "દૈનિક પંચાંગ",
      muhurtaTag: isEn ? "Today's Muhurta" : "આજનું મુહૂર્ત",
      samvatTitle: isEn ? "Vikram Samvat 2081 • Chaitra Sud Poonam" : "વિક્રમ સંવત ૨૦૮૧ • ચૈત્ર સુદ પૂનમ",
      choghadiyaStatus: isEn ? "Auspicious Choghadiya" : "શુભ ચોઘડિયું",
      activeMuhurta: isEn ? "Amrit" : "અમૃત",
      buttonText: isEn ? "Open Complete Calendar & Choghadiya" : "સંપૂર્ણ કેલેન્ડર & ચોઘડિયા ખોલો",
      rows: [
        { label: isEn ? "Tithi" : "તિથિ", value: isEn ? "Poonam" : "પૂનમ" },
        { label: isEn ? "Nakshatra" : "નક્ષત્ર", value: isEn ? "Chitra" : "ચિત્રા" },
        { label: isEn ? "Rahu Kaal" : "રાહુકાળ", value: "૧૦:૩૦ થી ૧૨:૦૦", isAlert: true },
        { label: isEn ? "Abhijit Muhurta" : "અભિજીત મુહૂર્ત", value: "૧૧:૫૮ થી ૧૨:૪૮", isAuspicious: true },
      ],
    },
    consultation: {
      bookButton: isEn ? "Book Kundali Analysis" : "કુંડળી વિશ્લેષણ બુક કરો",
      whatsappButton: isEn ? "Chat on WhatsApp" : "WhatsApp પર વાતચીત કરો",
    },
    servicesSection: {
      badge: isEn ? "AUTHENTIC VEDIC ASTROLOGY SERVICES" : "શાસ્ત્રોક્ત વૈદિક જ્યોતિષ સેવાઓ",
      heading: isEn ? "Our Premier Astrological & Spiritual Services" : "અમારી વિશિષ્ટ જ્યોતિષ અને આધ્યાત્મિક સેવાઓ",
      subheading: isEn
        ? "100% scriptural, highly accurate, and confidential personalized guidance by Dr. Vishal Modi (Ph.D. Gold Medalist) and senior Vedic scholars."
        : "ડૉ. વિશાલ મોદી (Ph.D. ગોલ્ડ મેડાલિસ્ટ) અને વરિષ્ઠ વિદ્વાનો દ્વારા ૧૦૦% શાસ્ત્રોક્ત, ગોપનીય અને સચોટ વ્યક્તિગત માર્ગદર્શન.",
      trustBadges: [
        { id: "confidential", label: isEn ? "100% Confidentiality" : "૧૦૦% સંપૂર્ણ ગોપનીયતા", icon: "ShieldCheck" },
        { id: "goldMedalist", label: isEn ? "Ph.D. Gold Medalist Astrologer" : "Ph.D. ગોલ્ડ મેડાલિસ્ટ જ્યોતિષી", icon: "Award" },
        { id: "experience", label: isEn ? "18+ Years Scriptural Experience" : "૧૮+ વર્ષનો શાસ્ત્રોક્ત અનુભવ", icon: "Clock" },
        { id: "rating", label: isEn ? "4.9/5 Seeker Rating" : "૪.૯/૫ સરેરાશ ભક્ત રેટિંગ", icon: "Star" },
      ],
      filterTabs: [
        { id: "all", label: isEn ? "All Services" : "બધી સેવાઓ" },
        { id: "kundali", label: isEn ? "Kundali & Destiny" : "કુંડળી & ભવિષ્ય" },
        { id: "consultation", label: isEn ? "Video Consultation" : "વિડિયો પરામર્શ" },
        { id: "vastu", label: isEn ? "Vastu & Numerology" : "વાસ્તુ & અંકશાસ્ત્ર" },
      ],
      items: [
        {
          id: "service-kundali",
          category: "kundali",
          title: isEn ? "Janam Kundali & Complete Life Prediction" : "જન્મકુંડળી & સંપૂર્ણ જીવન વિશ્લેષણ",
          tagline: isEn ? "Most Popular Service" : "સૌથી લોકપ્રિય સેવા",
          badgeColor: "emerald",
          icon: "FileText",
          shortDesc: isEn
            ? "Comprehensive mathematical analysis of 12 Bhavas, Navamsha chart, Mahadasha, and Antardasha."
            : "૧૨ ભાવો, નવમાંશ ચક્ર, મહાદશા અને અંતર્દશાનું સચોટ ગાણિતિક વિશ્લેષણ સાથે કારકિર્દી, ધન અને આરોગ્ય માર્ગદર્શન.",
          highlights: isEn
            ? ["12 Bhavas & Navamsha Chart Analysis", "Next 5-Year Mahadasha Predictions", "Scriptural Sattvic Remedies & Gemstones", "Detailed Digital PDF Report"]
            : ["૧૨ ભાવ & નવમાંશ કુંડળી વિશ્લેષણ", "આગામી ૫ વર્ષનું મહાદશા ફળાદેશ", "શાસ્ત્રોક્ત સાત્વિક ઉપાયો & રત્ન સલાહ", "વિગતવાર રંગીન ડિજિટલ PDF રિપોર્ટ"],
          deliveryTime: isEn ? "Delivery within 24 to 48 Hours" : "૨૪ થી ૪૮ કલાકમાં ડિલિવરી",
          deliveryFormat: isEn ? "PDF Report + Audio Briefing" : "PDF રિપોર્ટ + ઑડિયો વિશ્લેષણ",
          href: "/dashboard/kundli",
          whatsappText: isEn ? "Hello Dr. Vishal Modi, I would like to book the Janam Kundali service." : "નમસ્તે ડૉ. વિશાલ મોદી, મને 'જન્મકુંડળી & સંપૂર્ણ જીવન વિશ્લેષણ' સેવા બુક કરવી છે.",
        },
        {
          id: "service-matching",
          category: "kundali",
          title: isEn ? "Kundli Matching & 36 Guna Milan" : "લગ્ન મેળવક & ગુણ મિલન પરામર્શ",
          tagline: isEn ? "36 Guna Milan & Marital Harmony" : "૩૬ ગુણ મિલન & દાંપત્ય સુમેળ",
          badgeColor: "amber",
          icon: "HeartHandshake",
          shortDesc: isEn
            ? "In-depth Ashtakoot 36 Guna Milan, Nadi Dosha, Bhakoot, and Manglik assessment."
            : "વર અને કન્યાની કુંડળી વચ્ચે અષ્ટકૂટ ૩૬ ગુણ મિલન, નાડી દોષ, ભકૂટ દોષ અને માંગલિક દોષનું ઊંડાણપૂર્વક પરીક્ષણ.",
          highlights: isEn
            ? ["Ashtakoot 36 Guna Compatibility Score", "Manglik & Nadi Dosha Mitigation", "Psychological & Emotional Harmony", "Auspicious Vivah Muhurta"]
            : ["અષ્ટકૂટ ૩૬ ગુણ મિલન સ્કોર", "માંગલિક & નાડી દોષ સાત્વિક પરિહાર", "માનસિક અને ભાવનાત્મક તાલમેલ રિપોર્ટ", "લગ્ન સંસ્કાર માટે શ્રેષ્ઠ મુહૂર્ત નિર્ધારણ"],
          deliveryTime: isEn ? "Instant / Within 24 Hours" : "ઇન્સ્ટન્ટ / ૨૪ કલાકમાં",
          deliveryFormat: isEn ? "Comparative Matching Report" : "તુલનાત્મક મેચિંગ રિપોર્ટ",
          href: "/dashboard/kundli",
          whatsappText: isEn ? "Hello, I want to book a Kundli Matching consultation." : "નમસ્તે, મને વર-કન્યા વચ્ચે 'લગ્ન મેળવક & ૩૬ ગુણ મિલન' પરામર્શ બુક કરવો છે.",
        },
        {
          id: "service-video-consultation",
          category: "consultation",
          title: isEn ? "1-on-1 Personal Live Video Consultation" : "૧-ઓન-૧ પર્સનલ લાઇવ વિડિયો પરામર્શ",
          tagline: isEn ? "Direct 1-on-1 with Dr. Vishal Modi" : "ડૉ. વિશાલ મોદી સાથે પ્રત્યક્ષ વાતચીત",
          badgeColor: "emerald",
          icon: "Video",
          shortDesc: isEn
            ? "Direct 45-minute private session with Dr. Vishal Modi. In-depth resolution of all life queries."
            : "ડૉ. વિશાલ મોદી સાથે સીધો ૪૫ મિનિટનો ખાનગી કૉલ. તમારા તમામ અંગત પ્રશ્નોનું સમાધાન અને લેખિત પ્રિસ્ક્રિપ્શન.",
          highlights: isEn
            ? ["45-Minute Private Video Session", "Ask Unlimited Personal Questions", "Written Remedy & Mantra Prescription", "100% Confidentiality Guarantee"]
            : ["૪૫ મિનિટ પ્રત્યક્ષ વિડિયો સેશન", "અમર્યાદિત અંગત પ્રશ્નો પૂછવાની છૂટ", "લેખિત ઉપાય અને મંત્ર પ્રિસ્ક્રિપ્શન નોટ", "સંપૂર્ણ ૧૦૦% ગોપનીયતાની ગેરંટી"],
          deliveryTime: isEn ? "As per booked slot" : "સ્લોટ બુકિંગ મુજબ",
          deliveryFormat: isEn ? "Live Video + Digital Prescription" : "લાઇવ વિડિયો + પ્રિસ્ક્રિપ્શન PDF",
          href: "/dashboard/consultations",
          whatsappText: isEn ? "Hello Dr. Vishal Modi, I would like to book a 1-on-1 video consultation." : "નમસ્તે ડૉ. વિશાલ મોદી, મારે '૧-ઓન-૧ પર્સનલ વિડિયો પરામર્શ' સ્લોટ બુક કરવો છે.",
        },
      ],
      bottomCta: {
        badge: isEn ? "Instant Assistance Available" : "ત્વરિત સહાયતા ઉપલબ્ધ",
        title: isEn ? "Unsure which astrological service best addresses your dilemma?" : "તમારી સમસ્યા મુજબ ચોક્કસ જ્યોતિષીય સેવા પસંદ કરવામાં મૂંઝવણ છે?",
        desc: isEn
          ? "Connect directly with Dr. Vishal Modi via WhatsApp for guidance on choosing the right remedy."
          : "ડૉ. વિશાલ મોદી અને અમારી શાસ્ત્રી ટીમ સાથે WhatsApp પર સીધી વાતચીત કરી શ્રેષ્ઠ સેવા અંગે વિનામૂલ્યે માર્ગદર્શન મેળવો.",
        buttonText: isEn ? "Inquire via WhatsApp" : "WhatsApp પર પૂછપરછ કરો",
        callText: isEn ? SITE_CONTACT.phoneDisplay.en : SITE_CONTACT.phoneDisplay.gu,
        portalButtonText: isEn ? "Open Kundli Portal" : "કુંડળી પોર્ટલમાં જાઓ",
      },
    },
    spiritualStoreSection: {
      badge: isEn ? "MYSHOP EXCLUSIVE COLLECTION" : "MYSHOP વિશિષ્ટ સંગ્રહ",
      purityBadge: isEn ? "100% Pure & Vedic Consecrated" : "૧૦૦% શુદ્ધ & વૈદિક વિધિથી સિદ્ધ",
      heading: isEn ? "Certified Puja Samagri & Sacred Gemstones" : "પ્રમાણિત પૂજા સામગ્રી & રત્ન સંગ્રહ",
      viewAllButton: isEn ? "View Spiritual Store" : "આધ્યાત્મિક સ્ટોર જુઓ",
      freeShipping: isEn ? "Free Shipping" : "મફત શિપિંગ",
      guarantee: isEn ? "100% Consecrated" : "૧૦૦% પ્રાણ પ્રતિષ્ઠિત",
      addButtonText: isEn ? "Add" : "ઉમેરો",
    },
    products: [],
    popularSection: {
      title: isEn ? "Readers' Choice - Most Popular" : "વાંચકોની પસંદ",
    },
    popular: [],
    social: [
      { platform: "Facebook", count: "28K", label: isEn ? "Fans" : "ફોલોઅર્સ", color: "text-[#1877F2]" },
      { platform: "YouTube", count: "15K", label: isEn ? "Subs" : "સબસ્ક્રાઇબર", color: "text-[#FF0000]" },
      { platform: "X", count: "309", label: isEn ? "Followers" : "ફોલોઅર્સ", color: "text-foreground" },
    ],
    newsletter: {
      tag: isEn ? "DAILY THOUGHTS & HOROSCOPE" : "દૈનિક સુવિચાર & રાશિફળ",
      title: isEn ? "Get Daily Horoscope and Auspicious Muhurta on WhatsApp" : "મેળવો દૈનિક રાશિફળ અને શુભ મુહૂર્ત તમારા WhatsApp પર",
      subtitle: isEn ? "Receive daily morning panchang, lucky choghadiya, and rashifal for free." : "દરરોજ સવારે ૭:૦૦ વાગ્યે પંચાંગ, આજનું ચોઘડિયું અને ભવિષ્યફળ વિનામૂલ્યે મેળવો.",
      phonePrefix: isEn ? "+91" : "+૯૧",
      placeholder: isEn ? "Enter mobile number..." : "મોબાઇલ નંબર દાખલ કરો...",
      button: isEn ? "Join (Free)" : "જોડાવો (Free)",
    },
    footer: {
      aboutText: isEn
        ? "The Astro Code is Gujarat's premier scriptural Vedic astrology portal by Dr. Vishal Modi (Ph.D. Gold Medalist)."
        : "ધ એસ્ટ્રો કોડ એ ગુજરાતનું અગ્રણી શાસ્ત્રોક્ત વૈદિક જ્યોતિષ અને સનાતન સંસ્કૃતિ પોર્ટલ છે, જેનું સંચાલન ગોલ્ડ મેડાલિસ્ટ જ્યોતિષાચાર્ય ડૉ. વિશાલ મોદી કરે છે.",
      contactEmail: "contact@theastrocode.com",
    },
  }
}

