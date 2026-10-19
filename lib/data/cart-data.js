/**
 * The Astro Code - Vedic Spiritual Store Cart Architecture (cart-data.js)
 * 
 * Provides complete bilingual localization (Gujarati 'gu' and English 'en')
 * for the View Cart page, default sacred cart items, gifts, coupons, and trust pillars.
 */

export const DEFAULT_CART_ITEMS = [
  {
    id: "cart-item-1",
    productId: "nepali-5-mukhi-mala",
    name: {
      gu: "સિદ્ધ નેપાળી ૫-મુખી રુદ્રાક્ષ માળા (૧૦૮ દાણા)",
      en: "Consecrated Nepali 5-Mukhi Rudraksha Mala (108 Beads)"
    },
    subtitle: {
      gu: "મૂળ નેપાળી ઉત્પત્તિ, પ્રયોગશાળા પ્રમાણપત્ર સાથે (Govt. Certified X-Ray)",
      en: "Authentic Nepali Origin, Govt. Certified Lab Report & X-Ray Tested"
    },
    badge: {
      gu: "લેબ ટેસ્ટેડ",
      en: "Lab Tested"
    },
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLsHhA-R3azYygUEDRh4K4chwss5dXQ_2W1jEYT0qibwk2G2D1QCYFIgHTMi_k1gkkF4xJlKOjxMat0xIJ1yjJaW2COM0bGU4T2VGK7WxSV2fIw5-8Xi8LYYZMxHK7nzu9DP8Oef7GKTb4W5LyssVNbrsg4ybCOlYhlSdes8_8rVHLJk9UlXEaxF1EB0oGakZhu_69dud4GBJHA2x1B-aFLi3SvdzYxwg0a7j4aieLJ_BPREX0n_s3",
    price: 1450,
    originalPrice: 2200,
    discountPercent: 34,
    qty: 1,
    category: "malas",
    ritualAddon: {
      gu: "સંકલ્પ સેવા: રોહિતભાઈ પારેખ ના નામ અને કશ્યપ ગોત્રથી પ્રાણ-પ્રતિષ્ઠા સામેલ",
      en: "Sankalp Service: Consecrated in Rohitbhai Parekh's name & Kashyap Gotra"
    },
    ritualAddonCost: 0
  },
  {
    id: "cart-item-2",
    productId: "shree-mahalakshmi-yantra",
    name: {
      gu: "પ્રાણ પ્રતિષ્ઠિત શ્રી મહાલક્ષ્મી યંત્ર (અષ્ટધાતુ ગોલ્ડ પ્લેટેડ, ૩x૩ ઇંચ)",
      en: "Consecrated Shree Mahalakshmi Yantra (Ashtadhatu Gold Plated, 3x3 inch)"
    },
    subtitle: {
      gu: "ઘર, ઓફિસ & તિજોરી સ્થાપના માટે વિશેષ કુમકુમ અર્ચિત",
      en: "Specially Consecrated with Kumkum Archana for Home, Office & Locker"
    },
    badge: {
      gu: "અષ્ટધાતુ",
      en: "Ashtadhatu"
    },
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDwlKzuBoe6AuPlKAV2AnNg7vMAnevxmZn1NJlIwKKaQ0i0qzchLHvNNXIF6uPx-x-PBgEv2ALKtzRz60X2sYwfpnYXJvIU85YrmEYJ9to-cjtvWfPQ3thKe-2GtBKg1rXG3Uas4a3ABTPJE096yDgnZA19UBL5c2e-g5sLVEtIJVrsnQCe07FBL9ko0YQNBct1YIUzXUbr2sdpx32E6R30rFR1W7cvGAAptjrx7ZY4OEWGdEdQMeN6",
    price: 999,
    originalPrice: 1600,
    discountPercent: 38,
    qty: 1,
    category: "yantras",
    ritualAddon: {
      gu: "વિશેષ દીવાળી/ધનતેરસ પૂજન વિધિ અને કનકધારા સ્તોત્ર પુસ્તિકા શામેલ",
      en: "Special Diwali/Dhanteras Puja Ritual Booklet & Kanakadhara Stotra Included"
    },
    ritualAddonCost: 0
  },
  {
    id: "cart-item-3",
    productId: "sphatik-shree-yantra-pyramid",
    name: {
      gu: "શુદ્ધ સ્ફટિક શ્રી યંત્ર પિરામિડ (ઓરિજિનલ હિમાલયન સ્ફટિક)",
      en: "Pure Sphatik Shree Yantra Pyramid (Original Himalayan Quartz)"
    },
    subtitle: {
      gu: "૧૫૦ ગ્રામ, સંપૂર્ણ વાસ્તુ દોષ નિવારણ તથા શાંતિ ઊર્જા પ્રવાહ હેતુ",
      en: "150g Natural Crystal, Complete Vastu Dosha Shanti & Positive Energy Flow"
    },
    badge: {
      gu: "શુદ્ધ સ્ફટિક",
      en: "Pure Quartz"
    },
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBC4jMGaWHg8vRFea1rLw5LOUhNsLWUMWiLh9-XWBPp0ogDHA4zSTf_hG9Fm3fetk16y9j8ahTTfwqvAAhe2svRCz-W3FLPC0dgvY4jgc0Dqt30sIM2dZrxY9LiKYxbgw5eIEv0GITRgmOeXqpD1hcF_qqgjx2bXiKTqVJBWfIpwYqC-L2Q9RVgduOJNkoF5bMyE_B7At_bgZrHZslgyLAw-jDVuPOr-sCYgcWnAeh8gjt_rVAiWD0U",
    price: 1100,
    originalPrice: 1750,
    discountPercent: 37,
    qty: 1,
    category: "sphatik",
    ritualAddon: {
      gu: "મંત્ર અભિમંત્રિત સુરક્ષા કવચ અને સ્ફટિક શુદ્ધિકરણ વિધિ પુસ્તક",
      en: "Mantra Energized Raksha Kavach & Crystal Cleansing Ritual Guide"
    },
    ritualAddonCost: 0
  }
]

