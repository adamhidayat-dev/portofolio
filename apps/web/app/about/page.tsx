"use client"

import * as React from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

import { usePageTransition } from "@/components/portfolio/page-transition"
import { useLanguage } from "@/components/portfolio/language-provider"
import dynamic from "next/dynamic"

const Lanyard = dynamic(() => import("@/components/portfolio/Lanyard"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border-2 border-[#161616]/20 border-t-[#161616] animate-spin" />
    </div>
  ),
})

class LanyardBoundary extends React.Component<
  { children: React.ReactNode },
  { error: string | null }
> {
  state = { error: null as string | null }
  static getDerivedStateFromError(error: unknown) {
    return { error: error instanceof Error ? error.message : String(error) }
  }
  render() {
    if (this.state.error) {
      return (
        <div className="w-full h-full flex items-center justify-center p-6">
          <pre className="font-mono text-xs text-red-600 text-center break-all whitespace-pre-wrap">
            {this.state.error}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}

export default function About() {
  const sectionRef = React.useRef<HTMLElement>(null)
  const titleRef = React.useRef<HTMLDivElement>(null)
  const headingRef = React.useRef<HTMLDivElement>(null)
  const imageRef = React.useRef<HTMLDivElement>(null)
  const card1Ref = React.useRef<HTMLDivElement>(null)
  const card2Ref = React.useRef<HTMLDivElement>(null)
  const card3Ref = React.useRef<HTMLDivElement>(null)
  const { startTransition } = usePageTransition()
  const { t } = useLanguage()

  const competencies = React.useMemo(
    () => [
      {
        title: t("comp1Title"),
        subtitle: t("comp1Sub"),
        items: [t("comp1a"), t("comp1b"), t("comp1c"), t("comp1d")],
        dark: true,
      },
      {
        title: t("comp2Title"),
        subtitle: t("comp2Sub"),
        items: [t("comp2a"), t("comp2b"), t("comp2c"), t("comp2d")],
        dark: false,
      },
      {
        title: t("comp3Title"),
        subtitle: t("comp3Sub"),
        items: [t("comp3a"), t("comp3b"), t("comp3c"), t("comp3d")],
        dark: true,
      },
      {
        title: t("comp4Title"),
        subtitle: t("comp4Sub"),
        items: [t("comp4a"), t("comp4b"), t("comp4c"), t("comp4d")],
        dark: false,
      },
      {
        title: t("comp5Title"),
        subtitle: t("comp5Sub"),
        items: [t("comp5a"), t("comp5b"), t("comp5c"), t("comp5d")],
        dark: true,
      },
      {
        title: t("comp6Title"),
        subtitle: t("comp6Sub"),
        items: [t("comp6a"), t("comp6b"), t("comp6c"), t("comp6d")],
        dark: false,
      },
    ],
    [t]
  )

  const timeline = React.useMemo(
    () => [
      { phase: t("tl1Phase"), role: t("tl1Role"), desc: t("tl1Desc") },
      { phase: t("tl2Phase"), role: t("tl2Role"), desc: t("tl2Desc") },
      { phase: t("tl3Phase"), role: t("tl3Role"), desc: t("tl3Desc") },
      { phase: t("tl4Phase"), role: t("tl4Role"), desc: t("tl4Desc") },
    ],
    [t]
  )

  useGSAP(
    () => {
      gsap
        .timeline({ delay: 0.2 })
        .from(titleRef.current, { y: -20, opacity: 0, duration: 0.8, ease: "power3.out" })
        .from(headingRef.current, { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.4")
        .from(imageRef.current, { scale: 0.95, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.6")
        .from(
          [card1Ref.current, card2Ref.current, card3Ref.current],
          { y: 30, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" },
          "-=0.6"
        )
    },
    { scope: sectionRef }
  )

  return (
    <main className="relative min-h-screen bg-palette-grey">
      <section
        id="about"
        ref={sectionRef}
        className="relative w-full min-h-screen bg-white text-[#161616] pt-28 md:pt-36 pb-20 px-6 md:px-12 lg:px-20 flex flex-col items-center justify-center z-20 overflow-hidden font-jakarta"
      >
        <div
          ref={titleRef}
          className="absolute top-6 left-6 md:left-12 lg:left-20 z-20 text-[#161616] text-2xl md:text-3xl tracking-widest pointer-events-none drop-shadow-md origin-center"
          style={{ fontFamily: "var(--font-rubik-spray), 'Rubik Spray Paint', sans-serif" }}
        >
          {t("aboutTitle")}
        </div>

        <div className="max-w-6xl w-full mx-auto flex flex-col">
          <div
            ref={headingRef}
            className="w-full relative select-none mb-8 md:mb-12 flex flex-col gap-3"
          >
            <h1 className="font-oswald font-black text-[9vw] md:text-[10vw] uppercase leading-[0.8] text-[#161616] tracking-tighter">
              MUHAMAD ADAM
            </h1>
            <h1 className="font-oswald font-black text-[9vw] md:text-[10vw] uppercase leading-[0.8] text-[#161616] tracking-tighter">
              HIDAYAT
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-stretch">
            <div className="lg:col-span-7 flex flex-col gap-6 order-2 lg:order-1">
              <div
                ref={card1Ref}
                className="bg-[#161616] text-[#FEF8E8] rounded-3xl p-8 md:p-10 border-4 border-[#161616] flex flex-col justify-between min-h-[320px] shadow-sm"
              >
                <div>
                  <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#FEF8E8]/60 mb-3 block">
                    {t("aboutClassTag")}
                  </span>
                  <h2 className="font-oswald font-bold text-2xl md:text-3xl lg:text-4xl tracking-wide uppercase text-white mb-4">
                    {t("aboutSpecialistHeading")}
                  </h2>
                  <p className="font-jakarta font-light text-base md:text-lg leading-relaxed text-[#E4E2E3]/95 max-w-2xl">
                    {t("aboutBioDesc")}
                  </p>
                </div>
                <div
                  className="text-2xl md:text-3xl transform -rotate-3 select-none text-[#FEF8E8]/90 self-end mt-4 cursor-default"
                  style={{ fontFamily: "var(--font-rubik-spray), 'Rubik Spray Paint', sans-serif" }}
                >
                  Muhamad Adam
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                  ref={card2Ref}
                  className="bg-[#161616] text-[#FEF8E8] rounded-3xl p-8 border-4 border-[#161616] flex flex-col justify-between min-h-[220px] hover:shadow-[0_12px_30px_rgba(22,22,22,0.15)] transition-shadow duration-300"
                >
                  <div>
                    <h3 className="font-oswald font-black text-2xl md:text-3xl uppercase tracking-tighter mb-2 text-white">
                      {t("aboutCard2Title")}
                    </h3>
                    <span className="font-jakarta font-medium text-xs tracking-wider opacity-90 uppercase">
                      {t("aboutCard2Tag")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xs uppercase tracking-widest font-mono opacity-80">
                      {t("aboutCard2Cta")}
                    </span>
                    <button
                      onClick={() => startTransition("/contact")}
                      className="w-12 h-12 rounded-full bg-[#161616] hover:bg-[#FEF8E8] hover:text-[#161616] text-white flex items-center justify-center border-2 border-[#161616] transition-all duration-300 transform hover:scale-105"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div
                  ref={card3Ref}
                  className="bg-white text-[#161616] rounded-3xl p-8 border-4 border-[#161616] flex flex-col justify-between min-h-[220px]"
                >
                  <div>
                    <h3 className="font-cormorant font-bold text-2xl md:text-3xl italic leading-tight text-[#161616] mb-3">
                      {t("aboutCard3Title")}
                    </h3>
                    <p className="font-jakarta font-light text-sm text-gray-700 leading-relaxed">
                      {t("aboutCard3Desc")}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#161616] font-semibold mt-4">
                    <span>✦ OBBY AI &amp; TJKT </span>
                  </div>
                </div>
              </div>
            </div>

            <div
              ref={imageRef}
              className="lg:col-span-5 relative w-full h-[450px] md:h-[500px] lg:h-auto min-h-[420px] rounded-3xl border-4 border-[#161616] overflow-hidden bg-white order-1 lg:order-2"
            >
              <LanyardBoundary>
                <Lanyard
                  frontImage="/my-image.png"
                  backImage="/lanyard/back-card.png"
                  cardInfo="Muhamad Adam Hidayat — TJKT 3 — SMKN 1 Majalengka"
                />
              </LanyardBoundary>
            </div>
          </div>

          {/* ——— BIO ——— */}
          <div className="mt-16 md:mt-24 w-full">
            <div className="flex items-center gap-3 mb-6 md:mb-8 select-none">
              <span className="text-[#161616]">✦</span>
              <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#161616]/60 font-bold">
                {t("aboutBioTag")}
              </span>
              <span className="h-px flex-1 bg-[#161616]/15" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 items-start">
              <p className="lg:col-span-7 font-cormorant font-bold italic text-3xl md:text-5xl leading-tight text-[#161616]">
                {t("aboutBioBig")}
              </p>
              <div className="lg:col-span-5 flex flex-col gap-4">
                <p className="font-jakarta font-light text-sm md:text-base leading-relaxed text-gray-700">
                  {t("aboutBioP1")}
                </p>
                <p className="font-jakarta font-light text-sm md:text-base leading-relaxed text-gray-700">
                  {t("aboutBioP2")}
                </p>
              </div>
            </div>
          </div>

          {/* ——— WHAT I DO ——— */}
          <div className="mt-16 md:mt-24 w-full">
            <div className="flex items-center gap-3 mb-6 md:mb-8 select-none">
              <span className="text-[#161616]">✦</span>
              <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#161616]/60 font-bold">
                {t("aboutMatrixTag")}
              </span>
              <span className="h-px flex-1 bg-[#161616]/15" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {competencies.map((s) => (
                <div
                  key={s.title}
                  className={`rounded-3xl border-4 border-[#161616] p-6 md:p-7 flex flex-col justify-between min-h-[260px] ${s.dark ? "bg-[#161616] text-[#FEF8E8]" : "bg-white text-[#161616]"
                    }`}
                >
                  <div>
                    <h3
                      className={`font-oswald font-bold text-xl md:text-2xl uppercase tracking-tight leading-tight ${s.dark ? "text-white" : "text-[#161616]"
                        }`}
                    >
                      {s.title}
                    </h3>
                    <p
                      className={`font-mono text-[10px] uppercase tracking-widest mt-1 mb-4 ${s.dark ? "text-[#FEF8E8]/60" : "text-[#161616]/60"
                        }`}
                    >
                      {s.subtitle}
                    </p>
                  </div>
                  <ul className="flex flex-col gap-1.5 mt-2">
                    {s.items.map((item) => (
                      <li
                        key={item}
                        className={`font-mono text-[11px] tracking-wider uppercase ${s.dark ? "text-[#FEF8E8]/75" : "text-[#161616]/70"
                          }`}
                      >
                        <span className="mr-2 opacity-60">✦</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* ——— STATS ——— */}
          <div className="mt-16 md:mt-24 w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 border-4 border-[#161616] rounded-3xl overflow-hidden bg-[#161616]">
              {[
                { value: "XI TKJ 3", label: "SMKN 1 Majalengka" },
                { value: "4+", label: t("statsPhases") },
                { value: "Self-Hosted", label: t("statsObby") },
              ].map((s, i) => (
                <div
                  key={s.label}
                  className={`bg-[#161616] text-[#FEF8E8] p-8 md:p-10 flex flex-col gap-1 ${i > 0
                      ? "border-t-2 md:border-t-0 md:border-l-2 border-[#FEF8E8]/15"
                      : ""
                    }`}
                >
                  <span className="font-oswald font-black text-4xl md:text-5xl leading-none text-white">
                    {s.value}
                  </span>
                  <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-[#FEF8E8]/60 mt-2">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ——— TIMELINE ——— */}
          <div className="mt-16 md:mt-24 w-full">
            <div className="flex items-center gap-3 mb-6 md:mb-8 select-none">
              <span className="text-[#161616]">✦</span>
              <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#161616]/60 font-bold">
                {t("aboutTimelineTag")}
              </span>
              <span className="h-px flex-1 bg-[#161616]/15" />
            </div>
            <div className="border-y-2 border-[#161616]">
              {timeline.map((e) => (
                <div
                  key={e.phase}
                  className="grid grid-cols-1 md:grid-cols-12 gap-1 md:gap-6 py-6 md:py-8 border-b border-[#161616]/15 last:border-b-0"
                >
                  <span className="md:col-span-4 font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-[#161616]/70 font-bold py-1">
                    {e.phase}
                  </span>
                  <div className="md:col-span-8">
                    <h4 className="font-oswald font-bold text-lg md:text-xl uppercase tracking-wide text-[#161616]">
                      {e.role}
                    </h4>
                    <p className="font-jakarta font-light text-sm md:text-base text-gray-600 leading-relaxed mt-1.5">
                      {e.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}