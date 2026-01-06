import { Heart, Phone } from "lucide-react"

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <Phone className="w-6 h-6" />
        <Heart className="w-3 h-3 absolute -bottom-0.5 -right-0.5 fill-current" />
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-lg leading-none">HopeLine AI</span>
        <span className="text-[8px] uppercase tracking-wider opacity-60">Crisis Support</span>
      </div>
    </div>
  )
}
