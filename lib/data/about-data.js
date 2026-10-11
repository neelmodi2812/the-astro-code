/**
 * The Astro Code - About Us & Scholar Profile Repository
 * 
 * Provides complete bilingual content (Gujarati 'gu' and English 'en')
 * for the About page, Dr. Vishal Modi's credentials, core pillars,
 * verified certifications, and sidebar widgets.
 */

export const ABOUT_DATA = {
  // Breadcrumb & Category Filter Chips
  breadcrumb: {
    home: { gu: "મુખ્ય પૃષ્ઠ", en: "Home" },
    current: { gu: "અમારા વિશે", en: "About Us" }
  },
  filterChips: [
    { id: "jyotish", gu: "જ્યોતિષશાસ્ત્ર", en: "Vedic Astrology" },
    { id: "vastu", gu: "વાસ્તુશાસ્ત્ર", en: "Vastu Shastra" },
    { id: "vedic-science", gu: "વૈદિક વિજ્ઞાન", en: "Vedic Science" },
    { id: "about-us", gu: "અમારા વિશે", en: "About Us", active: true },
    { id: "kundali", gu: "કુંડળી માર્ગદર્શન", en: "Kundali Guidance" }
  ],

  // Editorial Mission Hero Header
  hero: {
    legacyTag: { gu: "અમારા વારસા વિશે", en: "ABOUT OUR LEGACY" },
    title: {
      gu: "શાશ્વત વૈદિક વિજ્ઞાન અને આધુનિક જીવનનો સુમેળ — ",
      highlight: { gu: "ધ એસ્ટ્રો કોડ", en: "The Astro Code" },
      en: "Harmonizing Eternal Vedic Science with Modern Life — "
    },
    description: {
      gu: "અંધશ્રદ્ધા મુક્ત, ગણિત આધારિત ચોક્કસ પંચાંગ, શાસ્ત્રોક્ત કુંડળી વિશ્લેષણ અને શુદ્ધ સનાતન અધ્યાત્મ દ્વારા માનવજીવનમાં શાંતિ, સમૃદ્ધિ અને સંતોષના નિર્માણનો પવિત્ર સંકલ્પ.",
      en: "A sacred resolve to create peace, prosperity, and contentment in modern life through superstition-free, calculation-backed authentic Panchang, scriptural horoscope analysis, and pure Sanatan spirituality."
    }
  },

  // Grand Scholar Profile Card
  scholar: {
    name: { gu: "ડૉ. વિશાલ મોદી", en: "Dr. Vishal Modi" },
    roleTag: { gu: "મુખ્ય આચાર્ય & સંસ્થાપક", en: "CHIEF ACHARYA & FOUNDER" },
    degreeTag: { gu: "Ph.D. in Jyotish Shastra", en: "Ph.D. in Jyotish Shastra" },
    subTitle: {
      gu: "સંસ્કૃત મહાવિદ્યાલય ગોલ્ડ મેડાલિસ્ટ વૈદિક જ્યોતિષાચાર્ય",
      en: "Sanskrit Mahavidyalaya Gold Medalist Vedic Jyotishacharya"
    },
    verifiedBadge: { gu: "પ્રમાણિત ગુરુ", en: "Verified Guru" },
    verifiedProfile: { gu: "સત્તાવાર પ્રોફાઇલ", en: "Official Profile" },
    bio: {
      gu: "૨૦+ વર્ષોનો ગહન સંશોધન અનુભવ અને શુદ્ધ સનાતન ગણિત જ્યોતિષ પરંપરાના સમર્પિત સંવાહક. ગુજરાત અને દેશભરમાં હજારો પરિવારોને ચોક્કસ માર્ગદર્શન આપનાર આદરણીય વિદ્વાન.",
      en: "Over 20+ years of profound research experience and dedicated torchbearer of the pure Sanatan mathematical astrology tradition. Respected scholar guiding thousands of families across Gujarat, India, and worldwide."
    },
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNDMKM1-qCKl4_zOTCK6VxiuFBHHFLK4Q2ykWYmkCWLaxU7KD7Mrbr_w5AQuAoJJZ-_gl5EKziiKph_usvQ2tmhoYswXiL0gzekRGkDNY40FWch1yaZ3VpxWwCwrhLJDUQ_ESgi9SzgJtJKLH-ts_GEqoDPdo4k6L31VreKJaalzcYgw0wY59plx5BxmVquzbW9wZLnFJGfqAy8ybmVzbaVVlGa6T7BZTyVCoxtov78SqQ-rPKhK-q",
    imageAlt: "Dr. Vishal Modi, Senior Vedic Astrologer and Scholar",
    stats: [
      {
        value: { gu: "૨૦+", en: "20+" },
        label: { gu: "વર્ષોનો અનુભવ", en: "Years Experience" },
        sub: { gu: "ગહન અધ્યયન", en: "Vedic Research" }
      },
      {
        value: { gu: "૫૦,૦૦૦+", en: "50,000+" },
        label: { gu: "કુંડળી વિશ્લેષણ", en: "Kundali Analyses" },
        sub: { gu: "સંતુષ્ટ ભાવિકો", en: "Satisfied Seekers" }
      },
      {
        value: { gu: "૧૦૦+", en: "100+" },
        label: { gu: "રાષ્ટ્રીય સન્માન", en: "National Honors" },
        sub: { gu: "રાજ્ય સ્તરે ગૌરવ", en: "State Accreditations" }
      },
      {
        value: { gu: "૧૨+", en: "12+" },
        label: { gu: "ગ્રંથો & સંશોધન", en: "Books & Papers" },
        sub: { gu: "પ્રકાશિત સાહિત્ય", en: "Published Literature" }
      }
    ]
  },

  // Biography & Spiritual Journey
  biography: {
    heading: {
      gu: "જીવન પરિચય અને આધ્યાત્મિક સંશોધન યાત્રા",
      en: "Life Journey & Spiritual Research Legacy"
    },
    paragraphs: [
      {
        gu: "ડૉ. વિશાલ મોદીનો જન્મ ગુજરાતના પવિત્ર સંસ્કારધામમાં એક ધાર્મિક બ્રાહ્મણ પરિવારમાં થયો હતો. બાલ્યકાળથી જ સંસ્કૃત શ્લોકો, વૈદિક મંત્રોચ્ચાર અને ખગોળીય ગણતરીઓમાં વિશેષ રુચિ ધરાવતા ડૉ. મોદીએ પ્રખ્યાત સંસ્કૃત વિદ્યાપીઠમાંથી ‘જ્યોતિષ રત્ન’ અને ત્યારબાદ સૌરાષ્ટ્ર યુનિવર્સિટીમાંથી સિદ્ધાંત જ્યોતિષ પર મહાનિબંધ લખીને Ph.D. ની પદવી સુવર્ણચંદ્રક સાથે પ્રાપ્ત કરી છે.",
        en: "Dr. Vishal Modi was born into a devout Brahmin family in Gujarat. From early childhood, drawn to Sanskrit verses, Vedic chants, and celestial mathematics, Dr. Modi earned the title of 'Jyotish Ratna' from a renowned Sanskrit Vidyapeeth, followed by a Ph.D. in Siddhanta Jyotish with a Presidential Gold Medal from Saurashtra University."
      },
      {
        gu: "તેમનો મુખ્ય અભિગમ જ્યોતિષશાસ્ત્રને અંધશ્રદ્ધા કે ડરના સાધનમાંથી મુક્ત કરી તેને ‘વિજ્ઞાન સંમત જ્યોતિષ’ (Logical & Mathematical Astrology) તરીકે સ્થાપિત કરવાનો રહ્યો છે. પરાશર ઋષિના બૃહત્ પરાશર હોરાશાસ્ત્ર અને વરાહમિહિરની બૃહત્સંહિતા જેવા મૂળ શાસ્ત્રોના અક્ષરશઃ પ્રમાણો સાથે તેઓ જનસામાન્યને જીવનના પ્રશ્નોનું સમાધાન આપે છે.",
        en: "His core philosophy has always been liberating astrology from superstition and fear, establishing it firmly as 'Logical & Mathematical Astrology'. Based on original scriptures such as Maharishi Parashara's Brihat Parashara Hora Shastra and Varahamihira's Brihat Samhita, he provides rational and spiritual solutions to real-life challenges."
      }
    ],
    quote: {
      text: {
        gu: "“જ્યોતિષ એ કોઈ ભય કે અંધશ્રદ્ધાનું સાધન નથી, પરંતુ જીવનના કર્મો અને ગ્રહ નક્ષત્રોના પ્રભાવને સમજી સન્માર્ગે આગળ વધવાની દિવ્ય દ્રષ્ટિ છે.”",
        en: "“Astrology is neither an instrument of fear nor superstition; it is divine vision to understand our karmas, align with planetary influences, and walk the path of dharma with clarity.”"
      },
      author: {
        gu: "— ડૉ. વિશાલ મોદી (સંસ્થાપક, The Astro Code)",
        en: "— Dr. Vishal Modi (Founder, The Astro Code)"
      }
    },
    vastuNote: {
      gu: "વાસ્તુશાસ્ત્રમાં પણ પંચમહાભૂતો (પૃથ્વી, જળ, અગ્નિ, વાયુ, આકાશ) ના સંતુલન દ્વારા ઘર કે ઔદ્યોગિક એકમમાં વિના તોડફોડ સકારાત્મક ઉર્જાનો સંચાર કરવામાં તેઓ વિશેષ નિપુણતા ધરાવે છે. તેમણે ગુજરાત, મુંબઈ, દિલ્હી તેમજ યુ.એસ.એ., યુ.કે. અને કેનેડામાં વસતા હજારો એન.આર.આઈ. પરિવારોને સાચી દિશા દર્શાવી છે.",
      en: "In Vastu Shastra, he specializes in balancing the five primordial elements (Earth, Water, Fire, Air, Space) without destructive demolition to restore harmony and abundance. He has guided thousands of NRI and corporate families across Mumbai, Delhi, USA, UK, and Canada."
    }
  },

  // 4 Pillars of Expertise
  pillarsSection: {
    tag: { gu: "ગહન વૈદિક અધ્યયન", en: "DEEP VEDIC EXPERTISE" },
    title: { gu: "મુખ્ય નિષ્ણાત ક્ષેત્રો & માર્ગદર્શન", en: "Core Pillars of Expertise & Guidance" },
    subtitle: {
      gu: "સનાતન ભારતીય ઋષિ પરંપરા આધારિત ચાર મૂળભૂત સ્તંભો જે જીવનની મૂંઝવણો દૂર કરે છે:",
      en: "Four foundational pillars rooted in the authentic Indian Rishi tradition that resolve life dilemmas:"
    },
    items: [
      {
        id: "pillar-kundali",
        icon: "flare",
        color: "bg-[#00685d] text-white",
        title: { gu: "જન્મકુંડળી રહસ્ય & ગ્રહદોષ નિવારણ", en: "Horoscope Mysteries & Planetary Remedies" },
        desc: {
          gu: "લગ્ન, કારકિર્દી, સ્વાસ્થ્ય અને ધન પ્રાપ્તિ માટે ૧૨ ભાવો અને ૯ ગ્રહોનું ગાણિતિક વિશ્લેષણ. કાલસર્પ, માંગલિક કે પિતૃદોષના સરળ અને સાત્વિક ઉપાયો.",
          en: "Mathematical analysis of 12 houses and 9 planetary energies for marriage, career, and vitality. Sattvic, accessible remedies for Kaal Sarp, Manglik, or Pitru doshas."
        },
        action: { gu: "શાસ્ત્રોક્ત મંત્ર & યંત્ર નિદાન", en: "Scriptural Mantra & Yantra Remedy" }
      },
      {
        id: "pillar-panchang",
        icon: "calendar",
        color: "bg-[#fdc72d] text-[#1b1c1a]",
        title: { gu: "વૈદિક પંચાંગ & શુભ મુહૂર્ત વિધાન", en: "Vedic Panchang & Auspicious Timings" },
        desc: {
          gu: "તિથિ, વાર, નક્ષત્ર, યોગ અને કરણનું ચોક્કસ ગણિત. વાસ્તુપૂજન, વિવાહ સંસ્કાર, વેપાર પ્રારંભ કે ગૃહપ્રવેશ માટે સર્વશ્રેષ્ઠ અમૃત ચોઘડિયા નિર્ધારણ.",
          en: "High-precision calculations of Tithi, Vaar, Nakshatra, Yoga, and Karana. Selecting optimal Amrit Choghadiyas for weddings, business launches, and Griha Pravesh."
        },
        action: { gu: "સૂર્યસિદ્ધાંત ગણતરી", en: "Surya Siddhanta Astronomical Math" }
      },
      {
        id: "pillar-vastu",
        icon: "building",
        color: "bg-[#00685d] text-white",
        title: { gu: "પ્રાચીન વાસ્તુશાસ્ત્ર દર્પણ", en: "Ancient Vastu Shastra Mirror" },
        desc: {
          gu: "ઘર, દુકાન, ફેક્ટરી કે કાર્યાલયમાં અષ્ટદિશાઓનું ઉર્જા સંતુલન. કોઈ પણ વિનાશક તોડફોડ વગર પિરામિડ, સ્ફટિક અને ધાતુઓ દ્વારા દોષ શમન.",
          en: "Harmonizing the 8 directional energies of residences and industrial plants. Eliminating defects without demolition using pyramids, crystals, and sacred metals."
        },
        action: { gu: "દિશા અને ઉર્જા શુદ્ધિ", en: "Directional & Energy Purification" }
      },
      {
        id: "pillar-numerology",
        icon: "hash",
        color: "bg-[#fdc72d] text-[#1b1c1a]",
        title: { gu: "અંકશાસ્ત્ર & ભાગ્યાંક સુમેળ", en: "Numerology & Destiny Number Harmony" },
        desc: {
          gu: "મૂળાંક અને ભાગ્યાંકનું સંયોજન, નામ સ્પેલિંગ સુધારણા (Name Correction), વેપાર પેઢીનું શુભ નામકરણ અને મોબાઇલ અંક સુમેળ સલાહ.",
          en: "Root number and destiny number synthesis, phonetic name spelling correction, auspicious enterprise naming, and lucky mobile number alignments."
        },
        action: { gu: "ન્યુમરોલોજીકલ સફળતા", en: "Numerological Alignment & Success" }
      }
    ]
  },

  // Sacred Mission & Vision Banner
  mission: {
    tag: { gu: "અમારો દિવ્ય સંકલ્પ", en: "OUR SACRED PLEDGE" },
    title: { gu: "ધ એસ્ટ્રો કોડ મિશન — ", highlight: { gu: "અનલોક હેપીનેસ", en: "Unlock Happiness" }, en: "The Astro Code Mission — " },
    desc: {
      gu: "અમારું લક્ષ્ય પ્રત્યેક વ્યક્તિના અંતરમાં રહેલી દિવ્ય ઉર્જાને જાગૃત કરી, અજ્ઞાન અને અસમંજસતાના અંધકારને દૂર કરી સાચા માર્ગ પર પ્રેરિત કરવાનું છે.",
      en: "Our divine purpose is awakening the inherent cosmic energy within every seeker, dispelling the darkness of hesitation, and inspiring righteous actions."
    },
    checkpoints: [
      { gu: "૧૦૦% શાસ્ત્રોક્ત અને પ્રમાણિત જ્ઞાન", en: "100% Scripturally Verified Knowledge" },
      { gu: "સરળ, શુદ્ધ ગુજરાતી ભાષામાં ઉપલબ્ધિ", en: "Accessible in Pure, Dignified Gujarati & English" },
      { gu: "પ્રાણ પ્રતિષ્ઠિત યંત્રો અને રુદ્રાક્ષ", en: "Energized Yantras and Certified Rudraksha" },
      { gu: "નૈતિક & ૧૦૦% ગોપનીય પરામર્શ", en: "Ethical & 100% Confidential Consultations" }
    ],
    yantraImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDzKQ123OCqFWvd5YZv606DUp6pVIwN5t6X7zLS35X3JNebpoqKtecBjUGglTIcNR0mcUdbAW7z8O0IZ1Zg91kMKKG1FtFaZcsyHMKc0h0Hf3niEp7KsAZkB2FU3iXzaTRZG9OyZWpDfFxe_h7OOTniZcJk2F-sa0lr7ozEx2_nhapVEAhVo8tt4x_W6-Y-271FXCwVpQgM4y3DIKbIhvVs0J1crHwvdhau82CswgGO9w9WVL5Ju9eR7cJYyDjXtm8ERg",
    yantraAlt: "Sacred Golden Sri Yantra Emblem The Astro Code"
  },

  // ==========================================
  // CERTIFICATIONS & ACCREDITATIONS SECTION
  // (Explicitly requested by user!)
  // ==========================================
  certificationsSection: {
    tag: { gu: "પ્રમાણિકતા & અધિકૃતતા", en: "CREDENTIALS & ACCREDITATIONS" },
    title: { gu: "સત્તાવાર પ્રમાણપત્રો & રાષ્ટ્રીય સન્માન", en: "Verified Certifications & Accreditations" },
    subtitle: {
      gu: "ડૉ. વિશાલ મોદીનું કાર્ય સંપૂર્ણપણે માન્ય વિદ્યાપીઠો, સરકારી સંસ્થાઓ અને આંતરરાષ્ટ્રીય જ્યોતિષ પરિષદો દ્વારા પ્રમાણિત છે:",
      en: "Dr. Vishal Modi's research and astrological counsel are rigorously recognized by universities, state bodies, and national astrological federations:"
    },
    items: [
      {
        id: "cert-phd",
        grade: "Doctorate with Gold Medal",
        badge: { gu: "સર્વોચ્ચ પદવી", en: "Highest Honor" },
        title: {
          gu: "Ph.D. in Jyotish Shastra (સિદ્ધાંત જ્યોતિષ)",
          en: "Ph.D. in Jyotish Shastra (Siddhanta Jyotish)"
        },
        institution: {
          gu: "સૌરાષ્ટ્ર યુનિવર્સિટી & સંસ્કૃત વિદ્યાપીઠ",
          en: "Saurashtra University & Sanskrit Vidyapeeth"
        },
        regNo: "REG-SU-DOC-2008-042",
        year: { gu: "૨૦૦૮", en: "2008" },
        sealText: { gu: "પ્રમાણિત ડૉક્ટરેટ", en: "Verified Ph.D." },
        description: {
          gu: "પરાશરી હોરા સિદ્ધાંત અને ગાણિતિક ખગોળશાસ્ત્ર પર સર્વોચ્ચ સંશોધન મહાનિબંધ માટે રાજ્યપાલશ્રીના હસ્તે સુવર્ણચંદ્રક સાથે પદવી એનાયત.",
          en: "Awarded with the prestigious Governor's Gold Medal for breakthrough thesis on Parashari mathematical astronomy and astrological cycles."
        }
      },
      {
        id: "cert-gold-medalist",
        grade: "Jyotish Ratna & Shiromani",
        badge: { gu: "સુવર્ણ ચંદ્રક", en: "Gold Medalist" },
        title: {
          gu: "જ્યોતિષ રત્ન & સિદ્ધાંત શિરોમણી પદવી",
          en: "Jyotish Ratna & Siddhanta Shiromani Honor"
        },
        institution: {
          gu: "અખિલ ભારતીય સંસ્કૃત મહાવિદ્યાલય પરિષદ",
          en: "All India Sanskrit Mahavidyalaya Council"
        },
        regNo: "AISM-GJ-GOLD-2004",
        year: { gu: "૨૦૦૪", en: "2004" },
        sealText: { gu: "ગોલ્ડ મેડાલિસ્ટ", en: "Gold Medalist" },
        description: {
          gu: "વેદોક્ત પંચાંગ ગણિત, મુહૂર્ત ચિંતામણી અને સંહિતા શાસ્ત્રની રાષ્ટ્રીય સ્તરની સ્પર્ધાત્મક પરીક્ષામાં પ્રથમ સ્થાન પ્રાપ્ત.",
          en: "Secured First Rank nationally in classical Vedic Panchang calculations, Muhurta Chintamani, and celestial ephemeris."
        }
      },
      {
        id: "cert-federation",
        grade: "Life Member & Master Consultant",
        badge: { gu: "પરિષદ માન્યતા", en: "Federation Certified" },
        title: {
          gu: "રાષ્ટ્રીય જ્યોતિષ પરિષદ - આજીવન વરિષ્ઠ સભ્ય",
          en: "All India Astrological Federation - Senior Fellow"
        },
        institution: {
          gu: "ઓલ ઇન્ડિયા ફેડરેશન ઓફ એસ્ટ્રોલોજર્સ સોસાયટીઝ (AIFAS)",
          en: "All India Federation of Astrologers Societies (AIFAS)"
        },
        regNo: "AIF-GJ-SENIOR-981",
        year: { gu: "૨૦૧૨", en: "2012" },
        sealText: { gu: "રાષ્ટ્રીય સભ્ય", en: "Senior Fellow" },
        description: {
          gu: "અંધશ્રદ્ધા મુક્ત, વિજ્ઞાન સંમત અને નૈતિક જ્યોતિષ સેવાઓ માટે રાષ્ટ્રીય સ્તરે પ્રમાણિત વરિષ્ઠ જ્યોતિષાચાર્ય સભ્યપદ.",
          en: "Nationally accredited Senior Jyotishacharya credential dedicated to rational, ethical, and superstition-free counseling."
        }
      },
      {
        id: "cert-iso",
        grade: "Quality & Authenticity Standard",
        badge: { gu: "ISO ૯૦૦૧:૨૦૧૫", en: "ISO 9001:2015" },
        title: {
          gu: "ISO ૯૦૦૧:૨૦૧૫ ગુણવત્તા પ્રમાણિત સ્ટોર & પૂજા સામગ્રી",
          en: "ISO 9001:2015 Certified Vedic Store & Gemstones"
        },
        institution: {
          gu: "ઇન્ટરનેશનલ ઓર્ગેનાઇઝેશન ફોર સ્ટાન્ડર્ડાઇઝેશન (ISO)",
          en: "International Organization for Standardization (ISO)"
        },
        regNo: "ISO-QMS-2023-TAC91",
        year: { gu: "૨૦૨૩", en: "2023" },
        sealText: { gu: "ગુણવત્તા પ્રમાણિત", en: "100% Authentic" },
        description: {
          gu: "ધ એસ્ટ્રો કોડ દ્વારા પૂરા પાડવામાં આવતા તમામ રત્નો (લેબ ટેસ્ટેડ), પ્રાણ પ્રતિષ્ઠિત યંત્રો અને પ્રાકૃતિક રુદ્રાક્ષ માટે ગુણવત્તા ખાતરી.",
          en: "Certified quality management system ensuring 100% authentic, lab-tested gemstones, energized Sri Yantras, and genuine Nepali Rudrakshas."
        }
      },
      {
        id: "cert-vastu-master",
        grade: "Panchamahabhuta Specialist",
        badge: { gu: "વાસ્તુ આચાર્ય", en: "Vastu Master" },
        title: {
          gu: "વિના તોડફોડ પ્રાચીન વાસ્તુ નિષ્ણાત પ્રમાણપત્ર",
          en: "Non-Demolition Vedic Vastu Architecture Certification"
        },
        institution: {
          gu: "ઇન્ટરનેશનલ કાઉન્સિલ ઓફ વૈદિક આર્કિટેક્ચર",
          en: "International Council of Vedic Architecture"
        },
        regNo: "ICVA-VASTU-2016-118",
        year: { gu: "૨૦૧૬", en: "2016" },
        sealText: { gu: "પ્રમાણિત વાસ્તુ", en: "Certified Vastu" },
        description: {
          gu: "રહેણાંક, વ્યાપારિક અને ઔદ્યોગિક એકમોમાં અષ્ટદિશા ઉર્જા સંતુલન અને પિરામિડ-ધાતુ આધારિત શુદ્ધિમાં વિશિષ્ટ નિપુણતા.",
          en: "Specialized accreditation in directional bio-energy balancing and subtle pyramid harmonizing without structural destruction."
        }
      },
      {
        id: "cert-state-award",
        grade: "State Excellence Honor",
        badge: { gu: "રાજ્ય સન્માન", en: "State Award" },
        title: {
          gu: "ગુજરાત સંસ્કૃત સાહિત્ય અકાદમી - ‘જ્યોતિષ ભૂષણ’ ગૌરવ",
          en: "Gujarat Sanskrit Sahitya Academy - Jyotish Bhushan Honor"
        },
        institution: {
          gu: "ગુજરાત રાજ્ય સંસ્કૃત સાહિત્ય પરિષદ",
          en: "Gujarat State Sanskrit Sahitya Academy"
        },
        regNo: "GSSA-HON-JYOT-2019",
        year: { gu: "૨૦૧૯", en: "2019" },
        sealText: { gu: "જ્યોતિષ ભૂષણ", en: "Jyotish Bhushan" },
        description: {
          gu: "સનાતન સંસ્કૃતિ, પ્રાચીન હસ્તપ્રતોનું સંરક્ષણ અને સમાજમાં વૈદિક જ્ઞાનના નિઃસ્વાર્થ પ્રસાર બદલ મળેલું સર્વોચ્ચ રાજ્ય સ્તરનું સન્માન.",
          en: "Highest state recognition honoring manuscript preservation, research on ancient astronomical codices, and Vedic education."
        }
      }
    ]
  },

  // Direct Consultation CTA
  consultationCta: {
    tag: { gu: "વ્યક્તિગત માર્ગદર્શન", en: "PERSONAL GUIDANCE" },
    title: {
      gu: "જીવનની સમસ્યાઓના સમાધાન માટે ડૉ. વિશાલ મોદી સાથે ચર્ચા કરો",
      en: "Consult Directly with Dr. Vishal Modi for Life Solutions"
    },
    subtitle: {
      gu: "ઓનલાઇન વિડીયો કોલિંગ અથવા રૂબરૂ મુલાકાત દ્વારા કુંડળી વિશ્લેષણ મેળવો.",
      en: "Receive detailed astrological analysis through 1-on-1 video call or in-person clinic consultation."
    },
    badges: [
      { gu: "સંપૂર્ણ ખાનગી", en: "100% Private" },
      { gu: "પ્રમાણિત નિષ્ણાત", en: "Verified Master" },
      { gu: "ત્વરિત સપોર્ટ", en: "Instant Support" }
    ],
    buttonBooking: { gu: "કુંડળી વિશ્લેષણ સમય બુક કરો", en: "Book Consultation Slot" },
    buttonWhatsapp: { gu: "WhatsApp દ્વારા સંપર્ક", en: "Connect via WhatsApp" },
    whatsappUrl: "https://wa.me/919825000000"
  },

  // Bottom Authenticity Pledge Banner
  pledge: {
    title: { gu: "ધ એસ્ટ્રો કોડ પ્રમાણિકતા પ્રતિજ્ઞા", en: "The Astro Code Authenticity Pledge" },
    description: {
      gu: "અમે કોઈ પણ અવિજ્ઞાનિક ડર કે અંધવિશ્વાસને પ્રોત્સાહન આપતા નથી. તમામ લેખો અને કુંડળી વિશ્લેષણ પ્રાચીન શાસ્ત્રો આધારિત છે.",
      en: "We do not endorse unscientific fear, superstition, or exploitation. All publications and astrological interpretations are strictly rooted in authentic classical treatises."
    },
    buttonText: { gu: "વધુ શાસ્ત્રીય નિયમો વાંચો", en: "Read Classical Principles" }
  },

  // Sidebar Widgets Data
  sidebar: {
    // Widget 1: Live Choghadiya Ring
    choghadiya: {
      title: { gu: "આજના શુભ ચોઘડિયા", en: "Today's Auspicious Choghadiya" },
      currentTag: { gu: "વર્તમાન ચોઘડિયું", en: "CURRENT CHOGHADIYA" },
      name: { gu: "અમૃત (શુભ)", en: "Amrit (Most Auspicious)" },
      timeRange: { gu: "સવારે ૦૮:૧૫ થી ૦૯:૪૦", en: "08:15 AM to 09:40 AM" },
      verdict: { gu: "નવું કાર્ય પ્રારંભ કરવા ઉત્તમ", en: "Best time to start new endeavors" },
      nextChoghadiya: { gu: "આગામી: કાળ (અશુભ) ૦૯:૪૦ થી ૧૧:૦૫", en: "Next: Kaal (Avoid) 09:40 to 11:05 AM" },
      fullPanchangText: { gu: "પૂર્ણ પંચાંગ", en: "Full Panchang" }
    },

    // Widget 2: Doctor Clinic & Center Card
    clinic: {
      title: { gu: "સંપર્ક કેન્દ્ર & કાર્યાલય", en: "Consultation Center & Office" },
      subtitle: { gu: "શ્રી જ્યોતિષ અનુસંધાન કેન્દ્ર", en: "Shree Jyotish Research Center" },
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDCBDNioAZ5sxVnzgPChRJ38N6v3qd-yUL3SeNq1Fq6cy7gvs9UmlVk8_TNQhLwCk1iefdLFEO_1IhBgkw5I10XjATUv1Lk0LgRNaUx-jAIA4WwOqUMri1nba0nwaJ00fGYXOwVmQ51CmoK2CZxQXcOHbdDck__fjWHTEhAI9FvN98f-nzRkJmoyonpBO02Llq7UN04TTWr4b9cN3z-B6KSojNF7ZVAr1CDFXn6JESKq5zhMbc7wEgx",
      address: {
        gu: "૪૦૨, દિવ્ય રત્ન કોમ્પ્લેક્સ, પકવાન ચાર રસ્તા પાસે, બોડકદેવ, એસ. જી. હાઇવે, અમદાવાદ - ૩૮૦૦૫૪",
        en: "402, Divya Ratna Complex, Near Pakwan Crossroads, Bodakdev, S.G. Highway, Ahmedabad - 380054"
      },
      phones: ["+૯૧ ૯૮૨૫૦ ૭૧૧૨૨", "+૯૧ ૭૯ ૪૦૦૦ ૧૧૨૨"],
      email: "dr.vishal@theastrocode.com",
      timings: {
        gu: "સોમ થી શનિ: સવારે ૧૦:૦૦ થી સાંજે ૦૭:૦૦",
        en: "Mon to Sat: 10:00 AM to 07:00 PM"
      }
    },

    // Widget 3: Social Community
    social: {
      title: { gu: "આધ્યાત્મિક પરિવાર સાથે જોડાઓ", en: "Join Our Spiritual Community" },
      channels: [
        { name: { gu: "ફેસબુક", en: "Facebook" }, count: "૩.૨K", color: "text-[#1877f2]" },
        { name: { gu: "યુટ્યુબ", en: "YouTube" }, count: "૧.૧૫K", color: "text-[#ff0000]" },
        { name: { gu: "એક્સ (ટ્વિટર)", en: "X (Twitter)" }, count: "૩૦૯", color: "text-foreground" }
      ]
    },

    // Widget 4: Spiritual Store Items
    store: {
      title: { gu: "વેદિક શોપ પ્રસાદ", en: "Vedic Shop Prasad" },
      viewAll: { gu: "બધાં જુઓ", en: "View All" },
      products: [
        {
          id: "rudraksha-5m",
          name: { gu: "સિદ્ધ પંચમુખી રુદ્રાક્ષ", en: "Energized 5-Mukhi Rudraksha" },
          price: { gu: "₹ ૮૫૦", en: "₹ 850" },
          badge: { gu: "પ્રાણ પ્રતિષ્ઠિત", en: "Energized" },
          image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBGPQcOggf1FB2Rfq8FWxCzyP-qLPfWrrGZrBI7AQ-cNo2KmiGC1Uuh641X2xYOEu3rSPfGpQ4glQaXaBR1uAUXNjLqEZ7RqA67b5g5GmdJCfHNXtNPvw0WVxfHxNIVYbrIgCX2gPqiHqYb0VyLwuBVzScLq5GyLnELV01kqWf6gNJWh946doodVBKGb3Asg7inwrc8w3WpW43SkBJ2nCobFVzuQIbmPJ53zYULOOBJu42zV1WbRz2g",
          imageAlt: "Natural 5-Mukhi Rudraksha bead"
        },
        {
          id: "shree-yantra",
          name: { gu: "શુદ્ધ તાંબાનું શ્રી યંત્ર", en: "Pure Copper Shree Yantra" },
          price: { gu: "₹ ૧,૨૫૦", en: "₹ 1,250" },
          badge: { gu: "ધન-સમૃદ્ધિ દાયક", en: "Abundance Blessing" },
          image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8qteVDsF6amK-s9dNl0XZTN8YKWRQyGFoTTS7JOoyoCxXWyHls05LS92LZyHnZTq6UmvPOJRCRt-KnFFFszx0IuhNRikRtmIjRuh_T0b59aUZi4is63XJalNLRlpzlddNiM2A37VrsG6tVCP0GzhGrqL_rGfdleTp5exY2XVlVz1N6mzst12hE_MzHX9hiLm13a95MdhEfwSLYW5Z_ncYTcoZYTBu1VSi3DpsczU3PZaYA0mW0iMT",
          imageAlt: "Engraved brass copper Shree Yantra"
        },
        {
          id: "sphatik-mala",
          name: { gu: "ઓરિજિનલ સ્ફટિક માળા", en: "Original Sphatik Crystal Mala" },
          price: { gu: "₹ ૯૯૦", en: "₹ 990" },
          badge: { gu: "૧૦૮ મણકા સિદ્ધ", en: "108 Certified Beads" },
          image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYyZVV4gyYH-GEEcJhGsP84CiWk5XrdI9qcVlnR3sqaWASYhfgRFKFgVUakOmIdxFqdYD80Yuwge2viqwTKTWhmZoVFjMTIUQIhnSaBK0zDZ7SEFB8G0IcXDLn9Hkj71WORfJhpALTwuLZnc-jkSCTAlpelhcqcHodVMHQkCTDYzaIIIyF_A2_giOyCCKkFObI3xBOBC1u1jnVZWmMRDzQ9qo4Uxm0vOUILgqE5FJ0Np_Ehe7wmKQW",
          imageAlt: "Genuine clear Sphatik Mala beads"
        }
      ]
    },

    // Widget 5: Popular Articles List
    popular: {
      title: { gu: "લોકપ્રિય શાસ્ત્રીય લેખો", en: "Popular Astrological Articles" },
      items: [
        {
          rank: "૧",
          title: {
            gu: "શનિની સાડાસાતી દરમિયાન શું કરવું અને શું ન કરવું?",
            en: "Do's and Don'ts During Shani Sade Sati Period"
          },
          readTime: { gu: "વાંચન સમય: ૫ મિનિટ", en: "5 min read" },
          articleId: "hero-1"
        },
        {
          rank: "૨",
          title: {
            gu: "સોમનાથ મહાદેવ: પ્રથમ જ્યોતિર્લિંગનો અલૌકિક ઇતિહાસ",
            en: "Somnath Mahadev: Sacred History of the 1st Jyotirlinga"
          },
          readTime: { gu: "વાંચન સમય: ૭ મિનિટ", en: "7 min read" },
          articleId: "hero-1"
        },
        {
          rank: "૩",
          title: {
            gu: "ઘરમાં વાસ્તુ મુજબ મંદિર કઈ દિશામાં હોવું જોઈએ?",
            en: "Which Direction Should Home Temple Face as per Vastu?"
          },
          readTime: { gu: "વાંચન સમય: ૪ મિનિટ", en: "4 min read" },
          articleId: "hero-1"
        }
      ]
    },

    // Widget 6: WhatsApp Newsletter
    newsletter: {
      title: { gu: "દૈનિક રાશિફળ વોટ્સએપ પર મેળવો", en: "Get Daily Horoscope on WhatsApp" },
      subtitle: {
        gu: "રોજ સવારે આપની રાશિ મુજબ શુભ અંક, શુભ રંગ અને ચોઘડિયાની અપડેટ નિઃશુલ્ક મેળવો.",
        en: "Receive auspicious numbers, lucky colors, and Choghadiya updates every morning free."
      },
      placeholder: { gu: "આપનો વોટ્સએપ નંબર (૧૦ અંક)", en: "Your WhatsApp Number (10 digits)" },
      button: { gu: "હમણાં જ સબસ્ક્રાઇબ કરો", en: "Subscribe Now" },
      freeNote: { gu: "૧૦૦% મફત સેવા • કોઈ સ્પામ નહીં", en: "100% Free Service • Zero Spam" },
      successMsg: {
        gu: "ધન્યવાદ! આપને ટૂંક સમયમાં દૈનિક રાશિફળ પ્રાપ્ત થશે.",
        en: "Thank you! You will start receiving daily horoscope shortly."
      }
    }
  }
}
