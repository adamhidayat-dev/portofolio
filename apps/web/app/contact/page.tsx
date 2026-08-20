"use client"

import * as React from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { AnimatePresence, motion } from "framer-motion"
import { Check, Copy, X } from "lucide-react"

import { useLanguage } from "@/components/portfolio/language-provider"

const EMAIL = "mail.adamhidayat@gmail.com"
const [EMAIL_NAME, EMAIL_DOMAIN] = EMAIL.split("@")

const STICKERS = [
  {
    id: "badge-rock",
    type: "badge",
    badgeType: "rock",
    initialX: "8%",
    initialY: "18%",
    mobileX: "8%",
    mobileY: "10%",
    rotate: 8,
  },
  {
    id: "discord",
    type: "capsule",
    label: "DISCORD ↗",
    href: "https://discord.com/users/944611504047685692",
    initialX: "32%",
    initialY: "12%",
    mobileX: "40%",
    mobileY: "8%",
    rotate: -12,
  },
  {
    id: "github",
    type: "capsule",
    label: "GITHUB ↗",
    href: "https://github.com/", // TODO: Ganti dengan link GitHub
    initialX: "65%",
    initialY: "18%",
    mobileX: "8%",
    mobileY: "24%",
    rotate: -8,
  },
  {
    id: "badge-lips",
    type: "badge",
    badgeType: "lips",
    initialX: "24%",
    initialY: "48%",
    mobileX: "58%",
    mobileY: "38%",
    rotate: -8,
  },
  {
    id: "linkedin",
    type: "capsule",
    label: "LINKEDIN ↗",
    href: "https://www.linkedin.com/in/muhamad-adam-hidayat-undefined-b8355142b",
    initialX: "42%",
    initialY: "38%",
    mobileX: "8%",
    mobileY: "40%",
    rotate: -6,
  },
  {
    id: "badge-heart",
    type: "badge",
    badgeType: "heart",
    initialX: "72%",
    initialY: "35%",
    mobileX: "8%",
    mobileY: "56%",
    rotate: 14,
  },
  {
    id: "instagram",
    type: "capsule",
    label: "INSTAGRAM ↗",
    href: "https://instagram.com/ktexucoder",
    initialX: "78%",
    initialY: "55%",
    mobileX: "44%",
    mobileY: "56%",
    rotate: 12,
  },
  {
    id: "smkn1-majalengka",
    type: "capsule",
    label: "SMKN 1 MAJALENGKA ↗",
    href: "https://smkn1majalengka.sch.id/",
    initialX: "46%",
    initialY: "64%",
    mobileX: "46%",
    mobileY: "72%",
    rotate: -10,
  },
  {
    id: "send-message",
    type: "capsule",
    label: "SEND MESSAGE ✦",
    isAction: true,
    initialX: "62%",
    initialY: "68%",
    mobileX: "18%",
    mobileY: "86%",
    rotate: 6,
    isPrimary: true,
  },
]

function BadgeIcon({ badgeType }: { badgeType: string }) {
  if (badgeType === "rock") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 text-[#161616]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 10h-2V6a2 2 0 0 0-4 0v4H9V5a2 2 0 0 0-4 0v6.5a4.5 4.5 0 0 0 9 0V10" />
        <path d="M5 11.5V7a2 2 0 0 1 4 0v4.5" />
        <path d="M17 11.5v3.5a5 5 0 0 1-10 0v-3.5" />
      </svg>
    )
  }
  if (badgeType === "lips") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#161616]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 12c3-2 5-3 9-1 4-2 6-1 9 1" fill="#161616" />
        <path d="M3 12c4 3 14 3 18 0" fill="#161616" />
        <path d="M10 12v3c0 1.5 1 2 2 2s2-.5 2-2v-3" fill="#FFEAA7" />
      </svg>
    )
  }
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 text-[#161616]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
        fill="#161616"
      />
      <path d="M13 6l-3.5 5.5h3l-2 6 4.5-6.5h-3.5Z" fill="#FFEAA7" />
    </svg>
  )
}

