/**
 * The Astro Code - Article Data Repository (article-data.js)
 * 
 * Comprehensive bilingual editorial data for article detail pages.
 * Supports dynamic lookup by article ID with robust aliases and fallbacks.
 */

const DEFAULT_AUTHOR = {
  name: { gu: "ડૉ. વિશાલ મોદી", en: "Dr. Vishal Modi" },
  title: { gu: "Ph.D. જ્યોતિષશાસ્ત્ર & પુરાણ તજજ્ઞ", en: "Ph.D. Vedic Astrology & Puranic Scholar" },
  image: "/images/author-dr-vishal-modi.jpg",
  verified: true,
  bio: {
    gu: "વૈદિક જ્યોતિષ, અંકશાસ્ત્ર, વાસ્તુ અને પૌરાણિક સંશોધનમાં ૨૨+ વર્ષનો અનુભવ. પ્રાચીન આધ્યાત્મિક જ્ઞાનને સરળ અને વૈજ્ઞાનિક રીતે લોકભોગ્ય બનાવવાનો અવિરત પ્રયાસ.",
    en: "Over 22+ years of expertise in Vedic astrology, numerology, Vastu and sacred Puranic research. Dedicated to making ancient spiritual wisdom accessible."
  }
}

const DEFAULT_SANKALP_PUJA = {
  title: { gu: "લાઈવ સંકલ્પ પૂજા & આશીર્વાદ", en: "Live Sankalp Puja & Blessings" },
  subtitle: { gu: "તમારા ગોત્ર અને નામ અનુસાર ઘરે બેઠા ઓનલાઇન પૂજા નોંધાવો", en: "Register online personalized Puja according to your Gotra and family names" },
  buttonText: { gu: "સંકલ્પ નોંધાવો", en: "Book Sankalp Puja" }
}

const DEFAULT_RITUALS = {
  title: { gu: "વિશેષ સાધના અને પૂજન વિધિ", en: "Special Sadhana & Puja Guidelines" },
  badge: { gu: "શાસ્ત્રોક્ત વિધિ", en: "Scriptural Rituals" },
  items: [
    {
      gu: "પ્રાતઃકાળે સ્નાન કરી પૂર્વ દિશા તરફ મુખ રાખી લાલ આસન પર બિરાજવું.",
      en: "Bathe at sunrise, face eastward, and sit on a pure red prayer cloth."
    },
    {
      gu: "ગાયના શુદ્ધ ઘીનો દીવો પ્રગટાવી ઇષ્ટદેવ સમક્ષ અક્ષત અને પુષ્પ અર્પણ કરવા.",
      en: "Light a cow ghee lamp and offer unbroken rice (Akshat) and fragrant flowers."
    },
    {
      gu: "નિયમિત ૧૦૮ વખત ગાયત્રી મંત્ર અથવા બીજ મંત્રનો શાંતિપૂર્વક જાપ કરવો.",
      en: "Chant the Gayatri Mantra or Beej Mantra 108 times with peaceful focus."
    },
    {
      gu: "સાધના પૂર્ણ કરી જરૂરિયાતમંદ વ્યક્તિને અન્ન કે વસ્ત્રનું દાન કરવું.",
      en: "Conclude your meditation with charitable offerings of food or clothes to the needy."
    }
  ]
}

const DEFAULT_MUHURTA = {
  title: { gu: "આજનું દિવ્ય પૂજન મુહૂર્ત", en: "Today's Auspicious Puja Muhurta" },
  badge: { gu: "અમૃત સિદ્ધિ યોગ", en: "Amrit Siddhi Yoga" },
  morning: {
    label: { gu: "પ્રાતઃકાળ પૂજન:", en: "Morning Puja:" },
    time: { gu: "સવારે ૦૬:૧૫ થી ૦૮:૩૦", en: "06:15 AM to 08:30 AM" }
  },
  evening: {
    label: { gu: "સંધ્યા મહાઆરતી:", en: "Evening Maha Aarti:" },
    time: { gu: "સાંજે ૦૭:૦૦ થી ૦૭:૪૫", en: "07:00 PM to 07:45 PM" }
  }
}

const DEFAULT_QUOTE = {
  text: {
    gu: "“શ્રદ્ધા અને સમર્પણથી કરવામાં આવેલી વૈદિક આરાધના મનુષ્યના સમસ્ત કષ્ટોનું નિવારણ કરે છે.”",
    en: "“Vedic prayers offered with sincere devotion and surrender dispel all worldly afflictions.”"
  },
  cite: {
    gu: "— શ્રીમદ્ ભગવદ્ ગીતા (શાસ્ત્ર પ્રમાણ)",
    en: "— Shrimad Bhagavad Gita (Sacred Scripture)"
  }
}