export const VALID_COUPONS = {
  VEDIC10: {
    code: "VEDIC10",
    discountPercent: 10,
    description: {
      gu: "૧૦% શુભ મુહૂર્ત વિશેષ છૂટ",
      en: "10% Auspicious Muhurat Discount"
    }
  },
  SHREE15: {
    code: "SHREE15",
    discountPercent: 15,
    description: {
      gu: "૧૫% દિવ્ય આશીર્વાદ વિશેષ છૂટ",
      en: "15% Divine Blessing Special Discount"
    }
  },
  DIWALI20: {
    code: "DIWALI20",
    discountPercent: 20,
    description: {
      gu: "૨૦% મહા પર્વ વિશેષ છૂટ",
      en: "20% Maha Festival Special Discount"
    }
  }
}

export const CART_DATA_GU = {
  meta: {
    title: "મારો પવિત્ર કાર્ટ | MyShop | The Astro Code",
    description: "તમારા વૈદિક આધ્યાત્મિક ઓર્ડરની સમીક્ષા કરો. ૧૦૦% પ્રમાણિત રૂદ્રાક્ષ, શ્રી યંત્ર, સ્ફટિક અને રત્નો મફત શિપિંગ અને સંકલ્પ સેવા સાથે."
  },
  breadcrumb: {
    home: "હોમ",
    shop: "વૈદિક શોપ",
    cart: "મારો કાર્ટ"
  },
  stepper: [
    {
      step: 1,
      num: "૧",
      title: "કાર્ટ સમીક્ષા",
      subtitle: "સાધના સામગ્રી",
      icon: "ShoppingCart",
      status: "active"
    },
    {
      step: 2,
      num: "૨",
      title: "શિપિંગ & સંકલ્પ",
      subtitle: "સરનામું અને પૂજા વિગત",
      icon: "ShieldCheck",
      status: "upcoming"
    },
    {
      step: 3,
      num: "૩",
      title: "સુરક્ષિત ચુકવણી",
      subtitle: "ઓર્ડર અને પેમેન્ટ",
      icon: "Lock",
      status: "upcoming"
    }
  ],
  cartHeader: {
    title: "તમારો પવિત્ર કાર્ટ",
    itemsCountSuffix: "સાધના સામગ્રી",
    consecratedBadge: "વૈદિક પ્રાણ-પ્રતિષ્ઠિત",
    freeShippingActive: "અભિનંદન! નિઃશુલ્ક ડિલિવરી સક્રિય છે",
    gangaJalThresholdPrefix: "વધુ ₹",
    gangaJalThresholdSuffix: " ની ખરીદી પર ગંગાજળ ભેટ!",
    gangaJalUnlocked: "અભિનંદન! હરિદ્વાર શુદ્ધ ગંગાજળ અને અયોધ્યા ચંદન પ્રસાદ મફત અનલૉક થયો!",
    thresholdGoalNote: (subtotal, diff) =>
      diff > 0
        ? `તમે ₹${subtotal.toLocaleString("gu-IN")} નો ઓર્ડર બનાવ્યો છે. ₹૪,૦૦૦ ના ઓર્ડર પર મળશે હરિદ્વાર શુદ્ધ ગંગાજળ અને અયોધ્યા ચંદન પ્રસાદ મફત.`
        : `તમારો ઓર્ડર ₹${subtotal.toLocaleString("gu-IN")} નો થયો છે! આપને હરિદ્વાર શુદ્ધ ગંગાજળ અને અયોધ્યા ચંદન પ્રસાદ મફત મળશે.`
  },
  itemCard: {
    freeTag: "મફત",
    saveForLater: "પછીથી ખરીદો",
    savedForLaterSuccess: "વસ્તુ પછીથી ખરીદવા માટે સાચવવામાં આવી.",
    deleteTitle: "કાર્ટમાંથી દૂર કરો",
    deleteConfirm: "શું આપ ખરેખર આ વસ્તુ કાર્ટમાંથી દૂર કરવા માંગો છો?",
    discountSuffix: "છૂટ",
    qtyAriaMinus: "ઓછું કરો",
    qtyAriaPlus: "વધારો કરો"
  },
  freeGiftsSection: {
    title: "આ ઓર્ડર સાથે આપને મળતી પવિત્ર મફત ભેટો",
    subtitle: "દરેક પવિત્ર સાધના ઓર્ડર સાથે ધ એસ્ટ્રો કોડ પરિવાર તરફથી ભેટસ્વરૂપ",
    freeBadge: "મફત સામેલ",
    gifts: [
      {
        id: "gangajal",
        name: "શ્રી ગંગોત્રી ગંગાજળ",
        description: "૧૦૦ml શુદ્ધ કાચની શીશી (મૂલ્ય ₹૧૫૦)",
        icon: "Droplets"
      },
      {
        id: "chandan",
        name: "અયોધ્યા ચંદન & અક્ષત પ્રસાદ",
        description: "રામ દરબાર પૂજિત ચંદન તિલક પ્રસાદ",
        icon: "Sparkles"
      }
    ]
  },
  cartActions: {
    continueShopping: "શોપિંગ ચાલુ રાખો",
    clearCart: "કાર્ટ ખાલી કરો",
    clearCartConfirm: "શું આપ ખરેખર આપનો સમગ્ર કાર્ટ ખાલી કરવા માંગો છો?",
    emptyCartTitle: "આપનો કાર્ટ ખાલી છે",
    emptyCartSubtitle: "આપના પવિત્ર જીવનમાં સકારાત્મક ઊર્જા અને સમૃદ્ધિ માટે વૈદિક સ્ટોરમાંથી સિદ્ધ સામગ્રી પસંદ કરો.",
    exploreStore: "વૈદિક શોપમાં સામગ્રી જુઓ",
    browseBestSellers: "ટોચની સિદ્ધ સામગ્રી જુઓ"
  },
  sankalpBox: {
    title: "વૈદિક પૂજા સંકલ્પ પત્રિકા",
    checkboxLabel: "મારા નામ અને ગોત્ર સાથે પૂજા સંકલ્પ પત્રિકા મોકલો",
    checkboxDesc: "અમારા વિદ્વાન આચાર્યશ્રી દ્વારા વિશેષ અભિમંત્રિત કરવામાં આવશે. (મફત સુવિધા)",
    sampleNotice: "આ માત્ર નમૂના (ઉદાહરણ) વિગત છે. આપના વાસ્તવિક નામ-ગોત્રથી પૂજા સંપન્ન કરવા માટે 'બદલો' પર ક્લિક કરો.",
    sampleBadge: "નમૂના વિગત",
    sampleTag: "નમૂનો",
    customizedBadge: "વ્યક્તિગત વિગત સંપન્ન",
    customizedNotice: "આપના વ્યક્તિગત નામ અને ગોત્રથી પવિત્ર પ્રાણ-પ્રતિષ્ઠા વિધિ સંપન્ન થશે.",
    yajmanLabel: "યજમાનનું નામ",
    defaultYajman: "રોહિતભાઈ પારેખ",
    gotraLabel: "ગોત્ર",
    defaultGotra: "કશ્યપ ગોત્ર",
    editBtn: "બદલો",
    saveBtn: "સાચવો",
    editPrompt: "આપનું સાચું નામ અને ગોત્ર ઉમેરો"
  },
  orderSummary: {
    title: "ઓર્ડર સારાંશ",
    subtotalLabel: "સામગ્રી મૂળ રકમ",
    discountLabel: "શુભ મુહૂર્ત વિશેષ છૂટ",
    consecrationLabel: "પ્રાણ-પ્રતિષ્ઠા & બ્રાહ્મણ પૂજન",
    consecrationOriginalCost: "₹૫૦૧",
    freeTag: "મફત",
    shippingLabel: "શિપિંગ & સુરક્ષિત પેકિંગ",
    freeShipping: "મફત",
    couponPlaceholder: "કૂપન કોડ નાખો (દા.ત. VEDIC10)",
    applyCoupon: "લાગુ કરો",
    couponAppliedPrefix: "કોડ",
    couponAppliedSuffix: "લાગુ થયો",
    invalidCoupon: "અમાન્ય કૂપન કોડ. કૃપા કરીને VEDIC10, SHREE15 અથવા DIWALI20 અજમાવો.",
    totalPayable: "કુલ ચુકવવાપાત્ર રકમ",
    savingsCallout: (savings) => `આ ઓર્ડર પર આપની કુલ બચત: ₹${savings.toLocaleString("gu-IN")} + મફત ડિલિવરી`,
    checkoutButton: "સુરક્ષિત ચેકઆઉટ આગળ વધો",
    whatsappButton: "WhatsApp દ્વારા ઝડપી ઓર્ડર",
    whatsappSubtext: "⚡ વેબસાઇટ ફોર્મ ભર્યા વિના — અમારા આચાર્ય સહાયક WhatsApp પર આપનું સરનામું અને ઓર્ડર કન્ફર્મ કરશે.",
    couponRemove: "દૂર કરો",
    couponAppliedLabel: "કૂપન સફળતાપૂર્વક લાગુ થઈ",
    securityGuarantee: "Razorpay દ્વારા ૨૫૬-બીટ SSL સુરક્ષિત • તમામ UPI, કાર્ડ્સ & નેટબેન્કિંગ માન્ય"
  },
  astrologyHelp: {
    title: "કુંડળી અનુસાર યોગ્ય રત્ન/રુદ્રાક્ષ છે?",
    desc: "જો આપને યોગ્ય મુખ કે યંત્ર બાબતે શંકા હોય તો અમારા જ્યોતિષી સાથે વિનામૂલ્યે વાત કરો.",
    cta: "જ્યોતિષ સલાહ મેળવો (+91 79 4000 8108)",
    phone: "+917940008108"
  },
  trustPillars: {
    badge: "॥ ધ એસ્ટ્રો કોડ પવિત્રતા સંકલ્પ ॥",
    title: "શા માટે હજારો ભક્તો અમારા પર વિશ્વાસ કરે છે?",
    pillars: [
      {
        icon: "ShieldCheck",
        title: "૧૦૦% લેબ-પ્રમાણિત સામગ્રી",
        desc: "દરેક રુદ્રાક્ષ અને રત્ન સરકાર માન્ય જેમોલોજિકલ લેબ રિપોર્ટ તથા X-Ray સ્કેન સાથે મોકલવામાં આવે છે."
      },
      {
        icon: "Sparkles",
        title: "વૈદિક પ્રાણ-પ્રતિષ્ઠા વિધિ",
        desc: "કાશી અને સિદ્ધપુરના પ્રખર બ્રાહ્મણો દ્વારા તમારા નામ-ગોત્ર સાથે અભિમંત્રિત કર્યા બાદ જ ડિસ્પેચ થાય છે."
      },
      {
        icon: "RotateCcw",
        title: "૭ દિવસ સરળ રિટર્ન નીતિ",
        desc: "સામગ્રી પસંદ ન પડે તો ૭ દિવસમાં સંપૂર્ણ વળતર (100% Refund Guarantee) કોઈ પણ પ્રશ્ન પૂછ્યા વગર."
      },
      {
        icon: "Lock",
        title: "૨૫૬-બીટ SSL સુરક્ષિત પેમેન્ટ",
        desc: "બેંક-ગ્રેડ એન્ક્રિપ્શન સાથે સંપૂર્ણ સુરક્ષિત ડિજિટલ ટ્રાન્ઝેક્શન. આપની અંગત વિગતો સુરક્ષિત રહે છે."
      }
    ],
    supportStrip: {
      text: "કાર્ટ અથવા ઓર્ડર પૂર્ણ કરવામાં કોઈ સહાય જોઈએ છે?",
      timing: "સવારે ૯:૦૦ થી રાત્રે ૯:૦૦",
      buttonText: "WhatsApp પર સહાય મેળવો: +91 79 4000 8108",
      whatsappUrl: "https://wa.me/917940008108?text=Hello%20The%20Astro%20Code,%20I%20need%20assistance%20with%20my%20sacred%20cart%20order"
    }
  },
  savedForLaterSection: {
    title: "પછીથી ખરીદવા માટે રાખેલ સામગ્રી",
    moveToCart: "કાર્ટમાં પાછું ઉમેરો",
    remove: "દૂર કરો"
  },
  checkoutModal: {
    title: "વૈદિક શિપિંગ & ડિલિવરી સરનામું",
    subtitle: "ઓર્ડર પૂર્ણ કરવા માટે આપનું ડિલિવરી સરનામું દાખલ કરો",
    nameLabel: "પ્રાપ્તકર્તાનું પૂરું નામ",
    namePlaceholder: "દા.ત. રમેશભાઈ પટેલ",
    phoneLabel: "મોબાઈલ નંબર (WhatsApp)",
    phonePlaceholder: "૧૦ અંકનો મોબાઈલ નંબર",
    gotraLabel: "ગોત્ર",
    gotraPlaceholder: "દા.ત. કશ્યપ, વસિષ્ઠ, ભારદ્વાજ",
    addressLabel: "સંપૂર્ણ સરનામું",
    addressPlaceholder: "ઘર નંબર, સોસાયટી, રોડ, વિસ્તાર",
    cityLabel: "શહેર / ગામ",
    cityPlaceholder: "અમદાવાદ",
    stateLabel: "રાજ્ય",
    statePlaceholder: "રાજ્ય પસંદ કરો",
    pincodeLabel: "પીનકોડ (૬ અંક)",
    pincodePlaceholder: "380054",
    paymentMethodLabel: "ચુકવણી પદ્ધતિ",
    paymentCod: "કેશ ઓન ડિલિવરી (COD)",
    paymentOnline: "ઓનલાઇન પેમેન્ટ (UPI / Cards)",
    paymentWhatsapp: "WhatsApp દ્વારા કન્ફર્મ કરો અને પે કરો",
    placeOrderBtn: "ઓર્ડર કન્ફર્મ કરો અને આગળ વધો",
    totalAmountPrefix: "કુલ ચુકવવાપાત્ર રકમ: ₹",
    orderSuccessTitle: "ઓર્ડર સફળતાપૂર્વક સ્વીકારાયો! હર હર મહાદેવ!",
    orderSuccessDesc: "આપનો ઓર્ડર સ્વીકારી લેવામાં આવ્યો છે. અમારા આચાર્યશ્રી દ્વારા આપના નામ અને ગોત્રથી પ્રાણ-પ્રતિષ્ઠા વિધિ સંપન્ન કરી ૨૪ કલાકમાં પાર્સલ મોકલવામાં આવશે.",
    orderIdPrefix: "ઓર્ડર નંબર: TAC-",
    closeBtn: "બંધ કરો",
    viewOrdersBtn: "મારા ઓર્ડર્સ જુઓ"
  }
}