function Badge({
  sticker,
  spinText,
}: {
  sticker: (typeof STICKERS)[number]
  spinText: string
}) {
  return (
    <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-36 md:h-36 rounded-full bg-[#FEF8E8] border border-[#161616] flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full animate-[spin_30s_linear_infinite]"
      >
        <path
          id={`circlePath-${sticker.id}`}
          d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
          fill="none"
        />
        <text className="text-[5.5px] sm:text-[6px] md:text-[6.5px] font-bold font-jakarta fill-[#161616] tracking-[0.19em]">
          <textPath href={`#circlePath-${sticker.id}`} startOffset="0%">
            {spinText}
          </textPath>
        </text>
      </svg>
      <div className="relative z-10 flex items-center justify-center">
        <BadgeIcon badgeType={sticker.badgeType ?? ""} />
      </div>
      {sticker.badgeType === "lips" && (
        <div
          className="absolute bottom-[2px] right-[3px] md:bottom-[3px] md:right-[4px] w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-[#E4E2E3] border-l border-t border-[#161616] rounded-tl-full shadow-inner rotate-12 pointer-events-none"
          style={{ transformOrigin: "bottom right" }}
        />
      )}
    </div>
  )
}

function DraggableSticker({
  sticker,
  isCapsule,
  left,
  top,
  constraintsRef,
  onAction,
  label,
  spinText,
}: {
  sticker: (typeof STICKERS)[number]
  isCapsule: boolean
  left: string
  top: string
  constraintsRef: React.RefObject<HTMLDivElement | null>
  onAction: () => void
  label?: string
  spinText: string
}) {
  const isDragging = React.useRef(false)

  return (
    <motion.div
      drag
      dragConstraints={constraintsRef}
      dragElastic={0}
      dragMomentum={false}
      onDragStart={() => { isDragging.current = true }}
      onDragEnd={() => { setTimeout(() => { isDragging.current = false }, 100) }}
      whileDrag={{
        scale: 1.05,
        rotate: 0,
        boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)",
        zIndex: 50,
      }}
      initial={{ rotate: sticker.rotate }}
      className="absolute select-none group cursor-grab active:cursor-grabbing"
      style={{ left, top, touchAction: "none" }}
    >
      {isCapsule ? (
        <div
          onClick={() => { if (!isDragging.current) onAction() }}
          className={`flex items-center gap-1.5 md:gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3.5 rounded-full border border-[#161616] font-jakarta font-bold text-xs sm:text-sm md:text-base shadow-md transition-all duration-300 ${
            sticker.isPrimary
              ? "bg-[#161616] text-[#FEF8E8] hover:bg-[#161616]/90 border-[#161616] shadow-lg shadow-[#161616]/15"
              : "bg-[#FEF8E8] text-[#161616] hover:bg-white border-[#161616]"
          }`}
        >
          <span>{label ?? sticker.label}</span>
        </div>
      ) : (
        <Badge sticker={sticker} spinText={spinText} />
      )}
    </motion.div>
  )
}

