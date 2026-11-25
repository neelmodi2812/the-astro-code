/**
 * Appointment and Astrological Consultation Data Repository
 * 7-Step Astrology Consultation Booking Flow
 * Fully localized for both Gujarati ('gu') and English ('en')
 */

export const APPOINTMENT_DATA = {
  gu: {
    meta: {
      title: "જ્યોતિષ પરામર્શ અપોઇન્ટમેન્ટ બુક કરો | The Astro Code - ડૉ. વિશાલ મોદી",
      description: "ડૉ. વિશાલ મોદી (Ph.D., ગોલ્ડ મેડાલિસ્ટ) સાથે ૧-ઓન-૧ ફોન/વિડિયો કૉલ અથવા રૂબરૂ ઓફિસ કુંડળી વિશ્લેષણ, વાસ્તુશાસ્ત્ર અને ગ્રહદોષ નિવારણ માટે અપોઇન્ટમેન્ટ બુક કરો.",
      keywords: [
        "જ્યોતિષ પરામર્શ અપોઇન્ટમેન્ટ",
        "Book Astrology Appointment",
        "ડૉ. વિશાલ મોદી કુંડળી અપોઇન્ટમેન્ટ",
        "Dr. Vishal Modi Appointment",
        "Kundali Consultation Ahmedabad",
        "Vedic Astrology Appointment Booking",
        "કુંડળી વિશ્લેષણ સ્લોટ બુકિંગ",
        "Online Horoscope Consultation"
      ]
    },
    accentStrip: {
      breadcrumbHome: "મુખ્ય પૃષ્ઠ",
      breadcrumbCurrent: "પરામર્શ અપોઇન્ટમેન્ટ બુકિંગ",
    },
    hero: {
      invocation: "॥ શ્રી ગણેશાય નમઃ ॥ • ૧-ઓન-૧ વૈદિક પરામર્શ બુકિંગ",
      title: "ડૉ. વિશાલ મોદી સાથે પરામર્શ અપોઇન્ટમેન્ટ બુક કરો",
      subtitle: "તમારી જન્મકુંડળીનું ગહન વિશ્લેષણ, કારકિર્દી, વિવાહ, સ્વાસ્થ્ય, નાણાકીય પ્રશ્નો અને વાસ્તુશાસ્ત્ર માટે ભારત સરકાર પ્રમાણિત ગોલ્ડ મેડાલિસ્ટ જ્યોતિષાચાર્યનું પ્રત્યક્ષ માર્ગદર્શન.",
      experienceBadge: "૨૫+ વર્ષોનો શાસ્ત્રોક્ત અનુભવ",
      clientsBadge: "૧૫,૦૦૦+ કુંડળી વિશ્લેષણ સંપન્ન",
      flowBadge: "૭-પગલાં સરળ બુકિંગ પ્રક્રિયા"
    },
    flowHeader: {
      badge: "BOOKING FLOW",
      title: "Astrology Consultation Booking",
      subtitle: "The path a client follows from choosing a topic to confirming payment",
      titleGu: "જ્યોતિષ પરામર્શ બુકિંગ પ્રવાહ",
      subtitleGu: "વિષય પસંદગીથી લઈને ચુકવણી કન્ફર્મેશન સુધીનો સરળ ૭-તબક્કાનો માર્ગ"
    },
    steps: {
      step1: {
        number: 1,
        title: "પરામર્શ વિષય પસંદ કરો",
        titleEn: "Select Consultation Topic",
        desc: "જે ક્ષેત્ર અંગે આપ માર્ગદર્શન ઈચ્છો છો તે પસંદ કરો, જેથી જ્યોતિષી સત્ર પહેલાં તમારી કુંડળી તૈયાર કરી શકે.",
        descEn: "Choose the area of life you want guidance on, so the astrologer can prepare your chart reading before the session."
      },
      step2: {
        number: 2,
        title: "સત્રનો સમયગાળો પસંદ કરો",
        titleEn: "Select Session Duration",
        desc: "આપ કેટલો સમય પરામર્શ ઈચ્છો છો તે પસંદ કરો.",
        descEn: "Pick how long you want the consultation to be."
      },
      step3: {
        number: 3,
        title: "પરામર્શ માધ્યમ પસંદ કરો",
        titleEn: "Select Consultation Mode",
        desc: "આપ જ્યોતિષી સાથે કેવી રીતે મુલાકાત કરવા માંગો છો તે પસંદ કરો.",
        descEn: "Choose how you want to meet the astrologer."
      },
      step4: {
        number: 4,
        titleCall: "કૉલ માટે ઉપલબ્ધ તારીખો",
        titleCallEn: "Available Dates for Call",
        titleOffice: "ઓફિસ મુલાકાત માટે ઉપલબ્ધ તારીખો",
        titleOfficeEn: "Available Dates for Office",
        descCall: "કૅલેન્ડરમાં માત્ર કૉલ-ઉપલબ્ધ દિવસો (સોમવાર થી શનિવાર) દર્શાવાય છે.",
        descCallEn: "Calendar shows only call-available days (Mon-Sat).",
        descOffice: "કૅલેન્ડરમાં માત્ર ઓફિસ ખુલ્લી હોય તેવા દિવસો (મંગળવાર, ગુરુવાર, શનિવાર) દર્શાવાય છે.",
        descOfficeEn: "Calendar shows only office-open days (Tue, Thu, Sat)."
      },
      step5: {
        number: 5,
        title: "સમય સ્લોટ પસંદ કરો",
        titleEn: "Select Time Slot",
        desc: "પસંદ કરેલ તારીખે ઉપલબ્ધ સ્લોટ પસંદ કરો. સ્લોટનો સમયગાળો સ્ટેપ ૨ માં પસંદ કરેલ અવધિ મુજબ રહેશે.",
        descEn: "Pick an open slot on the chosen date. Slot length matches the session duration from Step 2."
      },
      step6: {
        number: 6,
        title: "અંગત વિગતોનું ફોર્મ",
        titleEn: "Personal Details Form",
        desc: "તમારી જન્મકુંડળી તૈયાર કરવા માટે જરૂરી વિગતો.",
        descEn: "Details needed to prepare your birth chart."
      },
      step7: {
        number: 7,
        title: "ચુકવણી અને સારાંશ",
        titleEn: "Payment",
        desc: "બુકિંગ સારાંશ (વિષય, સમયગાળો, માધ્યમ, તારીખ અને સ્લોટ) ની ચકાસણી કરો અને કન્ફર્મ કરવા સુરક્ષિત ચુકવણી કરો.",
        descEn: "Review the booking summary (topic, duration, mode, date and slot) and pay securely to confirm."
      }
    },
    doctor: {
      name: "ડૉ. વિશાલ મોદી (Ph.D.)",
      title: "વૈદિક જ્યોતિષાચાર્ય & વાસ્તુ નિષ્ણાત",
      subtitle: "ગોલ્ડ મેડાલિસ્ટ • રાષ્ટ્રપતિ સન્માનિત જ્યોતિષી",
      experience: "૨૫+ વર્ષનો શાસ્ત્રોક્ત અનુભવ",
      location: "બોડકદેવ, સિંધુ ભવન રોડ, અમદાવાદ, ગુજરાત",
      avatar: "/images/dr-vishal-modi-portrait-avatar.webp",
      features: [
        "સંપૂર્ણ જન્મપત્રિકા અને ગ્રહદશાનું ઊંડાણપૂર્વક વિશ્લેષણ",
        "શાસ્ત્રોક્ત સરળ, સાત્વિક અને સચોટ ઉપાયો",
        "કોઈ અંધશ્રદ્ધા વિના વૈજ્ઞાનિક અને તાર્કિક માર્ગદર્શન",
        "૧૦૦% અંગત વિગતોની અત્યંત કડક ગોપનીયતા"
      ]
    },
    // The 7 Topics matching Flowchart Step 1
    topics: [
      {
        id: "career",
        name: "કારકિર્દી & વ્યવસાય",
        nameEn: "Career",
        desc: "નોકરી, પ્રમોશન, નવો વ્યવસાય અને ગ્રહદશા માર્ગદર્શન",
        descEn: "Job changes, promotions, business decisions & planetary guidance",
        icon: "Briefcase"
      },
      {
        id: "marriage",
        name: "લગ્ન & કુંડળી મિલન",
        nameEn: "Marriage",
        desc: "ગુણ મિલન, માંગલિક દોષ અને લગ્ન જીવન સુમેળ",
        descEn: "Matchmaking, marriage timing & marital harmony",
        icon: "Heart"
      },
      {
        id: "relationship",
        name: "પ્રેમ & દાંપત્યજીવન",
        nameEn: "Love & Relationship",
        desc: "સંબંધોમાં સુમેળ, પ્રેમ કુંડળી અને પરિવાર સુખ",
        descEn: "Navigating relationship dynamics & love compatibility",
        icon: "Users"
      },
      {
        id: "health",
        name: "સ્વાસ્થ્ય & ગ્રહદોષ નિવારણ",
        nameEn: "Health",
        desc: "સ્વાસ્થ્ય, રોગ નિવારણ અને ગ્રહ શાંતિ ઉપાયો",
        descEn: "Astrological wellness, chronic affliction remedies & longevity",
        icon: "Activity"
      },
      {
        id: "finance",
        name: "ધન & આર્થિક સમૃદ્ધિ",
        nameEn: "Finance",
        desc: "રોકાણ, દેવા મુક્તિ, મિલકત અને ધન પ્રાપ્તિ યોગ",
        descEn: "Investments, debt relief, property & wealth accumulation",
        icon: "Coins"
      },
      {
        id: "kundli",
        name: "સંપૂર્ણ કુંડળી વિશ્લેષણ",
        nameEn: "Kundli Reading",
        desc: "સમગ્ર ૧૨ ભાવનું પૌરાણિક વૈદિક જન્માક્ષર પરામર્શ",
        descEn: "Detailed 12-house comprehensive Janma Kundali analysis",
        icon: "Scroll"
      },
      {
        id: "vastu",
        name: "વાસ્તુ દોષ નિવારણ",
        nameEn: "Vastu",
        desc: "ઘર, દુકાન, ફેક્ટરી માટે વાસ્તુદોષ અને સાત્વિક ઉપાય",
        descEn: "Home, commercial & factory architectural energy balancing",
        icon: "Home"
      }
    ],
    // The 2 Durations matching Flowchart Step 2
    durations: [
      {
        minutes: 30,
        title: "૩૦ મિનિટ સત્ર",
        titleEn: "30 Min Session",
        subtitle: "એક વિષય પર કેન્દ્રિત ઉત્તરો અને માર્ગદર્શન",
        subtitleEn: "Focused answers on one topic",
        price: 501,
        originalPrice: 999,
        popular: false
      },
      {
        minutes: 60,
        title: "૧ કલાક સત્ર",
        titleEn: "1 Hour Session",
        subtitle: "બહુવિધ વિષયો, ગ્રહદોષ અને ઉપાયોનું ઊંડાણપૂર્વક વિશ્લેષણ",
        subtitleEn: "Detailed reading on multiple topics",
        price: 1101,
        originalPrice: 1999,
        popular: true
      }
    ],
    // The 2 Modes matching Flowchart Step 3
    modes: [
      {
        id: "call",
        title: "કૉલ (ફોન / વિડિયો)",
        titleEn: "Call",
        subtitle: "ફોન અથવા વિડિયો કૉલ પરામર્શ",
        subtitleEn: "Phone / video consultation",
        badge: "સોમ - શનિ (Mon - Sat)",
        icon: "Phone",
        details: "Google Meet અથવા ફોન કૉલ દ્વારા ઘેર બેઠા પ્રત્યક્ષ પરામર્શ."
      },
      {
        id: "office",
        title: "ઓફિસ મુલાકાત",
        titleEn: "Office Visit",
        subtitle: "ઓફિસે પ્રત્યક્ષ રૂબરૂ મુલાકાત",
        subtitleEn: "In-person at the office",
        badge: "મંગળ, ગુરુ, શનિ (Tue, Thu, Sat)",
        icon: "Building",
        address: "૪૦૨, વૈદિક હેરિટેજ, સિંધુ ભવન રોડ, બોડકદેવ, અમદાવાદ, ગુજરાત ૩૮૦૦૫૪",
        details: "અમદાવાદ સેન્ટર ખાતે પ્રત્યક્ષ રૂબરૂ કુંડળી વિશ્લેષણ."
      }
    ],
    form: {
      fullNameLabel: "પૂરું નામ",
      fullNamePlaceholder: "દા.ત. ભાવેશભાઈ પટેલ",
      phoneLabel: "મોબાઈલ નંબર",
      phonePlaceholder: "+૯૧ ૯૮XXXXXXXX",
      emailLabel: "ઈમેઈલ એડ્રેસ",
      emailPlaceholder: "name@example.com",
      genderLabel: "જાતિ / લિંગ (Gender)",
      genderOptions: [
        { id: "male", label: "પુરુષ (Male)" },
        { id: "female", label: "સ્ત્રી (Female)" },
        { id: "other", label: "અન્ય (Other)" }
      ],
      dobLabel: "જન્મ તારીખ",
      tobLabel: "જન્મ સમય",
      tobPlaceholder: "દા.ત. ૧૦:૩૦ AM",
      tobUnknownLabel: "સમય ખબર નથી (સૂર્યોદય/અંદાજિત સમય)",
      pobLabel: "જન્મ સ્થળ (શહેર, રાજ્ય, દેશ)",
      pobPlaceholder: "દા.ત. અમદાવાદ, ગુજરાત",
      notesLabel: "પ્રશ્નો / નોંધ (Questions / Notes)",
      notesPlaceholder: "આપના જીવનના જે ચોક્કસ પ્રશ્નો અથવા મૂંઝવણ અંગે ડૉ. વિશાલ મોદીનું માર્ગદર્શન ઈચ્છો છો તે અહીં લખો...",
      whatsappConsent: "મને WhatsApp પર બુકિંગ કન્ફર્મેશન અને રીમાઇન્ડર મોકલો",
      submitButton: "ચુકવણી તરફ આગળ વધો",
      submitting: "પ્રોસેસિંગ...",
      validationErrors: {
        name: "કૃપા કરીને પૂરું નામ દાખલ કરો",
        phone: "કૃપા કરીને માન્ય મોબાઈલ નંબર દાખલ કરો",
        topic: "કૃપા કરીને પરામર્શ વિષય પસંદ કરો",
        duration: "કૃપા કરીને સત્ર સમયગાળો પસંદ કરો",
        mode: "કૃપા કરીને પરામર્શ માધ્યમ પસંદ કરો",
        date: "કૃપા કરીને તારીખ પસંદ કરો",
        slot: "કૃપા કરીને સમય સ્લોટ પસંદ કરો"
      }
    },
    payment: {
      reviewHeading: "બુકિંગ સારાંશ અને ચુકવણી સમીક્ષા",
      topicLabel: "પરામર્શ વિષય:",
      durationLabel: "સત્ર સમયગાળો:",
      modeLabel: "પરામર્શ માધ્યમ:",
      dateLabel: "નિયત તારીખ:",
      slotLabel: "સમય સ્લોટ:",
      astrologerLabel: "જ્યોતિષાચાર્ય:",
      totalLabel: "કુલ ચૂકવવાપાત્ર રકમ:",
      paymentMethodsBadge: "UPI • Card • Net Banking • Wallet",
      payNowBtn: "સુરક્ષિત ચુકવણી કરો (Pay Securely)",
      securedBy: "Razorpay દ્વારા ૨૫૬-બીટ SSL સુરક્ષિત પેમેન્ટ ગેટવે",
      cancelOrBack: "← વિગતો સુધારો"
    },
    success: {
      confirmedBadge: "✓ Booking Confirmed",
      title: "પરામર્શ અપોઇન્ટમેન્ટ કન્ફર્મ થઈ ગઈ છે!",
      subtitle: "હર હર મહાદેવ! ડૉ. વિશાલ મોદી સાથે આપનું પરામર્શ સફળતાપૂર્વક સુનિશ્ચિત થઈ ગયું છે.",
      refLabel: "બુકિંગ સંદર્ભ નંબર (Booking Ref):",
      addToCalendar: "Google Calendar માં ઉમેરો",
      whatsappChat: "WhatsApp પર ડૉ. મોદી સાથે સંપર્ક કરો",
      bookAnother: "બીજી અપોઇન્ટમેન્ટ બુક કરો",
      returnHome: "મુખ્ય પૃષ્ઠ પર જાઓ",
      guidelinesHeading: "પરામર્શ પૂર્વેની તૈયારી:",
      guidelines: [
        "જો ઉપલબ્ધ હોય તો જૂની જન્મકુંડળી અથવા હસ્તપ્રત સાથે રાખવી.",
        "લગ્ન સંબંધિત પ્રશ્નો માટે જીવનસાથી / પાર્ટનરની જન્મ વિગતો પણ તૈયાર રાખવી.",
        "શાંત વાતાવરણ અને સ્થિર ઇન્ટરનેટ કનેક્શન સુનિશ્ચિત કરવું.",
        "આપના તમામ પ્રશ્નો એક કાગળ પર નોંધી લેવા જેથી સમયનો સદ્ઉપયોગ થાય."
      ]
    },
    faqs: [
      {
        q: "જો મારી પાસે જન્મનો ચોક્કસ સમય ન હોય તો શું કુંડળી વિશ્લેષણ થઈ શકે?",
        a: "હા, ડૉ. વિશાલ મોદી વૈદિક 'પ્રશ્ન કુંડળી' (Prashna Shastra) અને હસ્તરેખા વિજ્ઞાન દ્વારા ચોક્કસ સમય વિના પણ સચોટ પરિણામ અને માર્ગદર્શન આપે છે."
      },
      {
        q: "કૉલ પરામર્શની લિંક મને કઈ રીતે મળશે?",
        a: "અપોઇન્ટમેન્ટ કન્ફર્મ થયા બાદ આપના આપેલા વોટ્સએપ નંબર અને ઈમેઈલ પર Google Meet લિંક તથા રીમાઇન્ડર મેસેજ મોકલવામાં આવશે."
      },
      {
        q: "ઓફિસ મુલાકાત માટે અમદાવાદ સેન્ટરનું સરનામું શું છે?",
        a: "૪૦૨, વૈદિક હેરિટેજ, સિંધુ ભવન રોડ, બોડકદેવ, અમદાવાદ, ગુજરાત ૩૮૦૦૫૪ (મંગળવાર, ગુરુવાર અને શનિવાર સવારે ૧૧:૦૦ થી સાંજે ૦૫:૦૦)."
      },
      {
        q: "શું અપોઇન્ટમેન્ટની તારીખ પાછળથી બદલી શકાય?",
        a: "હા, પરામર્શ સમયના ૨૪ કલાક અગાઉ અમારી સપોર્ટ હેલ્પલાઇન પર ફોન અથવા મેસેજ કરીને સ્લોટ સરળતાથી રિશિડ્યુલ કરી શકાય છે."
      }
    ]
  },
  en: {
    meta: {
      title: "Book Astrology Consultation Appointment | The Astro Code - Dr. Vishal Modi",
      description: "Book a 1-on-1 personalized video consultation, phone call, or in-person chamber appointment with Gold Medalist Vedic Astrologer Dr. Vishal Modi (Ph.D.).",
      keywords: [
        "Book Astrology Appointment",
        "Dr. Vishal Modi Appointment",
        "Vedic Astrology Consultation",
        "Kundali Analysis Booking Ahmedabad",
        "Horoscope Reading Appointment",
        "Online Vedic Consultation",
        "Vastu Consultation Booking"
      ]
    },
    accentStrip: {
      breadcrumbHome: "Home",
      breadcrumbCurrent: "Book Consultation Appointment",
    },
    hero: {
      invocation: "॥ SHREE GANESHAY NAMAH ॥ • 1-ON-1 VEDIC CONSULTATION",
      title: "Book Your Consultation with Dr. Vishal Modi",
      subtitle: "Personalized Janam Kundali analysis, career, matrimony, dosha remedies, and Vastu guidance directly from a Gold Medalist Astrologer with 25+ years of Vedic excellence.",
      experienceBadge: "25+ Years Vedic Experience",
      clientsBadge: "15,000+ Kundalis Analyzed",
      flowBadge: "7-Step Guided Booking Flow"
    },
    flowHeader: {
      badge: "BOOKING FLOW",
      title: "Astrology Consultation Booking",
      subtitle: "The path a client follows from choosing a topic to confirming payment",
      titleGu: "Astrology Consultation Booking",
      subtitleGu: "The path a client follows from choosing a topic to confirming payment"
    },
    steps: {
      step1: {
        number: 1,
        title: "Select Consultation Topic",
        titleEn: "Select Consultation Topic",
        desc: "Choose the area of life you want guidance on, so the astrologer can prepare your chart reading before the session.",
        descEn: "Choose the area of life you want guidance on, so the astrologer can prepare your chart reading before the session."
      },
      step2: {
        number: 2,
        title: "Select Session Duration",
        titleEn: "Select Session Duration",
        desc: "Pick how long you want the consultation to be.",
        descEn: "Pick how long you want the consultation to be."
      },
      step3: {
        number: 3,
        title: "Select Consultation Mode",
        titleEn: "Select Consultation Mode",
        desc: "Choose how you want to meet the astrologer.",
        descEn: "Choose how you want to meet the astrologer."
      },
      step4: {
        number: 4,
        titleCall: "Available Dates for Call",
        titleCallEn: "Available Dates for Call",
        titleOffice: "Available Dates for Office",
        titleOfficeEn: "Available Dates for Office",
        descCall: "Calendar shows only call-available days (Mon-Sat).",
        descCallEn: "Calendar shows only call-available days (Mon-Sat).",
        descOffice: "Calendar shows only office-open days (Tue, Thu, Sat).",
        descOfficeEn: "Calendar shows only office-open days (Tue, Thu, Sat)."
      },
      step5: {
        number: 5,
        title: "Select Time Slot",
        titleEn: "Select Time Slot",
        desc: "Pick an open slot on the chosen date. Slot length matches the session duration from Step 2.",
        descEn: "Pick an open slot on the chosen date. Slot length matches the session duration from Step 2."
      },
      step6: {
        number: 6,
        title: "Personal Details Form",
        titleEn: "Personal Details Form",
        desc: "Details needed to prepare your birth chart.",
        descEn: "Details needed to prepare your birth chart."
      },
      step7: {
        number: 7,
        title: "Payment",
        titleEn: "Payment",
        desc: "Review the booking summary (topic, duration, mode, date and slot) and pay securely to confirm.",
        descEn: "Review the booking summary (topic, duration, mode, date and slot) and pay securely to confirm."
      }
    },
    doctor: {
      name: "Dr. Vishal Modi (Ph.D.)",
      title: "Vedic Astrologer & Vastu Specialist",
      subtitle: "Gold Medalist • Nationally Recognized Astrologer",
      experience: "25+ Years Classical Experience",
      location: "Bodakdev, Sindhu Bhavan Road, Ahmedabad, Gujarat",
      avatar: "/images/dr-vishal-modi-portrait-avatar.webp",
      features: [
        "Deep 12-house natal chart and planetary transit dissection",
        "Authentic, scriptural, and practical non-fear-based remedies",
        "Logical and scientific approach without blind superstitions",
        "100% strict data privacy and confidential consultation"
      ]
    },
    // The 7 Topics matching Flowchart Step 1
    topics: [
      {
        id: "career",
        name: "Career",
        nameEn: "Career",
        desc: "Job changes, promotions, business decisions & planetary guidance",
        descEn: "Job changes, promotions, business decisions & planetary guidance",
        icon: "Briefcase"
      },
      {
        id: "marriage",
        name: "Marriage",
        nameEn: "Marriage",
        desc: "Matchmaking, marriage timing & marital harmony",
        descEn: "Matchmaking, marriage timing & marital harmony",
        icon: "Heart"
      },
      {
        id: "relationship",
        name: "Love & Relationship",
        nameEn: "Love & Relationship",
        desc: "Navigating relationship dynamics & love compatibility",
        descEn: "Navigating relationship dynamics & love compatibility",
        icon: "Users"
      },
      {
        id: "health",
        name: "Health",
        nameEn: "Health",
        desc: "Astrological wellness, chronic affliction remedies & longevity",
        descEn: "Astrological wellness, chronic affliction remedies & longevity",
        icon: "Activity"
      },
      {
        id: "finance",
        name: "Finance",
        nameEn: "Finance",
        desc: "Investments, debt relief, property & wealth accumulation",
        descEn: "Investments, debt relief, property & wealth accumulation",
        icon: "Coins"
      },
      {
        id: "kundli",
        name: "Kundli Reading",
        nameEn: "Kundli Reading",
        desc: "Detailed 12-house comprehensive Janma Kundali analysis",
        descEn: "Detailed 12-house comprehensive Janma Kundali analysis",
        icon: "Scroll"
      },
      {
        id: "vastu",
        name: "Vastu",
        nameEn: "Vastu",
        desc: "Home, commercial & factory architectural energy balancing",
        descEn: "Home, commercial & factory architectural energy balancing",
        icon: "Home"
      }
    ],
    // The 2 Durations matching Flowchart Step 2
    durations: [
      {
        minutes: 30,
        title: "30 Min Session",
        titleEn: "30 Min Session",
        subtitle: "Focused answers on one topic",
        subtitleEn: "Focused answers on one topic",
        price: 501,
        originalPrice: 999,
        popular: false
      },
      {
        minutes: 60,
        title: "1 Hour Session",
        titleEn: "1 Hour Session",
        subtitle: "Detailed reading on multiple topics",
        subtitleEn: "Detailed reading on multiple topics",
        price: 1101,
        originalPrice: 1999,
        popular: true
      }
    ],
    // The 2 Modes matching Flowchart Step 3
    modes: [
      {
        id: "call",
        title: "Call",
        titleEn: "Call",
        subtitle: "Phone / video consultation",
        subtitleEn: "Phone / video consultation",
        badge: "Mon - Sat",
        icon: "Phone",
        details: "Direct phone call or private HD Google Meet session."
      },
      {
        id: "office",
        title: "Office Visit",
        titleEn: "Office Visit",
        subtitle: "In-person at the office",
        subtitleEn: "In-person at the office",
        badge: "Tue, Thu, Sat",
        icon: "Building",
        address: "402, Vedic Heritage, Sindhu Bhavan Road, Bodakdev, Ahmedabad, Gujarat 380054",
        details: "Face-to-face personalized consultation at our flagship Ahmedabad office."
      }
    ],
    form: {
      fullNameLabel: "Full Name",
      fullNamePlaceholder: "e.g. Bhavesh Patel",
      phoneLabel: "Mobile Number",
      phonePlaceholder: "+91 98XXXXXXXX",
      emailLabel: "Email Address",
      emailPlaceholder: "name@example.com",
      genderLabel: "Gender",
      genderOptions: [
        { id: "male", label: "Male" },
        { id: "female", label: "Female" },
        { id: "other", label: "Other" }
      ],
      dobLabel: "Date of Birth",
      tobLabel: "Time of Birth",
      tobPlaceholder: "e.g. 10:30 AM",
      tobUnknownLabel: "Exact time unknown (Approximate daytime / sunrise)",
      pobLabel: "Place of Birth (City, State, Country)",
      pobPlaceholder: "e.g. Ahmedabad, Gujarat, India",
      notesLabel: "Questions / Notes",
      notesPlaceholder: "What specific life challenges or queries would you like Dr. Vishal Modi to analyze?",
      whatsappConsent: "Send booking confirmation and reminder on WhatsApp",
      submitButton: "Proceed to Payment",
      submitting: "Processing...",
      validationErrors: {
        name: "Please enter your full name",
        phone: "Please enter a valid mobile number",
        topic: "Please choose a consultation topic",
        duration: "Please choose a session duration",
        mode: "Please choose a consultation mode",
        date: "Please select an appointment date",
        slot: "Please choose an available time slot"
      }
    },
    payment: {
      reviewHeading: "Booking Summary & Payment Review",
      topicLabel: "Consultation Topic:",
      durationLabel: "Session Duration:",
      modeLabel: "Consultation Mode:",
      dateLabel: "Scheduled Date:",
      slotLabel: "Time Slot:",
      astrologerLabel: "Astrologer:",
      totalLabel: "Total Amount Payable:",
      paymentMethodsBadge: "UPI • Card • Net Banking • Wallet",
      payNowBtn: "Pay Securely with Razorpay",
      securedBy: "256-bit SSL encrypted secure payment via Razorpay",
      cancelOrBack: "← Modify Details"
    },
    success: {
      confirmedBadge: "✓ Booking Confirmed",
      title: "Appointment Successfully Confirmed!",
      subtitle: "Har Har Mahadev! Your consultation appointment with Dr. Vishal Modi has been confirmed.",
      refLabel: "Booking Reference Code:",
      addToCalendar: "Add to Google Calendar",
      whatsappChat: "Chat with Dr. Modi on WhatsApp",
      bookAnother: "Book Another Consultation",
      returnHome: "Return to Home",
      guidelinesHeading: "Pre-consultation Preparation:",
      guidelines: [
        "Keep any existing birth charts or family horoscopes readily accessible.",
        "For matrimonial questions, keep your partner / prospective match's birth details handy.",
        "Ensure a quiet room with a reliable, stable internet connection for video calls.",
        "Write down your core questions in advance to make the best use of your session time."
      ]
    },
    faqs: [
      {
        q: "What if I do not have my exact birth time?",
        a: "Dr. Vishal Modi specializes in classical Prashna Shastra (Horary Astrology) and Palmistry to deliver accurate forecasts even when birth time is unknown."
      },
      {
        q: "How will I receive the consultation call or meeting link?",
        a: "As soon as your booking is confirmed, the private Google Meet link or call instructions will be delivered directly to your WhatsApp and email."
      },
      {
        q: "Where is the Ahmedabad office located for In-Person visits?",
        a: "402, Vedic Heritage, Sindhu Bhavan Road, Bodakdev, Ahmedabad, Gujarat 380054 (Open Tuesdays, Thursdays & Saturdays from 11:00 AM to 05:00 PM)."
      },
      {
        q: "Can I reschedule my appointment if something urgent comes up?",
        a: "Yes, you can easily reschedule your session by notifying our helpline support at least 24 hours prior to the scheduled slot."
      }
    ]
  }
}
