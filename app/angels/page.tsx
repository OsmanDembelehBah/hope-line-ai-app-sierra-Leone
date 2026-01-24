import Link from "next/link"
import { NavBar } from "@/components/nav-bar"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  Heart,
  Users,
  Shield,
  Clock,
  MessageCircle,
  Star,
  ArrowRight,
  CheckCircle,
  Sparkles,
  HandHeart,
  Globe,
  Phone,
} from "lucide-react"

export const metadata = {
  title: "HopeLine Angels - Volunteer Support Network",
  description: "Join the HopeLine Angels volunteer program and help provide emotional support to those in need across Sierra Leone.",
}

export default function AngelsPage() {
  return (
    <div className="min-h-screen bg-black">
      <NavBar />
      <Header title="HopeLine Angels" subtitle="Our Volunteer Support Network" />

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 mb-6">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Become a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              HopeLine Angel
            </span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            HopeLine Angels are trained volunteers who provide peer support, guidance, and hope 
            to individuals facing mental health challenges, addiction, and trauma across Sierra Leone.
          </p>
        </section>

        {/* What is HopeLine Angels */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 rounded-3xl p-8 md:p-12 border border-purple-500/20">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">What is HopeLine Angels?</h2>
                <p className="text-zinc-300 leading-relaxed mb-6">
                  HopeLine Angels is our new volunteer support network that extends the reach of HopeLine AI 
                  by connecting trained peer supporters with individuals who need human connection and guidance.
                </p>
                <p className="text-zinc-300 leading-relaxed">
                  While our AI provides 24/7 immediate support, HopeLine Angels offers the warmth of human 
                  connection, local knowledge, and community-based support that can make all the difference 
                  in someone's recovery journey.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/30 rounded-2xl p-6 text-center">
                  <Users className="w-10 h-10 text-purple-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-white">50+</p>
                  <p className="text-sm text-zinc-400">Trained Volunteers</p>
                </div>
                <div className="bg-black/30 rounded-2xl p-6 text-center">
                  <Globe className="w-10 h-10 text-indigo-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-white">10+</p>
                  <p className="text-sm text-zinc-400">Communities</p>
                </div>
                <div className="bg-black/30 rounded-2xl p-6 text-center">
                  <Heart className="w-10 h-10 text-pink-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-white">200+</p>
                  <p className="text-sm text-zinc-400">Lives Touched</p>
                </div>
                <div className="bg-black/30 rounded-2xl p-6 text-center">
                  <Clock className="w-10 h-10 text-yellow-400 mx-auto mb-3" />
                  <p className="text-2xl font-bold text-white">24/7</p>
                  <p className="text-sm text-zinc-400">Availability</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-10">How HopeLine Angels Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                title: "Request Support",
                description: "Users can request to speak with a HopeLine Angel through the app when they need human connection.",
                icon: MessageCircle,
                color: "from-purple-500 to-indigo-500",
              },
              {
                step: "2",
                title: "Get Matched",
                description: "Our system connects you with a trained volunteer who understands your situation and speaks your language.",
                icon: Users,
                color: "from-indigo-500 to-purple-500",
              },
              {
                step: "3",
                title: "Receive Support",
                description: "Have a confidential conversation with your Angel who provides guidance, resources, and emotional support.",
                icon: Heart,
                color: "from-purple-500 to-pink-500",
              },
            ].map((item, i) => (
              <div key={i} className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800 hover:border-purple-500/30 transition-colors">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6`}>
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-sm text-purple-400 font-medium mb-2">Step {item.step}</div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-zinc-400">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Become an Angel */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-3xl p-8 md:p-12 border border-yellow-500/30">
            <div className="text-center mb-10">
              <Star className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-4">Become a HopeLine Angel</h2>
              <p className="text-zinc-300 max-w-2xl mx-auto">
                Join our team of compassionate volunteers making a real difference in people's lives.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  Requirements
                </h3>
                <ul className="space-y-3">
                  {[
                    "18 years or older",
                    "Empathetic and non-judgmental attitude",
                    "Good communication skills",
                    "Commitment to confidentiality",
                    "Available for at least 4 hours per week",
                    "Completed HopeLine training program",
                  ].map((req, i) => (
                    <li key={i} className="flex items-center gap-3 text-zinc-300">
                      <div className="w-2 h-2 rounded-full bg-yellow-400" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <HandHeart className="w-5 h-5 text-pink-400" />
                  What You'll Do
                </h3>
                <ul className="space-y-3">
                  {[
                    "Provide emotional support via chat or call",
                    "Guide users to appropriate resources",
                    "Share coping strategies and techniques",
                    "Participate in community outreach",
                    "Attend monthly training sessions",
                    "Support peers in their recovery journey",
                  ].map((task, i) => (
                    <li key={i} className="flex items-center gap-3 text-zinc-300">
                      <div className="w-2 h-2 rounded-full bg-pink-400" />
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="text-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold rounded-full hover:from-yellow-400 hover:to-orange-400 transition-colors"
              >
                Apply to Become an Angel
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Need Support Now */}
        <section className="text-center">
          <div className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800">
            <Phone className="w-10 h-10 text-purple-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-3">Need Support Now?</h2>
            <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
              While we're building our Angels network, our AI is available 24/7 to provide immediate support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/chat"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white font-medium rounded-xl hover:bg-purple-700 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Chat with AI Now
              </Link>
              <Link
                href="/crisis"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition-colors"
              >
                <Phone className="w-5 h-5" />
                Emergency Help
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
