"use client"

import * as React from "react"

export type Language = "id" | "en"

export interface LocationInfo {
  city?: string
  country?: string
  countryCode?: string
  flag?: string
}

export interface Translations {
  // Nav
  navHome: string
  navAbout: string
  navProjects: string
  navContact: string

  // Home Page
  heroBio: string
  getInTouch: string
  heroBornTo: string
  word1: string
  word2: string
  word3: string
  word4: string
  word5: string
  marquee1: string
  marquee2: string
  marquee3: string
  marquee4: string
  statsPhases: string
  statsObby: string
  catFivemServer: string
  catEcommerce: string
  catHrTech: string
  catWebstore: string
  catSchool: string
  catDessert: string
  catFlorist: string
  catOpenSource: string
  interactiveIndex: string
  sphereInstruction: string
  viewAllProjects: string

  // About Page
  aboutTitle: string
  aboutClassTag: string
  aboutSpecialistHeading: string
  aboutBioDesc: string
  aboutCard2Title: string
  aboutCard2Tag: string
  aboutCard2Cta: string
  aboutCard3Title: string
  aboutCard3Desc: string
  aboutBioTag: string
  aboutBioBig: string
  aboutBioP1: string
  aboutBioP2: string
  aboutMatrixTag: string
  aboutTimelineTag: string
  comp1Title: string
  comp1Sub: string
  comp1a: string
  comp1b: string
  comp1c: string
  comp1d: string
  comp2Title: string
  comp2Sub: string
  comp2a: string
  comp2b: string
  comp2c: string
  comp2d: string
  comp3Title: string
  comp3Sub: string
  comp3a: string
  comp3b: string
  comp3c: string
  comp3d: string
  comp4Title: string
  comp4Sub: string
  comp4a: string
  comp4b: string
  comp4c: string
  comp4d: string
  comp5Title: string
  comp5Sub: string
  comp5a: string
  comp5b: string
  comp5c: string
  comp5d: string
  comp6Title: string
  comp6Sub: string
  comp6a: string
  comp6b: string
  comp6c: string
  comp6d: string
  tl1Phase: string
  tl1Role: string
  tl1Desc: string
  tl2Phase: string
  tl2Role: string
  tl2Desc: string
  tl3Phase: string
  tl3Role: string
  tl3Desc: string
  tl4Phase: string
  tl4Role: string
  tl4Desc: string

  // Projects Page
  projectsTitle: string
  projectsOverviewTag: string
  projectsHeadingSelected: string
  projectsHeadingWork: string
  projectsHeroQuote: string
  projectsHeroHint: string
  projectsIndex: string
  projectsHoverHint: string
  featured: string
  viewProject: string
  projectsFooterTagline: string
  allProjectsLive: string

  // Contact Page
  contactTitle: string
  contactMarquee: string
  copyEmailHint: string
  emailCopied: string
  copyAddressBtn: string
  copied: string
  contactMetaRole: string
  contactMetaDrag: string
  contactMetaRights: string
  contactBadgeText: string
  contactWaMessage: string
  formDirectLine: string
  formTitle: string
  formNameLabel: string
  formEmailLabel: string
  formSubjectLabel: string
  formMessageLabel: string
  formSubmitBtn: string
  formSubmittingBtn: string
  formSuccessTitle: string
  formSuccessDesc: string
  backToSite: string
}

