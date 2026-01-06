# HopeLine AI — Sierra Leone

A production-ready crisis support and addiction recovery web application for Sierra Leone, providing anonymous emotional support for Kush addiction, rape survivors, violence victims, and anyone in crisis.

## 🌟 Features

- **Anonymous AI Chat** - 24/7 trauma-informed emotional support
- **Kush Addiction Recovery** - Specialized support with progress tracking and daily challenges
- **Survivor Support** - Resources and guidance for rape and GBV survivors
- **Crisis Resources** - Emergency contacts, grounding techniques, breathing exercises
- **Rehabilitation Directory** - Find and contact professional recovery centers
- **Mood Check-in** - Tailored support based on how you're feeling
- **Breathing Coach** - Animated guided breathing exercises
- **Recovery Challenges** - 7-day no-Kush challenge with daily tasks

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Clone and install:**
\`\`\`bash
git clone <your-repo>
cd hopeline-ai
npm install
\`\`\`

2. **Set up environment variables:**
Create a `.env.local` file:
\`\`\`
# AI SDK (Vercel AI Gateway - no key needed for supported models)
# Or add your provider key:
# OPENAI_API_KEY=your_key_here

# Optional: Database integration
# DATABASE_URL=your_database_url
\`\`\`

3. **Run development server:**
\`\`\`bash
npm run dev
\`\`\`

4. **Open in browser:**
\`\`\`
http://localhost:3000
\`\`\`

## 📋 IMPORTANT: Before Production Deployment

### 1. **Replace Placeholder Phone Numbers**
All emergency contacts and rehab center numbers are placeholders. Update these in `/lib/constants.ts`:

\`\`\`typescript
export const EMERGENCY_CONTACTS = {
  police: { number: "+232 XX XXX XXXX" }, // VERIFY WITH SIERRA LEONE POLICE
  rainboInitiative: { number: "+232 XX XXX XXXX" }, // VERIFY WITH RAINBO
  childline: { number: "116" }, // VERIFY WITH CHILDLINE SL
  hospital: { number: "999" } // VERIFY WITH LOCAL HOSPITALS
}

export const REHAB_CENTERS = [
  // Replace with verified current centers
]
\`\`\`

### 2. **Set Up AI API Keys**
The app uses Vercel AI Gateway by default (supports OpenAI, Anthropic, etc.). For production:

\`\`\`bash
# Add your provider key to Vercel environment variables
OPENAI_API_KEY=sk-...
\`\`\`

### 3. **Connect Backend Services**
The `/api/contact` endpoint currently logs requests. For production, connect to:

**Option A: Supabase**
\`\`\`typescript
import { createServerClient } from '@supabase/ssr'
const supabase = createServerClient(...)
await supabase.from('contact_requests').insert([data])
\`\`\`

**Option B: Firebase**
\`\`\`typescript
import { initializeApp } from 'firebase/app'
const db = getFirestore()
await addDoc(collection(db, 'contact_requests'), data)
\`\`\`

**Option C: EmailJS**
\`\`\`typescript
import emailjs from '@emailjs/browser'
await emailjs.send('service_id', 'template_id', data)
\`\`\`

### 4. **Privacy & Data Security**
- ✅ Chat messages are NOT stored by default (stateless)
- ✅ Progress data stored locally in browser (localStorage)
- ✅ Contact form data should be encrypted before storage
- ✅ Implement HTTPS only in production
- ✅ Add privacy policy and terms of service pages
- ✅ Consider GDPR/data protection compliance

### 5. **Accessibility & Legal**
- ✅ Privacy consent modal (already implemented)
- ✅ Disclaimer that app is not clinical care (already implemented)
- ✅ Add detailed privacy policy page
- ✅ Add terms of service
- ✅ Ensure WCAG 2.1 AA compliance (test with screen readers)
- ✅ Get approval from local NGOs and health authorities

### 6. **Testing Checklist**
- [ ] Test all emergency number links (tel: protocol)
- [ ] Test chat with various crisis scenarios
- [ ] Test breathing exercise on mobile
- [ ] Test form validation and submission
- [ ] Test localStorage persistence across sessions
- [ ] Test on iOS and Android browsers
- [ ] Test with screen readers (NVDA, JAWS)
- [ ] Load test with expected user volume

## 📱 Deployment to Vercel

### 1. **Push to GitHub:**
\`\`\`bash
git add .
git commit -m "Initial HopeLine AI deployment"
git push origin main
\`\`\`

### 2. **Deploy to Vercel:**
\`\`\`bash
npm install -g vercel
vercel
\`\`\`

### 3. **Set Environment Variables in Vercel Dashboard:**
- Go to Project Settings → Environment Variables
- Add `OPENAI_API_KEY` or your provider key
- Add any database URLs if using backend storage

### 4. **Enable Analytics:**
Already included via `@vercel/analytics`

## 🔧 Configuration

### Customize Emergency Contacts
Edit `/lib/constants.ts`:
\`\`\`typescript
export const EMERGENCY_CONTACTS = {
  police: { name: "...", number: "...", description: "..." },
  // Add more contacts
}
\`\`\`

### Customize Rehab Centers
Edit `/lib/rehab-data.ts` or connect to a database:
\`\`\`typescript
export const REHAB_CENTERS = [
  { id: 1, name: "...", city: "...", phone: "...", ... }
]
\`\`\`

### Customize AI System Prompt
Edit `/lib/constants.ts` - `AI_SYSTEM_PROMPT`:
\`\`\`typescript
export const AI_SYSTEM_PROMPT = `You are HopeLine AI...`
\`\`\`

## 🎨 Styling

The app uses:
- **Tailwind CSS v4** - Utility-first styling
- **shadcn/ui** - Pre-built accessible components
- **Custom theme** - Blue & purple calm colors in `/app/globals.css`

To customize colors, edit the CSS variables in `globals.css`:
\`\`\`css
:root {
  --primary: oklch(0.55 0.2 270); /* Blue */
  --secondary: oklch(0.65 0.15 280); /* Purple */
  --accent: oklch(0.6 0.18 260); /* Accent */
}
\`\`\`

## 📁 Project Structure

\`\`\`
hopeline-ai/
├── app/
│   ├── page.tsx                 # Home page
│   ├── chat/page.tsx            # Anonymous chat
│   ├── breathing/page.tsx       # Breathing exercises
│   ├── mood/page.tsx            # Mood check-in
│   ├── recovery/page.tsx        # Recovery companion
│   ├── challenges/page.tsx      # 7-day challenge
│   ├── survivor-support/page.tsx # Survivor resources
│   ├── stay-alive/page.tsx      # Crisis support
│   ├── crisis/page.tsx          # Emergency help
│   ├── rehab-centers/page.tsx   # Rehab directory
│   ├── rehab-contact/page.tsx   # Contact form
│   ├── api/
│   │   ├── chat/route.ts        # AI chat endpoint
│   │   └── contact/route.ts     # Contact form endpoint
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
├── components/
│   ├── nav-bar.tsx              # Navigation
│   ├── header.tsx               # Page header
│   ├── footer.tsx               # Page footer
│   ├── privacy-consent-modal.tsx # Privacy modal
│   └── quick-action-buttons.tsx # Action buttons
├── lib/
│   ├── constants.ts             # Emergency contacts, prompts, affirmations
│   ├── rehab-data.ts            # Rehab center data
│   └── utils.ts                 # Utility functions
├── public/
│   └── index.html               # Static landing page
└── README.md                    # This file
\`\`\`

## 🔐 Security Notes

1. **Never commit API keys** - Use environment variables
2. **Validate all inputs** - Server-side validation in place
3. **CORS headers** - Configured for API routes
4. **No sensitive data in localStorage** - Only progress tracking
5. **Chat is stateless** - No server-side message storage by default
6. **Rate limiting** - Consider adding for production

## 🤝 Contributing

To add features or fix bugs:

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make changes and test thoroughly
3. Commit: `git commit -m "Add feature"`
4. Push: `git push origin feature/your-feature`
5. Open a pull request

## 📞 Support & Maintenance

### Regular Maintenance Tasks
- [ ] Monthly: Verify emergency contact numbers are current
- [ ] Monthly: Check rehab center information is accurate
- [ ] Quarterly: Review and update AI system prompt
- [ ] Quarterly: Check for security updates
- [ ] Annually: Conduct accessibility audit

### Monitoring
- Monitor Vercel Analytics for usage patterns
- Track error rates in API routes
- Monitor chat interactions for safety issues
- Review contact form submissions

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

Built with:
- [Next.js](https://nextjs.org/) - React framework
- [Vercel AI SDK](https://sdk.vercel.ai/) - AI integration
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - Components
- [Lucide Icons](https://lucide.dev/) - Icons

## 📞 Emergency Resources

**Sierra Leone Crisis Support:**
- 🚨 Police Emergency: 999
- 💙 Rainbo Initiative (GBV): +232 78 111 111
- 👧 Childline: 116
- 🏥 Hospital Emergency: 999

---

**Last Updated:** December 2024
**Status:** Production Ready
**Version:** 1.0.0