export default function Contact() {
  const sectionRef = React.useRef<HTMLElement>(null)
  const titleRef = React.useRef<HTMLDivElement>(null)
  const marqueeRef = React.useRef<HTMLDivElement>(null)
  const metaRef = React.useRef<HTMLDivElement>(null)
  const stickersRef = React.useRef<HTMLDivElement>(null)
  const emailRef = React.useRef<HTMLDivElement>(null)
  const { t } = useLanguage()
  const waHref = `https://wa.me/?text=${encodeURIComponent(t("contactWaMessage"))}`

  const [copied, setCopied] = React.useState(false)
  const [showForm, setShowForm] = React.useState(false)
  const [showSuccess, setShowSuccess] = React.useState(false)
  const [submitting, setSubmitting] = React.useState(false)
  const [isMobile, setIsMobile] = React.useState(false)
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useGSAP(
    () => {
      gsap
        .timeline({ delay: 0.2 })
        .from(titleRef.current, { y: -20, opacity: 0, duration: 0.8, ease: "power3.out" })
        .from(marqueeRef.current, { y: -30, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
        .from(
          metaRef.current ? metaRef.current.children : [],
          { y: 20, opacity: 0, duration: 0.6, stagger: 0.15, ease: "power3.out" },
          "-=0.4"
        )
        .from(
          stickersRef.current ? stickersRef.current.children : [],
          {
            scale: 0,
            opacity: 0,
            rotate: () => 40 * Math.random() - 20,
            duration: 0.8,
            stagger: 0.08,
            ease: "back.out(1.5)",
          },
          "-=0.4"
        )
        .from(emailRef.current, { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.4")
    },
    { scope: sectionRef }
  )

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (e) {
      console.error("Failed to copy text: ", e)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "98f93aa7-3edd-4b73-a0d1-2098b9435455",
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setShowForm(false)
        setShowSuccess(true)
        setForm({ name: "", email: "", subject: "", message: "" })
      }
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass =
    "peer w-full pt-6 pb-2 px-4 bg-white/20 border border-[#161616] rounded-2xl text-palette-midnight focus:outline-none focus:border-[#161616] focus:bg-white/60 transition-all duration-300 text-base"
  const labelClass =
    "absolute left-4 top-4 text-palette-stone text-base pointer-events-none transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-[#161616] peer-focus:font-semibold peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-[#161616]/75"

  return (
    <main className="relative min-h-screen bg-palette-grey">
      <section
        ref={sectionRef}
        className="relative w-full min-h-screen bg-palette-grey text-[#161616] pt-28 md:pt-36 pb-20 flex flex-col justify-between z-20"
      >
        <div
          ref={titleRef}
          className="absolute top-6 left-6 md:left-12 lg:left-20 z-20 text-[#161616] text-2xl md:text-3xl tracking-widest pointer-events-none drop-shadow-md origin-center"
          style={{ fontFamily: "var(--font-rubik-spray), 'Rubik Spray Paint', sans-serif" }}
        >
          {t("contactTitle")}
        </div>

        <div ref={marqueeRef} className="w-full select-none overflow-hidden py-4">
          <div className="animate-marquee font-cormorant text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-medium uppercase tracking-tight text-[#161616] flex items-center gap-8 whitespace-nowrap leading-[1.2]">
            <span>{t("contactMarquee")}&nbsp;</span>
            <span>{t("contactMarquee")}&nbsp;</span>
          </div>
          <div className="border-t border-[#161616] w-full my-4 md:my-6 px-8" />
          <div
            ref={metaRef}
            className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-4 text-[10px] md:text-xs font-semibold font-jakarta tracking-wider text-[#161616]/70 uppercase"
          >
            <div className="text-center md:text-left">
              {t("contactMetaRole")}
            </div>
            <div className="text-center">{t("contactMetaDrag")}</div>
            <div className="text-center md:text-right">
              {t("contactMetaRights")}
            </div>
          </div>
        </div>

        <div
          ref={stickersRef}
          className="relative w-full flex-grow min-h-[460px] md:min-h-[480px] overflow-hidden select-none pointer-events-auto"
        >
          {STICKERS.map((sticker) => {
            const isCapsule = sticker.type === "capsule"
            const left = isMobile ? sticker.mobileX : sticker.initialX
            const top = isMobile ? sticker.mobileY : sticker.initialY
            const href = sticker.href
            return (
              <DraggableSticker
                key={sticker.id}
                sticker={sticker}
                isCapsule={isCapsule}
                left={left}
                top={top}
                constraintsRef={stickersRef}
                label={sticker.isAction ? `${t("formSubmitBtn")} ✦` : undefined}
                spinText={t("contactBadgeText")}
                onAction={() => {
                  if (sticker.isAction) setShowForm(true)
                  else if (href) window.open(href, "_blank", "noopener,noreferrer")
                }}
              />
            )
          })}
        </div>

        <div
          ref={emailRef}
          className="relative w-full mt-auto px-6 py-8 md:py-10 flex flex-col items-center justify-center"
        >
          <span className="text-[10px] md:text-xs font-semibold font-jakarta tracking-[0.35em] text-[#161616]/50 uppercase mb-4 md:mb-6 select-none">
            {t("copyEmailHint")}
          </span>

          <h1
            onClick={copyEmail}
            title={t("copyEmailHint")}
            className="font-cormorant font-normal text-[clamp(1.25rem,4vw,3.5rem)] leading-[1.15] text-center text-[#161616] select-none cursor-pointer active:scale-95 transition-all duration-500 tracking-tighter hover:tracking-[0.01em] bg-[linear-gradient(to_right,#161616,#161616)] bg-no-repeat bg-[length:0%_2px] hover:bg-[length:100%_2px] bg-left-bottom"
          >
            <span className="whitespace-nowrap">{EMAIL_NAME}</span>
            <span className="whitespace-nowrap italic text-[#161616]/55">@{EMAIL_DOMAIN}</span>
          </h1>

          <button
            onClick={copyEmail}
            aria-label={t("copyEmailHint")}
            className="group mt-6 md:mt-7 flex items-center gap-2.5 rounded-full border border-[#161616]/15 pl-3 pr-5 py-2 text-[11px] font-jakarta font-semibold tracking-[0.2em] text-[#161616]/70 uppercase hover:bg-[#161616] hover:text-[#FEF8E8] hover:border-[#161616] active:scale-95 transition-colors duration-300 cursor-pointer"
          >
            <span className="w-6 h-6 rounded-full bg-[#161616] text-[#FEF8E8] flex items-center justify-center group-hover:bg-[#FEF8E8] group-hover:text-[#161616] transition-colors duration-300">
              {copied ? <Check size={12} /> : <Copy size={12} />}
            </span>
            {copied ? t("copied") : t("copyAddressBtn")}
          </button>

          <div className="flex items-center gap-3 w-full max-w-md mt-6 md:mt-8 select-none">
            <span className="h-px flex-1 bg-[#161616]/15" />
            <span className="text-[#161616]/70 text-xs md:text-sm leading-none">✦</span>
            <span className="h-px flex-1 bg-[#161616]/15" />
          </div>

          <AnimatePresence>
            {copied && (
              <motion.span
                initial={{ opacity: 0, y: 15, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.9 }}
                className="absolute -top-12 bg-[#161616] text-[#FEF8E8] text-xs font-bold px-4 py-2 rounded-xl shadow-lg border border-[#161616] flex items-center gap-1.5"
              >
                <Check size={14} /> {t("emailCopied")}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </section>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-sm px-6"
          >
            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="bg-[#FEF8E8] border border-[#161616] shadow-2xl rounded-3xl p-6 md:p-10 max-w-xl w-full text-[#161616] relative flex flex-col justify-between overflow-hidden"
            >
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-6 right-6 w-9 h-9 rounded-full border border-[#161616] flex items-center justify-center hover:bg-[#161616] hover:text-white transition-colors duration-300 cursor-pointer"
              >
                <X size={18} />
              </button>
              <div>
                <span className="text-xs font-bold tracking-widest text-[#161616] uppercase font-jakarta">
                  {t("formDirectLine")}
                </span>
                <h3 className="text-3xl font-bold mt-1 mb-6 tracking-tight font-sans">
                  {t("formTitle")}
                </h3>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="relative w-full">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder=" "
                      required
                      disabled={submitting}
                      className={inputClass}
                    />
                    <label htmlFor="name" className={labelClass}>
                      {t("formNameLabel")}
                    </label>
                  </div>
                  <div className="relative w-full">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder=" "
                      required
                      disabled={submitting}
                      className={inputClass}
                    />
                    <label htmlFor="email" className={labelClass}>
                      {t("formEmailLabel")}
                    </label>
                  </div>
                  <div className="relative w-full">
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder=" "
                      required
                      disabled={submitting}
                      className={inputClass}
                    />
                    <label htmlFor="subject" className={labelClass}>
                      {t("formSubjectLabel")}
                    </label>
                  </div>
                  <div className="relative w-full">
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      placeholder=" "
                      required
                      disabled={submitting}
                      className={`${inputClass} pb-3 resize-none`}
                    />
                    <label htmlFor="message" className={labelClass}>
                      {t("formMessageLabel")}
                    </label>
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 bg-[#161616] text-[#FEF8E8] font-semibold border border-[#161616] rounded-2xl hover:bg-[#161616]/90 hover:scale-[1.01] active:scale-[0.99] disabled:bg-gray-400 disabled:scale-100 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-[#161616]/20 flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    {submitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        <span>{t("formSubmittingBtn")}</span>
                      </>
                    ) : (
                      <>
                        <span>{t("formSubmitBtn")}</span>
                        <Copy size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md px-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="bg-[#FEF8E8] border border-[#161616] shadow-2xl rounded-3xl p-8 md:p-10 max-w-md w-full text-center relative overflow-hidden flex flex-col items-center justify-center"
            >
              <div className="w-20 h-20 text-[#161616] mb-6 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <motion.circle
                    cx="26"
                    cy="26"
                    r="23"
                    stroke="currentColor"
                    strokeWidth="4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                  <motion.path
                    d="M16 26L23 33L36 18"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.5, duration: 0.4, ease: "easeOut" }}
                  />
                </svg>
              </div>
              <h4
                className="text-3xl font-semibold tracking-wider text-[#161616] mb-3"
style={{ fontFamily: "var(--font-rubik-spray), 'Rubik Spray Paint', sans-serif" }}
              >
                {t("formSuccessTitle")}
              </h4>
              <p className="text-[#161616]/80 font-light leading-relaxed mb-8">
                {t("formSuccessDesc")}
              </p>
              <button
                onClick={() => setShowSuccess(false)}
                className="px-8 py-3 bg-palette-midnight border border-[#161616] hover:bg-[#161616] hover:text-[#FEF8E8] text-white rounded-xl shadow-lg transition-colors duration-300 font-semibold cursor-pointer"
              >
                {t("backToSite")}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}