/**
 * Web App Manifest for The Astro Code
 * Follows Next.js 16 metadata route specification.
 * 
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/manifest
 */
export default function manifest() {
  return {
    name: "The Astro Code — Unlock Happiness | વૈદિક જ્યોતિષ & પંચાંગ",
    short_name: "The Astro Code",
    description: "The Astro Code - વૈદિક જ્યોતિષ, સાત્વિક અધ્યાત્મ, દૈનિક પંચાંગ, કુંડળી વિશ્લેષણ, રત્ન-રૂદ્રાક્ષ અને અંકશાસ્ત્રનું પ્રમાણિક પોર્ટલ.",
    start_url: "/",
    display: "standalone",
    background_color: "#0e3934",
    theme_color: "#fdc72d",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable any",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    categories: ["lifestyle", "news", "shopping"],
    lang: "gu",
    dir: "ltr",
  }
}
