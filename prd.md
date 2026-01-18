PRD, NekoCode Portfolio (GitHub Pages)
Version, v1.0
Owner, Danica (NekoCode)
Primary build target, GitHub Pages (static hosting)
Audience, recruiters, clients, collaborators
Positioning, award-grade portfolio experience, 2026 UI/UX standard

============================================================
1) Product summary
============================================================
NekoCode is a modular, high-performance portfolio site that showcases apps and projects as clickable case studies.
Each project card opens a dedicated detail page (app page) with screenshots, story, metrics, and links (GitHub, Store, Live).
The site also includes an "Our Team" page, About, and Contact.

Guiding idea: "Case studies first, not a gallery."
Design system is modular so new apps, team members, and sections can be added via content files (Markdown/JSON) without rewriting UI.

============================================================
2) Goals
============================================================
G1, Present work like product case studies (clear narrative, proof, outcomes).
G2, Make projects easy to browse (filters, search, shareable URLs).
G3, Feel competitive with award galleries (high polish, strong type, tasteful motion) while staying fast and accessible.
G4, Modular architecture (components + content schema) so updates are simple.

Non-goals
N1, No heavy CMS, no server required.
N2, No performance-killing 3D/WebGL hero by default (optional delight layer only).

============================================================
3) Success metrics (acceptance targets)
============================================================
Performance
- Lighthouse, Performance 95+, Accessibility 95+, Best Practices 95+, SEO 95+ (mobile + desktop).
- Core Web Vitals target, LCP < 2.5s, INP < 200ms, CLS < 0.1 on typical mobile.

Engagement (basic analytics events)
- 40%+ of sessions open a project detail page.
- 10%+ of sessions click Contact or copy email.
- Avg time to first project detail page < 10 seconds for first-time visitors.

============================================================
4) Research-driven design requirements (2026 bar)
============================================================
R1, Data-driven clarity
- Make key info scannable, reduce visual noise, keep interaction straightforward.
- Use filterable browsing patterns, clean hierarchy, and strong readability.

R2, Bento grid modular composition
- Use a bento grid on Home and Work/App index for a modern, modular layout.
- Cards should support multiple sizes and content density levels.

R3, Expressive minimalism (warmth + personality)
- Minimal layouts with subtle texture, organic accents, and human details.
- Avoid sterile "blank white" design. Add warmth without clutter.

R4, Typography as a primary design element
- Strong typographic scale and clear hierarchy.
- Display type feels distinctive, body type stays readable.

R5, Motion as storytelling, not decoration
- Micro-interactions, smooth transitions, scroll reveals.
- Must respect prefers-reduced-motion and never block usability.

R6, Award-grade checklist mindset
- Prioritize UI, UX, Innovation quality.
- Include a quality mode checklist and a visual regression pass.

============================================================
5) Information architecture
============================================================
Global nav
- Home
- Work
- Apps
- Team
- About
- Contact
Optional later
- Notes
- Styleguide (internal)

Routes
- /                   Home
- /work               All projects (filterable)
- /apps               Apps only (filterable)
- /apps/{slug}        App detail page (case study)
- /team               Team page
- /about              About and process
- /contact            Contact
- /404                Helpful 404

============================================================
6) Key user flows
============================================================
F1, Discover work fast
Home -> Featured bento -> click Project -> Project detail -> click GitHub/Store/Live

F2, Browse and filter
Work/Apps -> filter chips + search -> click card -> detail page
Filters must sync to URL query params for shareable views.

F3, Trust and contact
Any page -> Contact CTA -> form or mailto -> success state

F4, Team credibility
Team -> member cards -> social links -> related projects

============================================================
7) Page requirements
============================================================

7.1 Home
Must include
- Hero, NekoCode name, one-sentence positioning
- Primary CTAs, View Work, Contact
- Featured work bento grid (at least 6 cards)
- Capabilities strip (what you do)
- Proof strip (metrics, highlights, logos, awards if any, optional)
- "Now" module (what you are building this month, optional but recommended)
- Footer with socials

7.2 Work index (/work)
Must include
- Sticky filter bar (Type, Platform, Role, Tech, Status)
- Search input (title, tags, tech)
- Sort (Featured, Newest, Most Impact, optional)
- Grid results with accessible pagination or infinite load (prefer pagination for simplicity)
- Empty state and reset filters

7.3 Apps index (/apps)
Same as Work but pre-filter Type=App
- Add category chips (Productivity, Fintech, Games, Tools, etc.) if data exists

