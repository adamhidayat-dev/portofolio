/* eslint-disable react/no-unknown-property */
"use client"

import { Suspense, useEffect, useMemo, useRef, useState } from "react"
import { Canvas, extend, useFrame } from "@react-three/fiber"
import { useGLTF, useTexture, Environment, Lightformer } from "@react-three/drei"
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from "@react-three/rapier"
import { MeshLineGeometry, MeshLineMaterial } from "meshline"
import * as THREE from "three"
import { Check, Copy, RefreshCw } from "lucide-react"

import { GlassButton } from "@/components/portfolio/glass-button"

declare module "@react-three/fiber" {
  interface ThreeElements {
    meshLineGeometry: any
    meshLineMaterial: any
  }
}

extend({ MeshLineGeometry, MeshLineMaterial })

// Assets live in /public/lanyard — plain paths avoid Turbopack's .glb import bug.
const CARD_GLB = "/lanyard/card.glb"

// 1x1 transparent pixel — lets useTexture be called unconditionally when a
// front/back image isn't supplied.
const BLANK_PIXEL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="

// The card model's front face is UV-mapped to the LEFT half of the texture
// atlas and the back face to the RIGHT half (measured from card.glb). Each
// custom image is composited into its own half so the two faces render
// independently, aspect-preserving (no stretching).
const FRONT_UV_RECT = { x: 0, y: 0, w: 0.5, h: 0.755 }
const BACK_UV_RECT = { x: 0.5, y: 0, w: 0.5, h: 0.757 }

export default function Lanyard({
  // Camera pulled back (29 → 31): the previous zoom made the whole lanyard too
  // big in frame, so the strap tip no longer sat cleanly on the gantungan.
  position = [0, 0.5, 31],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
  frontImage = null,
  backImage = null,
  imageFit = "cover",
  lanyardImage = null,
  lanyardWidth = 1.0,
  cardInfo = "Muhamad Adam Hidayat — X TJKT 3 — SMKN 1 Majalengka",
}: {
  position?: [number, number, number]
  gravity?: [number, number, number]
  fov?: number
  transparent?: boolean
  frontImage?: string | null
  backImage?: string | null
  imageFit?: "cover" | "contain"
  lanyardImage?: string | null
  lanyardWidth?: number
  cardInfo?: string
}) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<any>(null)
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768
  )
  const [copied, setCopied] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    let ro: ResizeObserver | null = null
    const check = () => {
      const r = el.getBoundingClientRect()
      if (r.width > 0 && r.height > 0) setReady(true)
    }
    check()
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(check)
      ro.observe(el)
    }
    let tries = 0
    const interval = setInterval(() => {
      if (++tries > 20) {
        clearInterval(interval)
        return
      }
      check()
    }, 500)
    return () => {
      ro?.disconnect()
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const flipCard = () => {
    cardRef.current?.setAngvel({ x: 0, y: 5, z: 0 })
  }

  const copyInfo = async () => {
    try {
      await navigator.clipboard.writeText(cardInfo)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div ref={wrapperRef} className="lanyard-wrapper">
      {ready && (
        <Canvas
          camera={{ position: position, fov: fov }}
          dpr={[1, isMobile ? 1.5 : 2]}
          gl={{ alpha: transparent }}
          onCreated={({ gl }) =>
            gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)
          }
        >
          <Suspense fallback={null}>
            <ambientLight intensity={Math.PI} />
            <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
              <Band
                isMobile={isMobile}
                frontImage={frontImage}
                backImage={backImage}
                imageFit={imageFit}
                lanyardImage={lanyardImage}
                lanyardWidth={lanyardWidth}
                cardRef={cardRef}
              />
            </Physics>
            <Environment blur={0.75}>
              <Lightformer
                intensity={2}
                color="white"
                position={[0, -1, 5]}
                rotation={[0, 0, Math.PI / 3]}
                scale={[100, 0.1, 1]}
              />
              <Lightformer
                intensity={3}
                color="white"
                position={[-1, -1, 1]}
                rotation={[0, 0, Math.PI / 3]}
                scale={[100, 0.1, 1]}
              />
              <Lightformer
                intensity={3}
                color="white"
                position={[1, 1, 1]}
                rotation={[0, 0, Math.PI / 3]}
                scale={[100, 0.1, 1]}
              />
              <Lightformer
                intensity={10}
                color="white"
                position={[-10, 0, 14]}
                rotation={[0, Math.PI / 2, Math.PI / 3]}
                scale={[100, 10, 1]}
              />
            </Environment>
          </Suspense>
        </Canvas>
      )}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
        <GlassButton
          glass="rgba(255, 255, 255, 0.5)"
          className="group rounded-full p-2 hover:scale-105 active:scale-95"
          onClick={flipCard}
        >
          <span className="flex items-center gap-1.5 font-jakarta text-[10px] font-bold uppercase tracking-[0.15em] text-[#161616]">
            <RefreshCw
              size={12}
              className="transition-transform duration-500 group-hover:rotate-180"
            />
            Flip
          </span>
        </GlassButton>
        <GlassButton
          glass="rgba(255, 255, 255, 0.5)"
          className="group rounded-full p-2 hover:scale-105 active:scale-95"
          onClick={copyInfo}
        >
          <span className="flex items-center gap-1.5 font-jakarta text-[10px] font-bold uppercase tracking-[0.15em] text-[#161616]">
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? "Copied!" : "Copy Info"}
          </span>
        </GlassButton>
      </div>
    </div>
  )
}

