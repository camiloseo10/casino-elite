import { MessageCircle, Phone, Mail, Clock } from 'lucide-react'

export default function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 py-20 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] opacity-10"></div>

      <div className="container relative mx-auto px-4 md:px-6">
        <div className="text-center max-w-4xl mx-auto">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 text-sm font-medium text-black">
                <MessageCircle className="mr-2 h-4 w-4" />
                24/7 Support
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Contact Our
                <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  {" "}
                  Experts
                </span>
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Have questions about our products? Need advice for your casino or club? Our team of experts is here to
                help you every step of the way.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
                <Phone className="w-8 h-8 text-green-400 mb-3 mx-auto" />
                <h3 className="font-semibold text-white mb-1">Call Us</h3>
                <p className="text-slate-300 text-sm">+1 (555) 123-4567</p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
                <Mail className="w-8 h-8 text-blue-400 mb-3 mx-auto" />
                <h3 className="font-semibold text-white mb-1">Email Us</h3>
                <p className="text-slate-300 text-sm">info@casinoelite.com</p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
                <Clock className="w-8 h-8 text-amber-400 mb-3 mx-auto" />
                <h3 className="font-semibold text-white mb-1">Hours</h3>
                <p className="text-slate-300 text-sm">24/7 Available</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
