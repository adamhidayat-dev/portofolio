"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { Briefcase, ChevronDown, Home, Mail, User } from "lucide-react"

import { usePageTransition } from "@/components/portfolio/page-transition"
import { GlassButton, GlassDistortion } from "@/components/portfolio/glass-button"
import { useLanguage, type Language } from "@/components/portfolio/language-provider"

function IndonesiaFlag({ className = "w-4 h-3" }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 200" className={`inline-block rounded-[2px] shadow-xs shrink-0 border border-black/15 ${className}`}>
      <rect width="300" height="100" fill="#E70011" />
      <rect y="100" width="300" height="100" fill="#FFFFFF" />
    </svg>
  )
}

function UKFlag({ className = "w-4 h-3" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 30" className={`inline-block rounded-[2px] shadow-xs shrink-0 border border-black/15 ${className}`}>
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#ffffff" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="2" />
      <path d="M30,0 V30 M0,15 H60" stroke="#ffffff" strokeWidth="10" />
      <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  )
}

export function NavPill() {
  const pathname = usePathname()
  const { startTransition } = usePageTransition()
  const { lang, setLang, location, t } = useLanguage()
  const [showDropdown, setShowDropdown] = React.useState(false)

  const items = [
    { icon: <Home size={18} />, label: t("navHome"), href: "/" },
    { icon: <User size={18} />, label: t("navAbout"), href: "/about" },
    { icon: <Briefcase size={18} />, label: t("navProjects"), href: "/projects" },
    { icon: <Mail size={18} />, label: t("navContact"), href: "/contact" },
  ]

  const defaultLang = { code: "id" as Language, label: "ID", name: "Indonesia", flag: <IndonesiaFlag className="w-4.5 h-3" /> }

  const languages: { code: Language; label: string; name: string; flag: React.ReactNode }[] = [
    defaultLang,
    { code: "en", label: "EN", name: "English", flag: <UKFlag className="w-4.5 h-3" /> },
  ]

  const currentLang = languages.find((l) => l.code === lang) ?? defaultLang

  return (
    <>
      <GlassDistortion />
      <div className="fixed top-3 sm:top-6 left-1/2 -translate-x-1/2 z-50 max-w-[95vw]">
        <GlassButton rounded="rounded-full" className="p-1 sm:p-1.5 transition-all duration-500 shadow-lg">
          <div className="flex items-center justify-center gap-1 sm:gap-1.5 md:gap-2 rounded-full p-0.5 sm:p-1">
            {items.map((item) => {
              const isActive = pathname === item.href
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    if (pathname !== item.href) startTransition(item.href)
                  }}
                  className={`flex items-center px-2.5 sm:px-3.5 md:px-4 py-1.5 sm:py-2 rounded-full transition-all duration-500 hover:scale-105 cursor-pointer group ${
                    isActive
                      ? "bg-[#161616] text-white"
                      : "bg-white/10 text-palette-stone hover:bg-[#161616] hover:text-white"
                  }`}
                  style={{
                    transformOrigin: "center center",
                    transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 2.2)",
                  }}
                  title={item.label}
                >
                  {item.icon}
                  <span
                    className={`ml-1.5 sm:ml-2 text-xs md:text-sm font-medium tracking-wide ${
                      isActive ? "inline" : "hidden sm:inline"
                    }`}
                  >
                    {item.label}
                  </span>
                </a>
              )
            })}

            {/* Separator */}
            <div className="w-[1px] h-4 sm:h-5 bg-[#161616]/20 mx-0.5" />

            {/* Compact Vertical Glass Card Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setShowDropdown((prev) => !prev)}
                className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full transition-all duration-500 hover:scale-105 text-xs md:text-sm cursor-pointer select-none ${
                  showDropdown
                    ? "bg-[#161616] text-white"
                    : "bg-white/10 text-palette-stone hover:bg-[#161616] hover:text-white"
                }`}
                title={`Location: ${location.city ? `${location.city}, ` : ""}${location.country || ""}`}
              >
                <span className="flex items-center">{currentLang.flag}</span>
                <span className="font-semibold text-xs tracking-wider hidden sm:inline">{currentLang.label}</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${showDropdown ? "rotate-180" : ""}`}
                />
              </button>

              {showDropdown && (
                <div
                  className="absolute top-full right-0 mt-3 z-50 select-none animate-in fade-in slide-in-from-top-2 duration-200"
                  onMouseLeave={() => setShowDropdown(false)}
                >
                  <GlassButton rounded="rounded-2xl" className="p-1.5 min-w-[140px] shadow-xl">
                    <div className="flex flex-col gap-1 w-full text-[#161616]">
                      {languages.map((item) => {
                        const isSelected = lang === item.code
                        return (
                          <button
                            key={item.code}
                            onClick={() => {
                              setLang(item.code)
                              setShowDropdown(false)
                            }}
                            className={`flex items-center justify-between w-full px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer ${
                              isSelected
                                ? "bg-[#161616] text-white font-bold shadow-md"
                                : "bg-white/10 text-palette-stone hover:bg-[#161616]/90 hover:text-white"
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="flex items-center">{item.flag}</span>
                              <span>{item.name}</span>
                            </div>
                            {isSelected && <span className="text-[10px] font-mono opacity-80">✓</span>}
                          </button>
                        )
                      })}
                    </div>
                  </GlassButton>
                </div>
              )}
            </div>
          </div>
        </GlassButton>
      </div>
    </>
  )
}