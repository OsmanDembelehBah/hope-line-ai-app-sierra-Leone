import Link from "next/link"
import {
  Heart,
  Shield,
  Phone,
  ArrowRight,
  Sparkles,
  MessageCircle,
  Music,
  Brain,
  Star,
  X,
} from "lucide-react"
import { Footer } from "@/components/footer"
import { AppleLogoHeader } from "@/components/apple-logo-header"
import { HeroSection } from "@/components/hero-section"
import { ScrollAnimate } from "@/components/scroll-animate"
import { AnnouncementBanner } from "@/components/announcement-banner"

export default function HomePage() {
  return (
    <div className="bg-black min-h-screen">
      {/* HopeLine Angels Announcement Banner */}
      <AnnouncementBanner />
      
      <AppleLogoHeader />
      <HeroSection />

      {/* Section 2: Mission */}
      <section className="py-24 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-8">
            <ScrollAnimate>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Our Mission</h2>
            </ScrollAnimate>

            <ScrollAnimate animation="scale" delay={1}>
              <div className="relative h-[300px] md:h-[400px] rounded-3xl overflow-hidden shadow-2xl my-12 bg-gray-800">
                <img
                  src="/images/chatgpt-20image-20hopline.png"
                  alt="HopeLine Mission"
                  className="object-cover w-full h-full"
                  loading="eager"
                />
              </div>
            </ScrollAnimate>

            <ScrollAnimate delay={2}>
              <div className="space-y-6 text-lg md:text-xl text-gray-300 leading-relaxed">
                <p>
                  In Sierra Leone, thousands struggle daily with{" "}
                  <strong className="text-purple-400">Kush addiction</strong>, trauma from{" "}
                  <strong className="text-purple-400">sexual violence</strong>, and{" "}
                  <strong className="text-purple-400">mental health crises</strong>.
                </p>
                <p>
                  <strong className="text-white">HopeLine AI breaks down barriers</strong> with anonymous, AI-powered
                  support available anytime, anywhere, for free.
                </p>
              </div>
            </ScrollAnimate>

            <div className="pt-8 grid md:grid-cols-3 gap-6 text-center">
              <ScrollAnimate delay={1}>
                <div className="bg-purple-900/30 rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/50 transition-colors">
                  <div className="text-4xl font-bold text-purple-400 mb-2">24/7</div>
                  <div className="text-sm text-gray-400">Always Available</div>
                </div>
              </ScrollAnimate>
              <ScrollAnimate delay={2}>
                <div className="bg-indigo-900/30 rounded-2xl p-6 border border-indigo-500/20 hover:border-indigo-500/50 transition-colors">
                  <div className="text-4xl font-bold text-indigo-400 mb-2">100%</div>
                  <div className="text-sm text-gray-400">Anonymous & Free</div>
                </div>
              </ScrollAnimate>
              <ScrollAnimate delay={3}>
                <div className="bg-purple-900/30 rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/50 transition-colors">
                  <div className="text-4xl font-bold text-purple-400 mb-2">0</div>
                  <div className="text-sm text-gray-400">Judgment Zone</div>
                </div>
              </ScrollAnimate>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <ScrollAnimate>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Quick Access</h2>
              <p className="text-xl text-gray-400">Everything you need, one click away</p>
            </div>
          </ScrollAnimate>

          <div className="grid md:grid-cols-4 gap-6">
            <ScrollAnimate delay={1}>
              <Link href="/chat" className="block h-full">
                <div className="bg-purple-900/40 rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/50 hover:scale-105 transition-all h-full">
                  <MessageCircle className="w-12 h-12 text-purple-400 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">AI Chat</h3>
                  <p className="text-gray-400 text-sm">Talk to our supportive AI assistant</p>
                </div>
              </Link>
            </ScrollAnimate>

            <ScrollAnimate delay={2}>
              <Link href="/music" className="block h-full">
                <div className="bg-indigo-900/40 rounded-2xl p-8 border border-indigo-500/20 hover:border-indigo-500/50 hover:scale-105 transition-all h-full">
                  <Music className="w-12 h-12 text-indigo-400 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Music Therapy</h3>
                  <p className="text-gray-400 text-sm">Calming sounds for relaxation</p>
                </div>
              </Link>
            </ScrollAnimate>

            <ScrollAnimate delay={3}>
              <Link href="/breathing" className="block h-full">
                <div className="bg-purple-900/40 rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/50 hover:scale-105 transition-all h-full">
                  <Brain className="w-12 h-12 text-purple-400 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Breathing</h3>
                  <p className="text-gray-400 text-sm">Guided breathing exercises</p>
                </div>
              </Link>
            </ScrollAnimate>

            <ScrollAnimate delay={4}>
              <Link href="/community" className="block h-full">
                <div className="bg-indigo-900/40 rounded-2xl p-8 border border-indigo-500/20 hover:border-indigo-500/50 hover:scale-105 transition-all h-full">
                  <Sparkles className="w-12 h-12 text-indigo-400 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Stories</h3>
                  <p className="text-gray-400 text-sm">Read inspiring recovery stories</p>
                </div>
              </Link>
            </ScrollAnimate>
          </div>
        </div>
      </section>

      {/* Section 3: Support Section */}
      <section className="py-32 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <ScrollAnimate>
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">You Are Not Alone</h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Every day, thousands struggle with addiction, trauma, and mental health challenges. We're here to help.
              </p>
            </div>
          </ScrollAnimate>

          <div className="grid lg:grid-cols-2 gap-8">
            <ScrollAnimate animation="left" delay={1}>
              <div className="relative h-[350px] md:h-[450px] rounded-3xl overflow-hidden shadow-2xl bg-gray-800">
                <img
                  src="/images/kush-20victims-20google3.jpeg"
                  alt="The silent struggle"
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-10 left-10 text-white space-y-3">
                  <h3 className="text-3xl md:text-4xl font-bold">The Reality</h3>
                  <p className="text-lg text-purple-300">Breaking the silence around addiction</p>
                </div>
              </div>
            </ScrollAnimate>

            <ScrollAnimate animation="right" delay={2}>
              <div className="bg-gray-900 rounded-3xl p-8 md:p-12 shadow-xl flex flex-col justify-center space-y-6 border border-gray-800 h-full">
                <div className="w-16 h-16 rounded-2xl gradient-purple flex items-center justify-center mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white">Compassionate Support</h3>
                <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
                  HopeLine AI provides trauma-informed, anonymous support for Kush addiction, sexual assault survivors,
                  and anyone facing mental health challenges.
                </p>
                <Link href="/chat" className="inline-flex items-center gap-2 text-purple-400 font-bold text-lg">
                  Start a conversation
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </ScrollAnimate>

            <ScrollAnimate animation="left" delay={1}>
              <div className="gradient-purple rounded-3xl p-8 md:p-12 shadow-xl text-white flex flex-col justify-center space-y-6 h-full">
                <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold">100% Anonymous</h3>
                <p className="text-lg md:text-xl text-purple-100 leading-relaxed">
                  Your privacy matters. No login required, no data stored, no judgment. Just compassionate support when
                  you need it most.
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    <span className="font-semibold">24/7</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    <span className="font-semibold">Secure</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    <span className="font-semibold">Free</span>
                  </div>
                </div>
              </div>
            </ScrollAnimate>

            <ScrollAnimate animation="right" delay={2}>
              <div className="relative h-[350px] md:h-[450px] rounded-3xl overflow-hidden shadow-2xl bg-gray-800">
                <img
                  src="/images/kush-20victims-20google2.jpeg"
                  alt="Young lives affected"
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-10 left-10 text-white space-y-3">
                  <h3 className="text-3xl md:text-4xl font-bold">Protecting Our Future</h3>
                  <p className="text-lg text-purple-300">Every young person deserves hope and healing</p>
                </div>
              </div>
            </ScrollAnimate>
          </div>
        </div>
      </section>

      {/* Section 4: How HopeLine Works */}
      <section className="py-24 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <ScrollAnimate>
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
                How{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
                  HopeLine Works
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
                Our AI is trained to provide trauma-informed, culturally sensitive support for Sierra Leone's unique
                challenges.
              </p>
            </div>
          </ScrollAnimate>

          <div className="grid md:grid-cols-3 gap-8">
            <ScrollAnimate delay={1}>
              <div className="text-center space-y-6 p-8 rounded-3xl bg-gray-900/50 border border-gray-800 hover:border-purple-500/50 transition-colors h-full">
                <div className="w-20 h-20 rounded-full gradient-purple mx-auto flex items-center justify-center text-3xl font-bold text-white">
                  1
                </div>
                <h3 className="text-2xl font-bold text-white">Start Chatting</h3>
                <p className="text-gray-400 leading-relaxed">
                  Click the chat bubble or "Get Help Now" button. No signup required—your privacy is protected.
                </p>
              </div>
            </ScrollAnimate>

            <ScrollAnimate delay={2}>
              <div className="text-center space-y-6 p-8 rounded-3xl bg-gray-900/50 border border-gray-800 hover:border-purple-500/50 transition-colors h-full">
                <div className="w-20 h-20 rounded-full gradient-purple mx-auto flex items-center justify-center text-3xl font-bold text-white">
                  2
                </div>
                <h3 className="text-2xl font-bold text-white">Share Your Story</h3>
                <p className="text-gray-400 leading-relaxed">
                  Tell HopeLine what you're going through. Our AI listens without judgment and responds with compassion.
                </p>
              </div>
            </ScrollAnimate>

            <ScrollAnimate delay={3}>
              <div className="text-center space-y-6 p-8 rounded-3xl bg-gray-900/50 border border-gray-800 hover:border-purple-500/50 transition-colors h-full">
                <div className="w-20 h-20 rounded-full gradient-purple mx-auto flex items-center justify-center text-3xl font-bold text-white">
                  3
                </div>
                <h3 className="text-2xl font-bold text-white">Get Support</h3>
                <p className="text-gray-400 leading-relaxed">
                  Receive coping strategies, grounding techniques, and connections to local resources and emergency
                  services.
                </p>
              </div>
            </ScrollAnimate>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-gray-900 to-black">
        <ScrollAnimate animation="scale">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Ready to Take the First Step?</h2>
            <p className="text-xl text-gray-400 mb-12 leading-relaxed">
              Whether you're struggling with addiction, processing trauma, or just need someone to talk to—HopeLine is
              here for you.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/chat"
                className="gradient-purple text-white px-10 py-5 rounded-full text-xl font-bold hover:opacity-90 hover:scale-105 transition-all flex items-center justify-center gap-3"
              >
                <MessageCircle className="w-6 h-6" />
                Start Talking Now
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                href="/crisis"
                className="bg-red-600 text-white px-10 py-5 rounded-full text-xl font-bold hover:bg-red-700 hover:scale-105 transition-all flex items-center justify-center gap-3"
              >
                <Phone className="w-6 h-6" />
                Emergency Help
              </Link>
            </div>
          </div>
        </ScrollAnimate>
      </section>

      <Footer />
    </div>
  )
}
