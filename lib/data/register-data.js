/**
 * Dedicated Vedic Portal Registration & Sign-Up Data
 * Full Bilingual Support: Gujarati ('gu') & English ('en')
 */

export const REGISTER_DATA = {
  breadcrumb: {
    home: { gu: "હોમ", en: "Home" },
    login: { gu: "લૉગિન", en: "Login" },
    register: { gu: "નવું એકાઉન્ટ બનાવો", en: "Create Account" },
  },
  leftColumn: {
    pillTag: {
      gu: "આધ્યાત્મિક સભ્યપદ લાભો",
      en: "Membership Perks",
    },
    title: {
      gu: "ધ એસ્ટ્રો કોડ પરિવારમાં આપનું હાર્દિક સ્વાગત છે",
      en: "Welcome to The Astro Code Family",
    },
    subtitle: {
      gu: "એકાઉન્ટ બનાવીને તમારી પવિત્ર આધ્યાત્મિક અને જ્યોતિષીય યાત્રા શરૂ કરો.",
      en: "Create an account to begin your sacred astrological and spiritual journey.",
    },
    perks: [
      {
        id: "free-kundali",
        icon: "BookOpen",
        title: {
          gu: "મફત વિગતવાર જન્મકુંડળી પત્રિકા",
          en: "Free Comprehensive Janam Kundali",
        },
        desc: {
          gu: "એકાઉન્ટ બનતા જ તમારી સચોટ લાઈફ ટાઈમ કુંડળી, ગ્રહ સ્થિતિ અને મહાદશા ચાર્ટ પ્રાપ્ત કરો.",
          en: "Instant access to your natal chart, planetary degrees, and Mahadasha timelines.",
        },
      },
      {
        id: "daily-rashifal",
        icon: "Sun",
        title: {
          gu: "વ્યક્તિગત દૈનિક રાશિફળ & ચોઘડિયા",
          en: "Personalized Daily Rashifal & Muhurat",
        },
        desc: {
          gu: "દરરોજ સવારે તમારા વોટ્સએપ અને ઈમેલ પર સચોટ નક્ષત્ર ફળાદેશ તેમજ શુભ મુહૂર્ત નોટિફિકેશન.",
          en: "Morning predictions, lucky nakshatras, and auspicious time slots sent daily.",
        },
      },
      {
        id: "welcome-voucher",
        icon: "Gift",
        title: {
          gu: "MyShop ₹૨૫૦ વેલકમ વાઉચર",
          en: "MyShop ₹250 Welcome Voucher",
        },
        desc: {
          gu: "પ્રથમ ઓર્ડર પર વિશેષ છૂટ (સિદ્ધ રૂદ્રાક્ષ, પંચધાતુ શ્રી યંત્ર અને શુદ્ધ પૂજા સામગ્રી પર).",
          en: "Special discount on consecrated Rudrakshas, Sri Yantras, and energized malas.",
        },
      },
      {
        id: "consultation-discount",
        icon: "Sparkles",
        title: {
          gu: "પ્રથમ પરામર્શ પર ૧૫% વિશેષ છૂટ",
          en: "15% Off 1-on-1 Consultation",
        },
        desc: {
          gu: "ડૉ. વિશાલ મોદી સાથે ઓનલાઇન વિડીયો કુંડળી માર્ગદર્શન પર વિશેષ સભ્ય ડિસ્કાઉન્ટ.",
          en: "Exclusive discount on personalized video consultation with Dr. Vishal Modi.",
        },
      },
    ],
    trustBadge: {
      rating: "૫.૦ ★",
      ratingEn: "5.0 ★",
      text: {
        gu: "૫૦,૦૦૦+ સંતુષ્ટ સાધકોનો પંચતારાંકિત વિશ્વાસ",
        en: "5-Star Experience Trusted by 50,000+ Devotees",
      },
    },
  },
  rightColumn: {
    divineGreeting: {
      gu: "॥ શ્રી ગણેશાય નમઃ ॥ — નવું એકાઉન્ટ નોંધણી",
      en: "॥ Shri Ganeshay Namah ॥ — New Registration",
    },
    muhuratBadge: {
      gu: "શુભ મુહૂર્ત નોંધણી ઉપલબ્ધ",
      en: "Auspicious Muhurat Active",
    },
    heading: {
      gu: "તમારું વૈદિક એકાઉન્ટ બનાવો",
      en: "Create Your Vedic Account",
    },
    subheading: {
      gu: "માત્ર ૨ મિનિટમાં તમારી જન્મ વિગતો દાખલ કરી દિવ્ય સમુદાય સાથે જોડાવો.",
      en: "Enter your birth details in just 2 minutes to join our sacred Vedic community.",
    },
    googleAuth: {
      gu: "Google એકાઉન્ટ દ્વારા ઝડપી નોંધણી",
      en: "Sign up with Google Account",
    },
    dividerText: {
      gu: "અથવા વિગતો ભરીને નોંધણી કરો",
      en: "Or register with personal details",
    },
    fields: {
      fullName: {
        label: { gu: "પૂરું નામ (Full Name)", en: "Full Name" },
        placeholder: { gu: "દા.ત. રોહિતભાઈ પારેખ", en: "e.g. Rohit Parekh" },
        required: true,
      },
      mobileNumber: {
        label: { gu: "મોબાઇલ નંબર (Mobile No.)", en: "Mobile Number" },
        placeholder: { gu: "૯૮૭૬૫ ૪૩૨૧૦", en: "98765 43210" },
        required: true,
      },
      emailAddress: {
        label: { gu: "ઈમેલ એડ્રેસ (Email Address)", en: "Email Address" },
        placeholder: { gu: "દા.ત. rohit@example.com", en: "e.g. rohit@example.com" },
        required: true,
      },
      dob: {
        label: { gu: "જન્મ તારીખ (DOB)", en: "Date of Birth" },
        hint: { gu: "કુંડળી માટે મહત્વપૂર્ણ", en: "Important for Kundali" },
        required: true,
      },
      birthTime: {
        label: { gu: "જન્મ સમય (Birth Time)", en: "Birth Time" },
        hint: { gu: "ભલામણપાત્ર (વૈકલ્પિક)", en: "Recommended (Optional)" },
        required: false,
      },
      birthPlace: {
        label: { gu: "જન્મ સ્થળ / શહેર (Birth Place / City)", en: "Birth Place / City" },
        placeholder: { gu: "દા.ત. અમદાવાદ, ગુજરાત અથવા મુંબઈ", en: "e.g. Ahmedabad, Gujarat or Mumbai" },
        required: true,
      },
      password: {
        label: { gu: "પાસવર્ડ બનાવો (Create Password)", en: "Create Password" },
        placeholder: { gu: "ઓછામાં ઓછા ૮ અક્ષર", en: "At least 8 characters" },
        required: true,
      },
      confirmPassword: {
        label: { gu: "પાસવર્ડ ફરીથી દાખલ કરો (Confirm)", en: "Confirm Password" },
        placeholder: { gu: "સમાન પાસવર્ડ લખો", en: "Re-enter the same password" },
        required: true,
      },
    },
    consents: {
      terms: {
        gu: "હું The Astro Code ના નિયમો અને શરતો (Terms of Service) તેમજ ગોપનીયતા નીતિ (Privacy Policy) સ્વીકારું છું.",
        en: "I agree to The Astro Code Terms of Service and Privacy Policy.",
      },
      updates: {
        gu: "મને વોટ્સએપ અને ઈમેલ પર દૈનિક પંચાંગ, શુભ ચોઘડિયા અને રાશિફળના મફત અપડેટ્સ મોકલો.",
        en: "Send me free daily Panchang, auspicious Choghadiya, and Rashifal updates via WhatsApp and Email.",
      },
    },
    submitButton: {
      gu: "નવું એકાઉન્ટ સુરક્ષિત રીતે બનાવો (Create Free Account)",
      en: "Create Free Account Securely",
    },
    alreadyHaveAccount: {
      title: {
        gu: "પહેલેથી જ એકાઉન્ટ ધરાવો છો?",
        en: "Already have an account?",
      },
      desc: {
        gu: "તમારી કુંડળી અને પ્રોફાઇલ ખોલવા માટે સાઇન ઇન કરો.",
        en: "Sign in to access your saved Kundali, orders, and devotee profile.",
      },
      cta: {
        gu: "અહીં લૉગિન કરો (Sign In)",
        en: "Sign In Here",
      },
    },
  },
  trustPillars: [
    {
      id: "privacy",
      icon: "ShieldCheck",
      title: {
        gu: "૧૦૦% ડેટા સુરક્ષા અને ગોપનીયતા",
        en: "100% Data Security & Privacy",
      },
      desc: {
        gu: "તમારી જન્મકુંડળી, જન્મ સમય અને તમામ અંગત વિગતો સંપૂર્ણ એન્ક્રિપ્ટેડ અને ગુપ્ત રહે છે.",
        en: "Your birth date, time, and personal Kundali charts are strictly private and encrypted.",
      },
    },
    {
      id: "accuracy",
      icon: "Compass",
      title: {
        gu: "સૂર્ય સિદ્ધાંત આધારિત ગણતરી",
        en: "Classical Surya Siddhanta Precision",
      },
      desc: {
        gu: "પ્રાચીન વૈદિક ખગોળશાસ્ત્ર અને અત્યાધુનિક ગ્રહ ગણિત દ્વારા તૈયાર થતી સચોટ કુંડળી વિશ્લેષણ.",
        en: "Precision planetary computations powered by classical Surya Siddhanta and Swiss Ephemeris.",
      },
    },
    {
      id: "support",
      icon: "PhoneCall",
      title: {
        gu: "૨૪×૭ સહાયતા હેલ્પલાઇન",
        en: "Dedicated Devotee Support",
      },
      desc: {
        gu: "કોઈપણ સહાય માટે +૯૧ ૭૯ ૪૦૦૦ ૮૧૦૮ પર સોમ-શનિ સવારે ૯ થી સાંજે ૭ સંપર્ક કરી શકો છો.",
        en: "Facing registration issues? Call +91 79 4000 8108 (Mon-Sat, 9:00 AM - 7:00 PM IST).",
      },
    },
  ],
  sacredNote: {
    mantra: "॥ સર્વે ભવન્તુ સુખિનઃ સર્વે સન્તુ નિરામયાઃ ॥",
    text: {
      gu: "શુભ મુહૂર્તમાં નોંધણી કરવાનો સંકલ્પ • આધ્યાત્મિક જ્ઞાન, પવિત્રતા અને શાશ્વત શાંતિ માટે સમર્પિત",
      en: "Sacred vow of registration in auspicious Muhurat • Dedicated to spiritual wisdom and eternal peace.",
    },
  },
}
