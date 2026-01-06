"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, MessageCircle, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

const messages = [
  "Hello! How may I help you today?",
  "What are you suffering from?",
  "You are not alone. Talk to HopeLine.",
  "I'm here to listen",
]

const quickActions = [
  { label: "Anxiety", icon: "😰", link: "/chat?topic=anxiety" },
  { label: "Depression", icon: "😔", link: "/chat?topic=depression" },
  { label: "Addiction (Kush)", icon: "🚭", link: "/chat?topic=kush" },
  { label: "Trauma / Abuse", icon: "💔", link: "/chat?topic=trauma" },
  { label: "I just want to talk", icon: "💬", link: "/chat" },
]

export default function FloatingAIAssistant() {
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  const [isOpen, setIsOpen] = useState(false)
  const [showBubble, setShowBubble] = useState(false)
  const [currentMessage, setCurrentMessage] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    if (!isHomePage) return

    const timer = setTimeout(() => {
      setShowBubble(true)
      setIsTyping(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [isHomePage])

  useEffect(() => {
    if (!showBubble || !isTyping) return

    const message = messages[currentMessage]
    let index = 0

    setDisplayedText("")

    const typeInterval = setInterval(() => {
      if (index < message.length) {
        setDisplayedText((prev) => prev + message[index])
        index++
      } else {
        setIsTyping(false)
        clearInterval(typeInterval)

        setTimeout(() => {
          setCurrentMessage((prev) => (prev + 1) % messages.length)
          setIsTyping(true)
        }, 5000)
      }
    }, 80)

    return () => clearInterval(typeInterval)
  }, [showBubble, isTyping, currentMessage])

  if (!isHomePage) return null

  return (
    <>
      {/* Floating Avatar */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.5, type: "spring" }}
        className="fixed bottom-6 right-6 z-50"
      >
        {/* Speech Bubble */}
        <AnimatePresence>
          {showBubble && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-20 right-0 mb-2 mr-2 max-w-xs"
            >
              <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-4 border-2 border-purple-300 dark:border-purple-700">
                <div className="text-sm font-medium text-gray-900 dark:text-white min-h-[1.5rem]">
                  {displayedText || " "}
                  {isTyping && <span className="inline-block w-0.5 h-4 ml-1 bg-purple-600 animate-pulse"></span>}
                </div>
                {/* Speech bubble arrow */}
                <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white dark:bg-gray-900 border-r-2 border-b-2 border-purple-300 dark:border-purple-700 transform rotate-45"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* AI Avatar Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 via-violet-500 to-indigo-600 shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-110 group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: [
              "0 0 20px rgba(147, 51, 234, 0.3)",
              "0 0 40px rgba(147, 51, 234, 0.5)",
              "0 0 20px rgba(147, 51, 234, 0.3)",
            ],
          }}
          transition={{
            boxShadow: {
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            },
          }}
        >
          {/* Female AI Face Illustration */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-12 h-12">
              {/* Face circle */}
              <circle cx="50" cy="50" r="35" fill="#FDF4FF" />
              {/* Hair */}
              <ellipse cx="50" cy="35" rx="38" ry="30" fill="#8B5CF6" />
              {/* Eyes */}
              <ellipse cx="42" cy="48" rx="3" ry="4" fill="#4C1D95" />
              <ellipse cx="58" cy="48" rx="3" ry="4" fill="#4C1D95" />
              {/* Smile */}
              <path d="M 40 58 Q 50 63 60 58" stroke="#9333EA" strokeWidth="2" fill="none" strokeLinecap="round" />
              {/* Soft highlights */}
              <circle cx="44" cy="46" r="1.5" fill="white" opacity="0.8" />
              <circle cx="60" cy="46" r="1.5" fill="white" opacity="0.8" />
            </svg>
          </div>

          {/* Sparkle icon for active state */}
          <motion.div
            className="absolute -top-1 -right-1 bg-white rounded-full p-1 shadow-lg"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <Sparkles className="w-3 h-3 text-purple-600" />
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, type: "spring" }}
            className="fixed bottom-28 right-6 w-96 max-w-[calc(100vw-3rem)] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border-2 border-purple-300 dark:border-purple-700 z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-violet-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">HopeLine AI</h3>
                  <p className="text-purple-100 text-xs">Here to support you</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                How can I help you today? Choose a topic or start chatting:
              </p>

              {/* Quick Actions */}
              <div className="space-y-2 mb-6">
                {quickActions.map((action, index) => (
                  <Link key={index} href={action.link}>
                    <motion.button
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-950/40 dark:to-violet-950/40 hover:from-purple-100 hover:to-violet-100 dark:hover:from-purple-900/50 dark:hover:to-violet-900/50 border border-purple-200 dark:border-purple-800 transition-all duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="text-2xl">{action.icon}</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{action.label}</span>
                    </motion.button>
                  </Link>
                ))}
              </div>

              {/* Privacy Message */}
              <div className="bg-purple-50 dark:bg-purple-950/40 rounded-lg p-3 border border-purple-200 dark:border-purple-800">
                <p className="text-xs text-gray-700 dark:text-gray-300 text-center space-y-1">
                  <span className="block">Your conversation is private.</span>
                  <span className="block">You can remain anonymous.</span>
                  <span className="block">HopeLine is here to support, not judge.</span>
                </p>
              </div>

              {/* Start Chat Button */}
              <Link href="/chat">
                <Button
                  className="w-full mt-4 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  Start Chatting Now
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