export const ARTICLES_DATA = {
  // 1. Shri Bahuchar Maa Pragatya (Hero 1)
  "hero-1": {
    id: "hero-1",
    slug: "bahuchar-maa-pragatya",
    category: {
      gu: "શ્રી બહુચર માં નું રજવાડું",
      en: "Shri Bahuchar Maa Rajwadu"
    },
    subBadges: [
      { gu: "ધાર્મિક દર્શન", en: "Spiritual Darshan" },
      { gu: "ચૈત્રી નવરાત્રી વિશેષ", en: "Chaitri Navratri Special" }
    ],
    title: {
      gu: "ચૈત્રી સુદ પૂનમ એટલે શ્રી બહુચર માં નું ચુંવાળ માં પ્રાગટ્ય: જાણો દિવ્ય ઇતિહાસ અને આજના દિવસનું વિશેષ મહાત્મ્ય",
      en: "Chaitra Sud Poonam: Divine Appearance of Shri Bahuchar Maa in Chunval - Sacred History & Spiritual Significance"
    },
    subtitle: {
      gu: "વલ્લભ ભટ્ટ વિરચિત આનંદના ગરબાનું માહાત્મ્ય, કળિયુગમાં મનોકામના પૂર્તિ માટે અચૂક ફળદાયી પાઠ અને આરાધના વિધિ.",
      en: "The profound glory of Anand No Garbo composed by Vallabh Bhatt, essential rituals and divine prayers for fulfilling wishes in Kali Yuga."
    },
    author: DEFAULT_AUTHOR,
    date: { gu: "૧૨ એપ્રિલ, ૨૦૨૫", en: "April 12, 2025" },
    readTime: { gu: "૫ મિનિટ વાંચન", en: "5 min read" },
    views: { gu: "૧૪,૫૨૦ દર્શકો", en: "14,520 views" },
    heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMWfSaYXAy1lsWGdvjsxa6hcdTvTgJDfgE8wfMjFChjn8scg_n-jUSUcbtEYMAsZ4NovgMoaR7HxO9JE7AacA-QPL9-_5SOyhajoKXK1pv89ypKUMh_J9ZTt48hR7kv0u5sbs4DdVi1_665a2HNovHnvawvQBvAN3UqIg_BfZMEZ4e3tYzFxchTcpL3lO0pDHama5vLn2k-3EOoCvLB6_SlMYip_DqVdJ1aPZ7n22ZmdY8Nt9HgIE4",
    heroImageAlt: "Sacred idol of Shri Bahuchar Maa adorned in rich red and gold silk attire",
    heroCaption: {
      gu: "શ્રી બહુચરાજી મંદિર શિખર અને સુવર્ણ પાલખી દર્શન - ચૈત્ર સુદ પૂનમ મહાપર્વ",
      en: "Shri Bahucharaji Temple Shikhar and Golden Palanquin Darshan - Chaitra Sud Poonam Mahaparva"
    },
    heroBadge: { gu: "સુવર્ણ દર્શન", en: "Golden Darshan" },
    muhurtaCard: DEFAULT_MUHURTA,
    quote: {
      text: {
        gu: "“જે જન પ્રેમથી આનંદનો ગરબો ગાય, તેના સઘળા સંતાપ હરે અને શ્રી બહુચર અંબા સર્વ મનોરથ પૂર્ણ કરે છે.”",
        en: "“Whoever recites Anand No Garbo with pure devotion, all their sorrows vanish and Shri Bahuchar Amba fulfills every earnest desire.”"
      },
      cite: {
        gu: "— ભક્તરાજ વલ્લભ ભટ્ટ (આનંદનો ગરબો)",
        en: "— Bhaktaraj Vallabh Bhatt (Anand No Garbo)"
      }
    },
    sankalpPuja: DEFAULT_SANKALP_PUJA,
    rituals: DEFAULT_RITUALS,
    sections: [
      {
        heading: {
          gu: "૧. ચુંવાળ પંથકમાં પ્રાગટ્ય અને વરખડીના વૃક્ષનું પાવન રહસ્ય",
          en: "1. Appearance in Chunval Region & The Sacred Secret of the Varkhadi Tree"
        },
        paragraphs: [
          {
            gu: "લોકમાન્યતા અને પૌરાણિક કથા મુજબ, માતાજીનું મૂળ સ્થાનક શંખલપુર પાસે વરખડીના પવિત્ર વૃક્ષ નીચે હતું. આ વરખડી કોઈ સામાન્ય વૃક્ષ નથી, પરંતુ દિવ્ય કલ્પવૃક્ષ સમાન છે. આજે પણ બહુચરાજી મંદિર પરિસરમાં વરખડીના દર્શન કરવાથી મનની ચિંતાઓ અને ગ્રહદોષ શાંત થાય છે.",
            en: "According to timeless lore and Puranic scriptures, the original holy seat of Goddess Bahuchara was beneath the sacred Varkhadi tree near Shankhalpur. This Varkhadi tree is revered as a wish-fulfilling Kalpavriksha."
          },
          {
            gu: "કહેવાય છે કે જે દંપતીને સંતાનસુખ ન હોય તેઓ જો ચૈત્રી પૂનમે મા બહુચરની માનતા રાખે અને વરખડીની સાત પ્રદક્ષિણા કરે તો માઁ તેમની ગોદ ભરે છે.",
            en: "It is widely believed that couples seeking progeny who offer prayers on Chaitri Poonam and perform seven circumambulations around the holy tree are blessed with children."
          }
        ]
      },
      {
        heading: {
          gu: "૨. આનંદના ગરબાની રચના અને માઁ ની અસીમ કૃપા",
          en: "2. Composition of Anand No Garbo & The Goddess's Boundless Grace"
        },
        paragraphs: [
          {
            gu: "અમદાવાદના બ્રાહ્મણ વલ્લભ ભટ્ટ અને ધોળા ભટ્ટ પર જ્યારે માં બહુચરે સાક્ષાત કૃપા કરી ત્યારે સંવત ૧૭૦૮ ના આસો સુદ આઠમે તેમણે ‘આનંદના ગરબા’ની રચના કરી હતી. આ રચના કોઈ સાધારણ કાવ્ય નથી, પરંતુ એક સિદ્ધ મંત્ર સમાન સ્તોત્ર છે.",
            en: "When Goddess Bahuchara manifested her grace upon brothers Vallabh Bhatt and Dhola Bhatt of Ahmedabad in Samvat 1708 on Aso Sud Ashtami, they composed the historic Anand No Garbo."
          }
        ]
      }
    ],
    reactions: { divine: 842, insightful: 526, wonderful: 312 },
    audioText: {
      gu: "ચૈત્રી સુદ પૂનમ એટલે શ્રી બહુચર માં નું ચુંવાળ માં પ્રાગટ્ય. ગુજરાતની પરમ પવિત્ર શક્તિપીઠો પૈકીનું એક એવું ચુંવાળ પંથકમાં આવેલું શ્રી બહુચરાજી તીર્થધામ એટલે લાખો ભાવિક ભક્તોની આસ્થાનું કેન્દ્ર.",
      en: "Chaitra Sud Poonam marks the divine appearance of Shri Bahuchar Maa in Chunval region. As one of the most sacred Shaktipeeths of Gujarat, Bahucharaji shrine is the spiritual core for millions of devotees."
    }
  },

  // 2. Shri Bahucharaji Chunval Pragatya & Parcha (Hero 2)
  "hero-2": {
    id: "hero-2",
    slug: "chunval-bahucharaji-pragatya-parcha",
    category: {
      gu: "શ્રી બહુચર માં નું રજવાડું",
      en: "Shri Bahuchar Maa Rajwadu"
    },
    subBadges: [
      { gu: "દિવ્ય પરચા", en: "Divine Miracles" },
      { gu: "ચુંવાળ ઈતિહાસ", en: "Chunval History" }
    ],
    title: {
      gu: "ચુંવાળમાં શ્રી બહુચરાજીનું પ્રાગટ્ય અને પ્રગટ પરચાઓ: ભક્તોના સંકટ હરતી પરમ શક્તિ",
      en: "Divine Manifestation of Shri Bahucharaji in Chunval: Sacred Legends & Timeless Miracles"
    },
    subtitle: {
      gu: "ચુંવાળ પ્રદેશની પવિત્ર ધરા પર માતાજીના પ્રાગટ્ય કાળથી માંડીને વર્તમાન કાળ સુધી અસંખ્ય ભક્તોને થયેલા સાક્ષાત્કારોનું પાવન વર્ણન.",
      en: "The holy chronicles of Maa Bahuchar's miracles from her ancient advent in Chunval to modern times."
    },
    author: DEFAULT_AUTHOR,
    date: { gu: "૧૧ એપ્રિલ, ૨૦૨૫", en: "April 11, 2025" },
    readTime: { gu: "૬ મિનિટ વાંચન", en: "6 min read" },
    views: { gu: "૧૮,૩૪૦ દર્શકો", en: "18,340 views" },
    heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAiEOcs6lCu7yCuLG3mzCwDhO1FrGt_SKNh3dB0fMxJDCze0zfm4FDM-qvoKHefNjPRt2slwgnklqehWcWvb7tNJJZiSEsg4xauWKIeKq4KGKqIkprHflPpm9whVP-J_hqKLLibHPS-8098jTIB33-0lmjsCq5I4sE1x_StwAkdrV6XcHwYw-Bejh88-BAlzu5S_gksf2ymyML2ZHUVrD5cMZXlgY3gJvXYqHcMzDlINTA2yRcxExzS",
    heroImageAlt: "Magnificent entrance gate and marble spires of Bahucharaji Temple",
    heroCaption: {
      gu: "શ્રી બહુચરાજી તીર્થધામ મુખ્ય પ્રવેશદ્વાર અને સુવર્ણ કળશ દર્શન",
      en: "Main Gate & Golden Shikhar of Holy Shri Bahucharaji Temple"
    },
    heroBadge: { gu: "ચુંવાળ દર્શન", en: "Chunval Darshan" },
    muhurtaCard: DEFAULT_MUHURTA,
    quote: DEFAULT_QUOTE,
    sankalpPuja: DEFAULT_SANKALP_PUJA,
    rituals: DEFAULT_RITUALS,
    sections: [
      {
        heading: {
          gu: "૧. ચુંવાળ પ્રદેશની પાવન ભૂમિ અને પ્રાગટ્ય કથા",
          en: "1. Sacred Chunval Soil & Advent Story"
        },
        paragraphs: [
          {
            gu: "ઉત્તર ગુજરાતના ચુંવાળ વિસ્તારમાં માતાજીનું પ્રાગટ્ય સનાતન ધર્મના ઈતિહાસમાં અતિ મહત્વપૂર્ણ ગણાય છે. બાલા ત્રિપુરા સુંદરીનું આ સ્વરૂપ સાક્ષાત ઈચ્છા, જ્ઞાન અને ક્રિયા શક્તિનું સમન્વય છે.",
            en: "The manifestation of Maa Bahuchar in northern Gujarat's Chunval region holds profound significance in Vedic history, embodying the triad of will, wisdom, and action."
          }
        ]
      }
    ],
    reactions: { divine: 780, insightful: 410, wonderful: 290 },
    audioText: {
      gu: "ચુંવાળમાં શ્રી બહુચરાજીનું પ્રાગટ્ય અને પ્રગટ પરચાઓ. માં બહુચરના પરચાઓની ગાથા અવિરત છે.",
      en: "Chronicles of Shri Bahucharaji in Chunval and her timeless divine miracles for earnest devotees."
    }
  },

  // 3. Varkhadi Tree Sacred Mystery (Hero 3)
  "hero-3": {
    id: "hero-3",
    slug: "varkhadi-tree-sacred-mystery",
    category: {
      gu: "શ્રી બહુચર માં નું રજવાડું",
      en: "Shri Bahuchar Maa Rajwadu"
    },
    subBadges: [
      { gu: "પૌરાણિક રહસ્ય", en: "Puranic Secret" },
      { gu: "પવિત્ર વૃક્ષ", en: "Sacred Tree" }
    ],
    title: {
      gu: "જાણો શ્રી બહુચર માઁ વરખડીના વૃક્ષ નીચે જ કેમ પ્રગટ થયા? વરખડી મહાત્મ્ય અને પૌરાણિક રહસ્ય",
      en: "Why Did Shri Bahuchar Maa Manifest Under The Varkhadi Tree? Scriptural Significance"
    },
    subtitle: {
      gu: "શંખલપુર સ્થિત પવિત્ર વરખડીનું અલૌકિક અધ્યાત્મ, ઔષધીય અને ખગોળીય મહત્વ. સંતાન પ્રાપ્તિ અને ગ્રહશાંતિનું દિવ્ય કેન્દ્ર.",
      en: "The spiritual, medicinal, and astrological glory of the historic Varkhadi tree where the Mother first revealed her grace."
    },
    author: DEFAULT_AUTHOR,
    date: { gu: "૧૦ એપ્રિલ, ૨૦૨૫", en: "April 10, 2025" },
    readTime: { gu: "૪ મિનિટ વાંચન", en: "4 min read" },
    views: { gu: "૧૫,૮૯૦ દર્શકો", en: "15,890 views" },
    heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhQs079295nlOD1CX6fWKDz7V8Co7Fne_qMT_ikE9oNLUgFaPwhSSesMYN72UwUN0K9QK7dqpVAndlpQ-PNSUdqooV02prsOL7HY5clJZCY4zjN1QZK1eqilmy6IeXDBTVzDGMC9Tw2haxb9vy2UXsFm3klG5S0vU_lKuGDHL-aVZILr8tIKetU1dQ67eKDMYe2YRi6eQ9bLTO63nFCZmNgHGddYMvYWCEN5Fx0GltT4lXdYZ4-bTG",
    heroImageAlt: "Ancient sacred Varkhadi tree within the temple courtyard of Bahucharaji",
    heroCaption: {
      gu: "શંખલપુર સ્થિત ઐતિહાસિક પવિત્ર વરખડી વૃક્ષ દર્શન",
      en: "Ancient Varkhadi Tree Darshan at Shankhalpur Shrine"
    },
    heroBadge: { gu: "કલ્પવૃક્ષ રહસ્ય", en: "Kalpavriksha Secret" },
    muhurtaCard: DEFAULT_MUHURTA,
    quote: DEFAULT_QUOTE,
    sankalpPuja: DEFAULT_SANKALP_PUJA,
    rituals: DEFAULT_RITUALS,
    sections: [
      {
        heading: {
          gu: "૧. વરખડી વૃક્ષનું કલ્પવૃક્ષ સ્વરૂપ",
          en: "1. Wish-Fulfilling Energy of Varkhadi"
        },
        paragraphs: [
          {
            gu: "શાસ્ત્રો મુજબ વરખડી વૃક્ષમાં સૂર્ય અને ચંદ્રની ઊર્જા સંગ્રહિત કરવાની વિશેષ ક્ષમતા હોય છે. આ વૃક્ષ નીચે માતાજીનું પ્રાગટ્ય દર્શાવે છે કે પ્રકૃતિ અને પરમાત્મા એકબીજાના પૂરક છે.",
            en: "Vedic scholars note that the Varkhadi tree stores cosmic solar and lunar energies, signifying the sacred unity of Mother Nature and Supreme Divinity."
          }
        ]
      }
    ],
    reactions: { divine: 890, insightful: 470, wonderful: 320 },
    audioText: {
      gu: "શ્રી બહુચર માઁ વરખડીના વૃક્ષ નીચે પ્રગટ થયા તેનું રહસ્ય. વરખડી કોઈ સામાન્ય વૃક્ષ નથી પણ સાક્ષાત દિવ્ય ચેતના છે.",
      en: "The mystic reasons behind Goddess Bahuchara's advent under the holy Varkhadi tree."
    }
  },

  // 4. Bahuchar Maa Ladu Gokh Mahatmya (Hero 4)
  "hero-4": {
    id: "hero-4",
    slug: "bahuchar-maa-ladu-gokh-tradition",
    category: {
      gu: "શ્રી બહુચર માં નું રજવાડું",
      en: "Shri Bahuchar Maa Rajwadu"
    },
    subBadges: [
      { gu: "પ્રસાદ મહિમા", en: "Prasad Glory" },
      { gu: "માનતા વિધિ", en: "Vow Ritual" }
    ],
    title: {
      gu: "માં બહુચરને લાડુનો ગોખ કેમ ભરવામાં આવે છે ? પરંપરા અને માનતા પૂર્તિનું અદ્ભુત માહાત્મ્ય",
      en: "Why Is The Sacred Ladu Gokh Filled For Maa Bahuchar? Heritage & Fulfillment of Vows"
    },
    subtitle: {
      gu: "બહુચરાજી મંદિરમાં લાડુના ગોખની અખંડ પરંપરા, શુદ્ધ ઘીના નૈવેદ્યનું શાસ્ત્રોક્ત મહત્વ અને ભક્તોની મનોકામના પૂર્તિની પ્રતીતિ.",
      en: "The historic practice of filling the Laddu Gokh at Bahucharaji shrine, its spiritual science and auspicious outcome."
    },
    author: DEFAULT_AUTHOR,
    date: { gu: "૯ એપ્રિલ, ૨૦૨૫", en: "April 9, 2025" },
    readTime: { gu: "૫ મિનિટ વાંચન", en: "5 min read" },
    views: { gu: "૧૨,૪૫૦ દર્શકો", en: "12,450 views" },
    heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCT1OeWbqv8mxJZ8O8ttDVXsIDknFrswb4pYefHYy9bIvfC1EgjLCoSYSUSvR7xp3VAa3jQ3tT3eVSCOt_NXGvXSJYWINO41u11Sxb4Vyn9QEJm9QN4GqPzweHi8-RTpBoX3pygPnJWkQ0rKAQjMCceEEt2b-wYGKVw0ESTgliRF4Kngmp88pYzQbUI3NLvwZKRz8A7_TbAQjRc5h1M5ZyCs5GUTjO2Usy_75O7CB9ECGiAeM50vX3e",
    heroImageAlt: "Pious mountain of white divine sweet laddu offerings",
    heroCaption: {
      gu: "શ્રી બહુચરાજી પવિત્ર ગોખ અને શુદ્ધ લાડુ પ્રસાદ દર્શન",
      en: "Consecrated Laddu Offering at Bahucharaji Sacred Gokh"
    },
    heroBadge: { gu: "પ્રસાદ દર્શન", en: "Prasad Darshan" },
    muhurtaCard: DEFAULT_MUHURTA,
    quote: DEFAULT_QUOTE,
    sankalpPuja: DEFAULT_SANKALP_PUJA,
    rituals: DEFAULT_RITUALS,
    sections: [
      {
        heading: {
          gu: "૧. લાડુના ગોખની પૌરાણિક પરંપરા",
          en: "1. Traditional Roots of the Sacred Ladu Gokh"
        },
        paragraphs: [
          {
            gu: "શ્રી બહુચરાજી મંદિરમાં માતાજીના ગોખમાં લાડુ ધરાવવાની પરંપરા સદીઓ જૂની છે. શુદ્ધ ઘી, ઘઉં અને ખાંડમાંથી બનેલા લાડુ ગુરુ અને શુક્ર ગ્રહના શુભ સ્પંદનોને આકર્ષિત કરે છે.",
            en: "Offering Laddus in the sacred alcove of Maa Bahuchar has been practiced for centuries, invoking Jupiterian and Venusian prosperity."
          }
        ]
      }
    ],
    reactions: { divine: 760, insightful: 390, wonderful: 280 },
    audioText: {
      gu: "માં બહુચરને લાડુનો ગોખ કેમ ભરવામાં આવે છે. જાણો આ પવિત્ર પ્રસાદનું આધ્યાત્મિક રહસ્ય.",
      en: "Significance of the consecrated sweet laddu offering to Maa Bahuchar."
    }
  },

  // 5. Anand No Garbo Pragatya Divas (Feat 1)
  "feat-1": {
    id: "feat-1",
    slug: "anand-no-garbo-pragatya-divas",
    category: {
      gu: "શ્રી બહુચર માં નું રજવાડું",
      en: "Shri Bahuchar Maa Rajwadu"
    },
    subBadges: [
      { gu: "ગરબા સાધના", en: "Garbo Sadhana" },
      { gu: "મનોકામના સિદ્ધિ", en: "Wish Fulfillment" }
    ],
    title: {
      gu: "આજે આનંદના ગરબાનો પ્રાગટ્ય દિવસ છે: કળિયુગમાં મનોકામના પૂર્તિ વિધિ અને પાઠ માહાત્મ્ય",
      en: "Appearance Day of Anand No Garbo: Kali Yuga Sadhana & Scriptural Significance"
    },
    subtitle: {
      gu: "વલ્લભ ભટ્ટ વિરચિત આનંદના ગરબાનું માહાત્મ્ય, કળિયુગમાં મનોકામના પૂર્તિ માટે અચૂક ફળદાયી પાઠ અને આરાધના વિધિ.",
      en: "The profound glory of Anand No Garbo composed by Vallabh Bhatt, essential rituals and divine prayers for fulfilling wishes in Kali Yuga."
    },
    author: DEFAULT_AUTHOR,
    date: { gu: "૮ એપ્રિલ, ૨૦૨૫", en: "April 8, 2025" },
    readTime: { gu: "૪ મિનિટ વાંચન", en: "4 min read" },
    views: { gu: "૧૯,૪૨૦ દર્શકો", en: "19,420 views" },
    heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCiBaTaLuyH2OHV_92s77HLcR2Lr-PSrXA3Czitw7ItH3w1BYm7CJDHzbwdvkogdABerBxta8GwWTketDLd5Ni1lE5f_KOwjOjThklFkCmk2zEFcKAlp1s5hSGT2B5DvXk-bTlGXDFUVYpeJuJtbgkG7E_bjpXl1yERHe2wVj_3DnFV5U42rzInV7gilgL5dVIjB1r3q2mhwqHim7XLlDcmFS64aRP4pns6ocfo-h_S7XxHsAOEoCCS",
    heroImageAlt: "Devotional portrayal of Goddess Bahuchara seated on rooster",
    heroCaption: {
      gu: "શ્રી બહુચર માં કુકડા વાહન પર બિરાજમાન દિવ્ય છબી",
      en: "Devotional Portrayal of Goddess Bahuchara with Divine Aura"
    },
    heroBadge: { gu: "ગરબા માહાત્મ્ય", en: "Garbo Glory" },
    muhurtaCard: DEFAULT_MUHURTA,
    quote: DEFAULT_QUOTE,
    sankalpPuja: DEFAULT_SANKALP_PUJA,
    rituals: DEFAULT_RITUALS,
    sections: [
      {
        heading: {
          gu: "૧. આનંદના ગરબાનું મંત્ર સ્વરૂપ",
          en: "1. Mantric Nature of Anand No Garbo"
        },
        paragraphs: [
          {
            gu: "આનંદનો ગરબો માત્ર લોકગીત નથી, પરંતુ દેવી ઉપાસનાનું મહામંત્ર છે. જે ઘરમાં આ ગરબો નિયમિત ગવાય છે ત્યાં કલેશ, દરિદ્રતા અને ભય ટકી શકતા નથી.",
            en: "Anand No Garbo is not merely folklore, but an energized Vedic hymn. Homes where it is chanted radiate peace and overcome strife."
          }
        ]
      }
    ],
    reactions: { divine: 910, insightful: 530, wonderful: 380 },
    audioText: {
      gu: "આજે આનંદના ગરબાનો પ્રાગટ્ય દિવસ છે. વલ્લભ ભટ્ટે રચેલા આ દિવ્ય સ્તોત્રનો મહિમા અપરંપાર છે.",
      en: "Appearance celebration of Anand No Garbo, the devotional jewel composed by Vallabh Bhatt."
    }
  },

  // 6. He Maa! Tara Sat Thi Tara Bhakto Nu Mahatva Vadhe Chhe (Feat 2)
  "feat-2": {
    id: "feat-2",
    slug: "tara-sat-thi-bhakto-nu-mahatva",
    category: {
      gu: "ધાર્મિક દર્શન",
      en: "Spiritual Darshan"
    },
    subBadges: [
      { gu: "ભક્તિ મહિમા", en: "Bhakti Glory" },
      { gu: "આદ્યશક્તિ", en: "Adyashakti" }
    ],
    title: {
      gu: "હે માં ! તારા સત્ થી તારા ભક્તોનું મહત્વ વધે છે: આદ્યશક્તિના પરચા અને સાધના નિયમો",
      en: "O Mother! Your Truth Elevates Devotees: Adyashakti Divine Grace & Sacred Rules"
    },
    subtitle: {
      gu: "માતાજીની અખંડ કૃપા મેળવવાના સાત્વિક નિયમો, શ્રદ્ધા અને સમર્પણની અમૃતગાથા અને આદ્યશક્તિના પરચાની સત્ય ઘટનાઓ.",
      en: "The nectarous chronicles of unyielding devotion, purity rules, and real incidents of Motherly grace."
    },
    author: DEFAULT_AUTHOR,
    date: { gu: "૭ એપ્રિલ, ૨૦૨૫", en: "April 7, 2025" },
    readTime: { gu: "૫ મિનિટ વાંચન", en: "5 min read" },
    views: { gu: "૧૬,૨૧૦ દર્શકો", en: "16,210 views" },
    heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCrh_3-7eJgxSpNAHPLRV9JAXz0HE7vZ3xt11xHz3ZunOnnMXjVwDCOucsKMYnvpeL45Oz2aheLxhJA9XHW6lV7icMLc-3MyXWknbrteMZQmutfuPyPM30rTpn2GKCDtiTnxHUtJGXvt91qXEmehhuVLcpjG04-pHYSKGM8jJ5nDUhZu7lPzt0oXucGrDuRcJycGtijpT9M04CX-kSVw6O2c9ubABTiw8dP04WA99PdWS47VnWNN2pY",
    heroImageAlt: "Radiant Hindu goddess Durga riding a golden lion with divine aura",
    heroCaption: {
      gu: "સિંહાસનસ્થ આદ્યશક્તિ માં દુર્ગા દિવ્ય તેજસ્વી સ્વરૂપ",
      en: "Radiant Divine Avatar of Goddess Durga on Golden Lion"
    },
    heroBadge: { gu: "શક્તિ દર્શન", en: "Shakti Darshan" },
    muhurtaCard: DEFAULT_MUHURTA,
    quote: DEFAULT_QUOTE,
    sankalpPuja: DEFAULT_SANKALP_PUJA,
    rituals: DEFAULT_RITUALS,
    sections: [
      {
        heading: {
          gu: "૧. શ્રદ્ધા અને સમર્પણની અમર શક્તિ",
          en: "1. The Invincible Power of Surrender"
        },
        paragraphs: [
          {
            gu: "જ્યારે ભક્ત અહંકાર ત્યજીને માતાજીના શરણમાં જાય છે, ત્યારે માઁ સ્વયં તેનું રક્ષણ કરે છે. ભક્તિમાં જે સત્યતા છે તે જ જીવનનું સૌથી મોટું સંબળ છે.",
            en: "When a seeker leaves behind ego and surrenders to the Mother, divine grace envelops their life with protective armor."
          }
        ]
      }
    ],
    reactions: { divine: 820, insightful: 460, wonderful: 310 },
    audioText: {
      gu: "હે માં તારા સત્ થી તારા ભક્તોનું મહત્વ વધે છે. માતાજીની અખંડ ભક્તિની અમૃત કથા.",
      en: "Reflections on how devotion to the Divine Mother elevates consciousness and brings steadfast protection."
    }
  },

  // 7. Somnath Mahadev (Jyotirlinga 1)
  "jyotirling-1": {
    id: "jyotirling-1",
    slug: "somnath-mahadev-jyotirling",
    category: {
      gu: "બાર જ્યોતિર્લિંગ",
      en: "12 Jyotirlingas"
    },
    subBadges: [
      { gu: "વૈદિક રહસ્ય", en: "Vedic Mystery" },
      { gu: "પ્રથમ જ્યોતિર્લિંગ", en: "First Jyotirlinga" }
    ],
    title: {
      gu: "પ્રથમ જ્યોતિર્લિંગ શ્રી સોમનાથ મહાદેવ: ઇતિહાસ, રહસ્ય અને દિવ્ય પૂજા વિધિ",
      en: "First Jyotirlinga Shri Somnath Mahadev: History, Mystic Secrets & Divine Puja Rituals"
    },
    subtitle: {
      gu: "પ્રભાસ પાટણની પવિત્ર ભૂમિ પર ચંદ્રદેવની કઠોર તપસ્યા, શિવજીની અમીકૃપા અને અવિનાશી જ્યોતિર્લિંગનો અલૌકિક મહિમા.",
      en: "The intense penance of Chandra Deva on the sacred shores of Prabhas Patan, Lord Shiva's eternal grace and the invincible Jyotirlinga."
    },
    author: DEFAULT_AUTHOR,
    date: { gu: "૨૯ માર્ચ, ૨૦૨૫", en: "March 29, 2025" },
    readTime: { gu: "૫ મિનિટ વાંચન", en: "5 min read" },
    views: { gu: "૨૧,૧૮૦ દર્શકો", en: "21,180 views" },
    heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgoqW5Ax-IzST1XPudbkwO-GeCid31lg8_GaUvKwzgZpLGK6AfwLsYc_W8GtBntXFmhdeWH8z1MYiI4eirTo7DpqGTorcgAIf6_tlcSUGSgk9Xl9EoXOPHK8xW1HOLEx-HOFF2fcnlEufQBywDYTTQprSacg8-Y5zO1wfZ3FHSnv6THe-rkW5_lLPOEpfdLknROaNYu0GjkzkEDqmb5FWJegUYpKO5qOV8mc9bn4AkzBPaePrUmVwA",
    heroImageAlt: "Magnificent view of Shri Somnath Jyotirlinga temple standing beside the Arabian sea at sunset",
    heroCaption: {
      gu: "સાગર કાંઠે શોભતું સુવર્ણ કળશ યુક્ત શ્રી સોમનાથ મહાદેવ મંદિર - અવિનાશી જ્યોતિ દર્શન",
      en: "Majestic Shri Somnath Mahadev Temple adorned with golden Kalash on the shores of the Arabian Sea"
    },
    heroBadge: { gu: "જ્યોતિર્લિંગ દર્શન", en: "Jyotirlinga Darshan" },
    muhurtaCard: DEFAULT_MUHURTA,
    quote: {
      text: {
        gu: "“સૌરાષ્ટ્રદેશે વિશદેતિરમ્યે જ્યોતિર્મયં ચન્દ્રકલાવતંસમ્ | ભક્તિપ્રદાનાય કૃપાવતીર્ણં તં સોમનાથં શરણં પ્રપદ્યે ||”",
        en: "“In the delightful land of Saurashtra, radiant with divine light and adorned by the crescent moon, I take refuge in Somnath, descended in boundless compassion.”"
      },
      cite: {
        gu: "— દ્વાદશ જ્યોતિર્લિંગ સ્તોત્રમ્ (આદિ શંકરાચાર્ય)",
        en: "— Dwadasha Jyotirlinga Stotram (Adi Shankaracharya)"
      }
    },
    sankalpPuja: DEFAULT_SANKALP_PUJA,
    rituals: DEFAULT_RITUALS,
    sections: [
      {
        heading: {
          gu: "૧. ચંદ્રદેવનો શ્રાપ અને પ્રભાસ તીર્થે શિવ કૃપાની ગાથા",
          en: "1. The Curse on Moon God & Divine Redemption at Prabhas"
        },
        paragraphs: [
          {
            gu: "ચંદ્ર દોષ નિવારણ અને માનસિક શાંતિ માટે અહીં કરવામાં આવતી 'મહાપૂજા' તથા 'લઘુરુદ્ર' અત્યંત ફળદાયી માનવામાં આવે છે. શિવપુરાણ મુજબ જે ભક્ત સોમનાથ જ્યોતિર્લિંગના દર્શન ભાવપૂર્વક કરે છે, તેના ત્રિવિધ તાપ નષ્ટ થાય છે.",
            en: "Mahapuja and Laghurudra performed here are considered extraordinarily fruitful for mitigating Moon afflictions and gaining serenity."
          }
        ]
      }
    ],
    reactions: { divine: 960, insightful: 480, wonderful: 395 },
    audioText: {
      gu: "પ્રથમ જ્યોતિર્લિંગ શ્રી સોમનાથ મહાદેવ. સૌરાષ્ટ્રની પવિત્ર સમુદ્ર તટની ભૂમિ પર બિરાજમાન ભગવાન સોમનાથનું મંદિર અડીખમ શ્રદ્ધાનું પ્રતીક છે.",
      en: "First Jyotirlinga Shri Somnath Mahadev on the sacred Arabian Sea shores of Saurashtra."
    }
  },

  // 8. Mahakaleshwar Ujjain (Jyotirlinga 2)
  "jyotirling-2": {
    id: "jyotirling-2",
    slug: "mahakaleshwar-ujjain-bhasma-aarti",
    category: {
      gu: "બાર જ્યોતિર્લિંગ",
      en: "12 Jyotirlingas"
    },
    subBadges: [
      { gu: "ભસ્મ આરતી", en: "Bhasma Aarti" },
      { gu: "દક્ષિણામુખી જ્યોતિર્લિંગ", en: "Dakshinmukhi Jyotirlinga" }
    ],
    title: {
      gu: "મહાકાલેશ્વર ઉજ્જૈન: ભસ્મ આરતીનું રહસ્ય અને કાળ પર વિજય મેળવવાની વૈદિક પદ્ધતિ",
      en: "Mahakaleshwar Ujjain: The Secret of Bhasma Aarti & Overcoming Fear of Death"
    },
    subtitle: {
      gu: "ક્ષિપ્રા નદી તટે કાળના અધિપતિ કાલભૈરવ અને મહાકાલના આશીર્વાદ, અકાળ મૃત્યુ હરણ મંત્ર અને ભસ્મ સ્નાનનું રહસ્ય.",
      en: "Lord of Time Mahakal on the sacred Shipra banks, protection against untimely demise and sacred ash rituals."
    },
    author: DEFAULT_AUTHOR,
    date: { gu: "૨૬ માર્ચ, ૨૦૨૫", en: "March 26, 2025" },
    readTime: { gu: "૬ મિનિટ વાંચન", en: "6 min read" },
    views: { gu: "૨૪,૮૦૦ દર્શકો", en: "24,800 views" },
    heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuA20di33ZcB_-NFQysM-tFtZJ2LktYl6CmW01aO15iW2PYWBwo7C1-Q_jNePynNPRfxseWqpX3nuVImRH1v3is0v49gMn93oZgRydKRzTgF0B3fgVTILzf1M2DR2vekEuhM0Hoc2CnSauJqlZFG0_Y0ypXmpqJES6e7-tpS1BIfxKkQID2IRf6GG7nrLZdZc2DY6c83yvakAK-MMnTXvnpWT0I0a6avhqDFM4mS09YGp2bj7eIABLWO",
    heroImageAlt: "Sacred sanctum sanctorum of Mahakaleshwar Jyotirlinga in Ujjain",
    heroCaption: {
      gu: "શ્રી મહાકાલેશ્વર ઉજ્જૈન જ્યોતિર્લિંગ દક્ષિણામુખી દર્શન",
      en: "South-Facing Mahakaleshwar Jyotirlinga Darshan in Ujjain"
    },
    heroBadge: { gu: "મહાકાલ દર્શન", en: "Mahakal Darshan" },
    muhurtaCard: DEFAULT_MUHURTA,
    quote: DEFAULT_QUOTE,
    sankalpPuja: DEFAULT_SANKALP_PUJA,
    rituals: DEFAULT_RITUALS,
    sections: [
      {
        heading: {
          gu: "૧. દક્ષિણામુખી જ્યોતિર્લિંગનું ખગોળીય મહત્વ",
          en: "1. Astronomical Secret of South-Facing Jyotirlinga"
        },
        paragraphs: [
          {
            gu: "ઉજ્જૈન પ્રાચીન ભારતમાં સમય અને ખગોળ ગણતરીનું વૈશ્વિક કેન્દ્ર હતું. કર્કવૃત્ત અહીંથી પસાર થાય છે અને મહાકાલ સ્વયં કાળના સ્વામી છે.",
            en: "Ujjain was the global prime meridian of ancient Indian astronomy. Passing through the Tropic of Cancer, Mahakal governs time itself."
          }
        ]
      }
    ],
    reactions: { divine: 1040, insightful: 620, wonderful: 450 },
    audioText: {
      gu: "મહાકાલેશ્વર ઉજ્જૈન ભસ્મ આરતીનું રહસ્ય. કાળના અધિપતિ શિવના આશીર્વાદથી ભય મુક્તિ મળે છે.",
      en: "Mystic secrets of the early morning Bhasma Aarti at Mahakaleshwar temple in Ujjain."
    }
  },

  // 9. Dwarkadhish Jagat Mandir (Jyotirlinga 3)
  "jyotirling-3": {
    id: "jyotirling-3",
    slug: "dwarkadhish-jagat-mandir-suvarna-dhwaja",
    category: {
      gu: "ચાર ધામ & તીર્થ દર્શન",
      en: "Char Dham & Sacred Shrines"
    },
    subBadges: [
      { gu: "બાવન ગજની ધ્વજા", en: "52-Gaj Dhwaja" },
      { gu: "મોક્ષપુરી દ્વારકા", en: "Mokshapuri Dwarka" }
    ],
    title: {
      gu: "દ્વારકાધીશ જગત મંદિર: સુવર્ણ ધ્વજા પૂજન વિધિ અને બાવન ગજની ધ્વજાનું આધ્યાત્મિક મહત્વ",
      en: "Dwarkadhish Jagat Mandir: Suvarna Dhwaja Puja Rituals & Sacred 52-Yard Flag"
    },
    subtitle: {
      gu: "ગોમતી સંગમ તીર્થે મોક્ષદાયી કૃષ્ણ ભક્તિ, બાવન ગજની ધ્વજાનું સનાતન રહસ્ય અને દ્વારકા નગરીનો પૌરાણિક વારસો.",
      en: "The sacred confluence of Gomti river, deep Krishna devotion, and the cosmic science of the 52-yard flag atop the Jagat Mandir."
    },
    author: DEFAULT_AUTHOR,
    date: { gu: "૨૪ માર્ચ, ૨૦૨૫", en: "March 24, 2025" },
    readTime: { gu: "૫ મિનિટ વાંચન", en: "5 min read" },
    views: { gu: "૨૩,૪૦૦ દર્શકો", en: "23,400 views" },
    heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBXt4Pw8lHi-CSKoTeekwd1wsMXgsrqYbK0ZKivag-STr_R91vgi08lwAGj-WvOPe9Gg7MAWziJkF0Y40_qvc6fUeOEGIO3WFsEFx4uD-uTFg8cdTWH5EwojDRiTpu8KRvrOy14bzFGrRoGwIskfk4Bq9kcd9QOa_qiBSHINovT_Qc5K1BNyq-WmbSXDU1uoqUOMs-yMnNDX0JrcTEEyBicI83c2gHNv7aJNXVYgPBdQ15QXQr68wQ7",
    heroImageAlt: "Magnificent Jagat Mandir of Dwarka with 52-gaj flag fluttering against the azure sky",
    heroCaption: {
      gu: "શ્રી દ્વારકાધીશ જગત મંદિર શિખર અને બાવન ગજની ધર્મધ્વજા દર્શન",
      en: "Dwarkadhish Jagat Mandir Spire with 52-Yard Sacred Dhwaja"
    },
    heroBadge: { gu: "દ્વારકા દર્શન", en: "Dwarka Darshan" },
    muhurtaCard: DEFAULT_MUHURTA,
    quote: DEFAULT_QUOTE,
    sankalpPuja: DEFAULT_SANKALP_PUJA,
    rituals: DEFAULT_RITUALS,
    sections: [
      {
        heading: {
          gu: "૧. બાવન ગજની ધ્વજાનું વૈદિક પ્રતીકવાદ",
          en: "1. Sacred Meaning of 52-Gaj Flag"
        },
        paragraphs: [
          {
            gu: "દ્વારકાધીશ મંદિર પર લહેરાતી ધ્વજા બાવન ગજની હોય છે. શાસ્ત્રોક્ત માન્યતા મુજબ બાવન ગજ બાવન પ્રકારના દ્વારપાળો અને બ્રહ્માંડના ૫૨ તત્વોનું પ્રતીક છે.",
            en: "The flag fluttering atop Dwarkadhish temple measures 52 yards, symbolizing 52 cosmic gates and foundational elements of the universe."
          }
        ]
      }
    ],
    reactions: { divine: 980, insightful: 510, wonderful: 390 },
    audioText: {
      gu: "દ્વારકાધીશ જગત મંદિર સુવર્ણ ધ્વજા પૂજન વિધિ અને બાવન ગજની ધ્વજાનું આધ્યાત્મિક મહત્વ.",
      en: "Spiritual significance of the sacred 52-yard flag hoisted on Dwarkadhish Jagat Mandir."
    }
  },

  // 10. Kaal Sarp & Pitru Dosha Nivaran (Insight 1)
  "insight-1": {
    id: "insight-1",
    slug: "kundali-kaal-sarp-pitru-dosha-nivaran",
    category: {
      gu: "જ્યોતિષશાસ્ત્ર માર્ગદર્શન",
      en: "Vedic Astrology Guidance"
    },
    subBadges: [
      { gu: "દોષ નિવારણ", en: "Dosha Remedies" },
      { gu: "શાસ્ત્રોક્ત ઉપાય", en: "Scriptural Remedies" }
    ],
    title: {
      gu: "કુંડળીમાં કાલસર્પ અને પિતૃદોષ હોય તો ગભરાશો નહીં: સરળ અને પ્રમાણિત વૈદિક ઉપાયો",
      en: "Do Not Fear Kaal Sarp or Pitru Dosha in Kundali: Proven Vedic Remedies"
    },
    subtitle: {
      gu: "જન્મકુંડળીમાં ગ્રહોની પ્રતિકૂળતાને શાંત કરવા માટે રોજિંદા જીવનમાં કરવા જેવા ૫ સાત્વિક નિયમો અને રત્ન ધારણ વિધિ.",
      en: "5 authentic daily Vedic practices and gemstone therapies to harmonize adverse planetary influences."
    },
    author: DEFAULT_AUTHOR,
    date: { gu: "૧૫ એપ્રિલ, ૨૦૨૫", en: "April 15, 2025" },
    readTime: { gu: "૫ મિનિટ વાંચન", en: "5 min read" },
    views: { gu: "૨૮,૧૫૦ દર્શકો", en: "28,150 views" },
    heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtOuNijzr4DSfcjtL96PAP_5rGNjwzR-oRGpJCvp1VxjSoSZvHqHqoIPsx9InFY8Uqp6q2tAdgGWUkE4qONU4ryrZ7ZqrwbOXrVaJvMCh_rN48Oqtdvj5erKBF083yTTojp1bM-rV4FvkeqaAYzpNLlfzXfOncGmNp_sk9OlFCWHstlX5LsYZ-MENP9I5qOjzETdwdP6T7eE4wyHoYgWyrP5SOw3JqoOe539y2pyatEfif_BlA55vX",
    heroImageAlt: "Vedic astrologer analyzing golden horoscope wheel with traditional palm leaf manuscripts",
    heroCaption: {
      gu: "જન્મકુંડળી વિશ્લેષણ અને ગ્રહદોષ નિવારણ ચક્ર",
      en: "Janam Kundali Analysis & Navagraha Harmony Wheel"
    },
    heroBadge: { gu: "જ્યોતિષ ઉપાય", en: "Astrology Remedies" },
    muhurtaCard: DEFAULT_MUHURTA,
    quote: DEFAULT_QUOTE,
    sankalpPuja: DEFAULT_SANKALP_PUJA,
    rituals: DEFAULT_RITUALS,
    sections: [
      {
        heading: {
          gu: "૧. કાલસર્પ યોગનું વૈજ્ઞાનિક અને આધ્યાત્મિક સત્ય",
          en: "1. The Vedic Truth Behind Kaal Sarp Yoga"
        },
        paragraphs: [
          {
            gu: "જ્યારે કુંડળીમાં બધા સાત ગ્રહો રાહુ અને કેતુ વચ્ચે આવી જાય ત્યારે કાલસર્પ યોગ બને છે. શાસ્ત્રો અનુસાર કાલસર્પ વ્યક્તિને સંઘર્ષ પછી અસાધારણ સફળતા પણ આપી શકે છે.",
            en: "When all seven planets are positioned between Rahu and Ketu, Kaal Sarp Yoga forms. With proper spiritual discipline, it transforms into an engine of extraordinary resilience and success."
          }
        ]
      }
    ],
    reactions: { divine: 910, insightful: 670, wonderful: 420 },
    audioText: {
      gu: "કુંડળીમાં કાલસર્પ અને પિતૃદોષ હોય તો ગભરાશો નહીં. ડૉ. વિશાલ મોદીનું શાસ્ત્રોક્ત માર્ગદર્શન.",
      en: "Vedic guidance from Dr. Vishal Modi on harmonizing Kaal Sarp and Pitru Dosha."
    }
  },

  // 11. Numerology Moolank & Bhagyank (Insight 2)
  "insight-2": {
    id: "insight-2",
    slug: "numerology-moolank-bhagyank-career",
    category: {
      gu: "અંકશાસ્ત્ર રહસ્ય",
      en: "Numerology Secrets"
    },
    subBadges: [
      { gu: "મૂળાંક માર્ગદર્શન", en: "Moolank Guide" },
      { gu: "ભાગ્યાંક સફળતા", en: "Bhagyank Success" }
    ],
    title: {
      gu: "તમારી જન્મતારીખ મુજબ જાણો તમારો મૂળાંક અને ભાગ્યાંક: કારકિર્દી અને ધનલાભના સંકેતો",
      en: "Know Your Birth Moolank & Bhagyank: Keys to Career Success & Wealth Flow"
    },
    subtitle: {
      gu: "૧ થી ૯ અંકના સ્વામી ગ્રહો, તમારા માટે અનુકૂળ શુભ વાર, દિશા, ભાગ્યશાળી રંગ અને રત્ન પસંદગીનું વિશ્લેષણ.",
      en: "Planetary rulers of numbers 1 to 9, compatible colors, days, directions, and gemstones for maximum fortune."
    },
    author: DEFAULT_AUTHOR,
    date: { gu: "૧૪ એપ્રિલ, ૨૦૨૫", en: "April 14, 2025" },
    readTime: { gu: "૪ મિનિટ વાંચન", en: "4 min read" },
    views: { gu: "૨૫,૬૭૦ દર્શકો", en: "25,670 views" },
    heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBnxM-xr9U-bWxDFBWluwadkPtHdTvknwM3nEv3fKRYU1VY3RGFhhKysG1mvKYxZdjxhJIlsEZCqNMNS0CaZnET9rt40f-4rHNzsEwCT-5XH-IxE10_fChXF8DCX5OgImCzm8qQ_idFiJ1YCH4DWb19DhhX4dYeKgqHByXQEfpoAo_utpSdgjqZZEd5T1_G-3gvlPjzhvg598gvFeARQ5PiYIyLr5NP0HzT3-1rU2Q3qUxFteAYVjXD",
    heroImageAlt: "Sacred Vedic yantra matrix of mystical numerology grid and cosmic numbers",
    heroCaption: {
      gu: "અંકશાસ્ત્ર ચક્ર અને ૧ થી ૯ અંકોનો દિવ્ય સંબંધ",
      en: "Sacred Numerology Grid & 1 to 9 Cosmic Vibrations"
    },
    heroBadge: { gu: "અંક રહસ્ય", en: "Number Mystery" },
    muhurtaCard: DEFAULT_MUHURTA,
    quote: DEFAULT_QUOTE,
    sankalpPuja: DEFAULT_SANKALP_PUJA,
    rituals: DEFAULT_RITUALS,
    sections: [
      {
        heading: {
          gu: "૧. મૂળાંક અને ભાગ્યાંકની ગણતરી",
          en: "1. Calculating Moolank & Bhagyank"
        },
        paragraphs: [
          {
            gu: "જન્મ તારીખના સરવાળાને મૂળાંક કહેવાય છે, જ્યારે જન્મ તારીખ, મહિનો અને વર્ષના કુલ સરવાળાને ભાગ્યાંક કહેવાય છે. આ બંને અંકો વ્યક્તિના સ્વભાવ અને ભવિષ્યની દિશા નક્કી કરે છે.",
            en: "The single digit reduction of your birth date is your Moolank, while the total sum of date, month, and year yields your Bhagyank, shaping temperament and life path."
          }
        ]
      }
    ],
    reactions: { divine: 870, insightful: 610, wonderful: 390 },
    audioText: {
      gu: "તમારી જન્મતારીખ મુજબ જાણો તમારો મૂળાંક અને ભાગ્યાંક. અંકશાસ્ત્રનું પ્રમાણિક રહસ્ય.",
      en: "Vedic Numerology analysis of Moolank and Bhagyank by Dr. Vishal Modi."
    }
  }
}