export const CART_DATA_EN = {
  meta: {
    title: "My Sacred Cart | MyShop | The Astro Code",
    description: "Review your Vedic sacred order. 100% certified Rudraksha, Shree Yantras, crystals and gemstones with free delivery and Sankalp consecration."
  },
  breadcrumb: {
    home: "Home",
    shop: "MyShop (Vedic Store)",
    cart: "Shopping Cart"
  },
  stepper: [
    {
      step: 1,
      num: "1",
      title: "Cart Review",
      subtitle: "Review Items",
      icon: "ShoppingCart",
      status: "active"
    },
    {
      step: 2,
      num: "2",
      title: "Shipping & Sankalp",
      subtitle: "Address & Devotee Consecration",
      icon: "ShieldCheck",
      status: "upcoming"
    },
    {
      step: 3,
      num: "3",
      title: "Secure Payment",
      subtitle: "Payment & Confirmation",
      icon: "Lock",
      status: "upcoming"
    }
  ],
  cartHeader: {
    title: "Your Sacred Cart",
    itemsCountSuffix: "Sacred Items",
    consecratedBadge: "Vedic Consecrated",
    freeShippingActive: "Congratulations! Free Delivery is Active",
    gangaJalThresholdPrefix: "Add ₹",
    gangaJalThresholdSuffix: " more for Free Gangajal Gift!",
    gangaJalUnlocked: "Congratulations! Haridwar Pure Gangajal & Ayodhya Prasad Gift Unlocked!",
    thresholdGoalNote: (subtotal, diff) =>
      diff > 0
        ? `You have created an order of ₹${subtotal.toLocaleString("en-IN")}. Orders of ₹4,000+ receive pure Haridwar Gangajal & Ayodhya Chandan Prasad free.`
        : `Your order is ₹${subtotal.toLocaleString("en-IN")}! You have unlocked pure Haridwar Gangajal & Ayodhya Chandan Prasad.`
  },
  itemCard: {
    freeTag: "FREE",
    saveForLater: "Save for Later",
    savedForLaterSuccess: "Item saved for later successfully.",
    deleteTitle: "Remove from Cart",
    deleteConfirm: "Are you sure you want to remove this item from your cart?",
    discountSuffix: "OFF",
    qtyAriaMinus: "Decrease quantity",
    qtyAriaPlus: "Increase quantity"
  },
  freeGiftsSection: {
    title: "Sacred Free Gifts with this Order",
    subtitle: "Complimentary blessings from The Astro Code family with every consecrated order",
    freeBadge: "FREE GIFT",
    gifts: [
      {
        id: "gangajal",
        name: "Shri Gangotri Gangajal",
        description: "100ml Pure Glass Bottle (Value ₹150)",
        icon: "Droplets"
      },
      {
        id: "chandan",
        name: "Ayodhya Chandan & Akshat Prasad",
        description: "Sanctified Ram Darbar Chandan Tilak Prasad",
        icon: "Sparkles"
      }
    ]
  },
  cartActions: {
    continueShopping: "Continue Shopping",
    clearCart: "Clear Cart",
    clearCartConfirm: "Are you sure you want to clear your entire cart?",
    emptyCartTitle: "Your Cart is Empty",
    emptyCartSubtitle: "Select authentic energized Rudraksha, Shree Yantras, or gemstones from our Vedic store to welcome prosperity and positive energy.",
    exploreStore: "Explore Vedic Store",
    browseBestSellers: "Browse Best Sellers"
  },
  sankalpBox: {
    title: "Vedic Puja Sankalp Certificate",
    checkboxLabel: "Send consecrated Sankalp Certificate with my name and gotra",
    checkboxDesc: "Our learned Vedic Acharyas will perform personalized Pran-Pratishtha. (Complimentary)",
    sampleNotice: "This is sample devotee data for demonstration. Click 'Edit' or click the cards below to enter your real name and gotra for consecration.",
    sampleBadge: "Sample Data (Editable)",
    sampleTag: "Sample",
    customizedBadge: "Personalized Devotee Data",
    customizedNotice: "Vedic Pran-Pratishtha ritual will be performed using your personalized devotee details.",
    yajmanLabel: "Devotee Name",
    defaultYajman: "Rohitbhai Parekh",
    gotraLabel: "Gotra",
    defaultGotra: "Kashyap Gotra",
    editBtn: "Edit",
    saveBtn: "Save",
    editPrompt: "Enter Your Devotee Name & Gotra"
  },
  orderSummary: {
    title: "Order Summary",
    subtotalLabel: "Item Total",
    discountLabel: "Muhurat Special Discount",
    consecrationLabel: "Pran-Pratishtha & Brahmin Pujan",
    consecrationOriginalCost: "₹501",
    freeTag: "FREE",
    shippingLabel: "Shipping & Safe Packaging",
    freeShipping: "FREE",
    couponPlaceholder: "Enter coupon code (e.g. VEDIC10)",
    applyCoupon: "Apply",
    couponAppliedPrefix: "Coupon",
    couponAppliedSuffix: "Applied",
    invalidCoupon: "Invalid coupon code. Please try VEDIC10, SHREE15 or DIWALI20.",
    totalPayable: "Total Payable Amount",
    savingsCallout: (savings) => `Your total savings on this order: ₹${savings.toLocaleString("en-IN")} + Free Delivery`,
    checkoutButton: "Proceed to Secure Checkout",
    whatsappButton: "Quick Order via WhatsApp",
    whatsappSubtext: "⚡ Skip website forms — Order items & confirm your delivery address directly with our Vedic team on WhatsApp.",
    couponRemove: "Remove",
    couponAppliedLabel: "Coupon Applied Successfully",
    securityGuarantee: "256-Bit SSL Secured by Razorpay • All UPI, Cards & NetBanking Accepted"
  },
  astrologyHelp: {
    title: "Unsure which gemstone or Rudraksha suits your Kundali?",
    desc: "Consult our Vedic astrologer free of charge if you have questions regarding the right Mukhi or Yantra.",
    cta: "Get Astrological Guidance (+91 79 4000 8108)",
    phone: "+917940008108"
  },
  trustPillars: {
    badge: "॥ The Astro Code Purity Vow ॥",
    title: "Why Thousands of Devotees Trust Us",
    pillars: [
      {
        icon: "ShieldCheck",
        title: "100% Lab Certified Items",
        desc: "Every Rudraksha and gemstone is accompanied by a Govt. recognized Gemological Lab Certificate and X-Ray scan."
      },
      {
        icon: "Sparkles",
        title: "Vedic Pran-Pratishtha Ritual",
        desc: "Consecrated with your name and gotra by learned Brahmins of Kashi and Siddhpur before dispatch."
      },
      {
        icon: "RotateCcw",
        title: "7-Day Easy Return Policy",
        desc: "100% Money-Back Guarantee within 7 days with no questions asked if not satisfied."
      },
      {
        icon: "Lock",
        title: "256-Bit SSL Encrypted Payment",
        desc: "Bank-grade digital encryption for 100% secure checkout. Your personal data is completely protected."
      }
    ],
    supportStrip: {
      text: "Need assistance with your cart or placing an order?",
      timing: "9:00 AM to 9:00 PM",
      buttonText: "Get WhatsApp Support: +91 79 4000 8108",
      whatsappUrl: "https://wa.me/917940008108?text=Hello%20The%20Astro%20Code,%20I%20need%20assistance%20with%20my%20sacred%20cart%20order"
    }
  },
  savedForLaterSection: {
    title: "Saved for Later",
    moveToCart: "Move to Cart",
    remove: "Remove"
  },
  checkoutModal: {
    title: "Vedic Shipping & Delivery Address",
    subtitle: "Please enter your delivery address to place your order",
    nameLabel: "Recipient / Delivery Full Name",
    namePlaceholder: "e.g. Ramesh Patel",
    phoneLabel: "Mobile Number (WhatsApp)",
    phonePlaceholder: "10-digit mobile number",
    gotraLabel: "Gotra",
    gotraPlaceholder: "e.g. Kashyap, Vashistha, Bharadwaj",
    addressLabel: "Complete Delivery Address",
    addressPlaceholder: "House/Flat No., Society, Landmark, Area",
    cityLabel: "City / Town",
    cityPlaceholder: "Ahmedabad",
    stateLabel: "State",
    statePlaceholder: "Select State",
    pincodeLabel: "Pincode (6 digits)",
    pincodePlaceholder: "380054",
    paymentMethodLabel: "Payment Method",
    paymentCod: "Cash on Delivery (Pay cash at doorstep)",
    paymentOnline: "Online Secure Payment (UPI / Cards / NetBanking)",
    paymentWhatsapp: "Confirm & Pay via WhatsApp",
    placeOrderBtn: "Confirm Sacred Order",
    totalAmountPrefix: "Total Payable: ₹",
    orderSuccessTitle: "Order Placed Successfully! Har Har Mahadev!",
    orderSuccessDesc: "Your sacred order has been recorded. Our Vedic Acharyas will perform the Pran-Pratishtha ceremony in your name and gotra before dispatch within 24 hours.",
    orderIdPrefix: "Order ID: TAC-",
    closeBtn: "Close",
    viewOrdersBtn: "View My Orders"
  }
}

export function getCartData(lang = "gu") {
  return lang === "en" ? CART_DATA_EN : CART_DATA_GU
}
