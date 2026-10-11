/**
 * The Astro Code - Article Data Repository
 * 
 * Comprehensive bilingual editorial data for article detail pages.
 * Supports dynamic lookup by article ID with fallback to featured articles.
 */

export const ARTICLES_DATA = {
  // 1. Shri Bahuchar Maa Pragatya (Default & Hero 1)
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
    author: {
      name: { gu: "ડૉ. વિશાલ મોદી", en: "Dr. Vishal Modi" },
      title: { gu: "Ph.D. જ્યોતિષશાસ્ત્ર & પુરાણ તજજ્ઞ", en: "Ph.D. Vedic Astrology & Puranic Scholar" },
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_5XW43dWH3gwsJGrTmT2jgpHCDswiaJ7iStqJhQAaTdawjvUH9UzqLNO5jtVJKflsxHZ-8gzITLtb1lTGEXMdXIlSJkXDh5Zu4NAq2rpTooxZUOoPZqKHz_T_ho2TWFM43WB5t5lAsclDNB9AN7Tt3Zk2dfnbODq7sV3g2cIu5fNTseIR3gGtOxryk7UCd405Q0n1nrcToAJWxVeIsElgo_f-8iZjA44ZftPaLYRuoDel5ltFaHAu",
      verified: true,
      bio: {
        gu: "વૈદિક જ્યોતિષ, અંકશાસ્ત્ર, વાસ્તુ અને પૌરાણિક સંશોધનમાં ૨૨+ વર્ષનો અનુભવ. પ્રાચીન આધ્યાત્મિક જ્ઞાનને સરળ અને વૈજ્ઞાનિક રીતે લોકભોગ્ય બનાવવાનો અવિરત પ્રયાસ.",
        en: "Over 22+ years of expertise in Vedic astrology, numerology, Vastu and sacred Puranic research. Dedicated to making ancient spiritual wisdom accessible."
      }
    },
    date: { gu: "૧૨ એપ્રિલ, ૨૦૨૫", en: "April 12, 2025" },
    readTime: { gu: "૫ મિનિટ વાંચન", en: "5 min read" },
    views: { gu: "૧૪,૫૨૦ દર્શકો", en: "14,520 views" },
    heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuC3cRMSYTZV7R4GoJww8d1MsIw72-LP3iczkajMA4uAIXIcGBhceEa_LHyrBUOPvoAz8fqmISjzzIWtXGKHrw2SBidsK4eeHtWBoMt5k3jx14DRNifar5d-_8TQUZU9dd4rjkYXju4577w3nCbKXxB1GsVKfYlF1JIOkOeZGv-uJWIZfYFNh8qKytW8Pi9eOf6Ggh4ud6rGsUMnpXyoZfy87yJzOqCmJMQvxLB_LsKP--3DPHuyRHnH",
    heroImageAlt: "Grand Bahucharaji Temple golden kalash shikhar shining radiantly in Gujarat during Chaitri Punam",
    heroCaption: {
      gu: "શ્રી બહુચરાજી મંદિર શિખર અને સુવર્ણ પાલખી દર્શન - ચૈત્ર સુદ પૂનમ મહાપર્વ",
      en: "Shri Bahucharaji Temple Shikhar and Golden Palanquin Darshan - Chaitra Sud Poonam Mahaparva"
    },
    heroBadge: { gu: "સુવર્ણ દર્શન", en: "Golden Darshan" },
    muhurtaCard: {
      title: { gu: "શ્રી બહુચરાજી દિવ્ય પૂજન મુહૂર્ત", en: "Divine Bahucharaji Puja Muhurta" },
      badge: { gu: "અમૃત સિદ્ધિ યોગ", en: "Amrit Siddhi Yoga" },
      morning: {
        label: { gu: "પ્રાતઃકાળ પૂજન:", en: "Morning Puja:" },
        time: { gu: "સવારે ૦૬:૧૫ થી ૦૮:૩૦", en: "06:15 AM to 08:30 AM" }
      },
      evening: {
        label: { gu: "સંધ્યા મહાઆરતી:", en: "Evening Maha Aarti:" },
        time: { gu: "સાંજે ૦૭:૦૦ થી ૦૭:૪૫", en: "07:00 PM to 07:45 PM" }
      }
    },
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
    sankalpPuja: {
      title: { gu: "શ્રી બહુચર માં લાઈવ સંકલ્પ પૂજા", en: "Shri Bahuchar Maa Live Sankalp Puja" },
      subtitle: { gu: "તમારા ગોત્ર અને નામ અનુસાર ઘરે બેઠા ઓનલાઇન પૂજા નોંધાવો", en: "Register online personalized Puja according to your Gotra and family names" },
      buttonText: { gu: "સંકલ્પ નોંધાવો ●", en: "Book Sankalp Puja ●" }
    },
    rituals: {
      title: { gu: "ચૈત્રી પૂનમના ૫ અચૂક આરાધના નિયમો", en: "5 Sacred Principles for Chaitri Poonam Sadhana" },
      badge: { gu: "વિશેષ વિધિ", en: "Special Rituals" },
      items: [
        {
          gu: "બ્રાહ્મ મુહૂર્તમાં સ્નાન કરી પૂર્વ દિશા તરફ મુખ રાખી લાલ આસન પર બિરાજવું.",
          en: "Bathe during Brahma Muhurta, face eastward, and sit on a red sacred cloth."
        },
        {
          gu: "ગાયના શુદ્ધ ઘીનો દીવો પ્રગટાવી શ્રી બહુચર યંત્ર કે છબી સમક્ષ અક્ષત ધરવા.",
          en: "Light a pure cow ghee lamp and offer consecrated Akshat (unbroken rice) before Shri Bahuchar Yantra."
        },
        {
          gu: "સંપૂર્ણ શુદ્ધ ભાવથી આનંદના ગરબાનો ૩ અથવા ૭ વખત સંકલ્પ સાથે પાઠ કરવો.",
          en: "Recite Anand No Garbo 3 or 7 times with focused intention and deep reverence."
        },
        {
          gu: "માતાજીને પ્રિય એવા કસાર અથવા લાડુનો થાળ ધરાવી કન્યાઓને ભોજન કરાવવું.",
          en: "Offer traditional Kasar or Laddu Bhog to the Mother and feed young Kanyas."
        }
      ]
    },
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
            en: "When Goddess Bahuchara manifested her grace upon brothers Vallabh Bhatt and Dhola Bhatt of Ahmedabad in Samvat 1708 on Aso Sud Ashtami, they composed the historic Anand No Garbo. It is not merely poetry, but an awakened Vedic Stotram."
          },
          {
            gu: "આ ગરબાના પ્રત્યેક છંદમાં કુંડલિની જાગૃતિ અને દેવી તત્વના પ્રત્યક્ષ રહસ્યો સમાયેલા છે. ચૈત્રી પૂનમે તેનું સૂર્યોદય સમયે શ્રદ્ધાપૂર્વક પઠન કરવાથી ઘરમાંથી વાસ્તુદોષ, નકારાત્મક ઊર્જા અને દરિદ્રતાનો નાશ થાય છે.",
            en: "Within each verse lie deep secrets of Kundalini awakening and Divine Feminine consciousness. Reciting it at sunrise dissolves Vastu defects and cleanses negative household energy."
          }
        ]
      },
      {
        heading: {
          gu: "૩. ચૈત્રી પૂનમે દર્શન અને પૂજન કરવાથી મળતા ચમત્કારિક ફળો",
          en: "3. Miraculous Blessings of Darshan & Puja on Chaitri Poonam"
        },
        paragraphs: [
          {
            gu: "જ્યોતિષશાસ્ત્રના દ્રષ્ટિકોણથી આ દિવસે સૂર્ય અને ચંદ્રનું સમસપ્તક યોગ બને છે, જે માનસિક શાંતિ અને આત્મબળમાં અભૂતપૂર્વ વધારો કરે છે. કુંડળીમાં જો રાહુ-કેતુ કે મંગળની પીડા હોય તો માં બહુચરની આરાધનાથી સર્વ દોષો શાંત થાય છે.",
            en: "Astrologically, the mutual aspect of the Sun and Moon on this full moon day enhances mental peace and willpower. Afflictions from Rahu, Ketu, or Mars in one's birth chart are pacified by Maa Bahuchar's blessings."
          },
          {
            gu: "આજના આ શુભ અવસરે લાખો ભક્તો ચુંવાળમાં માના ચરણોમાં નતમસ્તક થઈ ધન્યતા અનુભવે છે. આપ પણ ઘરે બેઠા શ્રદ્ધાપૂર્વક માતાજીનું સ્મરણ કરી તેમની કૃપા મેળવી શકો છો.",
            en: "On this auspicious occasion, millions of pilgrims bow at the feet of the Mother in Chunval. You can also meditate from home with sincere devotion to invoke Her divine presence."
          }
        ]
      }
    ],
    reactions: {
      divine: 842,
      insightful: 526,
      wonderful: 312
    },
    audioText: {
      gu: "ચૈત્રી સુદ પૂનમ એટલે શ્રી બહુચર માં નું ચુંવાળ માં પ્રાગટ્ય. ગુજરાતની પરમ પવિત્ર શક્તિપીઠો પૈકીનું એક એવું ચુંવાળ પંથકમાં આવેલું શ્રી બહુચરાજી તીર્થધામ એટલે લાખો ભાવિક ભક્તોની આસ્થાનું કેન્દ્ર. ચૈત્રી સુદ પૂનમ એ મા બહુચરનો પ્રાગટ્ય દિવસ ગણાય છે. આ દિવસે કરવામાં આવતી સાધના, ગરબા પાઠ અને માઁ ના દર્શનથી અસંભવ કાર્યો પણ સુલભ બને છે. વલ્લભ ભટ્ટ અને ધોળા ભટ્ટે આ પવિત્ર ભૂમિ પરથી જ અખંડ ભક્તિની અવિરત ગંગા વહાવી હતી.",
      en: "Chaitra Sud Poonam marks the divine appearance of Shri Bahuchar Maa in Chunval region. As one of the most sacred Shaktipeeths of Gujarat, Bahucharaji shrine is the spiritual core for millions of devotees. Chaitra Sud Poonam is celebrated as the manifestation day of Mother Bahuchar. Prayers, recitations of Anand No Garbo, and pious contemplation on this day make even seemingly impossible endeavors effortless."
    }
  },

  // 2. Somnath Mahadev (Jyotirlinga 1)
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
    author: {
      name: { gu: "Dr. Vishal Modi", en: "Dr. Vishal Modi" },
      title: { gu: "Ph.D. જ્યોતિષશાસ્ત્ર • ગોલ્ડ મેડાલિસ્ટ", en: "Ph.D. Vedic Astrology • Gold Medalist" },
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_5XW43dWH3gwsJGrTmT2jgpHCDswiaJ7iStqJhQAaTdawjvUH9UzqLNO5jtVJKflsxHZ-8gzITLtb1lTGEXMdXIlSJkXDh5Zu4NAq2rpTooxZUOoPZqKHz_T_ho2TWFM43WB5t5lAsclDNB9AN7Tt3Zk2dfnbODq7sV3g2cIu5fNTseIR3gGtOxryk7UCd405Q0n1nrcToAJWxVeIsElgo_f-8iZjA44ZftPaLYRuoDel5ltFaHAu",
      verified: true,
      bio: {
        gu: "વૈદિક જ્યોતિષ અને શિવ તત્વના ઊંડા અભ્યાસી. સોમનાથ, ઉજ્જૈન અને કાશી ક્ષેત્રના ઐતિહાસિક અને ખગોળીય રહસ્યો પર વિશેષ સંશોધન.",
        en: "Deep researcher of Vedic astrology and Shiva philosophy, with scholarly focus on astronomical significance of ancient Jyotirlinga shrines."
      }
    },
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
    muhurtaCard: {
      title: { gu: "સોમનાથ દિવ્ય અભિષેક મુહૂર્ત", en: "Somnath Divine Abhishek Muhurta" },
      badge: { gu: "અમૃત સિદ્ધિ યોગ", en: "Amrit Siddhi Yoga" },
      morning: {
        label: { gu: "પ્રાતઃકાળ પૂજન:", en: "Morning Puja:" },
        time: { gu: "સવારે ૦૬:૧૫ થી ૦૮:૩૦", en: "06:15 AM to 08:30 AM" }
      },
      evening: {
        label: { gu: "સંધ્યા આરતી:", en: "Evening Aarti:" },
        time: { gu: "સાંજે ૦૭:૦૦ થી ૦૭:૪૫", en: "07:00 PM to 07:45 PM" }
      }
    },
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
    sankalpPuja: {
      title: { gu: "સોમનાથ લાઈવ સંકલ્પ પૂજા", en: "Somnath Live Sankalp Puja" },
      subtitle: { gu: "તમારા ગોત્ર અનુસાર ઘરે બેઠા ઓનલાઇન પૂજા નોંધાવો", en: "Register personalized online Puja according to your Gotra and family" },
      buttonText: { gu: "સંકલ્પ નોંધાવો ●", en: "Book Sankalp Puja ●" }
    },
    rituals: {
      title: { gu: "ચંદ્રદોષ નિવારણ માટે સોમનાથમાં વિશેષ પૂજા વિધિ", en: "Special Somnath Rituals for Pacifying Chandra Dosha" },
      badge: { gu: "શિવ આરાધના", en: "Shiva Aradhana" },
      items: [
        {
          gu: "સોમવારે પ્રાતઃકાળે ગંગાજળ અને કાચા દૂધથી મહાદેવનો જળાભિષેક કરવો.",
          en: "Perform Jalabhishek of Lord Shiva using Ganga water and raw milk on Monday morning."
        },
        {
          gu: "બિલીપત્ર પર 'ૐ નમઃ શિવાય' લખી ૧૦૮ પવિત્ર પત્રો શિવલિંગ પર અર્પણ કરવા.",
          en: "Offer 108 Bilva leaves inscribed with 'Om Namah Shivaya' upon the holy Shiva Lingam."
        },
        {
          gu: "મહા મૃત્યુંજય મંત્રનો ૧૦૮ વખત જાપ કરવો જેથી માનસિક તણાવ અને ભય દૂર થાય.",
          en: "Chant the Maha Mrityunjaya Mantra 108 times to overcome anxiety and attain calm."
        },
        {
          gu: "સફેદ વસ્ત્ર અને ચોખાનું દાન કરી શિવ આરાધના સંપન્ન કરવી.",
          en: "Conclude by offering white clothes and rice to the needy to bring planetary peace."
        }
      ]
    },
    sections: [
      {
        heading: {
          gu: "૧. ચંદ્રદેવનો શ્રાપ અને પ્રભાસ તીર્થે શિવ કૃપાની ગાથા",
          en: "1. The Curse on Moon God & Divine Redemption at Prabhas"
        },
        paragraphs: [
          {
            gu: "ચંદ્ર દોષ નિવારણ અને માનસિક શાંતિ માટે અહીં કરવામાં આવતી 'મહાપૂજા' તથા 'લઘુરુદ્ર' અત્યંત ફળદાયી માનવામાં આવે છે. શિવપુરાણ મુજબ જે ભક્ત સોમનાથ જ્યોતિર્લિંગના દર્શન ભાવપૂર્વક કરે છે, તેના ત્રિવિધ તાપ નષ્ટ થાય છે.",
            en: "Mahapuja and Laghurudra performed here are considered extraordinarily fruitful for mitigating Moon afflictions and gaining serenity. According to the Shiva Purana, heartfelt darshan of Somnath dissolves threefold miseries."
          },
          {
            gu: "દક્ષ પ્રજાપતિના શ્રાપથી ક્ષય રોગગ્રસ્ત થયેલા ચંદ્રદેવે જ્યારે સરસ્વતી, હિરણ અને કપિલા નદીના સંગમ પર તપસ્યા કરી, ત્યારે ભગવાન ભોળાનાથે પ્રગટ થઈ તેમને પુનર્જીવન આપ્યું હતું.",
            en: "When Chandra Deva was afflicted by Daksha's curse, he performed intense penance at the confluence of Triveni, where Lord Shiva manifested to restore his radiance."
          }
        ]
      },
      {
        heading: {
          gu: "૨. સોમનાથ મંદિરનું અબાધિત જ્યોતિ સ્તંભ અને ખગોળીય રહસ્ય",
          en: "2. The Unobstructed Arrow Pillar (Baan Stambh) & Astronomical Mystery"
        },
        paragraphs: [
          {
            gu: "સોમનાથ મંદિર પરિસરમાં આવેલો બાણ સ્તંભ પ્રાચીન ભારતીય વિજ્ઞાનનો અદ્ભુત પુરાવો છે. તેના પર લખેલું છે કે આ બિંદુથી દક્ષિણ ધ્રુવ (એન્ટાર્કટિકા) સુધી વચ્ચે કોઈ ભૂમિભાગ આવતો નથી. આ ખગોળીય ગણતરી હજારો વર્ષ પહેલાં આપણા ઋષિઓએ કરી હતી.",
            en: "The Baan Stambh (Arrow Pillar) in Somnath courtyard is profound evidence of ancient Indian navigation. It records that a straight marine line from this point to the South Pole intersects no land mass whatsoever."
          }
        ]
      }
    ],
    reactions: {
      divine: 960,
      insightful: 480,
      wonderful: 395
    },
    audioText: {
      gu: "પ્રથમ જ્યોતિર્લિંગ શ્રી સોમનાથ મહાદેવ. સૌરાષ્ટ્રની પવિત્ર સમુદ્ર તટની ભૂમિ પર બિરાજમાન ભગવાન સોમનાથનું મંદિર એ ભારતીય સંસ્કૃતિની અડીખમ શ્રદ્ધાનું પ્રતીક છે. ચંદ્ર દોષ નિવારણ અને માનસિક શાંતિ માટે અહીં કરવામાં આવતી મહાપૂજા અત્યંત ફળદાયી માનવામાં આવે છે. શિવપુરાણ મુજબ જે ભક્ત સોમનાથ જ્યોતિર્લિંગના દર્શન ભાવપૂર્વક કરે છે, તેના સમસ્ત કષ્ટોનું નિવારણ થાય છે.",
      en: "First Jyotirlinga Shri Somnath Mahadev. Standing resilient on the sacred Arabian Sea shores of Saurashtra, the temple of Lord Somnath embodies the timeless faith of Sanatana Dharma. Pujas offered here dissolve mental restlessness and awaken peace."
    }
  }
}

/**
 * Get article by ID with safe fallback
 */
export function getArticleById(id) {
  if (ARTICLES_DATA[id]) {
    return ARTICLES_DATA[id]
  }

  // If looking for a jyotirlinga ID
  if (id && id.startsWith("jyotirling")) {
    return ARTICLES_DATA["jyotirling-1"]
  }

  // Fallback to default first article
  return ARTICLES_DATA["hero-1"]
}