const DICTIONARY: Record<Language, Translations> = {
  id: {
    // Nav
    navHome: "Beranda",
    navAbout: "Tentang",
    navProjects: "Proyek",
    navContact: "Kontak",

    // Home Page
    heroBio: "Halo, Saya Muhamad Adam Hidayat — Spesialis Perangkat Lunak & Infrastruktur Jaringan dari Jatitujuh, Majalengka (SMKN 1 Majalengka XI TKJ 3).",
    getInTouch: "HUBUNGI SAYA",
    heroBornTo: "SAYA TERLAHIR UNTUK",
    word1: "SPESIALIS PERANGKAT LUNAK & INFRASTRUKTUR JARINGAN",
    word2: "PENGEMBANG PERANGKAT LUNAK FULL-STACK",
    word3: "TEKNISI SERVER GAME FIVE M",
    word4: "PENGEMBANG AI SELF-HOSTED (OBBY)",
    word5: "PENELITI KEAMANAN SIBER",
    marquee1: "SPESIALIS PERANGKAT LUNAK & INFRASTRUKTUR JARINGAN",
    marquee2: "REKAYASA SERVER GAME FIVE M",
    marquee3: "PENGEMBANGAN PERANGKAT LUNAK FULL-STACK",
    marquee4: "AI SELF-HOSTED (OBBY) & TJKT SMKN 1 MAJALENGKA",
    statsPhases: "Fase Teknis Utama",
    statsObby: "Obby AI & Layanan",
    catFivemServer: "Server FiveM",
    catEcommerce: "E-Commerce & Ritel",
    catHrTech: "SaaS HR Tech",
    catWebstore: "CMS Webstore FiveM",
    catSchool: "Website Sekolah",
    catDessert: "Merek Dessert",
    catFlorist: "Toko Bunga",
    catOpenSource: "Open Source & Perkakas",
    interactiveIndex: "( Indeks Interaktif — 10 Proyek )",
    sphereInstruction: "Cakram 3D interaktif — geser, putar, dan klik opsi proyek.",
    viewAllProjects: "LIHAT SEMUA PROYEK",

    // About Page
    aboutTitle: "TENTANG",
    aboutClassTag: "( Kelas XI TKJ 3 — SMKN 1 Majalengka )",
    aboutSpecialistHeading: "SPESIALIS PERANGKAT LUNAK & INFRASTRUKTUR JARINGAN",
    aboutBioDesc: "Berdomisili di Jatitujuh, Majalengka. Berpengalaman dari rekayasa game server FiveM, bertransformasi menjadi pengembang full-stack, dan kini berkonsolidasi pada infrastruktur jaringan, self-hosted AI (Obby), serta riset Cyber Security.",
    aboutCard2Title: "JARINGAN & KEAMANAN SIBER.",
    aboutCard2Tag: "MENJEMBATANI INFRASTRUKTUR & KODE",
    aboutCard2Cta: "Hubungi saya",
    aboutCard3Title: "Sistem AI & Jaringan Self-Hosted.",
    aboutCard3Desc: "Membangun dan mengelola asisten AI terisolasi (Obby AI), infrastruktur Linux/VPS, dan solusi digitalisasi komunitas lokal Jatitujuh.",
    aboutBioTag: "Ringkasan Profil",
    aboutBioBig: "Rekayasa infrastruktur sistem, full-stack development, dan riset keahlian Cyber Security.",
    aboutBioP1: "Muhamad Adam Hidayat adalah siswa Kelas XI TKJ 3 di SMKN 1 Majalengka asal Jatitujuh. Berawal dari eksplorasi logika FiveM GTA 5 server di kelas 1 SMP, berkembang menjadi pengembang full-stack, hingga saat ini fokus pada infrastruktur jaringan, server terisolasi (Self-Hosted AI: Obby), serta keamanan siber.",
    aboutBioP2: "Aktif memfasilitasi pendataan digital JOTA Kepramukaan dan merancang solusi arsitektur platform donasi bebas komisi untuk kreator lokal.",
    aboutMatrixTag: "Matriks Kompetensi",
    aboutTimelineTag: "Lini Masa Perkembangan Teknis",
    comp1Title: "REKAYASA GAME",
    comp1Sub: "Pengembangan Server FiveM / GTA 5",
    comp1a: "Skrip Kustom",
    comp1b: "Optimasi Aset / Resource",
    comp1c: "Sinkronisasi Data Real-Time",
    comp1d: "Arsitektur Database Server",
    comp2Title: "PERANGKAT LUNAK FULL-STACK",
    comp2Sub: "Pengembangan Multi-Bahasa",
    comp2a: "Web & Desktop End-to-End",
    comp2b: "Sistem Desain UI/UX",
    comp2c: "Integrasi API RESTful",
    comp2d: "Manajemen DB Terstruktur",
    comp3Title: "JARINGAN & SISTEM",
    comp3Sub: "TJKT & Admin Sistem",
    comp3a: "Routing & Konfigurasi Jaringan",
    comp3b: "Infrastruktur Linux / VPS",
    comp3c: "Tata Kelola Server",
    comp3d: "Alur Komunikasi Data",
    comp4Title: "AI & SELF-HOSTING",
    comp4Sub: "Sistem AI Kustom",
    comp4a: "Obby AI Self-Hosted",
    comp4b: "Pengaturan Lingkungan Terisolasi",
    comp4c: "Integrasi LLM Lokal",
    comp4d: "Infrastruktur Privat",
    comp5Title: "KEAMANAN SIBER",
    comp5Sub: "Fokus Target Pengembangan Skill",
    comp5a: "Analisis Kerentanan",
    comp5b: "Enkripsi Data",
    comp5c: "Pengamanan Sistem",
    comp5d: "Mitigasi Ancaman & Risiko",
    comp6Title: "KOMUNITAS & LOGISTIK",
    comp6Sub: "Inisiatif Digital",
    comp6a: "Logistik Digital Kepramukaan",
    comp6b: "Infrastruktur Radio & Data JOTA",
    comp6c: "Proposal Kreator Bebas Komisi",
    comp6d: "Koordinasi Jaringan Discord",
    tl1Phase: "Target Spesialisasi",
    tl1Role: "Keamanan Siber & Pengamanan Sistem",
    tl1Desc: "Fokus pengembangan mendatang pada analisis kerentanan (vulnerability analysis), enkripsi data, dan pengamanan infrastruktur server.",
    tl2Phase: "Kelas XI TKJ 3",
    tl2Role: "Networking & Self-Hosted AI (Obby)",
    tl2Desc: "SMKN 1 Majalengka — Pendalaman routing, tata kelola server Linux/VPS, serta pengembangan AI assistant pribadi Obby terisolasi.",
    tl3Phase: "Mid SMP — SMK",
    tl3Role: "Pengembangan Perangkat Lunak Full-Stack",
    tl3Desc: "Penguasaan multi-language programming, alur software engineering end-to-end (front-end UI/UX, REST API, dan arsitektur database).",
    tl4Phase: "Kelas 1 SMP",
    tl4Role: "Rekayasa Server Game (FiveM)",
    tl4Desc: "Awal fondasi teknis melalui custom scripting GTA 5 / FiveM server, resource optimization, data sync, dan arsitektur client-server.",

    // Projects Page
    projectsTitle: "PROYEK",
    projectsOverviewTag: "( Ringkasan Portofolio — 2024 / 2026 )",
    projectsHeadingSelected: "KARYA",
    projectsHeadingWork: "PILIHAN",
    projectsHeroQuote: "Sepuluh proyek live, dikerjakan dengan teliti dan diselesaikan dengan penuh kesungguhan.",
    projectsHeroHint: "Arahkan kursor ke baris untuk melihat identitasnya, lalu klik — setiap proyek adalah situs yang sudah ter-deploy dan siap dijelajahi.",
    projectsIndex: "Indeks — 10 Proyek",
    projectsHoverHint: "Arahkan kursor untuk menjelajah",
    featured: "Unggulan",
    viewProject: "Lihat Proyek",
    projectsFooterTagline: "Dirancang & dibangun dengan penuh kesungguhan.",
    allProjectsLive: "Semua proyek aktif ↗",

    // Contact Page
    contactTitle: "KONTAK",
    contactMarquee: "HUBUNGI SAYA ✦ HUBUNGI SAYA ✦ HUBUNGI SAYA ✦ HUBUNGI SAYA ✦",
    copyEmailHint: "Klik untuk menyalin alamat email:",
    emailCopied: "Email berhasil disalin!",
    copyAddressBtn: "Salin Alamat",
    copied: "Tersalin!",
    contactMetaRole: "Spesialis Perangkat Lunak & Infrastruktur Jaringan — SMKN 1 Majalengka",
    contactMetaDrag: "Seret stiker atau klik untuk terhubung.",
    contactMetaRights: "© 2026 Muhamad Adam Hidayat. Hak cipta dilindungi",
    contactBadgeText: "SERET AKU ✦ SERET AKU ✦ SERET AKU ✦ SERET AKU ✦",
    contactWaMessage: "Hai Adam! Saya tertarik untuk berkolaborasi.",
    formDirectLine: "Jalur Langsung",
    formTitle: "Kirim Pesan Langsung",
    formNameLabel: "Nama Lengkap",
    formEmailLabel: "Alamat Email",
    formSubjectLabel: "Subjek",
    formMessageLabel: "Pesan Anda",
    formSubmitBtn: "KIRIM PESAN",
    formSubmittingBtn: "MENGIRIM...",
    formSuccessTitle: "Pesan Terkirim!",
    formSuccessDesc: "Terima kasih telah menghubungi. Saya akan segera membalas pesan Anda.",
    backToSite: "Kembali ke Situs",
  },
  en: {
    // Nav
    navHome: "Home",
    navAbout: "About",
    navProjects: "Projects",
    navContact: "Contact",

    // Home Page
    heroBio: "Hi, I'm Muhamad Adam Hidayat — Software & Network Infrastructure Specialist from Jatitujuh, Majalengka (SMKN 1 Majalengka XI TKJ 3).",
    getInTouch: "GET IN TOUCH",
    heroBornTo: "I'M BORN TO",
    word1: "SOFTWARE & NETWORK INFRASTRUCTURE SPECIALIST",
    word2: "FULL-STACK SOFTWARE DEVELOPER",
    word3: "FIVE M GAME SERVER ENGINEER",
    word4: "SELF-HOSTED AI (OBBY) DEVELOPER",
    word5: "CYBER SECURITY RESEARCHER",
    marquee1: "SOFTWARE & NETWORK INFRASTRUCTURE SPECIALIST",
    marquee2: "FIVE M GAME SERVER ENGINEERING",
    marquee3: "FULL-STACK SOFTWARE DEVELOPMENT",
    marquee4: "SELF-HOSTED AI (OBBY) & TJKT SMKN 1 MAJALENGKA",
    statsPhases: "Main Technical Phases",
    statsObby: "Obby AI & Services",
    catFivemServer: "FiveM Game Server",
    catEcommerce: "E-Commerce & Retail",
    catHrTech: "HR Tech SaaS",
    catWebstore: "FiveM Webstore CMS",
    catSchool: "School Website",
    catDessert: "Dessert Brand",
    catFlorist: "Florist & Shop",
    catOpenSource: "Open Source & Tooling",
    interactiveIndex: "( Interactive Index — 10 Projects )",
    sphereInstruction: "A living sphere — drag it, spin it, click a face.",
    viewAllProjects: "VIEW ALL PROJECTS",

    // About Page
    aboutTitle: "ABOUT",
    aboutClassTag: "( Grade XI TKJ 3 — SMKN 1 Majalengka )",
    aboutSpecialistHeading: "SOFTWARE & NETWORK INFRASTRUCTURE SPECIALIST",
    aboutBioDesc: "Based in Jatitujuh, Majalengka. Experienced in FiveM game server engineering, transformed into full-stack development, and now consolidating on network infrastructure, self-hosted AI (Obby), and Cyber Security research.",
    aboutCard2Title: "NETWORK & CYBER SECURITY.",
    aboutCard2Tag: "BRIDGING INFRASTRUCTURE & CODE",
    aboutCard2Cta: "Get in touch",
    aboutCard3Title: "Self-Hosted AI & Network Systems.",
    aboutCard3Desc: "Building and managing isolated AI assistants (Obby AI), Linux/VPS infrastructure, and digitalization solutions for the local Jatitujuh community.",
    aboutBioTag: "Profile Summary",
    aboutBioBig: "Systems infrastructure engineering, full-stack development, and Cyber Security research.",
    aboutBioP1: "Muhamad Adam Hidayat is a Grade XI TKJ 3 student at SMKN 1 Majalengka from Jatitujuh. Starting from exploring FiveM GTA 5 server logic in 7th grade, growing into a full-stack developer, and now focused on network infrastructure, isolated servers (Self-Hosted AI: Obby), and cyber security.",
    aboutBioP2: "Actively facilitates digital data collection for JOTA Scouting and designs architectural solutions for a commission-free donation platform for local creators.",
    aboutMatrixTag: "Competency Matrix",
    aboutTimelineTag: "Technical Development Timeline",
    comp1Title: "GAME ENGINEERING",
    comp1Sub: "FiveM / GTA 5 Server Dev",
    comp1a: "Custom Scripting",
    comp1b: "Asset/Resource Optimization",
    comp1c: "Real-Time Data Sync",
    comp1d: "Server Database Architecture",
    comp2Title: "FULL-STACK SOFTWARE",
    comp2Sub: "Multi-Language Development",
    comp2a: "End-to-End Web & Desktop",
    comp2b: "UI/UX Design Systems",
    comp2c: "RESTful API Integration",
    comp2d: "Structured DB Management",
    comp3Title: "NETWORKING & SYSTEMS",
    comp3Sub: "TJKT & System Admin",
    comp3a: "Network Routing & Config",
    comp3b: "Linux / VPS Infrastructure",
    comp3c: "Server Governance",
    comp3d: "Data Communication Flow",
    comp4Title: "AI & SELF-HOSTING",
    comp4Sub: "Custom AI Systems",
    comp4a: "Obby Self-Hosted AI",
    comp4b: "Isolated Environment Setup",
    comp4c: "Local LLM Integration",
    comp4d: "Private Infrastructure",
    comp5Title: "CYBER SECURITY",
    comp5Sub: "Focus Up-Skilling Target",
    comp5a: "Vulnerability Analysis",
    comp5b: "Data Encryption",
    comp5c: "System Hardening",
    comp5d: "Threat & Risk Mitigation",
    comp6Title: "COMMUNITY & LOGISTICS",
    comp6Sub: "Digital Initiatives",
    comp6a: "Scouting Digital Logistics",
    comp6b: "JOTA Radio & Data Infra",
    comp6c: "Zero-Commission Creator Proposal",
    comp6d: "Discord Network Coordination",
    tl1Phase: "Specialization Target",
    tl1Role: "Cyber Security & System Hardening",
    tl1Desc: "Future development focus on vulnerability analysis, data encryption, and server infrastructure hardening.",
    tl2Phase: "Grade XI TKJ 3",
    tl2Role: "Networking & Self-Hosted AI (Obby)",
    tl2Desc: "SMKN 1 Majalengka — Deepening routing, Linux/VPS server governance, and development of the isolated Obby personal AI assistant.",
    tl3Phase: "Mid Junior High — Senior High",
    tl3Role: "Full-Stack Software Development",
    tl3Desc: "Mastery of multi-language programming and end-to-end software engineering flow (front-end UI/UX, REST API, and database architecture).",
    tl4Phase: "1st Year of Middle School",
    tl4Role: "Game Server Engineering (FiveM)",
    tl4Desc: "The start of the technical foundation through custom GTA 5 / FiveM server scripting, resource optimization, data sync, and client-server architecture.",

    // Projects Page
    projectsTitle: "PROJECTS",
    projectsOverviewTag: "( Portfolio Overview — 2024 / 2026 )",
    projectsHeadingSelected: "SELECTED",
    projectsHeadingWork: "WORK",
    projectsHeroQuote: "Ten live builds, engineered with care and finished with intent.",
    projectsHeroHint: "Hover a row to reveal its identity, then click through — every project is a deployed site, ready to explore.",
    projectsIndex: "Index — 10 Projects",
    projectsHoverHint: "Hover to explore",
    featured: "Featured",
    viewProject: "View Project",
    projectsFooterTagline: "Designed & built with intent.",
    allProjectsLive: "All projects live ↗",

    // Contact Page
    contactTitle: "CONTACT",
    contactMarquee: "GET IN TOUCH ✦ GET IN TOUCH ✦ GET IN TOUCH ✦ GET IN TOUCH ✦",
    copyEmailHint: "Click to copy email address:",
    emailCopied: "Email copied to clipboard!",
    copyAddressBtn: "Copy Address",
    copied: "Copied!",
    contactMetaRole: "Software & Network Infrastructure Specialist — SMKN 1 Majalengka",
    contactMetaDrag: "Drag the stickers or click to connect.",
    contactMetaRights: "© 2026 Muhamad Adam Hidayat. All rights reserved",
    contactBadgeText: "DRAG ME ✦ DRAG ME ✦ DRAG ME ✦ DRAG ME ✦",
    contactWaMessage: "Hi Adam! I'm interested in collaborating.",
    formDirectLine: "Direct Line",
    formTitle: "Send a Direct Message",
    formNameLabel: "Full Name",
    formEmailLabel: "Email Address",
    formSubjectLabel: "Subject",
    formMessageLabel: "Your Message",
    formSubmitBtn: "SEND MESSAGE",
    formSubmittingBtn: "SENDING...",
    formSuccessTitle: "Message Sent!",
    formSuccessDesc: "Thank you for reaching out. I'll get back to you as soon as possible.",
    backToSite: "Back to Site",
  },
}

