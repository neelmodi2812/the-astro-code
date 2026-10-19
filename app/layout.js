import "./globals.css";
import { Geist, Geist_Mono, Noto_Serif_Gujarati } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GlobalJsonLd } from "@/components/seo-structured-data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const notoSerifGujarati = Noto_Serif_Gujarati({
  variable: "--font-noto-serif-gujarati",
  subsets: ["gujarati"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://theastrocode.com"),
  title: {
    default: "The Astro Code — Unlock Happiness | વૈદિક જ્યોતિષ & પંચાંગ",
    template: "%s | The Astro Code",
  },
  description:
    "The Astro Code - વૈદિક જ્યોતિષ, સાત્વિક અધ્યાત્મ, દૈનિક પંચાંગ, ચોઘડિયા, કુંડળી વિશ્લેષણ, રત્ન-રૂદ્રાક્ષ અને અંકશાસ્ત્રનું પ્રમાણિક પોર્ટલ. ડૉ. વિશાલ મોદી (Ph.D. Jyotish Shastra, Gold Medalist).",
  applicationName: "The Astro Code",
  authors: [{ name: "Dr. Vishal Modi", url: "https://theastrocode.com/about-us" }],
  generator: "Next.js",
  keywords: [
    "The Astro Code",
    "વૈદિક જ્યોતિષ",
    "દૈનિક પંચાંગ",
    "ગુજરાતી પંચાંગ ૨૦૮૧",
    "ચોઘડિયા",
    "શુભ મુહૂર્ત",
    "શ્રી બહુચર માં નું રજવાડું",
    "ડૉ. વિશાલ મોદી",
    "Dr. Vishal Modi",
    "જન્મ કુંડળી વિશ્લેષણ",
    "અંકશાસ્ત્ર",
    "વાસ્તુશાસ્ત્ર",
    "રૂદ્રાક્ષ માળા",
    "સિદ્ધ શ્રી યંત્ર",
    "સ્ફટિક માળા",
    "રાહુકાળ",
    "Vedic Astrology Gujarat",
    "Daily Panchang Ahmedabad"
  ],
  creator: "Dr. Vishal Modi",
  publisher: "The Astro Code",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
    languages: {
      "gu-IN": "/",
      "en-US": "/?lang=en",
    },
  },
  openGraph: {
    title: "The Astro Code — Unlock Happiness | વૈદિક જ્યોતિષ & પંચાંગ",
    description:
      "ધ એસ્ટ્રો કોડ: ૧૦૦% પ્રમાણિત વૈદિક જ્યોતિષ, દૈનિક પંચાંગ, ચોઘડિયા, શ્રી બહુચર માં નું રજવાડું અને પવિત્ર આધ્યાત્મિક સ્ટોર.",
    url: "https://theastrocode.com",
    siteName: "The Astro Code",
    locale: "gu_IN",
    alternateLocale: ["en_US"],
    type: "website",
    images: [
      {
        url: "/the_astro_code_golden_yantra_logo.png",
        width: 800,
        height: 800,
        alt: "The Astro Code - Vedic Astrology & Spiritual Portal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Astro Code — Unlock Happiness | વૈદિક જ્યોતિષ & પંચાંગ",
    description:
      "સંપૂર્ણ વૈદિક જ્યોતિષ, સાત્વિક પંચાંગ, ચોઘડિયા અને ગોલ્ડ મેડાલિસ્ટ ડૉ. વિશાલ મોદીનું શાસ્ત્રોક્ત માર્ગદર્શન.",
    images: ["/the_astro_code_golden_yantra_logo.png"],
    creator: "@theastrocode",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/apple-touch-icon-precomposed.png",
      },
    ],
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="gu"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${notoSerifGujarati.variable} h-full antialiased`}
    >
      <head>
        <GlobalJsonLd />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans antialiased selection:bg-[#fdc72d]/30 selection:text-[#1b1c1a]">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          <LanguageProvider defaultLang="gu">
            <TooltipProvider delay={200}>
              {children}
              <Toaster position="bottom-right" richColors />
            </TooltipProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

