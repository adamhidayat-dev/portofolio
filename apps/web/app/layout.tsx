import type { Metadata } from "next"
import { Cormorant_Garamond, Oswald, Plus_Jakarta_Sans, Rubik_Spray_Paint } from "next/font/google"

import "@workspace/ui/globals.css"
import { cn } from "@workspace/ui/lib/utils"
import { PageTransitionProvider } from "@/components/portfolio/page-transition"
import { NavPill } from "@/components/portfolio/nav-pill"
import { LanguageProvider } from "@/components/portfolio/language-provider"

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jakarta",
})

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-oswald",
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
})

const rubikSpray = Rubik_Spray_Paint({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-rubik-spray",
})

export const metadata: Metadata = {
  title: "Portfolio | Muhamad Adam",
  description:
    "Get in touch with Muhamad Adam for freelance projects, design collaborations, or development opportunities.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        jakarta.variable,
        oswald.variable,
        cormorant.variable,
        rubikSpray.variable,
      )}
    >
      <body className="overflow-x-hidden">
        <LanguageProvider>
          <PageTransitionProvider>
            {children}
            <NavPill />
          </PageTransitionProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}