/**
 * Route aliases mapping
 */
export const ARTICLE_ALIASES = {
  "1": "hero-1",
  "2": "hero-2",
  "3": "hero-3",
  "4": "hero-4",
  "bahuchar-maa-pragatya": "hero-1",
  "somnath-mahadev-jyotirling": "jyotirling-1",
  "mahakaleshwar-ujjain": "jyotirling-2",
  "dwarkadhish-mandir": "jyotirling-3",
  "anand-no-garbo": "feat-1",
  "bhakto-nu-mahatva": "feat-2",
  "kaalsarp-dosha": "insight-1",
  "numerology-guide": "insight-2"
}

/**
 * Get article by ID with safe fallback
 */
export function getArticleById(id) {
  if (!id) return ARTICLES_DATA["hero-1"]

  if (ARTICLES_DATA[id]) {
    return ARTICLES_DATA[id]
  }

  if (ARTICLE_ALIASES[id]) {
    return ARTICLES_DATA[ARTICLE_ALIASES[id]]
  }

  // Find by slug
  const bySlug = Object.values(ARTICLES_DATA).find((a) => a.slug === id)
  if (bySlug) return bySlug

  // If looking for a jyotirlinga ID prefix
  if (id.startsWith("jyotirling")) {
    return ARTICLES_DATA["jyotirling-1"]
  }

  // If looking for hero ID prefix
  if (id.startsWith("hero")) {
    return ARTICLES_DATA["hero-1"]
  }

  // Fallback to default first article
  return ARTICLES_DATA["hero-1"]
}

export function getAllArticleIds() {
  return Object.keys(ARTICLES_DATA)
}
