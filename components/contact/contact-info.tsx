import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Clock, Phone, Mail, MessageCircle, Globe } from "lucide-react"

const contactDetails = [
  {
    icon: MapPin,
    title: "Main Office",
    details: ["123 Casino Boulevard", "Las Vegas, NV 89101", "United States"],
    color: "text-red-400",
  },
  {
    icon: Phone,
    title: "Phone",
    details: ["+1 (555) 123-4567", "Toll-free calls", "24/7 Support"],
    color: "text-green-400",
  },
  {
    icon: Mail,
    title: "Email",
    details: ["info@casinoelite.com", "support@casinoelite.com", "sales@casinoelite.com"],
    color: "text-blue-400",
  },
  {
    icon: Clock,
    title: "Hours",
    details: ["Monday - Sunday", "24 hours", "Continuous support"],
    color: "text-amber-400",
  },
]

const socialLinks = [
  { name: "WhatsApp", icon: MessageCircle, color: "text-green-400", handle: "+1 555 123 4567" },
  { name: "Telegram", icon: MessageCircle, color: "text-blue-400", handle: "@CasinoEliteSupport" },
  { name: "Website", icon: Globe, color: "text-purple-400", handle: "casinoelite.com" },
]

export default function ContactInfo() {
  return (
    <div className="space-y-6">
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-xl text-white">Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {contactDetails.map((item, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className={`flex-shrink-0 w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center`}>
                <item.icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                {item.details.map((detail, idx) => (
                  <p key={idx} className="text-slate-400 text-sm">
                    {detail}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-xl text-white">Additional Channels</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {socialLinks.map((link, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors cursor-pointer"
            >
              <link.icon className={`w-5 h-5 ${link.color}`} />
              <div>
                <div className="font-medium text-white">{link.name}</div>
                <div className="text-slate-400 text-sm">{link.handle}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-500/30">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="font-bold text-white mb-2">🚀 Quick Response</h3>
            <p className="text-amber-200 text-sm">
              Our team responds to all inquiries within 2 hours during business hours.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
