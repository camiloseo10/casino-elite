import ContactHero from "@/components/contact/contact-hero"
import ContactForm from "@/components/contact/contact-form"
import ContactInfo from "@/components/contact/contact-info"
import ContactMethods from "@/components/contact/contact-methods"
import ContactFAQ from "@/components/contact/contact-faq"
import ContactCTA from "@/components/contact/contact-cta"

export const metadata = {
  title: "Contact - CasinoElite | Specialized 24/7 Support",
  description:
    "Contact our casino equipment experts. 24/7 support, personalized advice and quick response for all your inquiries.",
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-black">
      <ContactHero />
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
          <div className="lg:col-span-1">
            <ContactInfo />
          </div>
        </div>
      </div>
      <ContactMethods />
      <ContactFAQ />
      <ContactCTA />
    </main>
  )
}