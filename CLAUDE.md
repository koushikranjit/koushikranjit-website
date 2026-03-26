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
- **Auto-deploy via Git.** Push to `main` triggers Vercel production deploy. No need to run `vercel deploy` manually.
- **Single-file site.** All CSS and JS are inline in `index.html`. No external CSS/JS files.

## Latest Changes

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
- [ ] Add actual media article URLs (currently placeholder `#` links)
- [ ] Consider CDN or image optimization for faster loading (GitHub raw URLs can be slow)
- [ ] Add Google Analytics or similar tracking
- [ ] SEO audit and optimization
