/**
 * Forgot Password & Account Recovery Data Architecture
 * Full Bilingual Support: Gujarati ('gu') & English ('en')
 */

export const FORGOT_PASSWORD_DATA = {
  breadcrumb: {
    home: { gu: "હોમ", en: "Home" },
    login: { gu: "સાઇન ઇન / લૉગિન", en: "Sign In / Login" },
    title: { gu: "પાસવર્ડ રીસેટ કરો (Password Recovery)", en: "Password Recovery" },
  },
  complianceBadge: {
    text: {
      gu: "૨૫૬-બીટ SSL એન્ક્રિપ્ટેડ સુરક્ષિત પોર્ટલ",
      en: "256-Bit SSL Encrypted Secure Portal",
    },
  },
  leftColumn: {
    badge: {
      gu: "✦ સુરક્ષિત ખાતું પુનઃપ્રાપ્તિ ✦",
      en: "✦ SECURE ACCOUNT RECOVERY ✦",
    },
    heading: {
      gu: "તમારા આધ્યાત્મિક એકાઉન્ટનો પાસવર્ડ સુરક્ષિત રીતે પુનઃપ્રાપ્ત કરો",
      en: "Recover Your Vedic Account Password Securely",
    },
    description: {
      gu: "ચિંતા કરશો નહીં! તમારા સાચવેલા કુંડળી વિશ્લેષણ, દૈનિક રાશિફળ, પૂજા બુકિંગ અને ઓર્ડર હિસ્ટ્રી સંપૂર્ણપણે સુરક્ષિત છે.",
      en: "Rest assured! Your saved Kundali charts, daily Rashifal, Puja bookings, and order history are 100% intact.",
    },
    steps: [
      {
        num: "૧",
        title: { gu: "ઓળખ ચકાસણી (Identity Verification)", en: "Identity Verification" },
        desc: {
          gu: "તમારો રજિસ્ટર્ડ ઈમેલ એડ્રેસ દાખલ કરો.",
          en: "Enter your registered email address.",
        },
      },
      {
        num: "૨",
        title: { gu: "ઈમેલ ચકાસો (Check Your Email)", en: "Check Your Email" },
        desc: {
          gu: "તમારા ઈમેલ પર સુરક્ષિત રીસેટ લિંક મોકલવામાં આવશે.",
          en: "A secure password reset link will be sent to your inbox.",
        },
      },
      {
        num: "૩",
        title: { gu: "નવો પાસવર્ડ સેટ કરો (Set New Password)", en: "Set New Strong Password" },
        desc: {
          gu: "નવો મજબૂત પાસવર્ડ બનાવી તરત જ એકાઉન્ટમાં લૉગિન કરો.",
          en: "Create a secure new password and access your spiritual portal immediately.",
        },
      },
    ],
    privacyNote: {
      gu: "તમારી જન્મકુંડળી કે અંગત વિગતો કોઈપણ તૃતીય પક્ષ સાથે શેર કરવામાં આવતી નથી. તમારો ડેટા પૂર્ણ ગોપનીય છે.",
      en: "Your personal birth horoscope and private queries are never shared with third parties. 100% confidential.",
    },
    helplineLabel: { gu: "સહાયતા હેલ્પલાઇન:", en: "Helpdesk Helpline:" },
    helplinePhone: "+૯૧ ૭૯ ૪૦૦૦ ૮૧૦૮",
    helplinePhoneEn: "+91 79 4000 8108",
  },
  rightColumn: {
    sacredShloka: {
      gu: "॥ ૐ શ્રી ગણેશાય નમઃ ॥ — એકાઉન્ટ પુનઃપ્રાપ્તિ",
      en: "॥ Om Shree Ganeshay Namah ॥ — Account Recovery",
    },
    stepIndicator: {
      step1: { gu: "પગલું ૧ માંથી ૨", en: "Step 1 of 2" },
      step2: { gu: "પગલું ૨ માંથી ૨", en: "Step 2 of 2" },
    },
    title: {
      gu: "પાસવર્ડ ભૂલી ગયા છો?",
      en: "Forgot Your Password?",
    },
    subtitle: {
      gu: "તમારા રજિસ્ટર્ડ ઈમેલ એડ્રેસ દ્વારા તમારો પાસવર્ડ સરળતાથી રીસેટ કરો.",
      en: "Easily reset your account password using your registered email address.",
    },
    emailForm: {
      label: {
        gu: "રજિસ્ટર્ડ ઈમેલ એડ્રેસ (Registered Email Address)",
        en: "Registered Email Address",
      },
      placeholder: "your.name@example.com",
      note: {
        gu: "તમારા ઇનબોક્સમાં પાસવર્ડ રીસેટ કરવા માટે એક અધિકૃત લિંક મોકલવામાં આવશે.",
        en: "An official secure link to reset your password will be sent to your inbox.",
      },
      submitBtn: {
        gu: "રીસેટ લિંક મોકલો (Send Password Reset Link)",
        en: "Send Password Reset Link",
      },
      sendingBtn: {
        gu: "લિંક મોકલાઈ રહી છે...",
        en: "Sending Reset Link...",
      },
    },
    emailFeedback: {
      title: {
        gu: "રીસેટ લિંક ઈમેલ પર મોકલાઈ ગઈ છે!",
        en: "Password Reset Link Dispatched!",
      },
      desc: {
        gu: "કૃપા કરીને તમારું ઇનબોક્સ (અને સ્પામ ફોલ્ડર) ચકાસો. લિંક આગામી ૧૫ મિનિટ માટે સક્રિય રહેશે.",
        en: "Please check your inbox (and spam folder). The link remains active for 15 minutes.",
      },
    },
    processNote: {
      gu: "ઈમેલમાં મળેલી લિંક ખોલો અને ઓછામાં ઓછા ૬ અક્ષરનો નવો પાસવર્ડ બનાવો.",
      en: "Open the link in your email and choose a new password of at least 6 characters.",
    },
    backToLogin: {
      rememberPrompt: {
        gu: "પાસવર્ડ યાદ આવી ગયો છે?",
        en: "Remembered your password?",
      },
      btnText: {
        gu: "અહીં લૉગિન કરો (Back to Sign In)",
        en: "Back to Sign In",
      },
    },
  },
  trustCards: [
    {
      icon: "ShieldCheck",
      title: { gu: "૧૦૦% સલામત & એન્ક્રિપ્ટેડ", en: "100% Encrypted & Safe" },
      desc: {
        gu: "તમારી જન્મ વિગતો, ગોચર કુંડળી અને જન્માક્ષર રેકોર્ડ્સ બેંક ગ્રેડ પ્રોટોકોલથી સુરક્ષિત છે.",
        en: "Your birth chart records, transit data, and horoscope computations are safeguarded by 256-Bit SSL.",
      },
    },
    {
      icon: "MessageCircle",
      title: { gu: "ત્વરિત WhatsApp સપોર્ટ", en: "Instant WhatsApp Support" },
      desc: {
        gu: "પાસવર્ડ રીસેટમાં કોઈ મુશ્કેલી પડે તો અમારી વૈદિક સપોર્ટ ટીમ વ્હોટ્સએપ પર ત્વરિત સહાય કરશે.",
        en: "Our dedicated Vedic assistance desk is available to assist your recovery via WhatsApp.",
      },
    },
    {
      icon: "UserCheck",
      title: { gu: "નિષ્ણાત વૈદિક સહાય", en: "Expert Vedic Guidance" },
      desc: {
        gu: "ડૉ. વિશાલ મોદી અને વરિષ્ઠ જ્યોતિષીઓની ટીમ સોમવારથી શનિવાર સવારે ૯ થી સાંજે ૭ મદદ માટે ઉપલબ્ધ છે.",
        en: "Led by Dr. Vishal Modi and senior scholars, our desk is accessible Mon-Sat 9 AM to 7 PM IST.",
      },
    },
  ],
  bottomBanner: {
    mantra: "॥ સર્વે ભવન્તુ સુખિનઃ સર્વે સન્તુ નિરામયાઃ ॥ — શાંતિ અને સુરક્ષાનો સંકલ્પ",
    emailLabel: { gu: "સહાયતા ઈમેલ:", en: "Support Desk Email:" },
    supportEmail: "support@theastrocode.com",
  },
}
