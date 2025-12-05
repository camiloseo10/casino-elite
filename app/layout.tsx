// app/layout.tsx
import type React from "react"
import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import ClientLayoutWrapper from "@/components/layout/ClientLayoutWrapper" // Importa el nuevo wrapper

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CasinoElite - Premium Casino Equipment Store",
  description:
    "Professional-grade casino equipment for serious players. From poker chips to gaming tables, elevate your game with authentic casino-quality gear.",
  keywords: "casino equipment, poker chips, gaming tables, blackjack, roulette, professional casino gear",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>
        <footer className="bg-black border-t border-slate-800">
          <div className="container mx-auto px-4 md:px-6 py-12">
            <div className="text-center text-slate-400">
              <p>&copy; {new Date().getFullYear()} CasinoElite. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}