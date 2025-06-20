import { Button } from "@/components/ui/button"
import { ArrowRight, Mail, Phone, MessageCircle } from "lucide-react"

export default function AboutCTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-slate-800 to-slate-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Ready to Elevate Your
                <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  {" "}
                  Gaming Experience?
                </span>
              </h2>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Join thousands of satisfied customers who have trusted CasinoElite for their casino equipment. Our team
                is ready to help you find exactly what you need.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-semibold px-8 py-4 text-lg"
              >
                Explore Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-600 text-white hover:bg-slate-800 px-8 py-4 text-lg"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Talk to Expert
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-white">Email</h3>
                <p className="text-slate-400">info@casinoelite.com</p>
              </div>

              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-white">Phone</h3>
                <p className="text-slate-400">+1 (555) 123-4567</p>
              </div>

              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-white">Live Chat</h3>
                <p className="text-slate-400">Available 24/7</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