interface LanguageContextType {
  lang: Language
  setLang: (lang: Language) => void
  location: LocationInfo
  t: (key: keyof Translations) => string
}

const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = React.useState<Language>("id")
  const [location, setLocation] = React.useState<LocationInfo>({
    country: "Indonesia",
    countryCode: "ID",
    flag: "🇮🇩",
  })

  const setLang = React.useCallback((newLang: Language) => {
    setLangState(newLang)
    try {
      localStorage.setItem("portfolio_lang", newLang)
    } catch (e) {
      // ignore
    }
  }, [])

  React.useEffect(() => {
    // 1. Check saved language preference
    try {
      const saved = localStorage.getItem("portfolio_lang") as Language | null
      if (saved && (saved === "id" || saved === "en")) {
        setLangState(saved)
      } else {
        // Auto detect language from browser
        const browserLang = navigator.language || (navigator.languages && navigator.languages[0]) || ""
        if (browserLang.toLowerCase().startsWith("id")) {
          setLangState("id")
        } else {
          const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ""
          if (tz.includes("Jakarta") || tz.includes("Makassar") || tz.includes("Jayapura")) {
            setLangState("id")
          } else {
            setLangState("en")
          }
        }
      }
    } catch (e) {
      // fallback to id
    }

    // 2. Fetch IP location auto-detection
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.country_code) {
          const code = data.country_code.toUpperCase()
          const isID = code === "ID"
          const flagSymbol = getCountryFlag(code)
          setLocation({
            city: data.city,
            country: data.country_name,
            countryCode: code,
            flag: flagSymbol,
          })
          // Auto switch to EN if international and user hasn't set manual preference
          const saved = localStorage.getItem("portfolio_lang")
          if (!saved) {
            setLangState(isID ? "id" : "en")
          }
        }
      })
      .catch(() => {
        // Fallback detection
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ""
        if (tz.includes("Jakarta") || tz.includes("Makassar") || tz.includes("Jayapura")) {
          setLocation({ country: "Indonesia", countryCode: "ID", flag: "🇮🇩" })
        } else {
          setLocation({ country: "Global", countryCode: "US", flag: "🌐" })
        }
      })
  }, [])

  // Keep the <html lang> attribute in sync with the active language
  React.useEffect(() => {
    try {
      document.documentElement.lang = lang
    } catch (e) {
      // ignore
    }
  }, [lang])

  const t = React.useCallback(
    (key: keyof Translations) => {
      return DICTIONARY[lang][key] || DICTIONARY.id[key] || ""
    },
    [lang]
  )

  return (
    <LanguageContext.Provider value={{ lang, setLang, location, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = React.useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

export function getCountryFlag(countryCode?: string): string {
  if (!countryCode || countryCode.length !== 2) return "🌐"
  try {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt(0))
    return String.fromCodePoint(...codePoints)
  } catch (e) {
    return "🌐"
  }
}
