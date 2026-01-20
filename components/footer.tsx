import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-8 p-8 text-sm text-muted-foreground">
      <div className="max-w-6xl mx-auto">
        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-semibold text-foreground mb-3">Support</h4>
            <ul className="space-y-2">
              <li><Link href="/chat" className="hover:text-foreground transition-colors">AI Chat</Link></li>
              <li><Link href="/crisis" className="hover:text-foreground transition-colors">Crisis Help</Link></li>
              <li><Link href="/breathing" className="hover:text-foreground transition-colors">Breathing</Link></li>
              <li><Link href="/music" className="hover:text-foreground transition-colors">Music Therapy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3">Community</h4>
            <ul className="space-y-2">
              <li><Link href="/community" className="hover:text-foreground transition-colors">Stories</Link></li>
              <li><Link href="/community/share-story" className="hover:text-foreground transition-colors">Share Story</Link></li>
              <li><Link href="/news" className="hover:text-foreground transition-colors">News</Link></li>
              <li><Link href="/team" className="hover:text-foreground transition-colors">Our Team</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="/agencies" className="hover:text-foreground transition-colors">Agencies</Link></li>
              <li><Link href="/journal" className="hover:text-foreground transition-colors">Journal</Link></li>
              <li><Link href="/challenges" className="hover:text-foreground transition-colors">Challenges</Link></li>
              <li><Link href="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-3">Connect</h4>
            <ul className="space-y-2">
              <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact Us</Link></li>
              <li><Link href="/about" className="hover:text-foreground transition-colors">About</Link></li>
              <li><Link href="/admin" className="hover:text-foreground transition-colors text-xs text-zinc-600">Admin</Link></li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="text-center space-y-3 pt-6 border-t border-border/50">
          <p>
            <strong>Disclaimer:</strong> HopeLine AI provides emotional support and resources but is not a replacement for
            professional medical or mental health treatment.
          </p>
          <p>In immediate danger? Call police (019) or emergency services.</p>

          <div className="pt-4">
            <p className="font-semibold text-foreground">© {new Date().getFullYear()} HopeLine AI Sierra Leone</p>
            <p className="text-xs mt-1">Crisis Support & Recovery Platform | Empowering Minds, Saving Lives</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
