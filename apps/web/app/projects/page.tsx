"use client"

import * as React from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { motion } from "framer-motion"

import { useLanguage, type Translations } from "@/components/portfolio/language-provider"

const NOISE_SVG =
  "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E"

type Project = {
  href: string
  num: string
  title: string
  category: string
  categoryKey: keyof Translations
  year: string
  colors: string[]
}

const PROJECTS: Project[] = [
  {
    href: "#",
    num: "01",
    title: "Server KNB",
    category: "FiveM Game Server",
    categoryKey: "catFivemServer",
    year: "2025",
    colors: ["#ffffff", "#161616", "#D1C4E9", "#161616"],
  },
  {
    href: "https://sepatucompass.com/",
    num: "02",
    title: "Sepatu Compass",
    category: "E-Commerce & Retail",
    categoryKey: "catEcommerce",
    year: "2026",
    colors: ["#ffffff", "#00F2FE", "#4FACFE", "#161616"],
  },
  {
    href: "https://zemangat.com/id",
    num: "03",
    title: "Zemangat",
    category: "HR Tech SaaS",
    categoryKey: "catHrTech",
    year: "2026",
    colors: ["#ffffff", "#9B51E0", "#E94057", "#161616"],
  },
  {
    href: "#",
    num: "04",
    title: "Server Roleplay Urban Life",
    category: "FiveM Game Server",
    categoryKey: "catFivemServer",
    year: "2025",
    colors: ["#ffffff", "#A78BFA", "#161616", "#161616"],
  },
  {
    href: "https://www.leaderos.net/fivem",
    num: "05",
    title: "LeaderOS FiveM",
    category: "FiveM Webstore CMS",
    categoryKey: "catWebstore",
    year: "2026",
    colors: ["#ffffff", "#38EF7D", "#11998E", "#161616"],
  },
  {
    href: "https://smkn11bdg.sch.id/",
    num: "06",
    title: "SMKN 11 Bandung",
    category: "School Website",
    categoryKey: "catSchool",
    year: "2026",
    colors: ["#ffffff", "#8A2387", "#E94057", "#161616"],
  },
  {
    href: "https://golden-caramel-c8126d.netlify.app/",
    num: "07",
    title: "Golden Caramel",
    category: "Dessert Brand",
    categoryKey: "catDessert",
    year: "2025",
    colors: ["#ffffff", "#6A11CB", "#2575FC", "#161616"],
  },
  {
    href: "https://floweraremyfriend.netlify.app/",
    num: "08",
    title: "Flower Is My Friend",
    category: "Florist & Shop",
    categoryKey: "catFlorist",
    year: "2024",
    colors: ["#ffffff", "#38BDF8", "#161616", "#161616"],
  },
  {
    href: "https://github.com/ktexucoder/opensource-clipping",
    num: "09",
    title: "Opensource Clipping",
    category: "Open Source & Tooling",
    categoryKey: "catOpenSource",
    year: "2026",
    colors: ["#ffffff", "#3a7bd5", "#3a6073", "#161616"],
  },
]

const WIDE_PROJECT: Project = {
  href: "#",
  num: "10",
  title: "Server One Story",
  category: "FiveM Game Server",
  categoryKey: "catFivemServer",
  year: "2026",
  colors: ["#ffffff", "#FEF8E8", "#E4E2E3", "#161616"],
}

function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
      />
    </svg>
  )
}

const EASE = [0.22, 1, 0.36, 1] as const

