"use client"

import { useState } from "react"
import { Heart, Brain, Users, Shield, MessageCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

const categories = [
  {
    id: "kush",
    name: "Kush Addiction",
    icon: Brain,
    description: "Support for substance abuse recovery",
    color: "from-purple-500 to-violet-600",
    link: "/chat?topic=kush",
  },
  {
    id: "trauma",
    name: "Sexual Violence / Rape",
    icon: Shield,
    description: "Trauma-informed support for survivors",
    color: "from-pink-500 to-rose-600",
    link: "/survivor-support",
  },
  {
    id: "mental",
    name: "Mental Health",
    icon: Heart,
    description: "Anxiety, depression, emotional distress",
    color: "from-indigo-500 to-blue-600",
    link: "/chat?topic=anxiety",
  },
  {
    id: "abuse",
    name: "Domestic Violence",
    icon: Users,
    description: "Safe space for abuse survivors",
    color: "from-red-500 to-pink-600",
    link: "/chat?topic=abuse",
  },
]

export function HomepageInteractiveCheckin() {
  const [showMoodCheck, setShowMoodCheck] = useState(false)

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">What Do You Need Help With?</h2>
          <p className="text-lg text-gray-400">
            Select a category or take a quick check-in to get personalized support
          </p>
        </div>

        {/* Quick Mood Check Button */}
        <div className="text-center mb-12 animate-slide-up">
          <button
            onClick={() => setShowMoodCheck(!showMoodCheck)}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white rounded-full font-semibold shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
          >
            <MessageCircle className="w-5 h-5" />
            Quick Check-In (Optional)
          </button>
        </div>

        {/* Mood Check Modal */}
        {showMoodCheck && (
          <div className="bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/30 mb-12 animate-fade-in">
            <h3 className="text-2xl font-bold text-white mb-6">How are you feeling right now?</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                "😊 Good",
                "😔 Struggling",
                "😰 Anxious",
                "😞 Depressed",
                "😡 Angry",
                "😶 Numb",
                "🆘 Crisis",
                "💬 Just Talk",
              ].map((mood) => (
                <button
                  key={mood}
                  className="p-4 bg-gray-700/50 hover:bg-purple-600/50 rounded-xl transition-all duration-200 text-white border border-gray-600 hover:border-purple-500"
                >
                  {mood}
                </button>
              ))}
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => setShowMoodCheck(false)}
                className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Skip
              </button>
              <Link href="/chat">
                <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-full font-semibold hover:scale-105 transition-transform">
                  Start Chat
                </button>
              </Link>
            </div>
          </div>
        )}

        {/* Category Selection Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((category, index) => (
            <Link key={category.id} href={category.link}>
              <div
                className={`relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br ${category.color} group cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="relative z-10">
                  <category.icon className="w-12 h-12 text-white mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                  <p className="text-white/90 mb-4">{category.description}</p>
                  <div className="flex items-center gap-2 text-white font-semibold">
                    Get Support
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Motivational Message */}
        <div className="mt-12 text-center animate-fade-in">
          <p className="text-xl text-purple-300 font-medium italic">
            "Taking the first step is the bravest thing you can do. We're here with you."
          </p>
        </div>
      </div>
    </section>
  )
}
