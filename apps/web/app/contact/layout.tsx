import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact | Muhamad Adam",
  description:
    "Get in touch with Muhamad Adam for freelance projects, design collaborations, or development opportunities.",
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}