function ProjectRow({ project }: { project: Project }) {
  const { t } = useLanguage()
  return (
    <motion.a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      initial="rest"
      animate="rest"
      whileHover="hover"
      className="group relative block overflow-hidden select-none border-t border-[#161616]/20"
    >
      {/* black wash rolls down over the row on hover */}
      <motion.div
        aria-hidden
        variants={{
          rest: { scaleY: 0 },
          hover: { scaleY: 1 },
        }}
        transition={{ duration: 0.45, ease: EASE }}
        className="absolute inset-0 bg-[#161616] origin-top"
      />

      {/* ghost number fades in on the right */}
      <div
        aria-hidden
        className="absolute right-6 md:right-16 top-1/2 -translate-y-1/2 hidden md:block pointer-events-none z-0"
      >
        <motion.div
          variants={{
            rest: { opacity: 0, x: 50 },
            hover: { opacity: 1, x: 0 },
          }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          <span className="font-oswald font-black text-[11vw] leading-none tracking-tighter text-transparent [-webkit-text-stroke:2px_rgba(254,248,232,0.35)]">
            {project.num}
          </span>
        </motion.div>
      </div>

      <div className="relative z-10 flex flex-col gap-2 md:grid md:grid-cols-12 md:items-center md:gap-4 px-6 md:px-12 lg:px-20 py-7 md:py-10">
        <div className="md:col-span-1">
          <span className="font-mono text-[10px] md:text-xs tracking-widest text-[#161616]/50 group-hover:text-[#FEF8E8]/60 transition-colors duration-300">
            {project.num} /
          </span>
        </div>

        <h2 className="md:col-span-6 font-oswald font-black uppercase tracking-tight leading-[0.9] text-[#161616] group-hover:text-[#FEF8E8] transition-colors duration-300 text-2xl md:text-4xl lg:text-5xl">
          {project.title}
        </h2>

        <div className="md:col-span-3 hidden md:flex">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#161616]/55 group-hover:text-[#FEF8E8]/70 transition-colors duration-300">
            {t(project.categoryKey)}
          </span>
        </div>

        <div className="md:col-span-2 hidden md:flex items-center justify-end gap-4">
          <span className="font-cormorant italic text-2xl text-[#161616]/80 group-hover:text-[#FEF8E8]/90 transition-colors duration-300">
            {project.year}
          </span>
          <ArrowUpRight className="w-5 h-5 text-[#161616] group-hover:text-[#FEF8E8] transform transition-transform duration-300 group-hover:rotate-45" />
        </div>

        {/* mobile meta */}
        <div className="md:hidden flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#161616]/55 group-hover:text-[#FEF8E8]/70 transition-colors duration-300">
            {t(project.categoryKey)} — {project.year}
          </span>
          <ArrowUpRight className="w-4 h-4 text-[#161616] group-hover:text-[#FEF8E8] transform transition-transform duration-300 group-hover:rotate-45" />
        </div>
      </div>
    </motion.a>
  )
}

function FeatureCard({ project }: { project: Project }) {
  const { t } = useLanguage()
  const [c0, c1, c2] = project.colors
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden bg-[#161616] text-[#FEF8E8] select-none"
    >
      {/* floating gradient aura */}
      <div
        aria-hidden
        className="absolute w-[75%] h-[140%] -top-[20%] left-[5%] rounded-full blur-[60px] opacity-50 pointer-events-none animate-float-fast-top"
        style={{ backgroundColor: c0 }}
      />
      <div
        aria-hidden
        className="absolute w-[60%] h-[130%] top-[10%] left-[30%] rounded-full blur-[70px] opacity-40 pointer-events-none animate-float-medium-mid"
        style={{ backgroundColor: c1 }}
      />
      <div
        aria-hidden
        className="absolute w-[60%] h-[130%] top-[5%] right-[5%] rounded-full blur-[70px] opacity-40 pointer-events-none animate-float-medium-mid-delayed"
        style={{ backgroundColor: c2 }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: `url("${NOISE_SVG}")` }}
      />

      <div className="relative z-10 px-6 md:px-12 lg:px-20 py-16 md:py-24 flex flex-col md:flex-row md:items-end justify-between gap-10">
        <div>
          <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#FEF8E8]/60 mb-4">
            {t("featured")} — {project.num}
          </p>
          <h2 className="font-oswald font-black uppercase tracking-tight leading-[0.85] text-[#FEF8E8] text-4xl md:text-6xl lg:text-7xl">
            {project.title}
          </h2>
          <p className="font-cormorant italic text-xl md:text-2xl text-[#FEF8E8]/70 mt-3">
            {t(project.categoryKey)} — {project.year}
          </p>
        </div>
        <div className="flex items-center gap-5">
          <span className="hidden md:inline text-[10px] uppercase tracking-[0.25em] text-[#FEF8E8]/60">
            {t("viewProject")}
          </span>
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#FEF8E8] text-[#161616] flex items-center justify-center group-hover:rotate-45 group-hover:scale-110 transition-transform duration-300 shadow-lg">
            <ArrowUpRight className="w-6 h-6" />
          </div>
        </div>
      </div>
    </a>
  )
}

