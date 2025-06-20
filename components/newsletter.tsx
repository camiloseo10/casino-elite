"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Gift } from "lucide-react"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí integrarías con tu servicio de email marketing
    setIsSubscribed(true)
    setEmail("")
  }

  return (
    <section className="py-20 bg-gradient-to-r from-purple-900 to-slate-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mb-6">
              <Gift className="w-8 h-8 text-black" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Get Exclusive Deals</h2>
            <p className="text-xl text-slate-300 mb-8">
              Subscribe to our newsletter and get 15% off your first order plus insider access to new products
            </p>
          </div>

          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-slate-800 border-slate-700 text-white placeholder-slate-400 h-12"
                  required
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-semibold px-8"
              >
                Get 15% Off
              </Button>
            </form>
          ) : (
            <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-green-400 font-semibold">
                ✅ Thanks for subscribing! Check your email for your 15% discount code.
              </p>
            </div>
          )}

          <p className="text-sm text-slate-400 mt-4">
            No spam, unsubscribe at any time. By subscribing you agree to our Terms & Privacy Policy.
          </p>
        </div>
      </div>
    </section>
  )
}
