/**
 * Contact Us and Vedic Support Data Repository
 * Fully localized for both Gujarati ('gu') and English ('en')
 */

export const CONTACT_DATA = {
  gu: {
    meta: {
      title: "સંપર્ક કરો (Contact Us) | The Astro Code - વૈદિક સહાયતા & જ્યોતિષ કેન્દ્ર",
      description: "જન્મકુંડળી વિશ્લેષણ, ગ્રહદોષ નિવારણ, વાસ્તુશાસ્ત્ર અને પૂજા મુહૂર્ત માટે ડૉ. વિશાલ મોદી અને ધ એસ્ટ્રો કોડ ટીમનો સીધો સંપર્ક કરો. અમદાવાદ સ્થિત મુખ્ય કેન્દ્ર.",
      keywords: [
        "The Astro Code Contact",
        "ડૉ. વિશાલ મોદી સંપર્ક",
        "જ્યોતિષ પરામર્શ અમદાવાદ",
        "Astrology Consultation Ahmedabad",
        "Kundali Analysis Booking",
        "Vastu Shastra Visit",
        "Vedic Support Center"
      ]
    },
    accentStrip: {
      breadcrumbHome: "મુખ્ય પૃષ્ઠ",
      breadcrumbCurrent: "સંપર્ક કરો (Contact & Vedic Support)",
      certifiedBadge: "પ્રમાણિત જ્યોતિષીય પરામર્શ • ISO 9001:2015 સુવિધા"
    },
    headerBanner: {
      badge: "॥ સત્યમ્ શિવમ્ સુંદરમ્ ॥ • વૈદિક સહાયતા કેન્દ્ર",
      title: "અમારો સંપર્ક સાધો — જ્યોતિષીય માર્ગદર્શન અને સહાયતા કેન્દ્ર",
      subtitle: "જન્મકુંડળી વિશ્લેષણ, ગ્રહદોષ નિવારણ, વૈદિક પૂજા મુહૂર્ત અથવા આધ્યાત્મિક ઓર્ડર સહાયતા માટે અમારી જ્યોતિષ ટીમ અને ડૉ. વિશાલ મોદી સાથે સીધો સંપર્ક સાધો.",
      yantraCard: {
        brand: "THE ASTRO CODE",
        title: "શ્રી યંત્ર આધ્યાત્મિક કેન્દ્ર",
        locations: "અમદાવાદ • સુરત • મુંબઈ • વૈશ્વિક ઓનલાઇન"
      }
    },
    quickCards: [
      {
        id: "phone",
        icon: "call",
        badge: "સોમ - શનિ",
        title: "હેલ્પલાઇન & ફોન પરામર્શ",
        desc: "કુંડળી પરામર્શ અને પૂજા વિધિ સમયપત્રક માટે સીધો સંપર્ક કરો.",
        phones: ["+૯૧ ૭૯ ૪૦૦૦ ૮૧૦૮", "+૯૧ ૯૮૭૬૫ ૪૩૨૧૦"],
        timings: "સવારે ૦૯:૩૦ થી સાંજે ૦૭:૦૦ IST",
        ctaText: "હમણાં જ કૉલ કરો",
        ctaLink: "tel:+917940008108",
        variant: "primary"
      },
      {
        id: "whatsapp",
        icon: "chat",
        badge: "ત્વરિત ઉત્તર",
        title: "વ્હોટ્સએપ ત્વરિત સહાયતા",
        desc: "૨૪x૭ ડિજિટલ સહાયક અને કુંડળી બુકિંગ માટે મેસેજ મોકલો.",
        phones: ["+૯૧ ૯૮૭૬૫ ૪૩૨૧૦"],
        subText: "૨૪ કલાક WhatsApp કુંડળી સેવા",
        timings: "સરેરાશ ઉત્તર સમય: ૧૫ મિનિટ",
        ctaText: "WhatsApp પર વાત કરો",
        ctaLink: "https://wa.me/919876543210?text=Hello%20The%20Astro%20Code,%20I%20need%20astrological%20guidance",
        variant: "gold"
      },
      {
        id: "email",
        icon: "mail",
        badge: "સત્તાવાર ઈમેલ",
        title: "ઈમેલ સપોર્ટ & પત્રવ્યવહાર",
        desc: "વિસ્તૃત જન્માક્ષર પરામર્શ અને કોર્પોરેટ વાસ્તુ પ્રશ્નો માટે.",
        emails: ["support@theastrocode.com", "contact@theastrocode.com"],
        timings: "૨૪ કલાકમાં પ્રમાણિત લેખિત ઉત્તર",
        ctaText: "ઈમેલ મોકલો",
        ctaLink: "mailto:support@theastrocode.com",
        variant: "surface"
      }
    ],
    inquiryForm: {
      tag: "ONLINE APPOINTMENT • વૈદિક ફોર્મ",
      title: "ઓનલાઇન પૂછપરછ અથવા એપોઇન્ટમેન્ટ વિનંતી",
      subtitle: "તમારી વિગતો દાખલ કરો, અમારા વરિષ્ઠ જ્યોતિષીય સહાયક તમને યોગ્ય માર્ગદર્શન અને સમયપત્રક પૂરું પાડશે.",
      fields: {
        fullName: "તમારું પૂરું નામ (Full Name)",
        fullNamePlaceholder: "દા.ત. રોહિતભાઈ પારેખ",
        phone: "મોબાઈલ નંબર (Phone Number)",
        phonePlaceholder: "૯૮૭૬૫ ૪૩૨૧૦",
        email: "ઈમેલ એડ્રેસ (Email Address)",
        emailPlaceholder: "rohit@example.com",
        subject: "પૂછપરછનો વિષય / પરામર્શ પ્રકાર",
        options: [
          { value: "kundali", label: "જન્મકુંડળી વિશ્લેષણ & ભવિષ્ય કથન" },
          { value: "vastu", label: "વાસ્તુશાસ્ત્ર ઓડિટ & હોમ વિઝિટ" },
          { value: "gemstone", label: "રત્ન & પવિત્ર રૂદ્રાક્ષ ભલામણ" },
          { value: "matchmaking", label: "વિવાહ-કારકિર્દી કુંડળી મેળવણ (ગુણ મિલન)" },
          { value: "puja", label: "નવગ્રહ પૂજા વિધિ & મુહૂર્ત નિર્ણય" },
          { value: "numerology", label: "અંકશાસ્ત્ર (Numerology) & નામ સુધારો" },
          { value: "general", label: "અન્ય પ્રશ્ન અથવા સામાન્ય પૂછપરછ" }
        ],
        dob: "જન્મ તારીખ અને સમય (કુંડળી માટે ઐચ્છિક)",
        dobPlaceholder: "દા.ત. ૧૫/૦૮/૧૯૯૨ • સવારે ૦૮:૨૪",
        birthPlace: "જન્મ સ્થળ / શહેર (કુંડળી માટે ઐચ્છિક)",
        birthPlacePlaceholder: "દા.ત. અમદાવાદ, ગુજરાત",
        message: "તમારો પ્રશ્ન અથવા વિગતવાર સંદેશ",
        messagePlaceholder: "તમારી સમસ્યા, જીવનના પ્રશ્નો અથવા પૂજા સંદર્ભે વિસ્તારથી જણાવો જેથી યોગ્ય જ્યોતિષીય અભ્યાસ થઈ શકે...",
        consent: "હું WhatsApp પર દૈનિક પંચાંગ, શુભ ચોઘડિયું અને કુંડળી વિશ્લેષણ અપડેટ્સ મેળવવા સંમત છું. તમારી માહિતી ૧૦૦% ગોપનીય રાખવામાં આવે છે.",
        submitBtn: "સંદેશ મોકલો (Submit Inquiry)",
        sslSecurity: "૨૫૬-બીટ SSL એન્ક્રિપ્ટેડ સુરક્ષિત ફોર્મ",
        successMsg: "તમારો સંદેશ સફળતાપૂર્વક મળ્યો છે! અમારી ટીમ ટૂંક સમયમાં સંપર્ક કરશે."
      }
    },
    officeLocation: {
      tag: "OFFICE HEADQUARTERS • રૂબરૂ મુલાકાત",
      title: "અમદાવાદ મુખ્ય કેન્દ્ર અને પરામર્શ કક્ષ",
      officeCode: "ઓફિસ કોડ: TAC-AHM-01",
      mapImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWHsmqS4apoeLcfK6iYKuIiW7BI7AZ5fBgc2x_T3chfTxcJD-5bCcP0PG94OYlmRTVaEx4w_PYJXpX-XBiZ4PKlUH7SIFW3K_XDcJ2h93v4suffRxP3RygtIMrHip-wLgFfqsgM9DWzuelqkVdRZVzGryHi2mfbyj8nRuYU6EqisiGT2koAdo7MEokt9BMa6wx5MzCTMF6lOOFLIVBRDr25eNW8KbZcgoAxugqT21UzaQqqZcBFzIj",
      officeName: "The Astro Code Head Office",
      addressShort: "૪૦૨, દિવ્ય એસ્ટ્રો સેન્ટર, પકવાન ચાર રસ્તા, બોડકદેવ, એસ.જી. હાઇવે, અમદાવાદ.",
      directionsBtn: "ગૂગલ મેપ્સ પર દિશા મેળવો (Directions)",
      directionsUrl: "https://maps.google.com/?q=Bodakdev+SG+Highway+Ahmedabad",
      fullAddressTitle: "સંપૂર્ણ સરનામું",
      fullAddress: "૪૦૨, દિવ્ય એસ્ટ્રો સેન્ટર, પકવાન ચાર રસ્તા પાસે, બોડકદેવ, એસ.જી. હાઇવે, અમદાવાદ, ગુજરાત - ૩૮૦૦૫૪.",
      landmark: "લેન્ડમાર્ક: પકવાન ડાઇનિંગ હોલ સામે, સિંધુ ભવન જંકશન",
      timingsTitle: "મુલાકાતનો સમયગાળો",
      timingsLine1: "સોમવાર થી શનિવાર: સવારે ૧૦:૦૦ થી સાંજે ૦૭:૦૦",
      timingsLine2: "રવિવાર: પૂર્વ એપોઇન્ટમેન્ટ મુજબ (વિશેષ પૂજા/વાસ્તુ)",
      notice: "રૂબરૂ મુલાકાત માટે ૨૪ કલાક અગાઉ બુકિંગ આવશ્યક"
    },
    faqs: {
      tag: "GUIDANCE • વારંવાર પૂછાતા પ્રશ્નો",
      title: "જ્યોતિષીય પરામર્શ FAQs",
      items: [
        {
          id: "faq-1",
          question: "૧. શું ડૉ. વિશાલ મોદી સાથે સીધી વ્યક્તિગત મુલાકાત શક્ય છે?",
          answer: "હા, ચોક્કસ. આપ અમદાવાદ સ્થિત મુખ્ય કેન્દ્ર ખાતે રૂબરૂ અથવા દેશ-વિદેશના જાતકો માટે હાઇ-ડેફિનેશન ઝૂમ / ગૂગલ મીટ વિડિયો કૉલ દ્વારા વ્યક્તિગત ૧-ઓન-૧ પરામર્શ લઈ શકો છો."
        },
        {
          id: "faq-2",
          question: "૨. જન્મકુંડળી પરામર્શ માટે કઈ કઈ વિગતો આપવી જરૂરી છે?",
          answer: "ચોક્કસ વૈદિક ગણતરી માટે તમારી જન્મ તારીખ (DD/MM/YYYY), ચોક્કસ જન્મ સમય (કલાક અને મિનિટ, AM/PM) અને ચોક્કસ જન્મ સ્થળ (ગામ/શહેર) અનિવાર્ય છે. જો સમય અચોક્કસ હોય તો પ્રશ્ન કુંડળી પદ્ધતિથી માર્ગદર્શન અપાય છે."
        },
        {
          id: "faq-3",
          question: "૩. પૂજા સામગ્રી અથવા રત્નોનો ઓર્ડર કેટલા સમયમાં ડિલિવર થાય છે?",
          answer: "અમારા વેદિક શોપમાંથી ઓર્ડર કરેલા તમામ રત્નો, યંત્રો અને રુદ્રાક્ષ મંત્રોચ્ચારથી પ્રાણ પ્રતિષ્ઠિત કરીને ૩ થી ૫ કામકાજી દિવસોમાં સમગ્ર ભારતમાં સ્પીડ પોસ્ટ/કોરિયર દ્વારા લેબ પ્રમાણપત્ર સાથે પહોંચાડવામાં આવે છે."
        },
        {
          id: "faq-4",
          question: "૪. શું પરામર્શ દરમિયાન ચર્ચા કરેલી માહિતી ગુપ્ત રાખવામાં આવે છે?",
          answer: "હા, ૧૦૦%. અમે સંપૂર્ણ નૈતિક આચારસંહિતાનું પાલન કરીએ છીએ. તમારી કુંડળીની વિગતો અને અંગત પ્રશ્નો અત્યંત ગુપ્ત અને સુરક્ષિત રાખવામાં આવે છે."
        }
      ]
    },
    sidebar: {
      panchang: {
        title: "દૈનિક પંચાંગ • અમદાવાદ",
        badge: "આજનું મુહૂર્ત",
        weatherTitle: "સ્થાનિક હવામાન",
        weatherVal: "૩૪° સે • નિર્મળ આકાશ",
        choghadiyaLabel: "ચોઘડિયું",
        choghadiyaVal: "અમૃત (અતિ શુભ)",
        sunriseLabel: "સૂર્યોદય",
        sunriseVal: "૦૬:૨૮ AM",
        sunsetLabel: "સૂર્યાસ્ત",
        sunsetVal: "૦૬:૫૨ PM",
        rahuKaal: "રાહુ કાળ: ૧૬:૩૦ - ૧૮:૦૦",
        horaStatus: "શુભ હોરા ચાલુ"
      },
      astrologer: {
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuArOlzQcZu_euhnyymUNmU8c5uoL3Rr1wmJu3SdV2DcId5B_sFsKfp92-flRIZyQdL6U-0QD3tpDPuH8N846kDgfuuYvFUp95uFYAJid_b_VoviPRPaFw8knh5Dh1aT8cj-0JC3TUz-GdUToj5c2l9OFoRof9UadQWSsIUjJorPpHK1DFbR4SkLTHElOIYrneELfWK16DafRsrv_rdcARdhDYr3a1R0YRcVD10jyRF7TxGlR-XdDZD9",
        name: "ડૉ. વિશાલ મોદી",
        title: "Ph.D. ગોલ્ડ મેડાલિસ્ટ વૈદિક જ્યોતિષાચાર્ય",
        experience: "૨૦+ વર્ષનો જ્યોતિષ અનુભવ",
        desc: "૫૦,૦૦૦+ સંતુષ્ટ જાતકો. જ્યોતિષ, કેપી સિસ્ટમ અને વાસ્તુ દોષ નિવારણના વિશ્વસનીય માર્ગદર્શક.",
        bookBtn: "૧-ઓન-૧ વ્યક્તિગત પરામર્શ બુક કરો",
        waInquiryBtn: "WhatsApp પર અગાઉ પૂછપરછ"
      },
      store: {
        tag: "VEDIC STORE",
        title: "સિદ્ધ આધ્યાત્મિક ઉપકરણો",
        viewAll: "દિવ્ય સ્ટોર જુઓ",
        products: [
          {
            id: "item-1",
            name: "સિદ્ધ નેપાળી ૫-મુખી રૂદ્રાક્ષ",
            tag: "લેબ સર્ટિફાઇડ ઓરિજિનલ",
            price: "₹૧,૨૫૦",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBA_NBMcHfUL0ushM7Dk5jgdG2LAZuMFYTcu-PV-jNa8xoo4RPcOOFUdrBPkYDfkrObkA39ALmRh_tNVJ8soEn5Wk9kSgXPs-9ZOxC7UvLOzAcetJ_oQXvu7POvu1b3BUACwDmBHjRDY51NZxZXKU8DjNQq3_jTi4wnc6Z1Kzr8uAnpelvy8F0zRBlKz7xEsO4Sn-tkiFmbEAJZo35V0GvJZKD55wxDpJGpshYcmiUvIyCpdZo4uPeF"
          },
          {
            id: "item-2",
            name: "શ્રી યંત્ર તામ્ર પત્ર (૨૪ કેરેટ)",
            tag: "પ્રાણ પ્રતિષ્ઠિત",
            price: "₹૨,૧૦૦",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAhfX_LuBq_XFR90jfAwOky4QEgMsYLANFpqvmJ5Vz8bRN4_qdWEeF2xRaOol6SVzwueS3JKLkB5JNP1MthMcxfBdmihNAFX49XFn4Rx-5Zfzr5bwAs3H7wlwiwwZ8IDhc7T8Yt4U746icb0lxYTWp-qlD1ZF72aoiMP6MB_GqtBXPl3qLVqq8W5pMyKcsWg3yawTTEsQmh4UAwK_T2fUPKVSGdCp6YtT2WuOL84O_lU6GI9pnJEWLq"
          },
          {
            id: "item-3",
            name: "કુદરતી સ્ફટિક જાપ માળા",
            tag: "૧૦૮ દાણા શુદ્ધ સ્ફટિક",
            price: "₹૮૫૦",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCboHzCTxIpYzFzIW9MkQ0LCuISxZ4kEtbQh4-VxacoTCU5nauHIgTn2G6cTo48XGkW-WUKXJZ87AfeG3BTGXWOONWADutptcLlT686ttzCI0p2XUwqMQUEa6z77DOOGeDjJJYKhUhmfuo3u9CnWE51HdvAnTuqz1KBQ5w-CEfnw1Pb_Nuo-OccrERq0vDXr0fyHcUK9RYoaQxJXjhDA2cw4zgItdmZwm-VA_2-uSJ8wKfLZmKt7e77"
          }
        ]
      },
      newsletter: {
        title: "દૈનિક રાશિફળ WhatsApp ગ્રુપ",
        desc: "દરરોજ સવારે આપની રાશિ મુજબ રાશિફળ, શુભ ચોઘડિયું અને તહેવાર માહાત્મ્ય સીધા ફોન પર મેળવો.",
        placeholder: "તમારો મોબાઈલ નંબર",
        btnText: "ગ્રુપમાં વિનામૂલ્યે જોડાવો",
        successMsg: "સ્વાગત છે! આપ WhatsApp ગ્રુપમાં નોંધાયા છો."
      },
      social: {
        tag: "CONNECT • સોશિયલ મીડિયા",
        title: "અમારી આધ્યાત્મિક કોમ્યુનિટી",
        channels: [
          { name: "YouTube", stat: "૪૫K સભ્યો", tag: "YT" },
          { name: "Instagram", stat: "૯.૧K ફોલોઅર્સ", tag: "IG" },
          { name: "Facebook", stat: "૩.૨K લાઇક્સ", tag: "FB" },
          { name: "X (Twitter)", stat: "દૈનિક અપડેટ્સ", tag: "X" }
        ]
      }
    },
    shlokaBar: {
      shloka: "॥ સર્વે ભવન્તુ સુખિનઃ સર્વે સન્તુ નિરામયાઃ • કલ્યાણમસ્તુ ॥",
      subText: "The Astro Code • વૈદિક આચારસંહિતા અને પ્રાચીન જ્ઞાન આધારિત સુખી જીવનનું રહસ્ય"
    }
  },

  en: {
    meta: {
      title: "Contact Us & Vedic Support | The Astro Code - Astrological Guidance Center",
      description: "Direct astrological guidance, Kundali analysis, Vastu Shastra consultation, and sacred puja muhurta from Dr. Vishal Modi and The Astro Code team. Ahmedabad headquarters.",
      keywords: [
        "The Astro Code Contact",
        "Dr. Vishal Modi Contact",
        "Astrology Consultation Ahmedabad",
        "Kundali Analysis Booking",
        "Vastu Shastra Visit",
        "Vedic Support Center"
      ]
    },
    accentStrip: {
      breadcrumbHome: "Home",
      breadcrumbCurrent: "Contact & Vedic Support",
      certifiedBadge: "Certified Astrological Consultation • ISO 9001:2015 Facility"
    },
    headerBanner: {
      badge: "॥ Satyam Shivam Sundaram ॥ • Vedic Support Center",
      title: "Contact Us — Astrological Guidance & Vedic Support Center",
      subtitle: "Connect directly with our Vedic astrology panel and Dr. Vishal Modi for Janam Kundali analysis, planetary remedy guidance, Vastu audits, and sacred spiritual inquiries.",
      yantraCard: {
        brand: "THE ASTRO CODE",
        title: "Shree Yantra Spiritual Center",
        locations: "Ahmedabad • Surat • Mumbai • Global Online"
      }
    },
    quickCards: [
      {
        id: "phone",
        icon: "call",
        badge: "Mon - Sat",
        title: "Helpline & Phone Consultation",
        desc: "Call our dedicated desk for direct Kundali appointments and ritual schedules.",
        phones: ["+91 79 4000 8108", "+91 98765 43210"],
        timings: "09:30 AM to 07:00 PM IST",
        ctaText: "Call Helpline Now",
        ctaLink: "tel:+917940008108",
        variant: "primary"
      },
      {
        id: "whatsapp",
        icon: "chat",
        badge: "Instant Reply",
        title: "WhatsApp Instant Support",
        desc: "24x7 digital helpline for quick queries and astrological appointment booking.",
        phones: ["+91 98765 43210"],
        subText: "24-Hour WhatsApp Kundali Desk",
        timings: "Avg. response time: 15 minutes",
        ctaText: "Chat on WhatsApp",
        ctaLink: "https://wa.me/919876543210?text=Hello%20The%20Astro%20Code,%20I%20need%20astrological%20guidance",
        variant: "gold"
      },
      {
        id: "email",
        icon: "mail",
        badge: "Official Email",
        title: "Email Support & Written Reports",
        desc: "For detailed horoscope charts, corporate Vastu inquiries, and partnerships.",
        emails: ["support@theastrocode.com", "contact@theastrocode.com"],
        timings: "Certified written reply within 24 hours",
        ctaText: "Send Email",
        ctaLink: "mailto:support@theastrocode.com",
        variant: "surface"
      }
    ],
    inquiryForm: {
      tag: "ONLINE APPOINTMENT • VEDIC FORM",
      title: "Online Inquiry & Appointment Request",
      subtitle: "Submit your details below. Our senior astrological coordinator will respond promptly with suitable guidance and appointment schedules.",
      fields: {
        fullName: "Full Name",
        fullNamePlaceholder: "e.g. Rohit Parekh",
        phone: "Mobile Number",
        phonePlaceholder: "98765 43210",
        email: "Email Address",
        emailPlaceholder: "rohit@example.com",
        subject: "Consultation Topic / Inquiry Subject",
        options: [
          { value: "kundali", label: "Janam Kundali Analysis & Future Forecast" },
          { value: "vastu", label: "Vastu Shastra Audit & On-site Visit" },
          { value: "gemstone", label: "Gemstone & Sacred Rudraksha Guidance" },
          { value: "matchmaking", label: "Marriage Compatibility & Career Kundali" },
          { value: "puja", label: "Navagraha Puja Rituals & Muhurta Timing" },
          { value: "numerology", label: "Numerology & Name Spelling Correction" },
          { value: "general", label: "General Spiritual Inquiry" }
        ],
        dob: "Date & Time of Birth (Optional for Kundali)",
        dobPlaceholder: "e.g. 15/08/1992 • 08:24 AM",
        birthPlace: "Birth Place / City (Optional for Kundali)",
        birthPlacePlaceholder: "e.g. Ahmedabad, Gujarat",
        message: "Your Question or Detailed Message",
        messagePlaceholder: "Describe your concern, life queries, or ritual requirements in detail so we can provide authentic Vedic guidance...",
        consent: "I agree to receive daily Panchang, auspicious Choghadiya, and horoscope insights via WhatsApp. Your data is 100% confidential.",
        submitBtn: "Submit Inquiry",
        sslSecurity: "256-Bit SSL Encrypted Secure Form",
        successMsg: "Your inquiry has been received successfully! Our team will contact you shortly."
      }
    },
    officeLocation: {
      tag: "OFFICE HEADQUARTERS • IN-PERSON VISIT",
      title: "Ahmedabad Main Headquarters & Consultation Chamber",
      officeCode: "Office Code: TAC-AHM-01",
      mapImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWHsmqS4apoeLcfK6iYKuIiW7BI7AZ5fBgc2x_T3chfTxcJD-5bCcP0PG94OYlmRTVaEx4w_PYJXpX-XBiZ4PKlUH7SIFW3K_XDcJ2h93v4suffRxP3RygtIMrHip-wLgFfqsgM9DWzuelqkVdRZVzGryHi2mfbyj8nRuYU6EqisiGT2koAdo7MEokt9BMa6wx5MzCTMF6lOOFLIVBRDr25eNW8KbZcgoAxugqT21UzaQqqZcBFzIj",
      officeName: "The Astro Code Head Office",
      addressShort: "402, Divya Astro Center, Pakwan Cross Roads, Bodakdev, SG Highway, Ahmedabad.",
      directionsBtn: "Get Directions on Google Maps",
      directionsUrl: "https://maps.google.com/?q=Bodakdev+SG+Highway+Ahmedabad",
      fullAddressTitle: "Full Address",
      fullAddress: "402, Divya Astro Center, Near Pakwan Cross Roads, Bodakdev, S.G. Highway, Ahmedabad, Gujarat - 380054.",
      landmark: "Landmark: Opposite Pakwan Dining Hall, Sindhu Bhavan Junction",
      timingsTitle: "Office Visiting Hours",
      timingsLine1: "Monday to Saturday: 10:00 AM to 07:00 PM",
      timingsLine2: "Sunday: Prior Appointment Only (Special Vastu / Rituals)",
      notice: "Prior appointment 24 hours in advance required for in-person consultation"
    },
    faqs: {
      tag: "GUIDANCE • FREQUENTLY ASKED QUESTIONS",
      title: "Astrological Consultation FAQs",
      items: [
        {
          id: "faq-1",
          question: "1. Can I book a direct 1-on-1 consultation with Dr. Vishal Modi?",
          answer: "Yes, absolutely. You can visit our Ahmedabad headquarters for an in-person session, or join via high-definition Zoom / Google Meet video calls from anywhere in the world."
        },
        {
          id: "faq-2",
          question: "2. What details are required for an accurate Janam Kundali reading?",
          answer: "For precise Vedic calculations, your Date of Birth (DD/MM/YYYY), exact Time of Birth (hours and minutes, AM/PM), and exact Place of Birth (city/town) are essential. If birth time is uncertain, Prashna Kundali methodology is utilized."
        },
        {
          id: "faq-3",
          question: "3. How long does spiritual store delivery take?",
          answer: "All gemstones, Yantras, and Rudraksha beads ordered through our Vedic shop are ritually consecrated (Pran Pratishtha) and delivered across India within 3 to 5 business days with laboratory certification."
        },
        {
          id: "faq-4",
          question: "4. Is my personal information kept strictly confidential?",
          answer: "Yes, 100%. We adhere to strict Vedic and professional codes of ethics. Your personal birth details, family queries, and discussions remain strictly confidential and secure."
        }
      ]
    },
    sidebar: {
      panchang: {
        title: "Daily Panchang • Ahmedabad",
        badge: "Today's Muhurta",
        weatherTitle: "Local Weather",
        weatherVal: "34°C • Clear Sky",
        choghadiyaLabel: "Choghadiya",
        choghadiyaVal: "Amrit (Highly Auspicious)",
        sunriseLabel: "Sunrise",
        sunriseVal: "06:28 AM",
        sunsetLabel: "Sunset",
        sunsetVal: "06:52 PM",
        rahuKaal: "Rahu Kaal: 04:30 PM - 06:00 PM",
        horaStatus: "Auspicious Hora Active"
      },
      astrologer: {
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuArOlzQcZu_euhnyymUNmU8c5uoL3Rr1wmJu3SdV2DcId5B_sFsKfp92-flRIZyQdL6U-0QD3tpDPuH8N846kDgfuuYvFUp95uFYAJid_b_VoviPRPaFw8knh5Dh1aT8cj-0JC3TUz-GdUToj5c2l9OFoRof9UadQWSsIUjJorPpHK1DFbR4SkLTHElOIYrneELfWK16DafRsrv_rdcARdhDYr3a1R0YRcVD10jyRF7TxGlR-XdDZD9",
        name: "Dr. Vishal Modi",
        title: "Ph.D. Gold Medalist Vedic Astrologer",
        experience: "20+ Years Astrological Research",
        desc: "50,000+ satisfied clients worldwide. Authority in Vedic Horoscopes, KP System, and structural Vastu remedies.",
        bookBtn: "Book 1-on-1 Consultation",
        waInquiryBtn: "Pre-Consultation on WhatsApp"
      },
      store: {
        tag: "VEDIC STORE",
        title: "Energized Sacred Essentials",
        viewAll: "Visit Divine Store",
        products: [
          {
            id: "item-1",
            name: "Siddha Nepali 5-Mukhi Rudraksha",
            tag: "Lab Certified Original",
            price: "₹1,250",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBA_NBMcHfUL0ushM7Dk5jgdG2LAZuMFYTcu-PV-jNa8xoo4RPcOOFUdrBPkYDfkrObkA39ALmRh_tNVJ8soEn5Wk9kSgXPs-9ZOxC7UvLOzAcetJ_oQXvu7POvu1b3BUACwDmBHjRDY51NZxZXKU8DjNQq3_jTi4wnc6Z1Kzr8uAnpelvy8F0zRBlKz7xEsO4Sn-tkiFmbEAJZo35V0GvJZKD55wxDpJGpshYcmiUvIyCpdZo4uPeF"
          },
          {
            id: "item-2",
            name: "Shree Yantra Copper Plate (24k)",
            tag: "Pran Pratishthit",
            price: "₹2,100",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAhfX_LuBq_XFR90jfAwOky4QEgMsYLANFpqvmJ5Vz8bRN4_qdWEeF2xRaOol6SVzwueS3JKLkB5JNP1MthMcxfBdmihNAFX49XFn4Rx-5Zfzr5bwAs3H7wlwiwwZ8IDhc7T8Yt4U746icb0lxYTWp-qlD1ZF72aoiMP6MB_GqtBXPl3qLVqq8W5pMyKcsWg3yawTTEsQmh4UAwK_T2fUPKVSGdCp6YtT2WuOL84O_lU6GI9pnJEWLq"
          },
          {
            id: "item-3",
            name: "Natural Sphatik Quartz Japa Mala",
            tag: "108 Pure Quartz Beads",
            price: "₹850",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCboHzCTxIpYzFzIW9MkQ0LCuISxZ4kEtbQh4-VxacoTCU5nauHIgTn2G6cTo48XGkW-WUKXJZ87AfeG3BTGXWOONWADutptcLlT686ttzCI0p2XUwqMQUEa6z77DOOGeDjJJYKhUhmfuo3u9CnWE51HdvAnTuqz1KBQ5w-CEfnw1Pb_Nuo-OccrERq0vDXr0fyHcUK9RYoaQxJXjhDA2cw4zgItdmZwm-VA_2-uSJ8wKfLZmKt7e77"
          }
        ]
      },
      newsletter: {
        title: "Daily Rashifal WhatsApp Community",
        desc: "Receive daily personalized horoscope, auspicious Choghadiya, and Vedic festival guidance straight on WhatsApp.",
        placeholder: "Enter mobile number",
        btnText: "Join WhatsApp Group Free",
        successMsg: "Welcome! Your number has been registered in our spiritual broadcast."
      },
      social: {
        tag: "CONNECT • SOCIAL MEDIA",
        title: "Our Spiritual Community",
        channels: [
          { name: "YouTube", stat: "45K Subscribers", tag: "YT" },
          { name: "Instagram", stat: "9.1K Followers", tag: "IG" },
          { name: "Facebook", stat: "3.2K Likes", tag: "FB" },
          { name: "X (Twitter)", stat: "Daily Updates", tag: "X" }
        ]
      }
    },
    shlokaBar: {
      shloka: "॥ Sarve Bhavantu Sukhinah Sarve Santu Niramayah • Kalyanamastu ॥",
      subText: "The Astro Code • Unlocking Happiness through Eternal Vedic Wisdom and Classical Astrological Research"
    }
  }
}