export default function Projects() {
  const sectionRef = React.useRef<HTMLElement>(null)
  const titleRef = React.useRef<HTMLDivElement>(null)
  const heroRef = React.useRef<HTMLDivElement>(null)
  const rowsRef = React.useRef<HTMLDivElement>(null)
  const featureRef = React.useRef<HTMLDivElement>(null)
  const footerRef = React.useRef<HTMLElement>(null)
  const { t } = useLanguage()

  useGSAP(
    () => {
      gsap
        .timeline({ delay: 0.2 })
        .from(titleRef.current, { y: -20, opacity: 0, duration: 0.8, ease: "power3.out" })
        .from(heroRef.current, { y: 40, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.4")
        .from(
          rowsRef.current ? rowsRef.current.children : [],
          { y: 40, opacity: 0, duration: 0.7, stagger: 0.07, ease: "power3.out" },
          "-=0.5"
        )
        .from(
          featureRef.current,
          { y: 40, opacity: 0, duration: 0.8, ease: "power3.out" },
          "-=0.4"
        )
        .from(footerRef.current, { opacity: 0, duration: 0.5, ease: "power2.out" }, "-=0.3")
    },
    { scope: sectionRef }
  )

  return (
    <main className="relative w-full min-h-screen bg-palette-grey text-[#161616] font-jakarta overflow-hidden">
      {/* film grain over the whole page */}
      <div
        aria-hidden
        className="fixed inset-0 z-[5] pointer-events-none opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: `url("${NOISE_SVG}")` }}
      />

      <section ref={sectionRef} className="relative w-full min-h-screen">
        <div
          ref={titleRef}
          className="absolute top-6 left-6 md:left-12 lg:left-20 z-20 text-[#161616] text-2xl md:text-3xl tracking-widest pointer-events-none drop-shadow-md origin-center"
          style={{ fontFamily: "var(--font-rubik-spray), 'Rubik Spray Paint', sans-serif" }}
        >
          {t("projectsTitle")}
        </div>

        {/* hero */}
        <header ref={heroRef} className="relative z-10 px-6 md:px-12 lg:px-20 pt-28 md:pt-36 pb-10 md:pb-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div>
              <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#161616]/50 mb-4">
                {t("projectsOverviewTag")}
              </p>
              <h1 className="font-oswald font-black uppercase text-[clamp(3.5rem,13vw,12rem)] leading-[0.85] tracking-tighter text-[#161616]">
                {t("projectsHeadingSelected")}
                <span className="block text-stroke-orange">{t("projectsHeadingWork")}</span>
              </h1>
            </div>
            <div className="max-w-sm lg:text-right lg:pb-2">
              <p className="font-cormorant italic text-2xl md:text-3xl leading-snug text-[#161616]">
                {t("projectsHeroQuote")}
              </p>
              <p className="font-jakarta text-xs md:text-sm text-[#161616]/60 mt-4 leading-relaxed">
                {t("projectsHeroHint")}
              </p>
            </div>
          </div>
        </header>

        {/* index header */}
        <div className="relative z-10 px-6 md:px-12 lg:px-20 flex items-center justify-between py-4 border-t border-[#161616]/25">
          <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#161616]/50">
            {t("projectsIndex")}
          </span>
          <span className="hidden md:inline font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#161616]/50">
            {t("projectsHoverHint")}
          </span>
        </div>

        {/* index rows */}
        <div ref={rowsRef} className="relative z-10">
          {PROJECTS.map((project) => (
            <ProjectRow key={project.num} project={project} />
          ))}
        </div>

        {/* featured finale */}
        <div ref={featureRef} className="relative z-10 mt-10 md:mt-14">
          <FeatureCard project={WIDE_PROJECT} />
        </div>

        {/* footer */}
        <footer
          ref={footerRef}
          className="relative z-10 px-6 md:px-12 lg:px-20 py-10 flex flex-col md:flex-row gap-3 items-center justify-between border-t border-[#161616]/25"
        >
          <span className="font-jakarta text-[10px] md:text-xs uppercase tracking-[0.25em] text-[#161616]/50">
            © 2026 Muhamad Adam
          </span>
          <span className="font-cormorant italic text-lg text-[#161616]/70">
            {t("projectsFooterTagline")}
          </span>
          <span className="font-jakarta text-[10px] md:text-xs uppercase tracking-[0.25em] text-[#161616]/50">
            {t("allProjectsLive")}
          </span>
        </footer>
      </section>
    </main>
  )
}