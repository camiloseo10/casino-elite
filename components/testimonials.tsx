"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    name: "Robert Silva",
    role: "Director, Casino Royal Madrid",
    company: "Casino Royal",
    image: "/placeholder.svg?height=80&width=80&text=Robert",
    rating: 5,
    text: "CasinoElite has been our exclusive supplier for 8 years. The quality of their products is exceptional and customer service is unmatched. We recommend their products without hesitation.",
  },
  {
    name: "Maria Gonzalez",
    role: "Tournament Organizer",
    company: "Poker Pro Events",
    image: "/placeholder.svg?height=80&width=80&text=Maria",
    rating: 5,
    text: "We organize over 50 tournaments per year and always trust CasinoElite. Their clay chips and professional tables have significantly elevated the quality of our events.",
  },
  {
    name: "David Chen",
    role: "Professional Player",
    company: "WSOP Participant",
    image: "/placeholder.svg?height=80&width=80&text=David",
    rating: 5,
    text: "As a professional player, equipment quality is crucial. CasinoElite products give me confidence that I'm playing with the highest quality materials.",
  },
  {
    name: "Laura Martin",
    role: "Owner",
    company: "Barcelona Poker Club",
    image: "/placeholder.svg?height=80&width=80&text=Laura",
    rating: 5,
    text: "We opened our club 3 years ago and trusted CasinoElite from day one. Their products have withstood intensive use and still look like new. Excellent investment.",
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What Our Customers Say</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            The trust of professional casinos, poker clubs and serious players is our greatest achievement
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-8 md:p-12">
              <div className="text-center space-y-6">
                <Quote className="w-12 h-12 text-amber-400 mx-auto" />

                <div className="flex items-center justify-center gap-1 mb-4">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                  ))}
                </div>

                <blockquote className="text-xl md:text-2xl text-white leading-relaxed font-medium">
                  "{currentTestimonial.text}"
                </blockquote>

                <div className="flex items-center justify-center gap-4">
                  <Image
                    src={currentTestimonial.image || "/placeholder.svg"}
                    alt={currentTestimonial.name}
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                  <div className="text-left">
                    <div className="font-semibold text-white text-lg">{currentTestimonial.name}</div>
                    <div className="text-amber-400">{currentTestimonial.role}</div>
                    <div className="text-slate-400 text-sm">{currentTestimonial.company}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="border-slate-600 text-white hover:bg-slate-800"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? "bg-amber-400" : "bg-slate-600"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="border-slate-600 text-white hover:bg-slate-800"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
