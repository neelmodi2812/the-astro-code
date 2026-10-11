import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://theastrocode.com"),
  title: "The Astro Code — Unlock Happiness | વૈદિક જ્યોતિષ & પંચાંગ",
  description: "The Astro Code - વૈદિક જ્યોતિષ, સાત્વિક અધ્યાત્મ, દૈનિક પંચાંગ, કુંડળી વિશ્લેષણ અને અંકશાસ્ત્રનું પ્રમાણિક પોર્ટલ.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="gu" suppressHydrationWarning className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased selection:bg-[#fdc72d]/30 selection:text-[#1b1c1a]">
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
