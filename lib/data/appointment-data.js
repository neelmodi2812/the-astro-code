/**
 * Appointment and Astrological Consultation Data Repository
 * Fully localized for both Gujarati ('gu') and English ('en')
 */

export const APPOINTMENT_DATA = {
  gu: {
    meta: {
      title: "જ્યોતિષ પરામર્શ અપોઇન્ટમેન્ટ બુક કરો | The Astro Code - ડૉ. વિશાલ મોદી",
      description: "ડૉ. વિશાલ મોદી (Ph.D., ગોલ્ડ મેડાલિસ્ટ) સાથે ૧-ઓન-૧ વિડિયો કૉલ, ફોન અથવા રૂબરૂ કુંડળી વિશ્લેષણ, વાસ્તુશાસ્ત્ર અને ગ્રહદોષ નિવારણ માટે અપોઇન્ટમેન્ટ બુક કરો.",
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
      breadcrumbCurrent: "પરામર્શ અપોઇન્ટમેન્ટ (Book Consultation)",
    },
    hero: {
      invocation: "॥ શ્રી ગણેશાય નમઃ ॥ • શાસ્ત્રોક્ત ૧-ઓન-૧ વૈદિક પરામર્શ",
      title: "ડૉ. વિશાલ મોદી સાથે પરામર્શ અપોઇન્ટમેન્ટ બુક કરો",
      subtitle: "તમારી જન્મકુંડળીનું ગહન વિશ્લેષણ, કારકિર્દી, વિવાહ, સ્વાસ્થ્ય, નાણાકીય પ્રશ્નો અને વાસ્તુશાસ્ત્ર માટે ભારત સરકાર પ્રમાણિત ગોલ્ડ મેડાલિસ્ટ જ્યોતિષાચાર્યનું પ્રત્યક્ષ માર્ગદર્શન.",
      experienceBadge: "૨૫+ વર્ષોનો શાસ્ત્રોક્ત અનુભવ",
      clientsBadge: "૧૫,૦૦૦+ કુંડળી વિશ્લેષણ સંપન્ન"
    },
    doctor: {
      name: "ડૉ. વિશાલ મોદી (Ph.D.)",
      title: "વૈદિક જ્યોતિષાચાર્ય & વાસ્તુ નિષ્ણાત",
      subtitle: "ગોલ્ડ મેડાલિસ્ટ • રાષ્ટ્રપતિ સન્માનિત જ્યોતિષી",
      experience: "૨૫+ વર્ષનો શાસ્ત્રોક્ત અનુભવ",
      location: "બોડકદેવ, સિંધુ ભવન રોડ, અમદાવાદ, ગુજરાત",
      avatar: "/images/dr-vishal-modi-avatar.jpg",
      features: [
        "સંપૂર્ણ જન્મપત્રિકા અને ગ્રહદશાનું ઊંડાણપૂર્વક વિશ્લેષણ",
        "શાસ્ત્રોક્ત સરળ, સાત્વિક અને સચોટ ઉપાયો",
        "કોઈ અંધશ્રદ્ધા વિના વૈજ્ઞાનિક અને તાર્કિક માર્ગદર્શન",
        "૧૦૦% અંગત વિગતોની અત્યંત કડક ગોપનીયતા"
      ]
    },
    services: [
      {
        id: "kundali",
        title: "સંપૂર્ણ જન્મકુંડળી વિશ્લેષણ",
        desc: "૧૨ ભાવો, વર્તમાન ગ્રહદશા, ગોચર, સાડાસાતી, અને આજીવન શુભ-અશુભ સમયગાળાનું વિગતવાર માર્ગદર્શન.",
        duration: "૪૫ મિનિટ",
        badge: "સૌથી વધુ પસંદગી",
        icon: "Scroll"
      },
      {
        id: "career",
        title: "કારકિર્દી, વેપાર & ધનપ્રાપ્તિ",
        desc: "નોકરીમાં પ્રમોશન, ધંધામાં મંદી નિવારણ, પાર્ટનરશીપ અને નવી મૂડીરોકાણ યોજનાઓનું જ્યોતિષીય મૂલ્યાંકન.",
        duration: "૩૦ મિનિટ",
        badge: "વ્યવસાયિક સલાહ",
        icon: "Briefcase"
      },
      {
        id: "marriage",
        title: "લગ્ન & કુંડળી ગુણ મિલન",
        desc: "અષ્ટકૂટ ૩૬ ગુણ મિલન, માંગલિક દોષ પરિહાર, લગ્નમાં વિલંબ નિવારણ અને દાંપત્યજીવન સુખ ઉપાયો.",
        duration: "૩૦ મિનિટ",
        badge: "વિવાહ માર્ગદર્શન",
        icon: "Heart"
      },
      {
        id: "health",
        title: "સ્વાસ્થ્ય & ગ્રહદોષ નિવારણ",
        desc: "કાલસર્પ, પિતૃદોષ, રાહુ-કેતુ પીડા અને વારંવાર આવતી બીમારીઓ માટે મંત્ર-જપ અને રત્ન ઉપચાર.",
        duration: "૩૦ મિનિટ",
        badge: "દોષ નિવારણ",
        icon: "Activity"
      },
      {
        id: "vastu",
        title: "વાસ્તુશાસ્ત્ર દર્પણ & ઊર્જા શુદ્ધિ",
        desc: "ઘર, દુકાન કે ફેક્ટરીના નકશાનું વાસ્તુ વિશ્લેષણ અને કોઈ પણ તોડફોડ વગરના ઊર્જા સુધાર ઉપાયો.",
        duration: "૪૫ મિનિટ",
        badge: "તોડફોડ વિના",
        icon: "Home"
      },
      {
        id: "gemstones",
        title: "સિદ્ધ રત્ન & યંત્ર સલાહ",
        desc: "તમારી લગ્ન રાશિ અને ગ્રહબળ અનુસાર ૧૦૦% સાચા અને પ્રાણ-પ્રતિષ્ઠિત રત્ન તથા રુદ્રાક્ષ માર્ગદર્શન.",
        duration: "૩૦ મિનિટ",
        badge: "રત્ન સલાહ",
        icon: "Gem"
      }
    ],
    modes: [
      {
        id: "video",
        title: "૧-ઓન-૧ વિડિયો કૉલ",
        subtitle: "Google Meet / Zoom HD",
        desc: "વિશ્વના કોઈપણ ખૂણેથી આપના ઘરે બેઠા ડૉ. વિશાલ મોદી સાથે પ્રત્યક્ષ વિડિયો કૉલ પર ચર્ચા કરો.",
        badge: "શ્રેષ્ઠ ડિજિટલ અનુભવ",
        icon: "Video"
      },
      {
        id: "phone",
        title: "પ્રાઇવેટ ફોન કૉલ",
        subtitle: "ડાયરેક્ટ વોઇસ કૉલ",
        desc: "સુનિશ્ચિત સમયે ડૉ. વિશાલ મોદી આપને સીધો ફોન કૉલ કરશે અને આપની કુંડળી ચર્ચા સંપન્ન કરશે.",
        badge: "ત્વરિત & સરળ",
        icon: "Phone"
      },
      {
        id: "in_person",
        title: "ચેમ્બર રૂબરૂ મુલાકાત",
        subtitle: "બોડકદેવ સેન્ટર, અમદાવાદ",
        desc: "અમારા સિંધુ ભવન રોડ સ્થિત મુખ્ય જ્યોતિષ કેન્દ્ર પર પ્રત્યક્ષ મુલાકાત લઈને માર્ગદર્શન મેળવો.",
        badge: "પ્રત્યક્ષ દર્શન",
        icon: "MapPin"
      }
    ],
    timeSlots: [
      {
        period: "morning",
        title: "શુભ સવાર સત્ર (Morning Auspicious)",
        slots: ["10:00 AM - 11:30 AM", "11:30 AM - 01:00 PM"]
      },
      {
        period: "afternoon",
        title: "બપોર સત્ર (Afternoon Window)",
        slots: ["02:30 PM - 04:00 PM", "04:00 PM - 05:30 PM"]
      },
      {
        period: "evening",
        title: "સંધ્યા શુભ સત્ર (Evening Sandhya)",
        slots: ["06:00 PM - 07:30 PM", "07:30 PM - 09:00 PM"]
      }
    ],
    form: {
      steps: {
        step1: "૧. પરામર્શ વિષય પસંદ કરો",
        step2: "૨. પરામર્શ માધ્યમ પસંદ કરો",
        step3: "૩. તારીખ અને સમય પસંદ કરો",
        step4: "૪. તમારી કુંડળી વિગતો ભરો"
      },
      nameLabel: "તમારું પૂરું નામ",
      namePlaceholder: "દા.ત. ભાવેશભાઈ પટેલ",
      phoneLabel: "મોબાઈલ નંબર (WhatsApp)",
      phonePlaceholder: "+૯૧ ૯૮XXXXXXXX",
      emailLabel: "ઈમેઈલ એડ્રેસ",
      emailPlaceholder: "name@example.com",
      emailHint: "પરામર્શની Google Meet લિંક અને કન્ફર્મેશન માટે",
      dobLabel: "જન્મ તારીખ",
      tobLabel: "જન્મ સમય",
      tobPlaceholder: "દા.ત. ૧૦:૩૦ AM",
      tobUnknownLabel: "ચોક્કસ સમય ખબર નથી (અંદાજિત સૂર્યોદય/દિવસનો સમય)",
      pobLabel: "જન્મ સ્થળ (શહેર / ગામ / રાજ્ય)",
      pobPlaceholder: "દા.ત. અમદાવાદ, ગુજરાત",
      currentCityLabel: "હાલનું રહેઠાણ શહેર",
      currentCityPlaceholder: "દા.ત. સુરત અથવા લંડન",
      questionsLabel: "ડૉ. વિશાલ મોદી માટે આપના મુખ્ય પ્રશ્નો / વિગતો",
      questionsPlaceholder: "આપના જીવનની વર્તમાન પરિસ્થિતિ કે જે પ્રશ્નોનું સમાધાન આપ ઈચ્છો છો તે અહીં લખો (દા.ત. નવી જોબ, લગ્ન વિલંબ, વેપારમાં વૃદ્ધિ)...",
      submitButton: "પરામર્શ અપોઇન્ટમેન્ટ કન્ફર્મ કરો",
      submitting: "અપોઇન્ટમેન્ટ બુક થઈ રહી છે...",
      validationErrors: {
        name: "કૃપા કરીને તમારું નામ દાખલ કરો",
        phone: "કૃપા કરીને માન્ય મોબાઈલ નંબર દાખલ કરો",
        dob: "કૃપા કરીને જન્મ તારીખ દાખલ કરો",
        pob: "કૃપા કરીને જન્મ સ્થળ દાખલ કરો",
        slot: "કૃપા કરીને તારીખ અને સમય સ્લોટ પસંદ કરો"
      }
    },
    success: {
      title: "અપોઇન્ટમેન્ટ સફળતાપૂર્વક બુક થઈ ગઈ છે!",
      subtitle: "હર હર મહાદેવ! આપની પરામર્શ અપોઇન્ટમેન્ટ ડૉ. વિશાલ મોદી સાથે સુનિશ્ચિત થઈ ગઈ છે. અમારી કોઓર્ડિનેટર ટીમ ટૂંક સમયમાં સંપર્ક કરશે.",
      refLabel: "અપોઇન્ટમેન્ટ સંદર્ભ નંબર:",
      detailsHeading: "અપોઇન્ટમેન્ટ સારાંશ",
      serviceLabel: "સેવા વિષય:",
      modeLabel: "માધ્યમ:",
      dateLabel: "નિયત તારીખ:",
      timeLabel: "સમય સ્લોટ:",
      devoteeLabel: "યજમાન નામ:",
      checklistHeading: "પરામર્શ પૂર્વેની તૈયારી:",
      checklists: [
        "જો ઉપલબ્ધ હોય તો જૂની જન્મકુંડળી અથવા હસ્તપ્રત સાથે રાખવી.",
        "લગ્ન સંબંધિત પ્રશ્નો માટે જીવનસાથી / પાર્ટનરની જન્મ વિગતો પણ તૈયાર રાખવી.",
        "શાંત વાતાવરણ અને સ્થિર ઇન્ટરનેટ કનેક્શન સુનિશ્ચિત કરવું.",
        "આપના તમામ પ્રશ્નો એક કાગળ પર નોંધી લેવા જેથી સમયનો સદ્ઉપયોગ થાય."
      ],
      actions: {
        dashboard: "મારા પરામર્શ જુઓ (Dashboard)",
        home: "મુખ્ય પૃષ્ઠ પર જાઓ",
        bookAnother: "બીજી અપોઇન્ટમેન્ટ બુક કરો"
      }
    },
    faqs: [
      {
        q: "જો મારી પાસે જન્મનો ચોક્કસ સમય ન હોય તો શું કુંડળી વિશ્લેષણ થઈ શકે?",
        a: "હા, ડૉ. વિશાલ મોદી વૈદિક 'પ્રશ્ન કુંડળી' (Prashna Shastra) અને હસ્તરેખા વિજ્ઞાન દ્વારા ચોક્કસ સમય વિના પણ સચોટ પરિણામ અને માર્ગદર્શન આપે છે."
      },
      {
        q: "વિડિયો કૉલની લિંક મને કઈ રીતે મળશે?",
        a: "અપોઇન્ટમેન્ટ બુક થયા બાદ આપના આપેલા વોટ્સએપ નંબર અને ઈમેઈલ પર Google Meet લિંક તથા રીમાઇન્ડર મેસેજ મોકલવામાં આવશે."
      },
      {
        q: "શું પરામર્શ દરમિયાન પરિવારના સભ્યો જોડાઈ શકે?",
        a: "ચોક્કસ, આપના પરિવારના સભ્યો આ ૧-ઓન-૧ પરામર્શમાં સાથે બેસી શકે છે અને પ્રશ્નો પૂછી શકે છે."
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
      clientsBadge: "15,000+ Kundalis Analyzed"
    },
    doctor: {
      name: "Dr. Vishal Modi (Ph.D.)",
      title: "Vedic Astrologer & Vastu Specialist",
      subtitle: "Gold Medalist • Nationally Recognized Astrologer",
      experience: "25+ Years Classical Experience",
      location: "Bodakdev, Sindhu Bhavan Road, Ahmedabad, Gujarat",
      avatar: "/images/dr-vishal-modi-avatar.jpg",
      features: [
        "Deep 12-house natal chart and planetary transit dissection",
        "Authentic, scriptural, and practical non-fear-based remedies",
        "Logical and scientific approach without blind superstitions",
        "100% strict data privacy and confidential consultation"
      ]
    },
    services: [
      {
        id: "kundali",
        title: "Complete Janam Kundali Analysis",
        desc: "Exhaustive review of 12 houses, Mahadasha, Sade Sati, transit impact, and lifetime auspicious roadmap.",
        duration: "45 Mins",
        badge: "Most Popular",
        icon: "Scroll"
      },
      {
        id: "career",
        title: "Career, Business & Financial Growth",
        desc: "Job transitions, business slowdown remedies, partnerships, and high-yield financial windows.",
        duration: "30 Mins",
        badge: "Professional Advice",
        icon: "Briefcase"
      },
      {
        id: "marriage",
        title: "Marriage & Kundali Matchmaking",
        desc: "36-Guna Ashtakoot matching, Manglik dosha evaluation, marriage delay remedies, and spousal harmony.",
        duration: "30 Mins",
        badge: "Matrimonial Guidance",
        icon: "Heart"
      },
      {
        id: "health",
        title: "Health & Planetary Dosha Remedies",
        desc: "Remedies for Kaal Sarp, Pitru dosha, Rahu-Ketu affliction, and repetitive health challenges.",
        duration: "30 Mins",
        badge: "Dosha Nivaran",
        icon: "Activity"
      },
      {
        id: "vastu",
        title: "Vastu Shastra Blueprint Review",
        desc: "Residential, commercial, and factory layout evaluation with zero-demolition corrective solutions.",
        duration: "45 Mins",
        badge: "Zero Demolition",
        icon: "Home"
      },
      {
        id: "gemstones",
        title: "Consecrated Gemstone & Yantra Guidance",
        desc: "Tailored gemstone and energized Rudraksha recommendations suited to your natal ascendant.",
        duration: "30 Mins",
        badge: "Gemstone Guidance",
        icon: "Gem"
      }
    ],
    modes: [
      {
        id: "video",
        title: "1-on-1 Video Session",
        subtitle: "Google Meet / Zoom HD",
        desc: "Connect face-to-face with Dr. Vishal Modi in high definition from any corner of the globe.",
        badge: "Top Choice Worldwide",
        icon: "Video"
      },
      {
        id: "phone",
        title: "Private Audio Call",
        subtitle: "Direct Voice Call",
        desc: "Dr. Vishal Modi directly dials your phone number at the scheduled time for your private session.",
        badge: "Quick & Easy",
        icon: "Phone"
      },
      {
        id: "in_person",
        title: "In-Person Chamber Visit",
        subtitle: "Bodakdev Center, Ahmedabad",
        desc: "Visit our flagship Vedic Center located at Sindhu Bhavan Road, Bodakdev for personal consultation.",
        badge: "Direct Meeting",
        icon: "MapPin"
      }
    ],
    timeSlots: [
      {
        period: "morning",
        title: "Morning Auspicious Window",
        slots: ["10:00 AM - 11:30 AM", "11:30 AM - 01:00 PM"]
      },
      {
        period: "afternoon",
        title: "Afternoon Window",
        slots: ["02:30 PM - 04:00 PM", "04:00 PM - 05:30 PM"]
      },
      {
        period: "evening",
        title: "Evening Sandhya Window",
        slots: ["06:00 PM - 07:30 PM", "07:30 PM - 09:00 PM"]
      }
    ],
    form: {
      steps: {
        step1: "1. Select Consultation Topic",
        step2: "2. Choose Consultation Mode",
        step3: "3. Choose Preferred Date & Time",
        step4: "4. Enter Your Natal Birth Details"
      },
      nameLabel: "Your Full Name",
      namePlaceholder: "e.g. Ramesh Patel",
      phoneLabel: "Mobile / WhatsApp Number",
      phonePlaceholder: "+91 98XXXXXXXX",
      emailLabel: "Email Address",
      emailPlaceholder: "name@example.com",
      emailHint: "For Google Meet session link and confirmation",
      dobLabel: "Date of Birth",
      tobLabel: "Time of Birth",
      tobPlaceholder: "e.g. 10:30 AM",
      tobUnknownLabel: "Exact time unknown (Approximate daytime / sunrise)",
      pobLabel: "Place of Birth (City, State, Country)",
      pobPlaceholder: "e.g. Ahmedabad, Gujarat, India",
      currentCityLabel: "Current City of Residence",
      currentCityPlaceholder: "e.g. Surat, Mumbai, or London",
      questionsLabel: "Priority Questions or Notes for Dr. Vishal Modi",
      questionsPlaceholder: "Share your core questions or life challenges you would like addressed (e.g., job change, marriage timing, family health)...",
      submitButton: "Confirm Consultation Appointment",
      submitting: "Scheduling Your Appointment...",
      validationErrors: {
        name: "Please enter your full name",
        phone: "Please enter a valid mobile number",
        dob: "Please select your date of birth",
        pob: "Please enter your place of birth",
        slot: "Please choose an appointment date and time slot"
      }
    },
    success: {
      title: "Appointment Successfully Confirmed!",
      subtitle: "Har Har Mahadev! Your consultation appointment with Dr. Vishal Modi has been scheduled. Our coordination team will reach out to you shortly.",
      refLabel: "Appointment Reference Code:",
      detailsHeading: "Appointment Summary",
      serviceLabel: "Service Topic:",
      modeLabel: "Mode:",
      dateLabel: "Scheduled Date:",
      timeLabel: "Time Window:",
      devoteeLabel: "Devotee Name:",
      checklistHeading: "Before Your Consultation Checklist:",
      checklists: [
        "Keep any existing birth charts or family horoscopes readily accessible.",
        "For matrimonial questions, keep your partner / prospective match's birth details handy.",
        "Ensure a quiet room with a reliable, stable internet connection for video calls.",
        "Write down your core questions in advance to make the best use of your session time."
      ],
      actions: {
        dashboard: "View My Consultations (Dashboard)",
        home: "Return to Home",
        bookAnother: "Book Another Appointment"
      }
    },
    faqs: [
      {
        q: "What if I do not have my exact birth time?",
        a: "Dr. Vishal Modi specializes in classical Prashna Shastra (Horary Astrology) and Palmistry to deliver accurate forecasts even when birth time is unknown."
      },
      {
        q: "How will I receive the Google Meet video link?",
        a: "As soon as your appointment is verified, the private video link and calendar invitation will be sent to your WhatsApp number and email."
      },
      {
        q: "Can family members join the consultation session with me?",
        a: "Yes, family members are warmly welcome to participate together during your 1-on-1 consultation session."
      },
      {
        q: "Can I reschedule my appointment if something urgent comes up?",
        a: "Yes, you can easily reschedule your session by notifying our helpline support at least 24 hours prior to the scheduled slot."
      }
    ]
  }
}

