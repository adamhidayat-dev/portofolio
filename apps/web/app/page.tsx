"use client"

import * as React from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

import { usePageTransition } from "@/components/portfolio/page-transition"
import InfiniteMenu from "@/components/portfolio/InfiniteMenu"
import { useLanguage, type Translations } from "@/components/portfolio/language-provider"

type SelectedWorkItem = {
  title: string
  categoryKey: keyof Translations
  year: string
  image: string
  link: string
}

const SELECTED_WORK: SelectedWorkItem[] = [
  { title: "Server KNB", categoryKey: "catFivemServer", year: "2025", image: "", link: "#" },
  { title: "Sepatu Compass", categoryKey: "catEcommerce", year: "2026", image: "", link: "https://sepatucompass.com/" },
  { title: "Zemangat", categoryKey: "catHrTech", year: "2026", image: "", link: "https://zemangat.com/id" },
  { title: "Server Roleplay Urban Life", categoryKey: "catFivemServer", year: "2025", image: "", link: "#" },
  { title: "LeaderOS FiveM", categoryKey: "catWebstore", year: "2026", image: "", link: "https://www.leaderos.net/fivem" },
  { title: "SMKN 11 Bandung", categoryKey: "catSchool", year: "2026", image: "", link: "https://smkn11bdg.sch.id/" },
  { title: "Golden Caramel", categoryKey: "catDessert", year: "2025", image: "", link: "https://golden-caramel-c8126d.netlify.app/" },
  { title: "Flower Is My Friend", categoryKey: "catFlorist", year: "2024", image: "", link: "https://floweraremyfriend.netlify.app/" },
  { title: "Opensource Clipping", categoryKey: "catOpenSource", year: "2026", image: "", link: "https://github.com/ktexucoder/opensource-clipping" },
  { title: "Server One Story", categoryKey: "catFivemServer", year: "2026", image: "", link: "#" },
]

function ArrowIcon({ className }: { className?: string }) {
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

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 0L15.3 8.7L24 12L15.3 15.3L12 24L8.7 15.3L0 12L8.7 8.7Z" />
    </svg>
  )
}

