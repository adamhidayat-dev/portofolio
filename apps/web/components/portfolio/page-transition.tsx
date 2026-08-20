"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import gsap from "gsap"

type TransitionContextValue = {
  startTransition: (href: string) => void
}

const TransitionContext = React.createContext<TransitionContextValue | null>(
  null,
)

export function usePageTransition() {
  const ctx = React.useContext(TransitionContext)
  if (!ctx) throw new Error("usePageTransition must be used within a PageTransitionProvider")
  return ctx
}

function Panel() {
  return (
    <div className="absolute inset-0 w-full h-full bg-[#161616]">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute bottom-full left-0 w-full h-[15vh] fill-[#161616] pointer-events-none"
      >
        <path d="M 0 100 C 30 0, 70 0, 100 100 Z" />
      </svg>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute top-full left-0 w-full h-[15vh] fill-[#161616] pointer-events-none"
      >
        <path d="M 0 0 C 30 100, 70 100, 100 0 Z" />
      </svg>
    </div>
  )
}

export function PageTransitionProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const transitioning = React.useRef(false)
  const overlayRef = React.useRef<HTMLDivElement>(null)
  const panelsRef = React.useRef<HTMLDivElement[]>([])

  const hidePanels = () => {
    gsap
      .timeline({
        onComplete: () => {
          transitioning.current = false
          if (overlayRef.current) {
            overlayRef.current.style.pointerEvents = "none"
          }
        },
      })
      .to(panelsRef.current, {
        y: "-115%",
        duration: 0.7,
        stagger: { each: 0.08, from: "end" },
        ease: "power2.inOut",
      })
  }

  const value = React.useMemo<TransitionContextValue>(
    () => ({
      startTransition: (href: string) => {
        if (transitioning.current) return
        transitioning.current = true
        if (overlayRef.current) {
          overlayRef.current.style.pointerEvents = "auto"
        }
        gsap
          .timeline({
            onComplete: () => {
              router.push(href)
              setTimeout(() => {
                hidePanels()
              }, 150)
            },
          })
          .to(panelsRef.current, {
            y: "0%",
            duration: 0.7,
            stagger: 0.08,
            ease: "power2.inOut",
          })
      },
    }),
    [router]
  )

  return (
    <TransitionContext.Provider value={value}>
      {children}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[9999] pointer-events-none flex"
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) panelsRef.current[i] = el
            }}
            className="w-[16.667%] h-[100vh] relative flex-shrink-0"
            style={{ transform: "translateY(-115%)" }}
          >
            <Panel />
          </div>
        ))}
      </div>
    </TransitionContext.Provider>
  )
}