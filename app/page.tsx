"use client"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import {
  MessageCircle,
  AlertCircle,
  Heart,
  Users,
  Shield,
  Phone,
  Lock,
  Clock,
  ArrowRight,
  ArrowDown,
  Sparkles,
} from "lucide-react"
import { Footer } from "@/components/footer"
import { Typewriter } from "@/components/typewriter"
import { HomepageInteractiveCheckin } from "@/components/homepage-interactive-checkin"

export default function HomePage() {
  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95])

  return (
    <div className="bg-black min-h-screen">
      {/* Section 1: Hero with smaller typewriter */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-indigo-900/20" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600 rounded-full blur-[120px] opacity-20 animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-600 rounded-full blur-[120px] opacity-20 animate-pulse delay-1000" />

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative z-10 max-w-7xl mx-auto px-6 text-center space-y-8"
        >
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-bold text-white leading-tight"
          >
            Anonymous Support for
            <br />
            <span className="text-3xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 italic block mt-4">
              <Typewriter
                texts={["Mental Health & Recovery", "Trauma & Healing", "Addiction Support", "Crisis Intervention"]}
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            24/7 confidential support for Kush addiction, trauma survivors, and mental health crises across Sierra
            Leone. No judgment. No barriers. Always free.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-col sm:flex-row gap-6 justify-center pt-4"
          >
            <Link
              href="/chat"
              className="group bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-12 py-5 rounded-full text-lg font-bold hover:scale-105 hover:shadow-[0_0_40px_rgba(147,51,234,0.6)] transition-all duration-300 flex items-center justify-center gap-3"
            >
              <MessageCircle className="w-6 h-6" />
              Get Help Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/crisis"
              className="group bg-red-600/90 backdrop-blur-xl text-white px-12 py-5 rounded-full text-lg font-bold hover:bg-red-600 hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] transition-all duration-300 flex items-center justify-center gap-3"
            >
              <AlertCircle className="w-6 h-6" />
              Emergency Help
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
            className="pt-16"
          >
            <ArrowDown className="w-8 h-8 text-purple-400 mx-auto animate-bounce" />
          </motion.div>
        </motion.div>
      </section>

      <section className="py-24 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center space-y-8"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Our Mission</h2>

            <div className="space-y-6 text-lg md:text-xl text-gray-300 leading-relaxed">
              <p>
                In Sierra Leone, thousands struggle daily with{" "}
                <strong className="text-purple-400">Kush addiction</strong>, trauma from{" "}
                <strong className="text-purple-400">sexual violence</strong>, and{" "}
                <strong className="text-purple-400">mental health crises</strong> with limited access to support.
              </p>

              <p>
                Traditional barriers—stigma, cost, distance, fear of judgment—keep people suffering in silence.
                <strong className="text-white"> HopeLine AI breaks down these barriers.</strong>
              </p>

              <p>
                We provide <strong className="text-indigo-400">anonymous, AI-powered support</strong> that's available
                anytime, anywhere, for free. We don't replace professional care—we complement it by offering immediate,
                compassionate support while connecting users to rehabilitation centers, counselors, and emergency
                services.
              </p>

              {/* Mission Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl my-12"
              >
                <Image
                  src="/images/osman-20hopeline-202.png"
                  alt="HopeLine Mission - Supporting Those in Crisis"
                  fill
                  className="object-cover"
                />
              </motion.div>

              <div className="pt-8 grid md:grid-cols-3 gap-6 text-center">
                <div className="bg-purple-900/30 rounded-2xl p-6 border border-purple-500/20">
                  <div className="text-4xl font-bold text-purple-400 mb-2">24/7</div>
                  <div className="text-sm text-gray-400">Always Available</div>
                </div>
                <div className="bg-indigo-900/30 rounded-2xl p-6 border border-indigo-500/20">
                  <div className="text-4xl font-bold text-indigo-400 mb-2">100%</div>
                  <div className="text-sm text-gray-400">Anonymous & Free</div>
                </div>
                <div className="bg-purple-900/30 rounded-2xl p-6 border border-purple-500/20">
                  <div className="text-4xl font-bold text-purple-400 mb-2">0</div>
                  <div className="text-sm text-gray-400">Judgment Zone</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <HomepageInteractiveCheckin />

      {/* Section 2: Editorial Card Grid */}
      <section className="py-32 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-6xl md:text-7xl font-bold text-white mb-8 leading-tight">You Are Not Alone</h2>
            <p className="text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Every day, thousands struggle with addiction, trauma, and mental health challenges. We're here to help.
            </p>
          </motion.div>

          {/* Two-column grid layout */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Large image card */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl group"
            >
              <Image
                src="/images/kush-20victims-20google3.jpeg"
                alt="The silent struggle"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-10 left-10 text-white space-y-3">
                <h3 className="text-4xl font-bold">The Reality</h3>
                <p className="text-lg text-purple-300">Breaking the silence around addiction</p>
              </div>
            </motion.div>

            {/* Text card */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gray-900 rounded-3xl p-12 shadow-xl flex flex-col justify-center space-y-6 border border-gray-800"
            >
              <div className="w-16 h-16 rounded-2xl gradient-purple flex items-center justify-center mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-white">Compassionate Support</h3>
              <p className="text-xl text-gray-400 leading-relaxed">
                HopeLine AI provides trauma-informed, anonymous support for Kush addiction, sexual assault survivors,
                and anyone facing mental health challenges.
              </p>
              <Link href="/chat" className="inline-flex items-center gap-2 text-primary font-bold text-lg group">
                Start a conversation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>

            {/* Text card */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="gradient-purple rounded-3xl p-12 shadow-xl text-white flex flex-col justify-center space-y-6"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-xl flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-4xl font-bold">100% Anonymous</h3>
              <p className="text-xl text-purple-100 leading-relaxed">
                Your privacy matters. No login required, no data stored, no judgment. Just compassionate support when
                you need it most.
              </p>
              <div className="flex items-center gap-4 pt-4">
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
            </motion.div>

            {/* Large image card */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl group"
            >
              <Image
                src="/images/kush-20victims-20google2.jpeg"
                alt="Young lives affected"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-10 left-10 text-white space-y-3">
                <h3 className="text-4xl font-bold">Protecting Our Future</h3>
                <p className="text-lg text-purple-300">Every young person deserves hope and healing</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 3: Human Stories (Horizontal Scroll) */}
      <section className="py-32 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
        <div className="mb-20 px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-6xl md:text-7xl font-bold mb-8"
          >
            Stories of Healing
          </motion.h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Real experiences from Sierra Leone's journey toward recovery
          </p>
        </div>

        <div ref={null} className="flex gap-8 px-6 overflow-x-auto snap-x snap-mandatory pb-8 scrollbar-hide">
          {/* Stories will be added here */}
        </div>
      </section>

      {/* Section 4: About HopeLine */}
      <section ref={null} className="py-32 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              About{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
                HopeLine AI
              </span>
            </h2>
            <p className="text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
              We are Sierra Leone's first AI-powered mental health and crisis support platform, built with compassion
              and powered by technology to reach those who need help the most.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mt-16 relative rounded-3xl overflow-hidden shadow-2xl"
          >
            <img
              src="/images/osman-20hopeline-202.png"
              alt="HopeLine Mission - Providing compassionate support during challenging times"
              className="w-full h-auto"
            />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-purple-900/40 via-gray-900 to-indigo-900/40 backdrop-blur-xl rounded-3xl p-12 border border-purple-500/20 shadow-2xl space-y-6"
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center mb-6">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-white">Our Mission</h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                In Sierra Leone, thousands struggle daily with Kush addiction, trauma from sexual violence, and mental
                health crises with limited access to support. Traditional barriers—stigma, cost, distance, fear of
                judgment—keep people suffering in silence.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                HopeLine AI breaks down these barriers by providing anonymous, AI-powered support that's available
                anytime, anywhere, for free. We don't replace professional care—we complement it by offering immediate,
                compassionate support while connecting users to rehabilitation centers, counselors, and emergency
                services.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-gradient-to-br from-indigo-900/40 via-gray-900 to-purple-900/40 backdrop-blur-xl rounded-3xl p-12 border border-indigo-500/20 shadow-2xl space-y-6"
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-6">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-white">Who We Serve</h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                <strong className="text-purple-400">Kush Addiction Recovery:</strong> Compassionate guidance for those
                fighting substance abuse, with connections to rehabilitation centers and daily support strategies.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                <strong className="text-indigo-400">Sexual Assault Survivors:</strong> Trauma-informed support for rape
                and abuse survivors, with referrals to Rainbo Initiative and police Family Support Units.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                <strong className="text-purple-400">Mental Health Crises:</strong> Immediate support for depression,
                anxiety, suicidal thoughts, with breathing exercises and emergency crisis intervention.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 5: AI Technology */}
      <section ref={null} className="py-32 px-6 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center mb-24"
          >
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              AI Technology That{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
                Understands
              </span>
            </h2>
            <p className="text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
              Powered by advanced Google Gemini AI with trauma-informed training, web search grounding for accurate
              referrals, and privacy-first architecture
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">{/* AI Tech Features will be added here */}</div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 backdrop-blur-xl rounded-3xl p-12 border border-purple-500/30 text-center"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center mx-auto mb-8">
              <Lock className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-4xl font-bold text-white mb-6">Your Privacy is Our Priority</h3>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              We don't require login, we don't store conversations, and we don't collect personal data. All interactions
              are encrypted end-to-end. HopeLine AI is designed to be completely anonymous—your safety and
              confidentiality come first, always.
            </p>
            <div className="flex flex-wrap gap-6 justify-center text-purple-300">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span className="font-semibold">No Login Required</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                <span className="font-semibold">End-to-End Encrypted</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span className="font-semibold">Conversations Not Stored</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 6: Call to Action */}
      <section className="py-40 px-6 bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full blur-[120px]" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-300 rounded-full blur-[120px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-6xl mx-auto text-center space-y-12"
        >
          <h2 className="text-6xl md:text-8xl font-bold leading-[0.95] tracking-tight mb-8">
            Every Conversation
            <br />
            Can Save a Life
          </h2>

          <p className="text-2xl md:text-3xl text-purple-100 max-w-4xl mx-auto leading-relaxed font-light">
            Whether you're struggling with addiction, healing from trauma, facing a mental health crisis, or just need
            someone to listen—HopeLine AI is here for you. No judgment. No barriers. Just compassionate support when you
            need it most.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-12">
            <Link
              href="/chat"
              className="bg-white text-purple-900 px-16 py-7 rounded-full text-2xl font-bold hover:scale-105 transition-transform duration-300 shadow-2xl"
            >
              Start Talking Now
            </Link>

            <a
              href="tel:116"
              className="bg-transparent border-2 border-white text-white px-16 py-7 rounded-full text-2xl font-bold hover:bg-white/10 transition-colors duration-300"
            >
              Call 116 (Crisis Line)
            </a>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
            className="pt-12 flex flex-wrap gap-10 justify-center text-lg text-purple-100"
          >
            <div className="flex items-center gap-3">
              <Shield className="w-7 h-7" />
              <span className="font-semibold">100% Confidential</span>
            </div>
            <div className="flex items-center gap-3">
              <Heart className="w-7 h-7" />
              <span className="font-semibold">No Judgment</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-7 h-7" />
              <span className="font-semibold">24/7 Available</span>
            </div>
            <div className="flex items-center gap-3">
              <Sparkles className="w-7 h-7" />
              <span className="font-semibold">Always Free</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