function Band({
  maxSpeed = 40,
  minSpeed = 4,
  isMobile = false,
  frontImage = null,
  backImage = null,
  imageFit = "cover",
  lanyardImage = null,
  lanyardWidth = 1.0,
  cardRef,
}: {
  maxSpeed?: number
  minSpeed?: number
  isMobile?: boolean
  frontImage?: string | null
  backImage?: string | null
  imageFit?: "cover" | "contain"
  lanyardImage?: string | null
  lanyardWidth?: number
  cardRef: React.RefObject<any>
}) {
  const band = useRef<any>(null)
  const fixed = useRef<any>(null)
  const j1 = useRef<any>(null)
  const j2 = useRef<any>(null)
  const j3 = useRef<any>(null)
  const card = cardRef
  const vec = new THREE.Vector3()
  const ang = new THREE.Vector3()
  const rot = new THREE.Vector3()
  const dir = new THREE.Vector3()
  const segmentProps: any = {
    type: "dynamic",
    canSleep: false,
    colliders: false,
    angularDamping: 6,
    linearDamping: 6,
  }
  const { nodes, materials } = useGLTF(CARD_GLB)
  const lanyardTex = useTexture(lanyardImage || BLANK_PIXEL)
  const frontTex = useTexture(frontImage || BLANK_PIXEL)
  const backTex = useTexture(backImage || BLANK_PIXEL)

  // Premium woven lanyard strap texture with custom brand text & gold accents
  const strapTexture = useMemo(() => {
    const W = 512
    const H = 64
    const c = document.createElement("canvas")
    c.width = W
    c.height = H
    const ctx = c.getContext("2d")
    if (ctx) {
      // 1. Rich dark obsidian fabric gradient with specular shine
      const g = ctx.createLinearGradient(0, 0, 0, H)
      g.addColorStop(0.0, "#09090b")
      g.addColorStop(0.15, "#18181b")
      g.addColorStop(0.35, "#27272a")
      g.addColorStop(0.5, "#3f3f46")
      g.addColorStop(0.55, "#71717a")
      g.addColorStop(0.65, "#27272a")
      g.addColorStop(0.85, "#18181b")
      g.addColorStop(1.0, "#09090b")
      ctx.fillStyle = g
      ctx.fillRect(0, 0, W, H)

      // 2. Micro woven fabric weave pattern
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)"
      ctx.lineWidth = 1
      for (let x = -H; x < W + H; x += 6) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x + H, H)
        ctx.stroke()
      }

      // 3. Woven gold edge seam borders
      ctx.fillStyle = "#f59e0b"
      ctx.fillRect(0, 0, W, 2.5)
      ctx.fillRect(0, H - 2.5, W, 2.5)

      // 4. Custom woven text along the strap
      ctx.font = "bold 13px sans-serif"
      ctx.fillStyle = "#ffffff"
      ctx.shadowColor = "rgba(0, 0, 0, 0.8)"
      ctx.shadowBlur = 3
      ctx.textBaseline = "middle"
      ctx.fillText("✦ MUHAMAD ADAM HIDAYAT ✦ TJKT 3 ✦ SMKN 1 MAJALENGKA", 14, H / 2)
    }
    const tex = new THREE.CanvasTexture(c)
    tex.colorSpace = THREE.SRGBColorSpace
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping
    return tex
  }, [])

  const strapMap = lanyardImage ? lanyardTex : strapTexture

  const cardMap = useMemo(() => {
    const baseMap = (materials as any).base.map
    if (!frontImage && !backImage) return baseMap

    const baseImg = baseMap.image as HTMLImageElement
    const W = baseImg.width
    const H = baseImg.height
    const canvas = document.createElement("canvas")
    canvas.width = W
    canvas.height = H
    const ctx = canvas.getContext("2d")
    if (!ctx) return baseMap
    ctx.drawImage(baseImg, 0, 0, W, H)

    const drawFitted = (img: HTMLImageElement, rect: { x: number; y: number; w: number; h: number }) => {
      const rx = rect.x * W
      const ry = rect.y * H
      const rw = rect.w * W
      const rh = rect.h * H
      const pick = imageFit === "contain" ? Math.min : Math.max
      const scale = pick(rw / img.width, rh / img.height)
      const dw = img.width * scale
      const dh = img.height * scale
      const dx = rx + (rw - dw) / 2
      const dy = ry + (rh - dh) / 2
      ctx.save()
      ctx.beginPath()
      ctx.rect(rx, ry, rw, rh)
      ctx.clip()
      ctx.drawImage(img, dx, dy, dw, dh)
      ctx.restore()
    }

    if (frontImage && frontTex.image) drawFitted(frontTex.image as HTMLImageElement, FRONT_UV_RECT)
    if (backImage && backTex.image) drawFitted(backTex.image as HTMLImageElement, BACK_UV_RECT)

    const composite = new THREE.CanvasTexture(canvas)
    composite.colorSpace = THREE.SRGBColorSpace
    composite.flipY = baseMap.flipY
    composite.anisotropy = 16
    composite.needsUpdate = true
    return composite
  }, [frontImage, backImage, imageFit, frontTex, backTex, (materials as any).base.map])

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ])
  )
  const [dragged, drag] = useState<false | THREE.Vector3>(false)
  const [hovered, hover] = useState(false)

  useRopeJoint(fixed, j1, [
    [0, 0, 0],
    [0, 0, 0],
    0.9,
  ])
  useRopeJoint(j1, j2, [
    [0, 0, 0],
    [0, 0, 0],
    0.9,
  ])
  useRopeJoint(j2, j3, [
    [0, 0, 0],
    [0, 0, 0],
    0.9,
  ])
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 2.254, -0.05],
  ])

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? "grabbing" : "grab"
      return () => void (document.body.style.cursor = "auto")
    }
  }, [hovered, dragged])

  useFrame((state, delta) => {
    const dt = Math.min(delta, 1 / 20)
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera)
      dir.copy(vec).sub(state.camera.position).normalize()
      vec.add(dir.multiplyScalar(state.camera.position.length()))
      ;[card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp())
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      })
    }
    if (fixed.current) {
      ;[j1, j2, j3].forEach((ref) => {
        const cur = ref.current.translation()
        if (!isFinite(cur.x) || !isFinite(cur.y) || !isFinite(cur.z)) return
        if (!ref.current.lerped)
          ref.current.lerped = new THREE.Vector3(
            isFinite(cur.x) ? cur.x : 0,
            isFinite(cur.y) ? cur.y : 0,
            isFinite(cur.z) ? cur.z : 0
          )
        if (
          !isFinite(ref.current.lerped.x) ||
          !isFinite(ref.current.lerped.y) ||
          !isFinite(ref.current.lerped.z)
        ) {
          ref.current.lerped.copy(cur)
        }
        const clampedDistance = Math.max(
          0.1,
          Math.min(1, ref.current.lerped.distanceTo(cur))
        )
        const t = THREE.MathUtils.clamp(
          dt * (minSpeed + clampedDistance * (maxSpeed - minSpeed)),
          0,
          1
        )
        ref.current.lerped.lerp(cur, t)
      })

      // Compute exact 3D world position of metal clip ring on top of the card
      const cardPos = card.current.translation()
      const cardRot = card.current.rotation()
      const clipWorldPos = new THREE.Vector3(0, 2.254, -0.05)
      if (cardRot && isFinite(cardRot.x)) {
        clipWorldPos.applyQuaternion(new THREE.Quaternion(cardRot.x, cardRot.y, cardRot.z, cardRot.w))
      }
      if (cardPos && isFinite(cardPos.x)) {
        clipWorldPos.add(new THREE.Vector3(cardPos.x, cardPos.y, cardPos.z))
      }

      const p0 = clipWorldPos
      const p1 = j2.current.lerped
      const p2 = j1.current.lerped
      const p3 = fixed.current.translation()
      const ok = [p0, p1, p2, p3].every(
        (p) => p && isFinite(p.x) && isFinite(p.y) && isFinite(p.z)
      )
      if (ok) {
        curve.points[0]!.copy(p0)
        curve.points[1]!.copy(p1)
        curve.points[2]!.copy(p2)
        curve.points[3]!.copy(p3)
        band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32))
      }
      ang.copy(card.current.angvel())
      rot.copy(card.current.rotation())
      if (isFinite(ang.x) && isFinite(ang.y) && isFinite(ang.z) && isFinite(rot.y)) {
        card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z }, true)
      }
    }
  })

  curve.curveType = "chordal"

  return (
    <>
      <group position={[0, 5.2, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.9}
            position={[0, -1.15, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => (
              (e.target as HTMLElement).releasePointerCapture(e.pointerId), drag(false)
            )}
            onPointerDown={(e) => (
              (e.target as HTMLElement).setPointerCapture(e.pointerId),
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())))
            )}
          >
            <mesh geometry={(nodes as any).card.geometry}>
              <meshPhysicalMaterial
                map={cardMap}
                map-anisotropy={16}
                clearcoat={isMobile ? 0 : 1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
              />
            </mesh>
            <mesh geometry={(nodes as any).clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={(nodes as any).clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={strapMap}
          repeat={[-3, 1]}
          lineWidth={isMobile ? lanyardWidth * 0.45 : lanyardWidth * 0.85}
        />
      </mesh>
    </>
  )
}
