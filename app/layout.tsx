import type React from "react"
import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"

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
        <header className="bg-black/90 backdrop-blur-sm border-b border-slate-800 sticky top-0 z-50">
          <div className="container mx-auto px-4 md:px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"></div>
                <span className="text-xl font-bold text-white">CasinoElite</span>
              </div>
              <nav className="hidden md:flex items-center space-x-8">
                <a href="/products" className="text-slate-300 hover:text-white transition-colors">
                  Products
                </a>
                <a href="/collections" className="text-slate-300 hover:text-white transition-colors">
                  Collections
                </a>
                <a href="/about" className="text-slate-300 hover:text-white transition-colors">
                  About
                </a>
                <a href="/contact" className="text-slate-300 hover:text-white transition-colors">
                  Contact
                </a>
              </nav>
            </div>
          </div>
        </header>
        {children}
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
