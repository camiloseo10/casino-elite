"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react'

const faqs = [
  {
    question: "What is the response time for inquiries?",
    answer:
      "We respond to all inquiries within 2 hours during business hours. For urgent inquiries, our live chat is available 24/7 with immediate response.",
  },
  {
    question: "Do you offer advice for complete casino setup?",
    answer:
      "Yes, our team of experts can help you plan and equip your complete casino. We offer personalized consultations, product recommendations and installation support.",
  },
  {
    question: "Do you have certified products for commercial use?",
    answer:
      "All our products meet international casino standards. We have ISO certifications and official approvals for commercial use in casinos and clubs.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept credit/debit cards, PayPal, bank transfers and financing for large purchases. We also offer payment plans for corporate orders.",
  },
  {
    question: "Do you offer warranty on your products?",
    answer:
      "Yes, all our products include warranty. Chips and cards have 2 years, tables 5 years, and electronic equipment 1 year. 100% satisfaction guarantee or money back.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "We ship to over 50 countries. International shipments include full tracking and insurance. Delivery times vary between 5-15 days depending on destination.",
  },
  {
    question: "Can you customize products with logos?",
    answer:
      "Yes, we offer complete customization. We can add logos, corporate colors and specific designs on chips, cards, tables and other products. Ask about minimum orders.",
  },
  {
    question: "Do you offer post-sale technical support?",
    answer:
      "Our technical support team is available 24/7 to help you with installation, configuration and maintenance. Includes guides, tutorial videos and remote support.",
  },
]

export default function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mb-6">
            <HelpCircle className="w-8 h-8 text-black" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Find quick answers to the most common inquiries. If you can't find what you're looking for, contact us
            directly.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="bg-slate-800 border-slate-700">
              <CardContent className="p-0">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-slate-700 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  )}
                </button>

                {openIndex === index && (
                  <div className="px-6 pb-6">
                    <p className="text-slate-300 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
