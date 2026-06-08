# App Subdomains

NekoCode can keep the main showcase at `https://nekocode.dev/` while giving each app a focused subdomain:

- `https://frendlyst.nekocode.dev/` -> `/apps/frendlyst`
- `https://beanbop.nekocode.dev/` -> `/apps/beanbop`
- `https://flipfocus.nekocode.dev/` -> `/apps/flipfocus`
- `https://system-fitness.nekocode.dev/` -> `/apps/system-fitness`

## Recommended Hosting Path

The current site is built for GitHub Pages, which works well for one custom domain but is not ideal for many app subdomains on the same static project.

For a setup like `tarsi.pocketdevs.ph`, use Vercel for this site:

1. Import the `nekocode-dev/nekocode` repo into Vercel.
2. Keep the framework preset as Astro.
3. Set the production domain to `nekocode.dev`.
4. Add the app subdomains to the same Vercel project:
   - `frendlyst.nekocode.dev`
   - `beanbop.nekocode.dev`
   - `flipfocus.nekocode.dev`
   - `system-fitness.nekocode.dev`
5. Point DNS for each subdomain to Vercel.
6. Deploy. Vercel will read `vercel.json` and rewrite each subdomain root to the matching app page without changing the visible URL.

## DNS Shape

For individual app subdomains, add CNAME records like:

```txt
frendlyst       CNAME   cname.vercel-dns.com
beanbop         CNAME   cname.vercel-dns.com
flipfocus       CNAME   cname.vercel-dns.com
system-fitness  CNAME   cname.vercel-dns.com
```

If you want every future app subdomain to resolve automatically, use a wildcard domain on Vercel instead:

```txt
*               CNAME   cname.vercel-dns.com
```

Vercel wildcard domains require Vercel-managed nameservers for automatic wildcard certificate handling.

## Notes

- The visible URL stays clean for the root app pages, such as `frendlyst.nekocode.dev/`.
- Direct short legal/support paths are also mapped where the app has those pages, such as `frendlyst.nekocode.dev/privacy`.
- The main site remains `nekocode.dev`.
- If the intended domain is `nekodev.com` instead of `nekocode.dev`, replace the host values in `vercel.json` and the DNS records with that domain.
