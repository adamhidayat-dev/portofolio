"use client"

import * as React from "react"

/**
 * Shared glass-pill look used by the header (NavPill) and the lanyard's
 * FLIP / COPY INFO controls. The SVG filter (rendered once per page) gives the
 * pill its subtle folded-corner refraction.
 */
export function GlassDistortion() {
  return (
    <svg style={{ display: "none" }}>
      <filter
        id="glass-distortion"
        x="0%"
        y="0%"
        width="100%"
        height="100%"
        filterUnits="objectBoundingBox"
      >
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.001 0.005"
          numOctaves="1"
          seed="17"
          result="turbulence"
        />
        <feComponentTransfer in="turbulence" result="mapped">
          <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
          <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
          <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
        </feComponentTransfer>
        <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
        <feSpecularLighting
          in="softMap"
          surfaceScale="5"
          specularConstant="1"
          specularExponent="100"
          lightingColor="white"
          result="specLight"
        >
          <fePointLight x="-200" y="-200" z="300" />
        </feSpecularLighting>
        <feComposite
          in="specLight"
          operator="arithmetic"
          k1="0"
          k2="1"
          k3="1"
          k4="0"
          result="litImage"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="softMap"
          scale="15"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
  )
}

export function GlassButton({
  children,
  className = "",
  style = {},
  href,
  target = "_blank",
  onClick,
  glass = "rgba(255, 255, 255, 0.25)",
  rounded = "rounded-full",
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  href?: string
  target?: string
  onClick?: React.MouseEventHandler<HTMLDivElement>
  glass?: string
  rounded?: string
}) {
  const mergedStyle: React.CSSProperties = {
    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.3), 0 0 1px 1px rgba(255, 255, 255, 0.4)",
    transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 2.2)",
    ...style,
  }
  const onKeyDown = onClick
    ? (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onClick(e as unknown as React.MouseEvent<HTMLDivElement>)
        }
      }
    : undefined
  const inner = (
    <div
      onClick={onClick}
      onKeyDown={onKeyDown}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={`relative flex font-semibold text-black cursor-pointer transition-all duration-700 ${rounded} ${className}`}
      style={mergedStyle}
    >
      <div
        className={`absolute inset-0 z-0 ${rounded}`}
        style={{
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          isolation: "isolate",
        }}
      />
      <div
        className={`absolute inset-0 z-10 ${rounded}`}
        style={{ background: glass }}
      />
      <div
        className={`absolute inset-0 z-20 ${rounded}`}
        style={{
          boxShadow:
            "inset 1px 1px 1.5px 0 rgba(255, 255, 255, 0.6), inset -1px -1px 1.5px 0 rgba(255, 255, 255, 0.4)",
        }}
      />
      <div className="relative z-30 w-full">{children}</div>
    </div>
  )
  return href ? (
    <a href={href} target={target} rel="noopener noreferrer" className="block">
      {inner}
    </a>
  ) : (
    inner
  )
}
