"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import {
  MessageCircle,
  MapPin,
  Phone,
  Mail,
  CheckCircle2
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { useLanguage } from "@/components/language-provider"
import { toast } from "sonner"
import { contactService } from "@/lib/api"
import { SITE_CONTACT } from "@/lib/config/contact"
import { getSiteShell } from "@/lib/config/site"

/** The copyright copy is bundled with a fixed year; show the current one in the page's digits. */
function withCurrentYear(text, isEn) {
  const year = String(new Date().getFullYear())
  const gu = year.replace(/\d/g, (d) => "૦૧૨૩૪૫૬૭૮૯"[d])
  return text.replace(/2025|૨૦૨૫/, isEn ? year : gu)
}

export function AstroFooter({ config: propConfig, footer: propFooter, lang: propLang }) {
  // Seamless reactive language handling from props or React context
  const { lang: contextLang } = useLanguage()
  const activeLang = propLang || contextLang || "gu"
  const isEn = activeLang === "en"

  // Base localized dataset
  const localizedData = getSiteShell(activeLang)
  const config = propConfig || localizedData.config
  const footer = propFooter || localizedData.footer

  const safeConfig = {
    appName: config?.appName || "The Astro Code",
    tagline: isEn ? "UNLOCK HAPPINESS • VEDIC SPIRITUAL PORTAL" : "UNLOCK HAPPINESS • વૈદિક અધ્યાત્મ પોર્ટલ",
    logoUrl:
      config?.logoUrl ||
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBl8Ogqc3Lgxek9Poh6T6awNiHzAhMkqB-5xPT0DGQw2IkT_JcEk1jrF2XWfWhUcqqZUaq2yl1BcF9KyKGZG1FSAiWJCqFng25fFCfO60PSuH_WhIrXmepmxQpoTd8-3rYz6AP2u8k4zfujF7gqSn-OOWkejaV7jSUZYd-Vx2sZp3lWu2lhhmj59HfTP35AWQGI3JD_-LdFej4UXcxM7Nt4HhU6_7DSXUONbF2fKEY14WAQjMJ59pJkcLp2sxGLtwmBKA",
    founder: {
      location: isEn
        ? "Bodakdev, S.G. Highway, Ahmedabad, Gujarat - 380054"
        : "બોડકદેવ, એસ. જી. હાઇવે, અમદાવાદ, ગુજરાત - ૩૮૦૦૫૪",
      phone: isEn ? "+91 79 4000 1122" : "+૯૧ ૭૯ ૪૦૦૦ ૧૧૨૨",
      ...(isEn && config?.founder ? { ...config.founder } : (!isEn && config?.founder ? { ...config.founder } : {}))
    }
  }

  const [email, setEmail] = React.useState("")
  const [subscribed, setSubscribed] = React.useState(false)

  const handleEmailSubscribe = async (e) => {
    e.preventDefault()
    if (!email) return

    try {
      await contactService.subscribeNewsletter(email.trim(), { type: "email", lang: isEn ? "en" : "gu" })
    } catch (error) {
      toast.error(error.message)
      return
    }

    setSubscribed(true)
    setTimeout(() => {
      setSubscribed(false)
      setEmail("")
    }, 4000)
  }

  return (
    <footer className="w-full bg-[#f0eee8] dark:bg-[#141512] text-foreground pt-12 pb-8 border-t border-border/70 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10">
          
          {/* Column 1: Brand & About */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden ring-1 ring-[#fdc72d] bg-[#121b1a] flex items-center justify-center p-0.5 shrink-0">
                <Image
                  src={safeConfig.logoUrl}
                  alt={safeConfig.appName}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div>
                <div className="text-base font-extrabold text-foreground leading-tight">
                  {safeConfig.appName}
                </div>
                <div className="text-[10px] font-black text-[#8a6800] dark:text-[#fdc72d]">
                  {safeConfig.tagline}
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-1">
              {footer.about ||
                (isEn
                  ? "The Astro Code unites ancient Vedic wisdom with modern spiritual living, guiding seekers toward positivity, happiness, and peace."
                  : "ધ એસ્ટ્રો કોડ એક પ્રાચીન વૈદિક જ્ઞાન અને આધુનિક આધ્યાત્મિક જીવનશૈલીનો સંગમ છે. જીવનમાં સકારાત્મક ઉર્જા, સુખ અને શાંતિના માર્ગદર્શન માટે અમે આપની સાથે છીએ.")}
            </p>

            {/* Social Icons Aligned Flush with Left Margin */}
            <div className="flex flex-col gap-2 mt-2">
              <span className="text-xs font-bold text-foreground/85">
                {footer.followUs || (isEn ? "Follow Us:" : "અનુસરો:")}
              </span>

              <div className="flex items-center gap-2.5">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={SITE_CONTACT.social.facebook}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Facebook"
                      className="p-2 rounded-lg bg-card dark:bg-[#20211d] text-[#8a6800] dark:text-[#fdc72d] hover:bg-[#fdc72d] hover:text-[#1b1c1a] transition-colors cursor-pointer border border-border shadow-2xs inline-flex items-center justify-center"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>Facebook</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={SITE_CONTACT.social.youtube}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="YouTube"
                      className="p-2 rounded-lg bg-card dark:bg-[#20211d] text-[#8a6800] dark:text-[#fdc72d] hover:bg-[#fdc72d] hover:text-[#1b1c1a] transition-colors cursor-pointer border border-border shadow-2xs inline-flex items-center justify-center"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>YouTube</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={SITE_CONTACT.whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="WhatsApp Support"
                      className="p-2 rounded-lg bg-card dark:bg-[#20211d] text-[#8a6800] dark:text-[#fdc72d] hover:bg-[#fdc72d] hover:text-[#1b1c1a] transition-colors cursor-pointer border border-border shadow-2xs inline-flex items-center justify-center"
                    >
                      <MessageCircle className="h-4 w-4" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>{footer.chatTooltip || (isEn ? "WhatsApp Support" : "વોટ્સએપ સહાય")}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>

          {/* Column 2: Dharmik & Darshan */}
          <div className="flex flex-col gap-2">
            <div className="text-sm font-bold text-foreground mb-1 border-l-4 border-[#fdc72d] pl-2">
              {footer.dharmikTitle || (isEn ? "Spiritual & Darshan" : "ધાર્મિક & દર્શન")}
            </div>
            <Link
              href="/article/hero-1-bahuchar-maa-pragatya"
              className="text-xs text-muted-foreground hover:text-[#8a6800] dark:hover:text-[#fdc72d] transition-colors py-0.5"
            >
              {isEn ? "Shri Bahuchar Maa Rajwadu & History" : "શ્રી બહુચર માં નું રજવાડું & ઇતિહાસ"}
            </Link>
            <Link
              href="/article/somnath-mahadev-pratham-jyotirling"
              className="text-xs text-muted-foreground hover:text-[#8a6800] dark:hover:text-[#fdc72d] transition-colors py-0.5"
            >
              {isEn ? "12 Holy Jyotirlinga Darshan Guide" : "૧૨ પવિત્ર જ્યોતિર્લિંગ દર્શન માર્ગદર્શિકા"}
            </Link>
            <Link
              href="/categories"
              className="text-xs text-muted-foreground hover:text-[#8a6800] dark:hover:text-[#fdc72d] transition-colors py-0.5"
            >
              {isEn ? "Shaktipeeth & Pilgrimage Glory" : "શક્તિપીઠ અને યાત્રાધામ માહાત્મ્ય"}
            </Link>
            <Link
              href="/categories"
              className="text-xs text-muted-foreground hover:text-[#8a6800] dark:hover:text-[#fdc72d] transition-colors py-0.5"
            >
              {isEn ? "Daily Stotras, Mantras & Aarti" : "નિત્ય સ્તોત્ર, મંત્ર અને આરતી સંગ્રહ"}
            </Link>
            <Link
              href="/categories"
              className="text-xs text-muted-foreground hover:text-[#8a6800] dark:hover:text-[#fdc72d] transition-colors py-0.5"
            >
              {isEn ? "Inspirational Spiritual Stories & Preaching" : "પ્રેરણાદાયી ધાર્મિક કથાઓ & ઉપદેશ"}
            </Link>
            <Link
              href="/myshop"
              className="text-xs text-muted-foreground hover:text-[#8a6800] dark:hover:text-[#fdc72d] transition-colors py-0.5 font-medium"
            >
              {isEn ? "Puja Samagri & Gemstone Store (MyShop)" : "પૂજા સામગ્રી & રત્ન સ્ટોર (MyShop)"}
            </Link>
          </div>

          {/* Column 3: Jyotish & Services */}
          <div className="flex flex-col gap-2">
            <div className="text-sm font-bold text-foreground mb-1 border-l-4 border-[#fdc72d] pl-2">
              {footer.jyotishTitle || (isEn ? "Astrology & Services" : "જ્યોતિષ & સેવાઓ")}
            </div>
            <Link
              href="/dainik-panchang"
              className="text-xs text-muted-foreground hover:text-[#8a6800] dark:hover:text-[#fdc72d] transition-colors py-0.5"
            >
              {isEn ? "Daily Panchang & Choghadiya Schedule" : "દૈનિક પંચાંગ & ચોઘડિયું સમયપત્રક"}
            </Link>
            <Link
              href="/categories"
              className="text-xs text-muted-foreground hover:text-[#8a6800] dark:hover:text-[#fdc72d] transition-colors py-0.5"
            >
              {isEn ? "Kundali Analysis & Planetary Doshas" : "કુંડળી વિશ્લેષણ અને ગ્રહદોષ નિવારણ"}
            </Link>
            <Link
              href="/numerology"
              className="text-xs text-muted-foreground hover:text-[#8a6800] dark:hover:text-[#fdc72d] transition-colors py-0.5"
            >
              {isEn ? "Numerology & Destiny Number" : "અંકશાસ્ત્ર (ન્યુમરોલોજી) અને ભાગ્યાંક"}
            </Link>
            <Link
              href="/contact-us"
              className="text-xs text-muted-foreground hover:text-[#8a6800] dark:hover:text-[#fdc72d] transition-colors py-0.5"
            >
              {isEn ? "Personal Consultation (Book Slot)" : "વ્યક્તિગત પરામર્શ (Book Consultation)"}
            </Link>
            <Link
              href="/myshop"
              className="text-xs text-muted-foreground hover:text-[#8a6800] dark:hover:text-[#fdc72d] transition-colors py-0.5"
            >
              {isEn ? "Sacred Rudraksha, Yantra & Spiritual Shop" : "પવિત્ર રુદ્રાક્ષ, યંત્ર અને આધ્યાત્મિક શોપ"}
            </Link>
            <Link
              href="/about-us"
              className="text-xs text-muted-foreground hover:text-[#8a6800] dark:hover:text-[#fdc72d] transition-colors py-0.5"
            >
              {isEn ? "Dr. Vishal Modi Profile & Credentials" : "ડૉ. વિશાલ મોદી પરિચય"}
            </Link>
          </div>

          {/* Column 4: Contact & Newsletter */}
          <div className="flex flex-col gap-3">
            <div className="text-sm font-bold text-foreground border-l-4 border-[#fdc72d] pl-2">
              {footer.contactTitle || (isEn ? "Contact & Newsletter" : "સંપર્ક & સમાચાર પત્ર")}
            </div>

            <div className="flex items-start gap-2 text-xs text-muted-foreground">
              <MapPin className="h-4 w-4 text-[#8a6800] dark:text-[#fdc72d] shrink-0 mt-0.5" />
              <span>{safeConfig.founder.location}</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Phone className="h-4 w-4 text-[#8a6800] dark:text-[#fdc72d] shrink-0" />
              <span>
                <strong className="text-foreground mr-1">{footer.phoneLabel || (isEn ? "Phone:" : "ફોન:")}</strong>
                {safeConfig.founder.phone}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Mail className="h-4 w-4 text-[#8a6800] dark:text-[#fdc72d] shrink-0" />
              <span>
                <strong className="text-foreground mr-1">{footer.emailLabel || (isEn ? "Email:" : "ઇમેઇલ:")}</strong>
                <a href={`mailto:${footer.contactEmail || "contact@theastrocode.com"}`} className="hover:underline">
                  {footer.contactEmail || "contact@theastrocode.com"}
                </a>
              </span>
            </div>

            <div className="flex flex-col gap-1.5 mt-2">
              <span className="text-[11px] text-muted-foreground">
                {footer.emailNote || (isEn ? "Get Daily Rashifal and Auspicious Muhurat:" : "દૈનિક રાશિફળ અને શુભ મુહૂર્ત મેળવો:")}
              </span>

              {subscribed ? (
                <Alert className="py-2 px-3 border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  <AlertDescription className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    {footer.emailSuccess || (isEn ? "Thank you! You are subscribed." : "આભાર! આપનું સબ્સ્ક્રિપ્શન થઈ ગયું છે.")}
                  </AlertDescription>
                </Alert>
              ) : (
                <form onSubmit={handleEmailSubscribe} className="flex items-center gap-1.5">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={footer.emailPlaceholder || (isEn ? "Enter your email address..." : "તમારું ઇમેઇલ દાખલ કરો...")}
                    className="h-8 bg-card dark:bg-[#20211d] text-foreground text-xs rounded border-border"
                    required
                  />
                  <Button
                    type="submit"
                    className="h-8 px-3 bg-[#fdc72d] text-[#1b1c1a] font-black text-xs hover:bg-[#eab318] shrink-0 cursor-pointer"
                  >
                    {footer.emailButton || (isEn ? "Subscribe" : "જોડાવો")}
                  </Button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Bar with Enhanced WCAG-Compliant Readability */}
        <Separator className="bg-border/70 my-7" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-sm font-medium text-foreground/85 dark:text-foreground/80">
          <p className="leading-relaxed text-center md:text-left">
            {withCurrentYear(
              footer.copyright ||
                (isEn
                  ? "© 2025 The Astro Code. All Rights Reserved. Spiritual guidance for devotees."
                  : "© ૨૦૨૫ The Astro Code. સર્વાધિકાર સુરક્ષિત. આધ્યાત્મિક સેવાઓ ભાવિક જનોના હિતાર્થે."),
              isEn
            )}
          </p>
          <div className="flex items-center flex-wrap justify-center gap-4 sm:gap-6 font-semibold">
            <Link href="/about-us" className="hover:text-[#8a6800] dark:hover:text-[#fdc72d] transition-colors underline-offset-4 hover:underline">
              {footer.aboutUs || (isEn ? "About Us" : "અમારા વિશે")}
            </Link>
            <Link href="/privacy-policy" className="hover:text-[#8a6800] dark:hover:text-[#fdc72d] transition-colors underline-offset-4 hover:underline">
              {footer.privacy || (isEn ? "Privacy Policy" : "ગોપનીયતા નીતિ")}
            </Link>
            <Link href="/privacy-policy" className="hover:text-[#8a6800] dark:hover:text-[#fdc72d] transition-colors underline-offset-4 hover:underline">
              {footer.terms || (isEn ? "Terms & Conditions" : "નિયમો અને શરતો")}
            </Link>
            <Link href="/contact-us" className="hover:text-[#8a6800] dark:hover:text-[#fdc72d] transition-colors underline-offset-4 hover:underline">
              {footer.help || (isEn ? "Help Center" : "સહાય કેન્દ્ર")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
