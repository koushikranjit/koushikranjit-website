# CLAUDE.md — KOUSHIK RANJIT

## Memory-First Rule
- **Always read memory files before doing ANY task.** Start every conversation by reading `MEMORY.md` and relevant memory files from the project memory directory.
- After completing any significant change, **auto-save** the latest state to `project_status.md` in memory.

## Project
- Personal website for Koushik Ranjit
- Profile data: `data/koushik-ranjit.json`
- Live URL: https://koushikranjit.in
- Hosting: Vercel (project: koushikranjit-website, ID: prj_eum56TZVFJntzAvBzhYdui9o8jIX)
- Domain: koushikranjit.in + www.koushikranjit.in (DNS via GoDaddy, SSL via Let's Encrypt auto-provisioned)
- Stack: Next.js 16 + Tailwind CSS + shadcn/ui (converted from static HTML)
- Git: https://github.com/koushikranjit/koushikranjit-website.git (connected to Vercel for auto-deploy on push to main)
- Images: Hosted on GitHub raw URLs (KR-Website repo) — **never download images locally**

## Storage Rules — READ BEFORE SAVING ANYTHING
- MacBook has 256GB only — keep it free at all times
- Never download files to MacBook — push to GitHub or Google Drive instead
- Run `npm run build` only when needed — delete build folder after
- Large assets (images, videos) → 1TB external hard disk only
- After every session: push all changes to GitHub immediately
- Never leave node_modules on disk longer than needed — delete and reinstall fresh

## Other Rules
- **Auto-deploy via Git may break.** Push to `main` should trigger Vercel deploy, but GitHub webhook can silently stop. Always verify with `vercel deploy --prod` if changes don't appear live.
- **Single-file site.** All CSS and JS are inline in `index.html`. No external CSS/JS files.
- **Brand color is emerald green** (#059669 / emerald-600) — not blue. All CTAs, links, and accents use green.
- **KRtrades page uses Tailwind classes** (not inline `<style>` tags). Componentized with framer-motion.
- **`overflow: hidden` breaks `position: sticky`** — use `overflow: clip` instead. Fixed elements must be outside any `overflow: clip` container.

## Latest Changes

### 2026-04-06 (Session 2) — KRtrades complete rebuild: mobile-first, liquid glass, green brand

**Complete Page Rebuild (`src/app/KRtrades/page.tsx`):**
- Rewrote entire page from scratch — 0 inline styles, 100% Tailwind CSS classes
- 10 separate components: TopNavHeader, HeroCarousel, ProductInfo, SocialProofBar, PageDescription, TradeResultsMarquee, FAQAccordion, ReviewsSection, AboutCreator, RelatedCarousel, StickyBottomCTA, DesktopSidebar, DiscordModal, Lightbox
- framer-motion animations for FAQ accordion + sticky CTA slide-in
- IntersectionObserver hides sticky CTA when inline "Join now" is visible
- Read more/Show less on description + review cards

**Mobile-First Responsive (finally fixed):**
- Root cause of "not responsive" was Vercel auto-deploy silently stopped — code was pushed to GitHub but never built on Vercel. Fixed by running `vercel deploy --prod` manually.
- Mobile: single-column layout, full-bleed hero, pricing below slider, sticky bottom CTA
- Desktop (lg+): two-column Whop-style layout with sticky sidebar
- `overflow: clip` used instead of `overflow: hidden` (hidden breaks sticky positioning)
- Fixed elements (header, sticky CTA, modals) placed outside the `overflow: clip` container
- Layout wrapper in `layout.tsx` uses `overflow-x: clip` to prevent horizontal scroll

**Liquid Glass Aesthetic:**
- All cards: `bg-white/[0.04]`, `backdrop-blur-xl`, inner light border (`inset_0_1px_0_rgba(255,255,255,0.05)`), deep shadow
- Glass header + sticky CTA with `backdrop-blur-2xl`
- Review cards with hover glow effect
- Glass FAQ accordion, Discord modal, about section

**Brand Color: Blue → Green:**
- All accents changed from blue (#3b5bdb) to emerald green (#059669)
- CTA buttons: emerald gradient with green glow shadow
- Links: emerald-400
- Razorpay theme color: #059669

**Other Changes:**
- Removed video from hero carousel — 4 image slides only
- Active dot indicator becomes pill shape
- Deleted fake "Market Breakdown Weekly" product card
- Header content constrained to max-w-[1300px] with mx-auto (Manage button aligns with sidebar)
- Desktop sidebar sticky fixed: `lg:items-start` on parent flex + `overflow: clip`

**Layout File (`src/app/KRtrades/layout.tsx`):**
- Added wrapper div with `!block w-screen max-w-full` + `overflow-x: clip`
- Neutralizes root layout's `flex flex-col` on body

**Files Changed:**
- `src/app/KRtrades/page.tsx` — Complete rewrite (700+ lines)
- `src/app/KRtrades/layout.tsx` — Added overflow wrapper

**Deployment Note:**
- Vercel GitHub auto-deploy webhook stopped working silently after commit `2be4380`
- All subsequent commits (15+) were NOT deployed despite successful git push
- Fixed by running `vercel deploy --prod` manually via CLI
- Always verify live site after push; if not updated, run `vercel deploy --prod`

### 2026-04-06 — KR Trades full product: Whop-style page, Razorpay, Discord bot, automation

**KR Trades Landing Page (`/KRtrades`):**
- Whop-style two-column layout: main content + sticky sidebar
- Hero image slider (4 promo images, manual navigation with arrows/dots)
- Trade results auto-scrolling marquee (9 screenshots from Discord)
- 7 real Trustpilot reviews (4.9 rating) + rating summary bars
- FAQ accordion (5 questions), About creator section, More from KR Trades card
- Member count auto-updates from Discord server (currently 81)

**Razorpay Payment Integration:**
- Plan: `plan_SZcXV7asNU7aFI` (₹1,025/month, autopay)
- Key: `rzp_live_SSL6Wg71WI8B11` (same account as MyTradesBook — NEVER mix plans)
- APIs: `/api/subscribe` (create), `/api/subscribe/cancel`, `/api/subscribe/lookup` (by email), `/api/subscribe/count`
- Webhook: `Sa28DVMl34646J` → `koushikranjit.in/api/webhook/razorpay` (secret: krtrades2026)
- Events: subscription.activated/charged/cancelled/halted/paused/completed + payment.captured
- Discord username collected via modal before checkout (with guide image)

**Discord Bot Auto-Role System:**
- Bot: KR Trades Bot (ID: 1490527642921861261)
- Server: 1363171378659856574 | Premium role: 1363175050835922954 | Free role: 1461003496336916631
- Payment success → assigns Premium Member role + welcome DM
- Cancellation → 7-day grace period with DM reminders (Day 0, 3, 5, 7)
- Day 7 → removes Premium role (Free Members stays always)
- Reactivation → instant Premium role restore
- Daily cron at 8 AM UTC checks all subs, sends reminders, removes expired

**Pages Created:**
- `/KRtrades` — Sales landing page (Whop-style)
- `/KRtrades/manage` — Cancel subscription by email
- `/KRtrades/renew` — Quick reactivation page for existing users

**APIs Created:**
- `/api/subscribe` — Create Razorpay subscription (passes Discord username in notes)
- `/api/subscribe/cancel` — Cancel subscription at cycle end
- `/api/subscribe/lookup` — Find subscriptions by email
- `/api/subscribe/count` — Returns Discord member count + Razorpay purchase count
- `/api/webhook/razorpay` — Handles Razorpay events → Discord role management + DMs
- `/api/cron/check-subs` — Daily grace period check + DM reminders

**SEO & Bug Fixes:**
- `public/index.html` — Title: "Koushik Ranjit - Day Trader", enhanced Person schema for GKP, image alt tags, 6 real media article URLs, removed Wikipedia, English book summary, fixed JS querySelector error
- `public/sitemap.xml` — Created with / and /meetup
- `public/robots.txt` — Created with sitemap reference
- `public/googlef4896d8d5248eda9.html` — Google Search Console verification

**Discord link updated everywhere:** `discord.gg/HySGNbJa3r` (old links deprecated)
**Work email:** teamkoushikranjit@gmail.com (not contact@koushikranjit.in)

### 2026-03-26 — Meetup page rebuild, Google Forms, hosts, multi-domain
- `src/app/meetup/page.tsx` — Complete rebuild: clean landing page with interest form (name, email, phone, location), limited seats messaging, selection-only entry, ticketed event notice, How It Works section, Hosts section with big image cards
- Form backend: Google Forms (hidden iframe submission) → auto-saves to Google Sheet + email notifications to contact@koushikranjit.in & teamkoushikranjit@gmail.com
- Google Form URL: `https://docs.google.com/forms/d/e/1FAIpQLSdu8gIdAU_t_7FDBNzPexoP6whefYX6q45ahU1kpI9nX-rbfg/formResponse`
- 3 Hosts added: Subhadip Sarkar, Koushik Ranjit, Souvik Guha (all "Organizer & Day Trader")
- Host images uploaded to KR-Website GitHub repo: `subhodip-host.png`, `koushik-host3.png`, `souvik-host.png`, `meetup-og.png`
- Meetup page also deployed to **mytradesbook.com/meetup** (separate copy with MyTradesBook branding)
- Deleted `trader-meeting/` folder from Desktop (1.6GB freed — was already merged)
- Previous session: updated partner link, venue TBA, stats 100+/5+, added Subhadip as speaker

### 2026-03-19 — Session 2: DNS fix, SSL verify, AI Clone workflow started
- DNS verified: GoDaddy A record → 76.76.21.21, CNAME www → cname.vercel-dns.com (nameservers moved from freehostia to domaincontrol.com)
- SSL confirmed working: Let's Encrypt cert, TLSv1.3, server: Vercel
- Deployed latest code via `vercel deploy --prod` and `git push` (auto-deploy confirmed)
- `ai-clone-workflow.html` — Created then removed (was reference guide, not a website page)
- `CLAUDE.md` — Updated storage rules section, added session changes
- **AI Clone project started** — Step 1 (Face Creation): 10 prompts prepared for Gemini Pro with identity-preserving instructions, 10 outfit variations. User generating images manually in Gemini app using 10 HEIC reference photos from `~/Desktop/face creation/`
- NanoBanana MCP free tier quota hit — user using Gemini Pro subscription directly instead

### 2026-03-19 — Full session: Setup, redesign, deployment, domain, images

**Files changed:**
- `index.html` — Complete UI redesign: replaced entire file with premium animated design (Inter + Playfair Display fonts, preloader, custom cursor, floating particles, hero text reveal animation, scroll-triggered reveals, glass morphism cards, Ken Burns hero effect, lazy image loading, responsive mobile menu). All content/images/links preserved.
- `data/koushik-ranjit.json` — No content changes (image URLs temporarily changed to local then reverted back to GitHub raw URLs)
- `CLAUDE.md` — Created with project info, hosting details, latest changes tracking
- `.gitignore` — Created (new file)
- `assets/images/` — 26 images downloaded then fully reverted & deleted (user prefers GitHub-hosted)
- `.vercel/project.json` — Existed from initial Vercel link (not modified this session)

**Infrastructure:**
- Deployed to Vercel production (3 deployments during session)
- Added custom domains: `koushikranjit.in` and `www.koushikranjit.in`
- DNS configured on GoDaddy: A record → 76.76.21.21, CNAME www → cname.vercel-dns.com
- SSL auto-provisioned by Vercel (Let's Encrypt, TLSv1.3)
- Connected GitHub repo for auto-deploy on push

**Git commits (on main):**
1. `7c5275f` — Redesign website with premium animated UI
2. `e4bd56a` — Move all images to local assets/images directory
3. `5f22627` — Revert "Move all images to local assets/images directory"

## Current Priorities
- [x] Initial Vercel deployment
- [x] Custom domain setup (koushikranjit.in)
- [x] SSL certificate
- [x] Premium UI redesign with animations
- [x] GitHub auto-deploy connected
- [x] Image hosting resolved (GitHub raw URLs, no local storage)
- [x] AI Clone Workflow guide page created (then removed — was reference only)
- [x] Traders Meetup page — rebuilt with form, hosts, Google Forms backend
- [x] Meetup deployed to mytradesbook.com/meetup (separate branding)
- [ ] **AI Clone — Step 1: Face Creation** (10 prompts sent, user generating in Gemini Pro)
- [ ] AI Clone — Step 2: Dataset Building (10-20 varied images)
- [ ] AI Clone — Step 3: Upscale to 4K-8K (OpenArt / Magnific / Lupa AI)
- [ ] AI Clone — Step 4: Voice Clone (ElevenLabs / MathCare)
- [ ] AI Clone — Step 5: Image to Video (VEO 3.1 / Kling AI / PixVerse)
- [ ] AI Clone — Step 6: Final Assembly
- [x] Add actual media article URLs (6 real articles linked)
- [x] SEO: Enhanced Person schema, sitemap, robots.txt, Google Search Console verified
- [x] KR Trades sales landing page (/KRtrades) — Whop-style design
- [x] KR Trades Razorpay payment (₹1,025/month autopay)
- [x] KR Trades Discord bot auto-role (Premium assign/remove)
- [x] KR Trades 7-day grace period + DM reminders
- [x] KR Trades manage subscription page (/KRtrades/manage)
- [x] KR Trades renew page (/KRtrades/renew)
- [x] KR Trades Razorpay webhook + daily cron
- [x] Discord link updated everywhere to discord.gg/HySGNbJa3r
- [x] Trustpilot reviews integrated (7 real reviews)
- [x] KRtrades page complete rebuild — mobile-first Tailwind components
- [x] KRtrades mobile responsive — works on all devices (320px–430px+)
- [x] KRtrades desktop two-column layout with sticky sidebar
- [x] KRtrades liquid glass aesthetic theme
- [x] KRtrades brand color changed to emerald green
- [x] KRtrades video removed from slider — 4 images only
- [x] KRtrades header fixed with constrained content width
- [x] KRtrades sticky sidebar fixed (overflow:clip)
- [x] Vercel deploy issue diagnosed and fixed (manual deploy via CLI)
- [ ] Consider CDN or image optimization for faster loading (GitHub raw URLs can be slow)
- [ ] Add Google Analytics or similar tracking
- [ ] SEO audit and optimization
- [ ] Discord bot: add `/apply` command for manual Premium role requests
- [ ] Discord bot: add announcement posting capability
