# 🌐 Modern Interactive Portfolio

A high-performance, interactive personal portfolio website built with **Next.js 16**, **React 19**, **Three.js / React Three Fiber**, and **Turborepo**. Designed with responsive layouts, 3D graphics, smooth GSAP & Framer Motion animations, and a modern monorepo architecture.

---

## ✨ Features

- **🎨 Modern & Responsive UI**: Fully responsive layout tailored for all screen sizes with seamless glassmorphism and theme customization.
- **🎮 Interactive 3D Graphics**: Built using `@react-three/fiber`, `@react-three/drei`, and `@react-three/rapier` physics.
- **⚡ High Performance & Monorepo Setup**: Powered by **Turborepo** for superfast builds and shared package management.
- **🎬 Dynamic Animations**: Fluid micro-interactions and scroll-triggered animations powered by **GSAP** and **Framer Motion**.
- **🌙 Dark / Light Mode**: Integrated `next-themes` with smooth color palette transitions.

---

## 🛠️ Tech Stack

### **Frontend & Framework**
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & `shadcn/ui`

### **3D Graphics & Animations**
- **3D**: [Three.js](https://threejs.org/) & [React Three Fiber](https://r3f.docs.pmnd.rs/)
- **3D Helpers & Physics**: `@react-three/drei`, `@react-three/rapier`
- **Animations**: [GSAP](https://gsap.com/) (`@gsap/react`) & [Framer Motion](https://www.framer.com/motion/)

### **Monorepo & Tooling**
- **Monorepo**: [Turborepo](https://turbo.build/repo)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Code Quality**: ESLint, Prettier

---

## 📁 Project Structure

```text
.
├── apps/
│   └── web/                # Main Next.js 16 Web Application
├── packages/
│   ├── ui/                 # Shared UI Component Library (shadcn/ui)
│   ├── eslint-config/      # Shared ESLint configuration
│   └── typescript-config/  # Shared TypeScript configuration
├── package.json
└── turbo.json              # Turborepo build pipeline configuration
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js (>= 20.0.0)** and **npm** installed on your system.

### 1. Clone the Repository

```bash
git clone https://github.com/adamhidayat-dev/portofolio.git
cd portofolio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

Run the development server across all workspace apps:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📜 Available Scripts

| Script | Description |
| :--- | :--- |
| `npm run dev` | Runs dev server for `apps/web` with hot reloading |
| `npm run build` | Builds production bundle for all workspaces via Turborepo |
| `npm run lint` | Runs ESLint check across all packages |
| `npm run typecheck` | Validates TypeScript types across the monorepo |
| `npm run format` | Formats code with Prettier |

---

## 👤 Author

**Muhamad Adam Hidayat**
- **GitHub**: [@adamhidayat-dev](https://github.com/adamhidayat-dev)
