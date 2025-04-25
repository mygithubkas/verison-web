import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "../ui/header"
import Footer from "../ui/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Verison - AI-Powered Solutions",
  description: "Making technology accessible, efficient, and impactful.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-slate-950 text-slate-50 antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
} 