7.4 App detail page (/apps/{slug})
Must include (modular blocks)
- Hero, title, tagline, platform badges, quick links (GitHub, Store, Live)
- Overview (1-2 paragraphs)
- Problem
- Solution
- Key features (3-6 cards)
- Screenshots gallery (lightbox)
- Tech stack + architecture (simple diagram or readable explanation)
- Your role and responsibilities (specific)
- Results (metrics if available, otherwise qualitative outcomes)
- Learnings
- Next steps
- More projects (3 cards)
- Share module (copy link)

7.5 Team (/team)
Must include
- Team overview (how you collaborate)
- Team member grid, roles, bios, links
- Optional, "Ways to collaborate" module (open source, contracting, etc.)

7.6 About (/about)
Must include
- Bio, values, what you care about
- Process (how you build)
- Tooling and stack (honest list)
- Download resume button (optional)
- Social links

7.7 Contact (/contact)
Must include
- Static-friendly contact form (Formspree or similar) + mailto fallback
- Success state
- Social links
- Optional scheduling link

============================================================
8) Content model (content-driven, no-code updates)
============================================================
All content editable via Markdown/MDX or JSON content collections.

8.1 Project schema
id, string
slug, string
title, string
tagline, string
type, enum(app, website, research, open_source)
status, enum(live, in_progress, archived)
year, number
duration, string optional
roles, array of strings
platforms, array of enums(web, ios, android)
tech, array of strings
featured, boolean
category, string optional
links, object { live, repo, store, caseStudy }
media, object { coverImage, galleryImages[], demoVideoUrl }
summary, string (short)
metrics, object optional { users, downloads, revenue, impact, notes }
team, array of teamMemberIds

8.2 App detail content blocks
blocks[], array of:
- hero
- overview
- problem
- solution
- features
- gallery
- architecture
- responsibilities
- results
- learnings
- nextSteps
- credits
Each block supports:
type, string
title, string optional
body, markdown
media, optional

8.3 Team member schema
id, string
name, string
role, string
bio, string
skills, array
avatar, optional
links, object { github, linkedin, website }
highlights, array of short bullets
projects, array of project ids

============================================================
9) Design system and component library (modular UI)
============================================================
9.1 Design principles
- Clarity first, personality second, performance always.
- One strong idea per section. No clutter.
- Content-driven layouts (blocks render consistently).

9.2 Tokens
- Color tokens, bg, surface, text, muted, border, accent, success, warning
- Spacing scale, 4 8 12 16 24 32 48 64
- Radius scale, 8 12 16 24 (rounded feels modern)
- Shadow scale, subtle only
- Motion tokens, durations, easing, distance

9.3 Typography
- Use 2-font system, Display and Text (variable fonts preferred)
- Clear type scale, hero, H1, H2, H3, body, caption
- Excellent line-height and spacing for readability

9.4 Components (must be reusable)
Layout
- Container, Section, Stack, Grid, BentoGrid, PageShell

Navigation
- NavBar, MobileMenu, Breadcrumbs, Footer, ThemeToggle

UI primitives
- Button, IconButton, LinkButton, Tag, Badge, Tooltip, Toast
- Divider, Accordion, Tabs (optional)

Cards
- ProjectCard (Work)
- AppCard (Apps)
- TeamCard

Data UI
- FilterBar (chips + dropdowns)
- SearchInput
- SortMenu
- Pagination

Case study blocks
- ContentBlockRenderer
- FeatureGrid
- MetricsStrip
- Timeline (optional)
- GalleryLightbox
- TechStackList
- LinksBar
- ShareLink

States
- Skeleton loaders (only if needed)
- EmptyState
- ErrorState

============================================================
10) Motion and interaction requirements
============================================================
- All motion must support prefers-reduced-motion.
- Hover and focus states must be obvious and accessible.
- Use subtle transitions (150-250ms typical) and avoid distracting loops.
- Scroll reveals should not cause layout shift.

============================================================
11) Accessibility requirements
============================================================
- WCAG 2.2 AA target.
- Full keyboard navigation.
- Skip to content link.
- Semantic headings (no skipping levels).
- Visible focus ring.
- Color contrast AA minimum.
- Alt text for all meaningful images.

============================================================
12) SEO and sharing
============================================================
- OpenGraph and Twitter cards per page, including app detail pages.
- JSON-LD schema: WebSite, Person, CreativeWork/SoftwareApplication as applicable.
- Sitemap.xml and robots.txt.
- Clean canonical URLs.
- Proper page titles and meta descriptions from content fields.

