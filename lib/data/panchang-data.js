/**
 * The Astro Code - Vedic Panchang & Hindu Calendar Data Repository
 * 
 * Provides complete bilingual data (Gujarati 'gu' and English 'en')
 * for the Panchang page, including:
 * - 5 Core Angas (Tithi, Nakshatra, Yoga, Karana, Var)
 * - Monthly Calendar Grid with Hindu Festivals & Vrats
 * - Planetary Positions (Grah Gochar)
 * - Celestial Sun/Moon Timings & Coordinates
 * - 8-Period Day & Night Choghadiya Tables
 * - Auspicious (Shubh) and Inauspicious (Rahu Kaal) Muhurats
 * - Lord Hanuman Jayanti Festival Spotlight & Sacred Mantra
 * - 12 Rashis Daily Horoscope Predictions
 * - Real-time Choghadiya Dial Gauge Widget
 * - Upcoming Hindu Festivals List
 * - Certified Vedic Store Items
 */

export const PANCHANG_DATA = {
  // Cities Coordinates and Sun Timings
  cities: [
    { id: "ahmedabad", name: { gu: "અમદાવાદ", en: "Ahmedabad" }, gu: "અમદાવાદ (IST)", en: "Ahmedabad (IST)", lat: "23.02° N", lon: "72.57° E", sunrise: "06:14 AM", sunset: "06:56 PM", moonrise: "06:52 PM", moonset: "06:22 AM" },
    { id: "surat", name: { gu: "સુરત", en: "Surat" }, gu: "સુરત (IST)", en: "Surat (IST)", lat: "21.17° N", lon: "72.83° E", sunrise: "06:18 AM", sunset: "06:58 PM", moonrise: "06:56 PM", moonset: "06:26 AM" },
    { id: "rajkot", name: { gu: "રાજકોટ", en: "Rajkot" }, gu: "રાજકોટ (IST)", en: "Rajkot (IST)", lat: "22.30° N", lon: "70.80° E", sunrise: "06:22 AM", sunset: "07:04 PM", moonrise: "07:00 PM", moonset: "06:30 AM" },
    { id: "vadodara", name: { gu: "વડોદરા", en: "Vadodara" }, gu: "વડોદરા (IST)", en: "Vadodara (IST)", lat: "22.30° N", lon: "73.18° E", sunrise: "06:16 AM", sunset: "06:55 PM", moonrise: "06:54 PM", moonset: "06:24 AM" },
    { id: "mumbai", name: { gu: "મુંબઈ", en: "Mumbai" }, gu: "મુંબઈ (IST)", en: "Mumbai (IST)", lat: "19.07° N", lon: "72.87° E", sunrise: "06:20 AM", sunset: "06:54 PM", moonrise: "06:58 PM", moonset: "06:28 AM" }
  ],

  // Breadcrumb & Category Filter Chips
  breadcrumb: {
    home: { gu: "મુખ્ય પૃષ્ઠ", en: "Home" },
    current: { gu: "દૈનિક પંચાંગ અને ગુજરાતી કેલેન્ડર", en: "Daily Panchang & Gujarati Calendar" }
  },
  filterChips: [
    { id: "samvat", gu: "વિ. સંવત ૨૦૮૧", en: "Vikram Samvat 2081", isTag: true },
    { id: "choghadiya", gu: "આજનું ચોઘડિયું", en: "Today's Choghadiya", target: "#choghadiya" },
    { id: "muhurat", gu: "શુભ મુહૂર્ત", en: "Auspicious Muhurat", target: "#muhurat" },
    { id: "panchang-details", gu: "૫ અંગો", en: "5 Limbs of Panchang", target: "#panchang-details" },
    { id: "rashifal", gu: "દૈનિક રાશિફળ", en: "Daily Horoscope", target: "#rashifal" }
  ],

  // Header Banner Details
  banner: {
    guideTag: { gu: "વૈદિક ગણતરી માર્ગદર્શિકા", en: "VEDIC CALCULATION GUIDE" },
    samvatInfo: {
      gu: "વિક્રમ સંવત ૨૦૮૧ • ક્રોધી નામ સંવત્સર • વીર નિર્વાણ સંવત ૨૫૫૧",
      en: "Vikram Samvat 2081 • Krodhi Samvatsara • Veer Nirvana Samvat 2551"
    },
    title: {
      gu: "સંપૂર્ણ ગુજરાતી વૈદિક પંચાંગ અને જ્યોતિષ કેલેન્ડર",
      en: "Complete Gujarati Vedic Panchang & Astrological Calendar"
    },
    subtitle: {
      gu: "સૂર્ય સિદ્ધાંત મુજબ પ્રત્યક્ષ અક્ષાંશ-રેખાંશ આધારિત સચોટ તિથિ, ચોઘડિયા અને શુભ મુહૂર્ત",
      en: "Accurate Tithi, Choghadiya, and Auspicious Muhurats calculated using Surya Siddhanta based on direct latitude-longitude coordinates."
    },
    currentMonthLabel: { gu: "ચૈત્ર - સુદ પક્ષ", en: "Chaitra - Shukla Paksha" },
    currentYearLabel: { gu: "એપ્રિલ ૨૦૨૫ (April 2025)", en: "April 2025 (Chaitra 2081)" },
    todayButtonText: { gu: "આજનું પંચાંગ", en: "Today's Panchang" }
  },

  // Monthly Calendar Grid
  monthlyCalendar: {
    heading: { gu: "ચૈત્ર માસ કેલેન્ડર ૨૦૮૧ (એપ્રિલ ૨૦૨૫)", en: "Chaitra Month Calendar 2081 (April 2025)" },
    legend: {
      festival: { gu: "તહેવાર / ઉત્સવ", en: "Festival / Celebration" },
      ekadashi: { gu: "એકાદશી / પૂનમ", en: "Ekadashi / Purnima" }
    },
    daysOfWeek: [
      { id: "sun", gu: "રવિ", en: "Sun", isHoliday: true },
      { id: "mon", gu: "સોમ", en: "Mon" },
      { id: "tue", gu: "મંગળ", en: "Tue" },
      { id: "wed", gu: "બુધ", en: "Wed" },
      { id: "thu", gu: "ગુરુ", en: "Thu" },
      { id: "fri", gu: "શુક્ર", en: "Fri" },
      { id: "sat", gu: "શનિ", en: "Sat", isSat: true }
    ],
    // 35 Calendar Cells for the Month of April 2025 (Chaitra 2081)
    cells: [
      { dayNumber: "૩૦", tithi: { gu: "ફાગણ વદ અમાસ", en: "Phalguna Vad Amavasya" }, fest: null, isPreviousMonth: true },
      { dayNumber: "૩૧", tithi: { gu: "ચૈત્ર સુદ એકમ", en: "Chaitra Sud Ekam" }, fest: { gu: "ગુડી પડવો", en: "Gudi Padwa" }, type: "fest" },
      { dayNumber: "૦૧", tithi: { gu: "ચૈત્ર સુદ બીજ", en: "Chaitra Sud Beej" }, fest: { gu: "ચેટીચાંદ", en: "Cheti Chand" }, type: "fest" },
      { dayNumber: "૦૨", tithi: { gu: "સુદ ત્રીજ", en: "Sud Teej" }, fest: { gu: "મત્સ્ય જયંતી", en: "Matsya Jayanti" }, type: "fest" },
      { dayNumber: "૦૩", tithi: { gu: "સુદ ચોથ", en: "Sud Choth" }, fest: { gu: "વિનાયક ચોથ", en: "Vinayaka Chaturthi" } },
      { dayNumber: "૦૪", tithi: { gu: "સુદ પાંચમ", en: "Sud Pancham" }, fest: { gu: "શ્રી પંચમી", en: "Lakshmi Panchami" } },
      { dayNumber: "૦૫", tithi: { gu: "સુદ છઠ્ઠ", en: "Sud Chhath" }, fest: { gu: "સ્કંદ ષષ્ઠી", en: "Skanda Sashti" } },
      
      { dayNumber: "૦૬", tithi: { gu: "સુદ સાતમ", en: "Sud Satam" }, fest: { gu: "કાળરાત્રી પૂજન", en: "Kalaratri Puja" } },
      { dayNumber: "૦૭", tithi: { gu: "સુદ આઠમ", en: "Sud Aatham" }, fest: { gu: "દુર્ગાષ્ટમી", en: "Maha Ashtami" }, type: "fest" },
      { dayNumber: "૦૮", tithi: { gu: "સુદ નોમ", en: "Sud Nom" }, fest: { gu: "શ્રી રામનવમી", en: "Shree Ram Navami" }, type: "fest", highlightGold: true },
      { dayNumber: "૦૯", tithi: { gu: "સુદ દસમ", en: "Sud Dasam" }, fest: { gu: "ધર્મઘટ દાન", en: "Dharmaghata Dana" } },
      { dayNumber: "૧૦", tithi: { gu: "સુદ અગિયારસ", en: "Sud Agiyaras" }, fest: { gu: "કામદા એકાદશી", en: "Kamada Ekadashi" }, type: "ekadashi" },
      { dayNumber: "૧૧", tithi: { gu: "સુદ બારસ", en: "Sud Baras" }, fest: { gu: "વામન દ્વાદશી", en: "Vamana Dvadashi" } },
      { dayNumber: "૧૨", tithi: { gu: "ચૈત્ર સુદ પૂનમ", en: "Chaitra Purnima" }, fest: { gu: "હનુમાન જયંતી", en: "Hanuman Jayanti" }, isToday: true, type: "today" },
      
      { dayNumber: "૧૩", tithi: { gu: "ચૈત્ર વદ એકમ", en: "Chaitra Vad Ekam" }, fest: { gu: "વૈશાખ સ્નાન શરૂ", en: "Vaishakha Snan Begins" } },
      { dayNumber: "૧૪", tithi: { gu: "વદ બીજ", en: "Vad Beej" }, fest: { gu: "મેષ સંક્રાંતિ", en: "Mesha Sankranti" }, type: "fest" },
      { dayNumber: "૧૫", tithi: { gu: "વદ ત્રીજ", en: "Vad Teej" }, fest: { gu: "અંગારકી ચોથ પૂર્વ", en: "Angarki Eve" } },
      { dayNumber: "૧૬", tithi: { gu: "વદ ચોથ", en: "Vad Choth" }, fest: { gu: "સંકષ્ટ ચતુર્થી", en: "Sankashti Chaturthi" }, type: "fest" },
      { dayNumber: "૧૭", tithi: { gu: "વદ પાંચમ", en: "Vad Pancham" }, fest: null },
      { dayNumber: "૧૮", tithi: { gu: "વદ છઠ્ઠ", en: "Vad Chhath" }, fest: null },
      { dayNumber: "૧૯", tithi: { gu: "વદ સાતમ", en: "Vad Satam" }, fest: { gu: "શીતળા સપ્તમી", en: "Sheetala Saptami" } },

      { dayNumber: "૨૦", tithi: { gu: "વદ આઠમ", en: "Vad Aatham" }, fest: { gu: "કાલાષ્ટમી", en: "Kalashtami" } },
      { dayNumber: "૨૧", tithi: { gu: "વદ નોમ", en: "Vad Nom" }, fest: null },
      { dayNumber: "૨૨", tithi: { gu: "વદ દસમ", en: "Vad Dasam" }, fest: null },
      { dayNumber: "૨૩", tithi: { gu: "વદ અગિયારસ", en: "Vad Agiyaras" }, fest: { gu: "વરુથિની એકાદશી", en: "Varuthini Ekadashi" }, type: "ekadashi" },
      { dayNumber: "૨૪", tithi: { gu: "વદ બારસ", en: "Vad Baras" }, fest: { gu: "પ્રદોષ વ્રત", en: "Shani Pradosh" } },
      { dayNumber: "૨૫", tithi: { gu: "વદ તેરસ", en: "Vad Teras" }, fest: { gu: "માસિક શિવરાત્રી", en: "Masa Shivaratri" } },
      { dayNumber: "૨૬", tithi: { gu: "વદ ચૌદશ", en: "Vad Chaudas" }, fest: null },

      { dayNumber: "૨૭", tithi: { gu: "ચૈત્ર વદ અમાસ", en: "Darsha Amavasya" }, fest: { gu: "દર્શ અમાસ", en: "Somvati Amavasya" }, type: "fest" },
      { dayNumber: "૨૮", tithi: { gu: "વૈશાખ સુદ એકમ", en: "Vaishakha Sud Ekam" }, fest: null },
      { dayNumber: "૨૯", tithi: { gu: "સુદ બીજ", en: "Sud Beej" }, fest: { gu: "પરશુરામ જયંતી પૂર્વ", en: "Parashurama Eve" } },
      { dayNumber: "૩૦", tithi: { gu: "સુદ ત્રીજ", en: "Sud Teej" }, fest: { gu: "અક્ષય તૃતીયા (અખાત્રીજ)", en: "Akshaya Tritiya" }, type: "fest", highlightGold: true },
      { dayNumber: "૦૧", tithi: { gu: "સુદ ચોથ", en: "Sud Choth" }, fest: null, isNextMonth: true },
      { dayNumber: "૦૨", tithi: { gu: "સુદ પાંચમ", en: "Sud Pancham" }, fest: null, isNextMonth: true },
      { dayNumber: "૦૩", tithi: { gu: "સુદ છઠ્ઠ", en: "Sud Chhath" }, fest: null, isNextMonth: true }
    ]
  },

  // 5 Core Limbs of Vedic Panchang (૫ અંગો)
  coreAngas: {
    heading: { gu: "આજનું દૈનિક પંચાંગ (Vedic Panchang)", en: "Today's Vedic Panchang" },
    dateLine: { gu: "શનિવાર, ૧૨ એપ્રિલ ૨૦૨૫ • વિક્રમ સંવત ૨૦૮૧ (અમદાવાદ)", en: "Saturday, 12 April 2025 • Vikram Samvat 2081 (Ahmedabad)" },
    festivalBadge: { gu: "શ્રી હનુમાન જયંતી વ્રત", en: "Shree Hanuman Jayanti Vrat" },
    limbsHeading: { gu: "પંચાંગના પાંચ મુખ્ય અંગો", en: "5 Primary Limbs of Panchang" },
    limbs: [
      {
        number: "૧",
        label: { gu: "તિથિ (Tithi)", en: "Tithi" },
        name: { gu: "ચૈત્ર સુદ પૂનમ (પૂર્ણિમા)", en: "Chaitra Shukla Purnima" },
        timing: { gu: "સાંજે ૦૭:૧૫ સુધી, પછી વદ એકમ", en: "Until 07:15 PM, then Vad Ekam" }
      },
      {
        number: "૨",
        label: { gu: "નક્ષત્ર (Nakshatra)", en: "Nakshatra" },
        name: { gu: "ચિત્રા (Chitra)", en: "Chitra Nakshatra" },
        timing: { gu: "રાત્રે ૦૧:૨૪ સુધી, પછી સ્વાતિ", en: "Until 01:24 AM, then Swati" }
      },
      {
        number: "૩",
        label: { gu: "યોગ (Yoga)", en: "Yoga" },
        name: { gu: "હર્ષણ યોગ (Harshana Yoga)", en: "Harshana Yoga" },
        timing: { gu: "સવારથી ૧૧:૪૨ AM સુધી", en: "From sunrise until 11:42 AM" }
      },
      {
        number: "૪",
        label: { gu: "કરણ (Karana)", en: "Karana" },
        name: { gu: "બવ કરણ (Bava)", en: "Bava Karana" },
        timing: { gu: "બપોરે ૦૨:૪૦ સુધી, પછી બાલવ", en: "Until 02:40 PM, then Balava" }
      },
      {
        number: "૫",
        label: { gu: "વાર (Day)", en: "Vara (Day)" },
        name: { gu: "શનિવાર (Saturday)", en: "Saturday (Shanivara)" },
        timing: { gu: "શનિ દેવ પ્રીતિકર વાસ", en: "Dedicated to Lord Shani Dev" }
      }
    ],

    // Planetary Positions (ગ્રહ ગોચર)
    planetaryHeading: { gu: "ગ્રહ ગોચર અને નક્ષત્ર ગોઠવણી", en: "Planetary Transits & Alignments" },
    planets: [
      {
        title: { gu: "સૂર્ય રાશિ", en: "Sun Sign" },
        sign: { gu: "મેષ (ઉચ્ચનો)", en: "Aries (Exalted)" },
        nakshatra: { gu: "અશ્વિની નક્ષત્ર", en: "Ashwini Nakshatra" }
      },
      {
        title: { gu: "ચંદ્ર રાશિ", en: "Moon Sign" },
        sign: { gu: "તુલા (Libra)", en: "Libra (Tula)" },
        nakshatra: { gu: "ચિત્રા નક્ષત્ર પાદ ૩", en: "Chitra Nakshatra Pada 3" }
      },
      {
        title: { gu: "દેવગુરુ બૃહસ્પતિ", en: "Jupiter (Guru)" },
        sign: { gu: "વૃષભ રાશિ", en: "Taurus (Vrishabha)" },
        nakshatra: { gu: "રોહિણી નક્ષત્ર", en: "Rohini Nakshatra" }
      },
      {
        title: { gu: "શનિ મહારાજ", en: "Saturn (Shani)" },
        sign: { gu: "કુંભ (સ્વગૃહી)", en: "Aquarius (Own House)" },
        nakshatra: { gu: "શતભિષા નક્ષત્ર", en: "Shatabhisha Nakshatra" }
      }
    ],
    astrologicalTip: {
      title: { gu: "વિશેષ જ્યોતિષ સંયોગ:", en: "Special Astrological Conjunction:" },
      text: {
        gu: "આજે ચૈત્ર પૂર્ણિમાના દિવસે હર્ષણ યોગ અને ચિત્રા નક્ષત્રનો ઉત્તમ સમન્વય છે. શ્રી હનુમાન ચાલીસા પાઠ, સુંદરકાંડ અને પીપળાના વૃક્ષનું પૂજન કરવાથી શનિદોષથી મુક્તિ મળશે.",
        en: "Today on Chaitra Purnima, Harshana Yoga aligns auspiciously with Chitra Nakshatra. Reciting Hanuman Chalisa, Sundarkand, and watering the sacred Peepal tree brings relief from Shani Sade Sati and planetary afflictions."
      }
    }
  },

  // Celestial Timings
  celestialTimings: {
    heading: { gu: "ખગોળીય ગતિવિધિ અને સમય (Celestial Timings)", en: "Astronomical & Celestial Timings" },
    items: [
      { id: "sunrise", label: { gu: "સૂર્યોદય", en: "Sunrise" }, time: "૦૬:૧૪ AM", icon: "sun" },
      { id: "sunset", label: { gu: "સૂર્યાસ્ત", en: "Sunset" }, time: "૦૬:૫૬ PM", icon: "sunset" },
      { id: "moonrise", label: { gu: "ચંદ્રોદય", en: "Moonrise" }, time: "૦૬:૫૨ PM", icon: "moon" },
      { id: "moonset", label: { gu: "ચંદ્રાસ્ત", en: "Moonset" }, time: "૦૬:૨૨ AM", icon: "moon-star" }
    ],
    dayDuration: { gu: "દિનમાન (Day Duration): ૧૨ કલાક ૪૨ મિનિટ", en: "Day Duration: 12 Hours 42 Mins" },
    nightDuration: { gu: "રાત્રિમાન (Night Duration): ૧૧ કલાક ૧૮ મિનિટ", en: "Night Duration: 11 Hours 18 Mins" },
    midday: { gu: "મધ્યાહ્ન કાળ: ૧૨:૩૫ PM", en: "Madhyahna Kaal: 12:35 PM" }
  },

  // Comprehensive Choghadiya Table (Day & Night)
  choghadiyaSection: {
    heading: { gu: "આજનું ચોઘડિયું (Choghadiya Timing)", en: "Today's Choghadiya Timings" },
    subtitle: { gu: "મુસાફરી, પૂજા અને નવા શુભ કાર્યો માટે અનુકૂળ સમય", en: "Auspicious intervals for travel, business inaugurations, and sacred rituals" },
    tabDay: { gu: "દિવસના ચોઘડિયા", en: "Day Choghadiya" },
    tabNight: { gu: "રાત્રિના ચોઘડિયા", en: "Night Choghadiya" },
    liveBanner: {
      activeName: { gu: "લાભ (શુભ)", en: "Laabh (Auspicious)" },
      timeRange: { gu: "૧૫:૪૫ થી ૧૭:૨૦", en: "03:45 PM to 05:20 PM" },
      verdict: { gu: "નવા વ્યાપાર & પ્રવાસ માટે ઉત્તમ", en: "Ideal for new business deals & travel" }
    },
    dayList: [
      { name: { gu: "અમૃત", en: "Amrit" }, time: "૦૬:૧૪ - ૦૭:૪૯", nature: { gu: "શ્રેષ્ઠ ફળદાયી", en: "Best (Amrit)" }, work: { gu: "તમામ પ્રકારના શુભ મંગલ કાર્યો", en: "All auspicious undertakings & ceremonies" }, badgeVariant: "emerald" },
      { name: { gu: "કાળ", en: "Kaal" }, time: "૦૭:૪૯ - ૦૯:૨૪", nature: { gu: "અશુભ", en: "Inauspicious (Kaal)" }, work: { gu: "મશીનરી કે શત્રુ દમન કાર્ય સિવાય વર્જ્ય", en: "Avoid new work; only machinery/defense" }, badgeVariant: "destructive" },
      { name: { gu: "શુભ", en: "Shubh" }, time: "૦૯:૨૪ - ૧૧:૦૦", nature: { gu: "શુભ", en: "Auspicious (Shubh)" }, work: { gu: "લગ્ન, પૂજા, જનોઈ, ધાર્મિક વિધિ", en: "Weddings, pujas, sacred ceremonies" }, badgeVariant: "emerald" },
      { name: { gu: "રોગ", en: "Rog" }, time: "૧૧:૦૦ - ૧૨:૩૫", nature: { gu: "અશુભ", en: "Inauspicious (Rog)" }, work: { gu: "દવા લેવી કે ઓપરેશન સિવાય વર્જ્ય", en: "Medical treatments only; avoid trade" }, badgeVariant: "destructive" },
      { name: { gu: "ઉદ્વેગ", en: "Udveg" }, time: "૧૨:૩૫ - ૧૪:૧૦", nature: { gu: "સામાન્ય / કલેશ", en: "Tense / Neutral" }, work: { gu: "સરકારી અરજી કે કરવેરા કાર્યો", en: "Government filings & official taxes" }, badgeVariant: "muted" },
      { name: { gu: "ચલ", en: "Chal" }, time: "૧૪:૧૦ - ૧૫:૪૫", nature: { gu: "સામાન્ય શુભ", en: "Movable (Chal)" }, work: { gu: "યાત્રા, પરિવહન, ગાડી ચલાવવી", en: "Journeys, vehicle transit, logistics" }, badgeVariant: "muted" },
      { name: { gu: "લાભ", en: "Laabh" }, time: "૧૫:૪૫ - ૧૭:૨૦", nature: { gu: "અતિ શુભ", en: "Highly Auspicious" }, work: { gu: "ધન સંચય, વ્યાપારિક સોદા, ખરીદી", en: "Wealth accumulation, investments, purchases" }, badgeVariant: "gold", isActive: true },
      { name: { gu: "અમૃત", en: "Amrit" }, time: "૧૭:૨૦ - ૧૮:૫૬", nature: { gu: "શ્રેષ્ઠ ફળદાયી", en: "Best (Amrit)" }, work: { gu: "સર્વ કાર્ય સિદ્ધિ, આરતી, ઉપાસના", en: "Universal success, evening aarti, meditation" }, badgeVariant: "emerald" }
    ],
    nightList: [
      { name: { gu: "ચલ", en: "Chal" }, time: "૧૮:૫૬ - ૨૦:૨૦", nature: { gu: "સામાન્ય શુભ", en: "Movable (Chal)" }, work: { gu: "સાંજના પ્રવાસ, સંદેશવ્યવહાર", en: "Evening travel, communications" }, badgeVariant: "muted" },
      { name: { gu: "રોગ", en: "Rog" }, time: "૨૦:૨૦ - ૨૧:૪૫", nature: { gu: "અશુભ", en: "Inauspicious (Rog)" }, work: { gu: "તકરાર ટાળવી, આરામ કરવો", en: "Avoid disputes; take rest" }, badgeVariant: "destructive" },
      { name: { gu: "કાળ", en: "Kaal" }, time: "૨૧:૪૫ - ૨૩:૦૯", nature: { gu: "અશુભ", en: "Inauspicious (Kaal)" }, work: { gu: "નવા કાર્ય માટે વર્જ્ય", en: "Strictly avoid new commitments" }, badgeVariant: "destructive" },
      { name: { gu: "લાભ", en: "Laabh" }, time: "૨૩:૦૯ - ૦૦:૩૩", nature: { gu: "અતિ શુભ", en: "Highly Auspicious" }, work: { gu: "સાધના, મનોમંથન, સંશોધન", en: "Spiritual practice, late studies, planning" }, badgeVariant: "gold" },
      { name: { gu: "ઉદ્વેગ", en: "Udveg" }, time: "૦૦:૩૩ - ૦૧:૫૮", nature: { gu: "અશુભ", en: "Tense" }, work: { gu: "શાંત ચિત્તે નિદ્રાધીન થવું", en: "Peaceful sleep & contemplation" }, badgeVariant: "muted" },
      { name: { gu: "શુભ", en: "Shubh" }, time: "૦૧:૫૮ - ૦૩:૨૨", nature: { gu: "શુભ", en: "Auspicious (Shubh)" }, work: { gu: "બ્રહ્મમુહૂર્ત ધ્યાનની પૂર્વતૈયારી", en: "Pre-dawn meditation prep" }, badgeVariant: "emerald" },
      { name: { gu: "અમૃત", en: "Amrit" }, time: "૦૩:૨૨ - ૦૪:૪૬", nature: { gu: "શ્રેષ્ઠ ફળદાયી", en: "Best (Amrit)" }, work: { gu: "બ્રહ્મ મુહૂર્ત પૂજા, મંત્ર જાપ", en: "Brahma Muhurta sadhana & chanting" }, badgeVariant: "emerald" },
      { name: { gu: "ચલ", en: "Chal" }, time: "૦૪:૪૬ - ૦૬:૧૪", nature: { gu: "સામાન્ય શુભ", en: "Movable (Chal)" }, work: { gu: "પ્રભાતીયા, યોગાભ્યાસ, સૂર્ય નમસ્કાર", en: "Morning hymns, yoga, Surya Namaskar" }, badgeVariant: "muted" }
    ]
  },

  // Auspicious (Shubh) and Inauspicious (Rahu Kaal) Muhurats
  muhuratSection: {
    heading: { gu: "વિશેષ મુહૂર્ત અને વર્જ્ય કાળ (Muhurat & Rahu Kaal)", en: "Special Muhurat & Inauspicious Periods" },
    subtitle: { gu: "સૂર્ય સમય અનુસાર ગણતરી કરેલ શુભ અને ત્યાગવા યોગ્ય સમયગાળો", en: "Calculated auspicious times for victory and periods strictly to avoid" },
    shubhHeading: { gu: "શુભ મુહૂર્ત (સર્વ કાર્ય સિદ્ધિ)", en: "Auspicious Timings (Universal Success)" },
    shubhList: [
      { name: { gu: "અભિજિત મુહૂર્ત", en: "Abhijit Muhurat" }, desc: { gu: "વિજયકારી ઉત્તમ મુહૂર્ત", en: "Most powerful victory interval" }, time: "૧૨:૦૧ PM - ૧૨:૫૨ PM" },
      { name: { gu: "વિજય મુહૂર્ત", en: "Vijaya Muhurat" }, desc: { gu: "ન્યાયાલય કે સ્પર્ધાત્મક કાર્ય", en: "Legal, sports & competitive ventures" }, time: "૦૨:૩૨ PM - ૦૩:૨૨ PM" },
      { name: { gu: "ગોધૂલિ મુહૂર્ત", en: "Godhuli Muhurat" }, desc: { gu: "ગૃહ પ્રવેશ કે દીપ પ્રાગટ્ય", en: "Housewarming & sacred lamps lighting" }, time: "૦૬:૪૫ PM - ૦૭:૦૮ PM" },
      { name: { gu: "અમૃત કાળ", en: "Amrit Kaal" }, desc: { gu: "મંત્ર જાપ અને યજ્ઞ વિધિ", en: "Mantra sadhana & yajna ceremonies" }, time: "૦૮:૧૫ PM - ૦૯:૫૦ PM" }
    ],
    inauspiciousHeading: { gu: "અશુભ / વર્જ્ય કાળ (નવા કાર્ય નિષેધ)", en: "Inauspicious / Prohibited Periods" },
    inauspiciousList: [
      { name: { gu: "રાહુ કાળ", en: "Rahu Kaal" }, desc: { gu: "ધન વ્યવહાર કે યાત્રા વર્જ્ય", en: "Avoid financial deals & departures" }, time: "૦૯:૨૪ AM - ૧૧:૦૦ AM", isAlert: true },
      { name: { gu: "યમગંડ કાળ", en: "Yamaganda Kaal" }, desc: { gu: "અનિષ્ટ ફળદાયી સમય", en: "Undesirable for signing agreements" }, time: "૦૧:૪૫ PM - ૦૩:૨૦ PM" },
      { name: { gu: "ગુલિક કાળ", en: "Gulika Kaal" }, desc: { gu: "શનિ પુત્ર ગુલિક પ્રભાવ", en: "Delays in accomplishments" }, time: "૦૬:૧૪ AM - ૦૭:૪૯ AM" },
      { name: { gu: "દુર્મુહૂર્ત", en: "Durmuhurat" }, desc: { gu: "સંકટ પ્રદાયક મુહૂર્ત", en: "Obstacle-prone interval" }, time: "૦૭:૫૪ AM - ૦૮:૪૪ AM" }
    ]
  },

  // Featured Festival Spotlight Article (Hanuman Jayanti)
  spotlight: {
    tag: { gu: "આજનો પાવન તહેવાર", en: "TODAY'S SACRED FESTIVAL" },
    title: { gu: "શ્રી હનુમાન જયંતી અને ચૈત્રી પૂનમ વ્રત કથા & સિદ્ધ મંત્ર", en: "Shree Hanuman Jayanti & Chaitra Purnima Vrat Katha & Siddha Mantra" },
    subtitle: { gu: "સંકટમોચન મહાબલી હનુમાનજીનો પ્રાગટ્ય મહોત્સવ • ૧૨ એપ્રિલ ૨૦૨૫", en: "Divine Appearance Festival of Sankat Mochan Mahabali Hanumanji • 12 April 2025" },
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAH6KthzQPpodl5Yit_dRegRNXa7wCkgbzDh2MCqcuX4YmwmKig9MHq2jby4vMTgobyTP-Jak-SzD-RmzfTmgvMB5VRWcCjA7lW0XyV1vci0eQCPeA9HSUp1W0vxThG4R9zyTLhNgUADBLHp04TG4Go0rmrd8QpuDVSl-9H5qSPFYF4MgUQ4oOqjtc-eMLm8NMXmT6M_NLsqpMtSjHX2pS-Melj_gZkzHtie1TnKgKbBCHI3rjl9tfJ",
    imageAlt: "Lord Hanuman Divine Shrine during Hanuman Jayanti with Golden Oil Lamps",
    paragraph: {
      gu: "હિન્દુ પંચાંગ અનુસાર ચૈત્ર સુદ પૂર્ણિમાના દિવસે અંજની પુત્ર અને ભગવાન શિવના રુદ્રાવતાર શ્રી હનુમાનજી મહારાજનો જન્મ થયો હતો. આ દિવસે સૂર્યોદય સમયે વિશેષ પૂજન અને સિંદૂર અર્પણ કરવાથી કુંડળીમાં રહેલા શનિ, મંગળ અને રાહુ જેવા પાપગ્રહોની પીડા શાંત થાય છે.",
      en: "According to the Vedic calendar, on the full moon day of Chaitra Shukla Paksha, Lord Hanuman—the son of Mata Anjana and eleven Rudra incarnation of Lord Shiva—made his divine appearance. Worshipping Maruti Nandan with vermilion (sindoor) at dawn alleviates malefic planetary afflictions of Saturn (Shani), Mars (Mangal), and Rahu."
    },
    mantraBox: {
      heading: { gu: "॥ સર્વ મનોકામના પૂર્તિ માટે સિદ્ધ હનુમાન મંત્ર (૧૦૮ જાપ) ॥", en: "॥ Siddha Hanuman Mantra for Fulfillment of Wishes (108 Chants) ॥" },
      mantra: "ૐ હં હનુમતે રુદ્રાત્મકાય હું ફટ્ સ્વાહા",
      timing: { gu: "પૂજા મુહૂર્ત: સવારે ૦૭:૧૫ થી ૧૦:૩૫ વાગ્યા સુધી સર્વોત્તમ", en: "Ideal Puja Muhurat: 07:15 AM to 10:35 AM Morning" }
    },
    readTime: { gu: "વાંચન સમય: ૪ મિનિટ", en: "Read time: 4 mins" },
    viewCount: { gu: "૧૪,૮૨૦ શ્રદ્ધાળુઓએ વાંચ્યું", en: "14,820 Devotees read this" },
    ctaButton: { gu: "સંપૂર્ણ વ્રત વિધિ વાંચો", en: "Read Full Vrat Procedure" }
  },

  // 12 Rashis Daily Horoscope (આજનું રાશિફળ)
  rashifalSection: {
    heading: { gu: "આજનું દૈનિક રાશિફળ (Daily Horoscope)", en: "Today's Daily Horoscope (Rashifal)" },
    subtitle: { gu: "બાર રાશિઓનું સૂર્ય-ચંદ્ર ગોચર મુજબ સંક્ષિપ્ત ફળાદેશ", en: "Brief planetary forecasts for all 12 signs based on Sun-Moon transits" },
    viewAllLink: { gu: "સંપૂર્ણ કુંડળી ફળ", en: "Full Kundali Forecast" },
    signs: [
      { id: "mesh", name: { gu: "મેષ (Aries)", en: "Aries (Mesh)" }, color: { gu: "શુભ: લાલ", en: "Lucky: Red" }, forecast: { gu: "કાર્યક્ષેત્રે નવી જવાબદારી મળશે. આરોગ્ય સુધરશે.", en: "New professional responsibilities arise. Health remains robust." }, luck: "૮૫%", luckPercent: 85 },
      { id: "vrushabh", name: { gu: "વૃષભ (Taurus)", en: "Taurus (Vrishabh)" }, color: { gu: "શુભ: સફેદ", en: "Lucky: White" }, forecast: { gu: "ધનલાભના ઉત્તમ યોગ. પરિવારમાં આનંદ રહેશે.", en: "Favorable financial gains predicted. Harmony in family affairs." }, luck: "૮૦%", luckPercent: 80 },
      { id: "mithun", name: { gu: "મિથુન (Gemini)", en: "Gemini (Mithun)" }, color: { gu: "શુભ: લીલો", en: "Lucky: Green" }, forecast: { gu: "વાણી પર સંયમ રાખવો. યાત્રા લાભદાયી રહેશે.", en: "Maintain composure in speech. Business travels prove fruitful." }, luck: "૭૦%", luckPercent: 70 },
      { id: "kark", name: { gu: "કર્ક (Cancer)", en: "Cancer (Kark)" }, color: { gu: "શુભ: મોતી", en: "Lucky: Pearl" }, forecast: { gu: "માનસિક શાંતિ જળવાશે. આધ્યાત્મિક રૂચિ વધશે.", en: "Inner peace prevails. Heightened interest in spiritual pursuits." }, luck: "૭૫%", luckPercent: 75 },
      { id: "sinh", name: { gu: "સિંહ (Leo)", en: "Leo (Sinh)" }, color: { gu: "શુભ: કેસરી", en: "Lucky: Saffron" }, forecast: { gu: "માન-પ્રતિષ્ઠામાં વૃદ્ધિ. સરકારી કાર્યો સફળ થશે.", en: "Surge in social reputation. Government approvals succeed." }, luck: "૯૦%", luckPercent: 90 },
      { id: "kanya", name: { gu: "કન્યા (Virgo)", en: "Virgo (Kanya)" }, color: { gu: "શુભ: નીલો", en: "Lucky: Emerald" }, forecast: { gu: "ખર્ચ પર નિયંત્રણ રાખવું. મિત્રોનો સહકાર મળશે.", en: "Exercise budgetary discipline. Loyal friends offer valuable help." }, luck: "૬૫%", luckPercent: 65 },
      { id: "tula", name: { gu: "તુલા (Libra)", en: "Libra (Tula)" }, color: { gu: "શુભ: ગુલાબી", en: "Lucky: Pink" }, forecast: { gu: "ચંદ્ર ભ્રમણ શુભ ફળ આપશે. વેપારમાં પ્રગતિ થશે.", en: "Moon transit brings auspicious opportunities. Business advances." }, luck: "૮૫%", luckPercent: 85 },
      { id: "vrushchik", name: { gu: "વૃશ્ચિક (Scorpio)", en: "Scorpio (Vrishchik)" }, color: { gu: "શુભ: કથ્થઈ", en: "Lucky: Brown" }, forecast: { gu: "હનુમાનજીની કૃપાથી અટકેલા કામ પાર પડશે.", en: "Lord Hanuman's blessings resolve long-delayed projects smoothly." }, luck: "૯૨%", luckPercent: 92 },
      { id: "dhanu", name: { gu: "ધન (Sagittarius)", en: "Sagittarius (Dhanu)" }, color: { gu: "શુભ: પીળો", en: "Lucky: Yellow" }, forecast: { gu: "ગુરુ કૃપાથી જ્ઞાન અને વિદ્યાર્થીઓને સફળતા.", en: "Jupiter brings wisdom. Academic excellence for students." }, luck: "૮૦%", luckPercent: 80 },
      { id: "makar", name: { gu: "મકર (Capricorn)", en: "Capricorn (Makar)" }, color: { gu: "શુભ: વાદળી", en: "Lucky: Blue" }, forecast: { gu: "શનિદેવની આરાધના કરવી. કાર્યમાં ધીરજ રાખવી.", en: "Pray to Lord Shani. Practice patience in executive tasks." }, luck: "૭૦%", luckPercent: 70 },
      { id: "kumbh", name: { gu: "કુંભ (Aquarius)", en: "Aquarius (Kumbh)" }, color: { gu: "શુભ: જાંબલી", en: "Lucky: Violet" }, forecast: { gu: "આર્થિક આયોજન મજબૂત બનશે. સંતોષ મળશે.", en: "Financial planning solidifies. Contentment in personal life." }, luck: "૭૮%", luckPercent: 78 },
      { id: "meen", name: { gu: "મીન (Pisces)", en: "Pisces (Meen)" }, color: { gu: "શુભ: સોનેરી", en: "Lucky: Golden" }, forecast: { gu: "ધાર્મિક ઉત્સવમાં ભાગ લેશો. શુભ સમાચાર મળશે.", en: "Active participation in holy events. Welcome good news arrives." }, luck: "૮૮%", luckPercent: 88 }
    ]
  },

  // Sidebar Widgets (5 Dedicated Widgets)
  sidebar: {
    // 1. Live Choghadiya Circular Dial Clock Widget
    dialWidget: {
      title: { gu: "લાઈવ ચોઘડિયું ઘડિયાળ", en: "Live Choghadiya Dial" },
      activeTag: { gu: "સક્રિય", en: "Active" },
      currentName: { gu: "લાભ", en: "Laabh" },
      timeRange: { gu: "૧૫:૪૫ - ૧૭:૨૦", en: "03:45 PM - 05:20 PM" },
      nextLabel: { gu: "આગામી ચોઘડિયું:", en: "Next Interval:" },
      nextValue: { gu: "અમૃત (૧૭:૨૦ PM)", en: "Amrit (05:20 PM)" },
      note: {
        gu: "લાભ ચોઘડિયામાં શરૂ થયેલ વ્યવસાય ઉત્તરોત્તર વૃદ્ધિ પામે છે.",
        en: "Enterprises initiated during Laabh Choghadiya enjoy continuous growth and stability."
      }
    },

    // 2. Scholar Astrological Consultation
    scholarConsultation: {
      tag: { gu: "વેદ સંમત જ્યોતિષાચાર્ય", en: "VEDIC JYOTISHACHARYA" },
      name: { gu: "ડૉ. વિશાલ મોદી", en: "Dr. Vishal Modi" },
      credentials: { gu: "Ph.D. જ્યોતિષશાસ્ત્ર (ગોલ્ડ મેડાલિસ્ટ)", en: "Ph.D. in Jyotish (Gold Medalist)" },
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDAfja6Z1u7igwUEOt7Sfg1f246A9fTvl8uoFL8qpx-oTQaKFGyNNqXvyap-J3Mghp22jn47flSPHixj3px1lIA0oobQhsK6pXrrknm7ULJrQkwZkts7ihh3ROvStkAWYNeQ36SIg23ixGrNkXbSfpdrpx1kaJ90q7SJFLeIez27kfr6h0IUTnssQy6pW5Gi28BJ842sjYg-3RcA58t--aNVfactTkS4mSBYejFRmLpww7Aa9xbKuw0",
      description: {
        gu: "જન્મકુંડળી વિશ્લેષણ, વિવાહ મુહૂર્ત, વાસ્તુશાસ્ત્ર તેમજ કારકિર્દી સંબંધી સચોટ માર્ગદર્શન મેળવો. ૧૦૦% ગોપનીય પરામર્શ.",
        en: "Personalized Kundali reading, Vivah Muhurat, Vastu Shastra, and career guidance. 100% confidential."
      },
      btnWhatsapp: { gu: "વોટ્સએપ પર મુહૂર્ત પૂછો", en: "Ask Muhurat on WhatsApp" },
      btnCall: { gu: "સીધો ફોન કોલ પરામર્શ", en: "Call Dr. Modi Directly" },
      phone: "+919825000000"
    },

    // 3. Upcoming Hindu Festivals & Vrat List
    upcomingFestivals: {
      heading: { gu: "આગામી પર્વ અને તહેવારો", en: "Upcoming Vrats & Festivals" },
      viewAllText: { gu: "બધા જુઓ", en: "View All" },
      items: [
        {
          month: { gu: "એપ્રિ", en: "Apr" },
          day: "૧૪",
          title: { gu: "મેષ સંક્રાંતિ & સોલર ન્યૂ યર", en: "Mesha Sankranti & Solar New Year" },
          desc: { gu: "સૂર્યનું મેષ રાશિમાં પ્રવેશ", en: "Sun enters exalted Aries sign" }
        },
        {
          month: { gu: "એપ્રિ", en: "Apr" },
          day: "૧૬",
          title: { gu: "વિકટ સંકષ્ટ ચતુર્થી", en: "Vikata Sankashti Chaturthi" },
          desc: { gu: "ગણેશજી વ્રત & ચંદ્રોદય ૦૯:૪૫ PM", en: "Ganesh Puja & Moonrise 09:45 PM" }
        },
        {
          month: { gu: "એપ્રિ", en: "Apr" },
          day: "૨૪",
          title: { gu: "વરુથિની એકાદશી", en: "Varuthini Ekadashi" },
          desc: { gu: "ચૈત્ર વદ અગિયારસ વ્રત", en: "Sacred Vishnu fasting on Chaitra Vad" }
        },
        {
          month: { gu: "મે", en: "May" },
          day: "૦૨",
          title: { gu: "અક્ષય તૃતીયા (અખાત્રીજ)", en: "Akshaya Tritiya (Akha Teej)" },
          desc: { gu: "અણબૂઝ મુહૂર્ત, સુવર્ણ ખરીદી", en: "Universal Abujha Muhurat for Gold" },
          isGold: true
        }
      ]
    },

    // 4. "MYSHOP" Vedic Spiritual Store Widget
    storeWidget: {
      heading: { gu: "વૈદિક સ્ટોર • પવિત્ર સાધના સામગ્રી", en: "Vedic Store • Sacred Puja Items" },
      badge: { gu: "૧૦૦% સિદ્ધ", en: "100% Energized" },
      products: [
        {
          id: "rudraksha-5mukhi",
          name: { gu: "સિદ્ધ નેપાળી પંચમુખી રુદ્રાક્ષ", en: "Energized 5 Mukhi Nepali Rudraksha" },
          price: "₹ ૮૫૦",
          originalPrice: "₹ ૧,૨૦૦",
          tag: { gu: "પ્રાણ પ્રતિષ્ઠિત", en: "Pran Pratishthit" },
          image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4R6Mf5qGLPGsG9aGLa0EsrqNpRvKrKF4oOoEM74vIvH9rVMrXh1_T8gtR8og1wk5MZeJE-XQBxlB8D5gkoN5AFGYaNgHFayPKmKlcz3ghKwVKgzSXxB8_hC6TbEQB1gCYHsIZsrg2WH43_E_4ujnhktEOSf5yrdEn3wzHXbbsbef4VbvQeRqbM86iHsaaGIOvGoA_UR3bDpgDGcJlme6324W_RJp167MsayvpCpGcMTJ5-OIXSprY"
        },
        {
          id: "ashtadhatu-sriyantra",
          name: { gu: "અષ્ટધાતુ સિદ્ધ શ્રી યંત્ર (૩x૩ ઇંચ)", en: "Ashtadhatu Shri Yantra (3x3 Inch)" },
          price: "₹ ૧,૪૯૯",
          originalPrice: "₹ ૨,૧૦૦",
          tag: { gu: "ધન લક્ષ્મી પ્રાપ્તિ", en: "Wealth & Prosperity" },
          image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC8UZeJtNpDuKEEDJj3q3meDf6G5ZH6eNwZIVxGVLh2eKRpOIb8Wzf3tGIP15vnn9NMgRZ8kgOZ4taWFfpxIJqFnzhiDf9X0eHWrPRqstGbCbduSenp5e07jzqrM00VbcthSbSk7USUtHn2ford90oy3B8NCNqTNTwPxKjavyMfCkor73p17dbMnQzUKpiKcfMpRXKf0FLsrOLsqney4KXfpgdLUMIm2m13ckjrkzJ3mmcSalJF70oh"
        }
      ]
    },

    // 5. WhatsApp Daily Panchang Subscription Box
    whatsappSubscription: {
      title: { gu: "રોજ સવારે વોટ્સએપ પર પંચાંગ મેળવો", en: "Get Daily Panchang on WhatsApp" },
      subtitle: {
        gu: "દરરોજ સવારે ૦૬:૦૦ વાગ્યે આજનું ચોઘડિયું, રાશિફળ અને તિથિ આપના મોબાઈલમાં સીધું પ્રાપ્ત કરો. (મફત સેવા)",
        en: "Receive daily Choghadiya, Horoscope, and Tithi on your phone at 06:00 AM every morning. (Free service)"
      },
      placeholder: { gu: "આપનો વોટ્સએપ નંબર (દા.ત. 98765xxxxx)", en: "Your WhatsApp number (e.g. 98765xxxxx)" },
      buttonText: { gu: "જોડાઓ", en: "Subscribe" },
      freeNote: { gu: "કોઈ પણ જાહેરાત વિના સંપૂર્ણ પવિત્ર સંદેશા", en: "100% spam-free pure spiritual alerts" }
    }
  }
}