export default function Home() {
  const sectionRef = React.useRef<HTMLElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const logoRef = React.useRef<HTMLDivElement>(null)
  const contentRef = React.useRef<HTMLDivElement>(null)
  const { startTransition } = usePageTransition()
  const { t } = useLanguage()

  const words = React.useMemo(
    () => [t("word1"), t("word2"), t("word3"), t("word4"), t("word5")],
    [t]
  )
  const marqueeItems = React.useMemo(
    () => [t("marquee1"), t("marquee2"), t("marquee3"), t("marquee4")],
    [t]
  )
  const selectedWork = React.useMemo(
    () =>
      SELECTED_WORK.map((w) => ({
        ...w,
        description: `${t(w.categoryKey)} — ${w.year}`,
      })),
    [t]
  )
  const stats = [
    { value: "XI TKJ 3", label: "SMKN 1 Majalengka" },
    { value: "4+", label: t("statsPhases") },
    { value: "Self-Hosted", label: t("statsObby") },
  ]

  const [wordIndex, setWordIndex] = React.useState(0)
  const [text, setText] = React.useState("")
  const [deleting, setDeleting] = React.useState(false)

  React.useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined
    const target = words[wordIndex] ?? ""
    const speed = deleting ? 40 : 80
    const tick = () => {
      if (deleting) {
        // Clamp so a language switch mid-cycle never gets stuck on a stale length
        const next = target.slice(0, Math.max(0, Math.min(text.length - 1, target.length)))
        setText(next)
        if (next === "") {
          setDeleting(false)
          setWordIndex((i) => (i + 1) % words.length)
          return
        }
      } else {
        const next = target.slice(0, text.length + 1)
        setText(next)
        if (next === target) {
          timeout = setTimeout(() => setDeleting(true), 2000)
          return
        }
      }
      timeout = setTimeout(tick, speed)
    }
    timeout = setTimeout(tick, speed)
    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [text, deleting, wordIndex, words])

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.2 })
      const x = window.innerWidth / 2 - 120
      const y = window.innerHeight / 2 - 30
      tl.from(logoRef.current, {
        x,
        y,
        xPercent: -50,
        yPercent: -50,
        scale: 3,
        duration: 1.5,
        ease: "power3.inOut",
      }).from(
        contentRef.current,
        { opacity: 0, duration: 1.2, ease: "power2.inOut" },
        "-=0.3"
      )
    },
    { scope: sectionRef }
  )

  React.useEffect(() => {
    let raf = 0
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = 0
    let height = 0
    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let time = 0

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }

    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", onMouseMove)
    resize()

    const displaced = (x: number, y: number) => {
      const dx = x - mouseX
      const dy = y - mouseY
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 250 && dist > 0) {
        const t = dist / 250
        const amplitude = 15 * Math.sin(0.05 * dist - 4 * time) * (1 - t * t * (3 - 2 * t))
        return { x: x + (dx / dist) * amplitude, y: y + (dy / dist) * amplitude }
      }
      return { x, y }
    }

    const curve = (x1: number, y1: number, x2: number, y2: number) => {
      const p = displaced(x1, y1)
      ctx.moveTo(p.x, p.y)
      for (let i = 1; i <= 15; i++) {
        const t = i / 15
        const pt = displaced(x1 + (x2 - x1) * t, y1 + (y2 - y1) * t)
        ctx.lineTo(pt.x, pt.y)
      }
    }

    const render = () => {
      if (!ctx) return
      time += 0.02
      ctx.fillStyle = "#E4E2E3"
      ctx.fillRect(0, 0, width, height)

      const cx = width / 2
      const cy = height / 2
      ctx.strokeStyle = "rgba(22, 22, 22, 0.08)"
      ctx.lineWidth = 1.5
      ctx.beginPath()
      for (let e = 1; e < 6; e++) {
        curve(cx, cy, 0, (height / 6) * e)
        curve(cx, cy, width, (height / 6) * e)
      }
      for (let e = 1; e < 9; e++) {
        curve(cx, cy, (width / 9) * e, 0)
        curve(cx, cy, (width / 9) * e, height)
      }
      curve(cx, cy, 0, 0)
      curve(cx, cy, width, 0)
      curve(cx, cy, 0, height)
      curve(cx, cy, width, height)
      ctx.stroke()

      const hw = width / 2 / 3
      const hh = height / 2 / 3
      ctx.fillStyle = "#E4E2E3"
      ctx.fillRect(cx - hw, cy - hh, 2 * hw, 2 * hh)
      ctx.beginPath()
      for (let e = 1; e < 6; e++) {
        const y = cy + ((height / 6) * e - cy) / 3
        curve(cx - hw, y, cx + hw, y)
      }
      for (let e = 1; e < 9; e++) {
        const x = cx + ((width / 9) * e - cx) / 3
        curve(x, cy - hh, x, cy + hh)
      }
      ctx.stroke()
      ctx.beginPath()
      for (let e = 0; e <= 5; e++) {
        const s = 1 + 0.4 * e
        const rw = width / 2 / s
        const rh = height / 2 / s
        curve(cx - rw, cy - rh, cx + rw, cy - rh)
        curve(cx + rw, cy - rh, cx + rw, cy + rh)
        curve(cx + rw, cy + rh, cx - rw, cy + rh)
        curve(cx - rw, cy + rh, cx - rw, cy - rh)
      }
      ctx.stroke()

      const grad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 180)
      grad.addColorStop(0, "rgba(22, 22, 22, 0.18)")
      grad.addColorStop(1, "rgba(22, 22, 22, 0)")
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, width, height)

      raf = requestAnimationFrame(render)
    }
    render()

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMouseMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <main className="relative min-h-screen bg-[#0a0a0a] overflow-x-hidden">
      <section
        ref={sectionRef}
        className="relative w-full h-screen bg-[#E4E2E3] overflow-hidden flex items-center justify-center select-none font-jakarta"
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-auto z-0"
        />

        <div className="absolute top-6 left-6 right-6 md:left-12 md:right-12 lg:left-20 lg:right-20 z-40 flex justify-between items-start pointer-events-none">
          <div ref={logoRef} className="pointer-events-auto origin-left pt-2">
            <div className="flex items-center gap-3">
              <SparkleIcon className="w-9 h-9 text-[#161616] drop-shadow-[0_0_10px_rgba(22,22,22,0.4)] animate-pulse" />
              <span
                className="text-xl md:text-2xl tracking-widest text-[#161616] uppercase leading-none"
                style={{ fontFamily: "var(--font-rubik-spray), 'Rubik Spray Paint', sans-serif" }}
              >
                PORTFOLIO
              </span>
            </div>
          </div>

          <div className="pointer-events-auto hidden lg:flex flex-col items-end text-right gap-3 max-w-[280px] pt-1">
            <div className="select-none origin-right">
              <div
                className="text-[#161616] hover:text-[#161616] text-3xl font-medium tracking-wide whitespace-nowrap transition-all duration-300 hover:scale-105 cursor-default"
                style={{ fontFamily: "var(--font-rubik-spray), 'Rubik Spray Paint', sans-serif" }}
              >
                Muhamad Adam
              </div>
            </div>
            <p className="text-[#161616]/85 text-xs font-jakarta leading-relaxed font-medium mt-1">
              {t("heroBio")}
            </p>
            <button
              onClick={() => startTransition("/contact")}
              className="group relative flex items-center gap-2.5 px-4 py-2 border border-[#161616]/30 rounded-full text-[#161616] text-[10px] font-bold tracking-widest hover:border-[#161616] hover:text-[#161616] transition-all duration-300 active:scale-95 bg-white/10 backdrop-blur-sm shadow-sm mt-1"
            >
              <span>{t("getInTouch")}</span>
              <ArrowIcon className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </button>
          </div>
        </div>

        <div
          ref={contentRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-10 mt-[-40px]">
            <h1 className="font-oswald font-black text-[9vw] uppercase leading-[0.8] text-[#161616] opacity-10 tracking-tighter">
              {t("heroBornTo")}
            </h1>
            <h1 className="font-oswald font-black text-[6.5vw] md:text-[8vw] uppercase leading-[0.8] text-stroke-orange tracking-tighter mt-4 min-h-[1.1em] text-center w-full px-4">
              {text}
              <span className="animate-pulse opacity-80 select-none">|</span>
            </h1>
          </div>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/main-image.png"
            alt="Main Cutout"
            className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 w-[95%] h-[82%] max-w-xl object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.25)] select-none pointer-events-none hidden lg:block"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/main-image.png"
            alt="Main Cutout Mobile"
            className="absolute bottom-40 left-1/2 -translate-x-1/2 z-20 w-[85%] h-[58%] object-contain object-bottom drop-shadow-[0_15px_30px_rgba(0,0,0,0.25)] select-none pointer-events-none lg:hidden"
          />

          <div className="absolute bottom-24 left-8 z-30 hidden lg:flex flex-col items-start text-left pointer-events-auto">
            <div className="flex flex-col gap-5 text-[#161616] font-jakarta w-48">
              {stats.map((s) => (
                <div key={s.label} className="border-t border-[#161616]/10 pt-3">
                  <h3 className="text-3xl font-extrabold text-[#161616] font-oswald tracking-tight">
                    {s.value}
                  </h3>
                  <p className="text-[#161616]/60 text-[10px] tracking-wider uppercase mt-0.5">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-20 left-6 right-6 z-30 flex flex-col items-center justify-center text-center lg:hidden bg-white/45 backdrop-blur-md p-5 rounded-2xl border border-white/30 pointer-events-auto max-w-md mx-auto">
            <p className="text-[#161616] text-xs font-jakarta leading-relaxed mb-4">
              {t("heroBio")}
            </p>
            <div className="flex items-center gap-4 w-full justify-center">
              <button
                onClick={() => startTransition("/contact")}
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#161616] text-white rounded-full text-xs font-bold tracking-widest active:scale-95 transition-transform shadow-md"
              >
                <span>{t("getInTouch")}</span>
                <ArrowIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="absolute -bottom-4 left-0 right-0 w-full py-6 overflow-hidden z-40 select-none pointer-events-none">
          <div className="w-[130vw] min-w-[130vw] -ml-[15vw] bg-[#161616] py-4 border-t border-b border-[#161616]/30 rotate-[-2.5deg] origin-center shadow-2xl pointer-events-auto">
            <div className="animate-marquee font-oswald text-[#FEF8E8] text-base md:text-lg font-extrabold uppercase tracking-widest flex items-center gap-12 whitespace-nowrap">
              {Array.from({ length: 4 }).map((_, i) => (
                <span key={i} className="flex items-center gap-12">
                  {marqueeItems.map((item) => (
                    <React.Fragment key={item}>
                      <span>{item}</span>
                      <span className="text-[#FEF8E8]/55">✦</span>
                    </React.Fragment>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Selected Work — WebGL sphere menu */}
      <section className="relative w-full bg-[#0a0a0a] text-[#FEF8E8] select-none">
        <div className="relative z-10 px-6 md:px-12 lg:px-20 pt-16 md:pt-24 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#FEF8E8]/50 mb-3">
              {t("interactiveIndex")}
            </p>
            <h2 className="font-oswald font-black uppercase text-[clamp(2.5rem,8vw,6rem)] leading-none tracking-tight py-2">
              <span className="block text-[#FEF8E8]">{t("projectsHeadingSelected")}</span>
              {/* ponytail: faint fill fallback so the stroke reads as engraved, not broken */}
              <span className="block text-[#FEF8E8]/10 [-webkit-text-stroke:2px_#FEF8E8] pt-1 pb-2">
                {t("projectsHeadingWork")}
              </span>
            </h2>
          </div>
          <div className="md:pb-2 md:text-right">
            <p className="font-cormorant italic text-xl md:text-2xl text-[#FEF8E8]/70 max-w-sm">
              {t("sphereInstruction")}
            </p>
            <button
              onClick={() => startTransition("/projects")}
              className="group inline-flex items-center gap-2.5 px-5 py-2.5 border border-[#FEF8E8]/40 rounded-full text-[#FEF8E8] text-[10px] font-bold tracking-widest hover:bg-[#FEF8E8] hover:text-[#161616] transition-all duration-300 active:scale-95 mt-5"
            >
              <span>{t("viewAllProjects")}</span>
              <ArrowIcon className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </button>
          </div>
        </div>

        <div className="infinite-menu-section relative w-full h-[75vh] min-h-[620px] md:h-[88vh] my-2">
          <InfiniteMenu items={selectedWork} scale={0.85} />
        </div>

        <div className="relative py-10 my-4 w-full overflow-hidden">
          <div className="w-[130vw] min-w-[130vw] -ml-[15vw] bg-[#161616] py-4 border-t border-b border-[#FEF8E8]/15 rotate-[-2.5deg] origin-center shadow-2xl">
            <div className="animate-marquee font-oswald text-[#FEF8E8] text-base md:text-lg font-extrabold uppercase tracking-widest flex items-center gap-12 whitespace-nowrap">
              {Array.from({ length: 4 }).map((_, i) => (
                <span key={i} className="flex items-center gap-12">
                  {SELECTED_WORK.map((item) => (
                    <React.Fragment key={item.title}>
                      <span>{item.title}</span>
                      <span className="text-[#FEF8E8]/55">✦</span>
                    </React.Fragment>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}