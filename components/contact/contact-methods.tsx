import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, Phone, Mail, Video, Calendar, Headphones } from "lucide-react"

const contactMethods = [
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Talk directly with our experts",
    availability: "24/7 Available",
    action: "Start Chat",
    color: "from-green-500 to-emerald-500",
    popular: true,
  },
  {
    icon: Phone,
    title: "Phone Call",
    description: "Phone consultation with specialist",
    availability: "Mon-Sun 24h",
    action: "Call Now",
    color: "from-blue-500 to-cyan-500",
    popular: false,
  },
  {
    icon: Video,
    title: "Video Call",
    description: "Live product demonstration",
    availability: "By appointment",
    action: "Schedule Demo",
    color: "from-purple-500 to-pink-500",
    popular: false,
  },
  {
    icon: Mail,
    title: "Specialized Email",
    description: "Detailed technical inquiries",
    availability: "Response in 2h",
    action: "Send Email",
    color: "from-amber-500 to-orange-500",
    popular: false,
  },
  {
    icon: Calendar,
    title: "Scheduled Consultation",
    description: "Personalized advisory session",
    availability: "30-60 min",
    action: "Book Appointment",
    color: "from-red-500 to-pink-500",
    popular: false,
  },
  {
    icon: Headphones,
    title: "Technical Support",
    description: "Help with installation and setup",
    availability: "24/7 Available",
    action: "Get Help",
    color: "from-indigo-500 to-purple-500",
    popular: false,
  },
]

export default function ContactMethods() {
  return (
    <section className="py-20 bg-slate-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Multiple Ways to Contact Us</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Choose the method that works best for you. Our team is prepared to help you in whatever way you prefer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contactMethods.map((method, index) => (
            <Card
              key={index}
              className="bg-slate-700 border-slate-600 hover:shadow-2xl transition-all duration-300 hover:scale-105 group relative overflow-hidden"
            >
              {method.popular && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-black text-xs font-bold px-2 py-1 rounded-full">
                  Most Popular
                </div>
              )}

              <CardContent className="p-6">
                <div className="space-y-4">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${method.color} rounded-full group-hover:scale-110 transition-transform duration-300`}
                  >
                    <method.icon className="w-8 h-8 text-white" />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{method.title}</h3>
                    <p className="text-slate-300 text-sm mb-3">{method.description}</p>
                    <p className="text-amber-400 text-xs font-medium">{method.availability}</p>
                  </div>

                  <Button className="w-full bg-slate-600 hover:bg-slate-500 text-white border-0" variant="outline">
                    {method.action}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
