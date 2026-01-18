# NekoCode Portfolio

> Case studies first, not a gallery.

A modular, high-performance portfolio site built with Astro, showcasing apps and projects as clickable case studies.

![License](https://img.shields.io/badge/license-MIT-blue.svg)

## Features

- 🐱 **Neko-Inspired Design** - Elegant, minimal "Moonlit Neko" aesthetic
- 📱 **Bento Grid Layout** - Modern, modular design with variable card sizes
- 🌙 **Dark/Light Mode** - Respects system preferences with manual toggle
- ⚡ **Blazing Fast** - Static site generation with Astro
- ♿ **Accessible** - WCAG 2.2 AA compliant, keyboard navigable
- 📝 **Content-Driven** - Add projects with just MDX files

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Adding a New Project

1. Create a new MDX file in `src/content/projects/`:

```mdx
---
id: my-project
title: My Project
tagline: A short description
type: app
status: live
year: 2026
roles: ["Design", "Engineering"]
platforms: ["web", "ios"]
tech: ["React", "TypeScript"]
featured: true
category: Productivity
links:
  repo: "https://github.com/..."
  live: "https://..."
media:
  coverImage: "/assets/projects/my-project/cover.png"
summary: Brief summary for SEO and cards.
team: ["danica"]
---

## Overview
Your project overview here...

## Problem
The problem you solved...

## Solution
How you solved it...
```

2. Add images to `public/assets/projects/my-project/`

3. Rebuild: `npm run build`

## Adding a Team Member

1. Create a JSON file in `src/content/team/`:

```json
{
  "id": "jane",
  "name": "Jane Doe",
  "role": "Designer",
  "bio": "Short bio here.",
  "skills": ["UI/UX", "Figma"],
  "links": {
    "github": "https://github.com/jane",
    "linkedin": "https://linkedin.com/in/jane"
  }
}
```

## Changing Featured Projects

Edit the project's MDX frontmatter and set `featured: true`.

The first featured project on the home page gets the larger "bento-featured" treatment.

## Setting a Custom Domain

1. Add your domain to `astro.config.mjs`:
   ```js
   site: 'https://yourdomain.com',
   base: '/',
   ```

2. Add a `CNAME` file to `public/` with your domain.

3. Configure DNS with your domain provider.

## Tech Stack

- **Framework**: [Astro](https://astro.build) 5.x
- **Styling**: Vanilla CSS with CSS Modules
- **Content**: MDX Collections
- **Hosting**: GitHub Pages
- **Search**: Fuse.js (planned)
- **Forms**: Formspree

## Project Structure

```
src/
├── content/
│   ├── projects/     # MDX case studies
│   └── team/         # Team member JSON
├── components/
│   ├── layout/       # Container, Section, BentoGrid
│   ├── nav/          # NavBar, Footer
│   ├── ui/           # Button, Tag
│   └── cards/        # ProjectCard, TeamCard
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   ├── index.astro   # Home
│   ├── work/         # Work index
│   ├── apps/         # Apps index + [slug]
│   ├── team.astro
│   ├── about.astro
│   ├── contact.astro
│   └── 404.astro
└── styles/
    └── global.css    # Design tokens + utilities
```

## Accessibility

- Skip to content link
- Semantic HTML structure
- ARIA labels for interactive elements
- Visible focus states
- Color contrast AA minimum
- Reduced motion support

## Performance

Target Lighthouse scores:
- Performance: 95+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

## License

MIT
