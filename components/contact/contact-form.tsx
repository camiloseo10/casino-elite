"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Send, CheckCircle, User, Mail, Phone, MessageSquare } from 'lucide-react'

const consultationTypes = [
  { id: "product", label: "Product Inquiry", icon: "🎯" },
  { id: "setup", label: "Casino Setup", icon: "🏢" },
  { id: "tournament", label: "Tournament Equipment", icon: "🏆" },
  { id: "maintenance", label: "Maintenance", icon: "🔧" },
  { id: "custom", label: "Custom Order", icon: "⭐" },
  { id: "other", label: "Other", icon: "💬" },
]

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    consultationType: "",
    subject: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitted(true)
    setIsLoading(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const selectConsultationType = (type: string) => {
    setFormData({
      ...formData,
      consultationType: type,
    })
  }

  if (isSubmitted) {
    return (
      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="p-12 text-center">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-white mb-4">Message Sent!</h3>
          <p className="text-slate-300 mb-6">
            Thank you for contacting us. Our team will review your inquiry and respond within 2 hours.
          </p>
          <Button
            onClick={() => setIsSubmitted(false)}
            variant="outline"
            className="border-slate-600 text-white hover:bg-slate-700"
          >
            Send Another Message
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-2xl text-white flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-amber-400" />
          Send Us Your Inquiry
        </CardTitle>
        <p className="text-slate-400">Fill out the form and our experts will respond within 2 hours</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Consultation Type */}
          <div>
            <label className="block text-sm font-medium text-white mb-3">Type of Inquiry</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {consultationTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => selectConsultationType(type.id)}
                  className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                    formData.consultationType === type.id
                      ? "border-amber-500 bg-amber-500/20 text-amber-400"
                      : "border-slate-600 bg-slate-700 text-slate-300 hover:border-slate-500"
                  }`}
                >
                  <span className="block mb-1">{type.icon}</span>
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="pl-10 bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                  placeholder="Your full name"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-10 bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                  placeholder="your@email.com"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                Phone
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="pl-10 bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-white mb-2">
                Company/Casino
              </label>
              <Input
                id="company"
                name="company"
                type="text"
                value={formData.company}
                onChange={handleInputChange}
                className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                placeholder="Your company name"
              />
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-white mb-2">
              Subject *
            </label>
            <Input
              id="subject"
              name="subject"
              type="text"
              required
              value={formData.subject}
              onChange={handleInputChange}
              className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
              placeholder="Brief summary of your inquiry"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
              Message *
            </label>
            <Textarea
              id="message"
              name="message"
              required
              rows={6}
              value={formData.message}
              onChange={handleInputChange}
              className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
              placeholder="Describe your inquiry in detail. Include information about specific products, quantities, dates, etc."
            />
          </div>

          <div className="flex items-center gap-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-semibold px-8 py-3 flex-1 md:flex-none"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </>
              )}
            </Button>

            <Badge variant="secondary" className="bg-green-500/20 text-green-400 hidden md:inline-flex">
              Response in 2 hours
            </Badge>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
