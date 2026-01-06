"use client"

import { NavBar } from "@/components/nav-bar"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Mail, Linkedin } from "lucide-react"

interface TeamMember {
  id: number
  name: string
  role: string
  bio?: string
  image?: string
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Osman Dembeleh Bah",
    role: "CEO, Co-founder & Chief Technology Officer",
    bio: "Osman Dembeleh Bah is the CEO and Co-Founder of HopeLine, a purpose-driven platform dedicated to mental health awareness, crisis support, and digital innovation for vulnerable communities. With a strong passion for technology, youth empowerment, and social impact, he leads HopeLine with a mission to make help accessible, human, and immediate.",
    image: "/images/hopeline-20photo1.jpg",
  },
  {
    id: 2,
    name: "Co-Founder",
    role: "Co-Founder & Clinical Advisor",
    bio: "Bringing expertise in mental health policy and community outreach to ensure HopeLine serves those who need it most.",
    image: "/mental-health-professional-headshot.jpg",
  },
  {
    id: 3,
    name: "Managing Director",
    role: "Managing Director & Operations Lead",
    bio: "Overseeing operations and strategic partnerships to scale HopeLine's impact across Sierra Leone.",
    image: "/executive-professional-headshot.jpg",
  },
  {
    id: 4,
    name: "Team Member (Name)",
    role: "Program Director",
    bio: "Leading program development and community engagement initiatives.",
    image: "/program-manager-headshot.jpg",
  },
  {
    id: 5,
    name: "Team Member (Name)",
    role: "Technology Lead",
    bio: "Building scalable infrastructure to support our crisis support platform.",
    image: "/tech-engineer-headshot.jpg",
  },
  {
    id: 6,
    name: "Team Member (Name)",
    role: "Community Outreach Coordinator",
    bio: "Connecting HopeLine with communities, NGOs, and local organizations.",
    image: "/community-coordinator-headshot.jpg",
  },
]

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-background md:ml-64 md:pb-0 pb-20">
      <NavBar />

      <main className="max-w-7xl mx-auto p-4 md:p-8">
        <Header title="Our Team" subtitle="Dedicated to providing compassionate mental health support" />

        {/* Mission Statement */}
        <section className="mt-8 mb-12">
          <div className="gradient-calm rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-primary mb-3">Meet Our Leadership</h2>
            <p className="text-foreground leading-relaxed">
              The HopeLine AI team is composed of passionate mental health advocates, technologists, and community
              leaders committed to bringing accessible crisis support to Sierra Leone. Our diverse expertise ensures
              that HopeLine remains trauma-informed, culturally sensitive, and technologically robust.
            </p>
          </div>
        </section>

        {/* CEO Spotlight Section - Larger Featured Card */}
        <section className="mt-12 mb-16">
          <div className="flex justify-center">
            <div className="w-full max-w-2xl bg-gradient-to-br from-purple-900/20 to-indigo-900/20 rounded-3xl overflow-hidden border-2 border-purple-500/30 hover:border-purple-500/60 hover:shadow-[0_0_40px_rgba(147,51,234,0.4)] transition-all duration-500 transform hover:scale-[1.02]">
              {/* CEO Image */}
              <div className="relative w-full h-[500px] bg-gradient-to-b from-primary/10 to-secondary/10">
                <img
                  src={teamMembers[0].image || "/placeholder.svg"}
                  alt={teamMembers[0].name}
                  className="w-full h-full object-cover object-center"
                />
                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              {/* CEO Info */}
              <div className="p-8 space-y-4">
                <div className="inline-block bg-purple-600/20 backdrop-blur-xl border border-purple-500/30 px-4 py-2 rounded-full mb-2">
                  <span className="text-sm font-bold text-purple-300">👑 Leadership</span>
                </div>

                <h2 className="text-4xl font-bold text-foreground mb-2">{teamMembers[0].name}</h2>
                <p className="text-lg font-semibold text-purple-400 mb-4">{teamMembers[0].role}</p>
                <p className="text-base text-muted-foreground leading-relaxed">{teamMembers[0].bio}</p>

                {/* Contact Icons */}
                <div className="flex gap-4 pt-6 border-t border-border">
                  <button
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                    aria-label="Email"
                    title="Contact via Email"
                  >
                    <Mail className="w-5 h-5" />
                    <span className="text-sm">Email</span>
                  </button>
                  <button
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                    aria-label="LinkedIn"
                    title="Connect on LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                    <span className="text-sm">LinkedIn</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Other Team Members Grid */}
        <section className="mt-12">
          <h3 className="text-2xl font-bold text-center mb-8 text-foreground">Our Team</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.slice(1).map((member) => (
              <div
                key={member.id}
                className="bg-card rounded-2xl overflow-hidden border border-border hover:shadow-lg hover:border-purple-500/30 transition-all duration-300"
              >
                {/* Image Placeholder */}
                <div className="relative w-full h-64 bg-gradient-to-b from-primary/20 to-secondary/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-2">👤</div>
                    <p className="text-xs text-muted-foreground">Image placeholder</p>
                  </div>
                </div>

                {/* Member Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
                  <p className="text-sm font-semibold text-primary mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{member.bio}</p>

                  {/* Contact Icons (placeholders) */}
                  <div className="flex gap-3 pt-4 border-t border-border">
                    <button
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label="Email"
                      title="Email - to be configured"
                    >
                      <Mail className="w-4 h-4" />
                    </button>
                    <button
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label="LinkedIn"
                      title="LinkedIn - to be configured"
                    >
                      <Linkedin className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Limkokwing Attribution */}
        <section className="mt-12 bg-card rounded-2xl p-8 border border-border text-center">
          <h3 className="text-lg font-bold text-primary mb-2">University Partnership</h3>
          <p className="text-foreground mb-2">HopeLine AI is developed in partnership with and supported by</p>
          <p className="text-xl font-bold text-primary">Limkokwing University Sierra Leone</p>
          <p className="text-sm text-muted-foreground mt-2">
            Empowering innovation in technology and social impact through education and collaboration.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  )
}