============================================================
13) Technical requirements (GitHub Pages friendly)
============================================================
Recommended stack
- Astro (SSG) + Tailwind or CSS Modules
- MDX for case studies (optional)
- GitHub Actions deploy to GitHub Pages

Routing and build
- Static output only.
- Images optimized and responsive (srcset), lazy load below the fold.
- No heavy third-party scripts by default.
- Analytics optional (privacy-friendly), but must not harm performance.

Search and filters
- Build-time generated search index (JSON).
- Client-side fuzzy search (small library or minimal custom).
- Filters update URL query params.

Forms
- Use Formspree (or equivalent) for static form handling.
- Must provide mailto fallback.

============================================================
14) Milestones
============================================================
M1, MVP (launch-ready)
- Home, Work, Apps, App detail, About, Contact
- Content schemas + 3 sample projects
- Filter + search
- Deployed on GitHub Pages

M2, Team + polish
- Team page
- Improved bento layout
- Gallery lightbox
- Motion pass + reduced motion support

M3, Award-grade pass
- Typography refinement
- Texture layer (subtle)
- Accessibility audit pass
- Performance optimization pass
- Optional styleguide route

============================================================
15) QA checklist (release gating)
============================================================
Functional
- Every ProjectCard/AppCard opens correct detail page.
- Filters + search work, URL sync works.
- Contact form submits and shows success.
- All external links open and are correct.

Quality
- Lighthouse targets met.
- No layout shift on load.
- Mobile nav is smooth and clear.
- Reduced-motion mode looks good and remains fully usable.

============================================================
16) Claude Opus implementation instructions (deliverables)
============================================================
Claude must output a complete repo with:
D1, Full codebase ready to deploy on GitHub Pages.
D2, Modular component library and tokens.
D3, Content collections for projects and team, with examples.
D4, At least 3 example app case studies (placeholder content acceptable).
D5, Config file for:
    - theme (dark/light)
    - accent color
    - enable/disable delight motion
    - nav items
D6, GitHub Actions workflow for build + deploy to GitHub Pages.
D7, README with:
    - how to add a new project/app
    - how to add a team member
    - how to change featured projects
    - how to set a custom domain (optional)
D8, Accessibility and performance notes, what was done and where to tweak.

Implementation constraints
- Use straight apostrophes and avoid em dashes in site copy.
- Keep the UI modular and content-driven (blocks).
- Prioritize speed, accessibility, and polish over gimmicks.

============================================================
17) Example content templates (copy-friendly)
============================================================

Example, /content/projects/flipfocus.mdx (template)
---
id: flipfocus
slug: flipfocus
title: FlipFocus
tagline: Offline-first flashcards with spaced repetition
type: app
status: in_progress
year: 2026
roles: ["Product", "Design", "Engineering"]
platforms: ["android", "ios"]
tech: ["Flutter", "Dart", "Local DB", "SSG Docs"]
featured: true
category: Productivity
links:
  live: ""
  repo: "https://github.com/nekocode/flipfocus"
  store: ""
media:
  coverImage: "/assets/projects/flipfocus/cover.png"
  galleryImages:
    - "/assets/projects/flipfocus/1.png"
    - "/assets/projects/flipfocus/2.png"
summary: A modern flashcard app focused on privacy, offline use, and real learning.
metrics:
  users: ""
  downloads: ""
  impact: ""
team: ["danica"]
---

# Blocks
<Blocks>
  <Block type="overview" title="Overview">
    ...
  </Block>
  <Block type="problem" title="Problem">
    ...
  </Block>
  <Block type="solution" title="Solution">
    ...
  </Block>
  <Block type="features" title="Key features">
    ...
  </Block>
  <Block type="gallery" title="Screens">
    ...
  </Block>
  <Block type="architecture" title="Architecture">
    ...
  </Block>
  <Block type="results" title="Results">
    ...
  </Block>
  <Block type="learnings" title="Learnings">
    ...
  </Block>
</Blocks>

Example, /content/team/danica.json (template)
{
  "id": "danica",
  "name": "Danica A. Guillermo",
  "role": "Product, Ops, Compliance, Builder",
  "bio": "I build practical products with strong UX and clear systems.",
  "skills": ["Product thinking", "UI/UX", "Flutter", "Ops systems"],
  "links": {
    "github": "https://github.com/nekocode",
    "linkedin": "",
    "website": ""
  },
  "highlights": [
    "Ships modular systems",
    "Strong documentation",
    "Focus on clarity and craft"
  ],
  "projects": ["flipfocus"]
}

END PRD
