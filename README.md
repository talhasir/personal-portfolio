# Hafiz Talha, portfolio

Next.js 16 (app router), React 19, Tailwind CSS v4. Deployed on Vercel.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build, with type checking
npm run lint
```

## Content

All text lives in `content/data/*.json`, edited through the portal at `/admin`.
The `content/*.ts` files only add types; components only render the data.

- `profile.json`: name, headline, photo, links, name card, Built for logos, About and Vision
- `work.json`: every case study, one entry each (pages at `/work/<slug>`)
- `achievements.json`: the achievement cards
- `experience.json`: the timeline, same roles and dates as the CV
- `skills.json`: skill groups and "How I work"
- `reviews.json`: client reviews
- `site.json`: every section heading, intro and button label, the contact lists, and SEO text

Uploaded images and PDFs go to `public/uploads/`.

## Portal (`/admin`)

A private editor for everything above. Sign in at `/admin/login`.

**Sign-in.** Run `npm run admin:password`. It asks for a username and a password (not shown as you type),
writes a scrypt hash and a random session secret to `.env.local`, and prints the same three lines
(`ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH`, `ADMIN_SESSION_SECRET`) to add in Vercel. The password itself is never stored.
Sessions last 7 days; changing the secret signs everyone out. Five wrong passwords from one address lock it for 15 minutes.

**Where saves go.**

- Locally (`npm run dev`, no GitHub settings): saves write the JSON files directly and the local site updates at once. Commit them to publish.
- On Vercel: saves commit to GitHub, then Vercel redeploys (about a minute). Set:
  - `GITHUB_TOKEN`: a fine-grained token with **Contents: Read and write** on this repository only
  - `GITHUB_REPO`: `owner/name`
  - `GITHUB_BRANCH`: the branch Vercel deploys (default `main`)

A freshly uploaded image shows in the portal right away but on the live site only after that redeploy.
If two saves race, the second is refused with "This content changed", so nothing is overwritten.

**Adding a field.** Describe it once in `lib/admin/fields.ts`; the form and the server-side check are both built from it.

## Contact form

The form posts to `app/api/contact/route.ts`, which sends through Resend.
Set these in Vercel (Project, Settings, Environment Variables) and in `.env.local` for local runs:

- `RESEND_API_KEY`: from resend.com
- `CONTACT_TO`: where messages go
- `CONTACT_FROM` (optional): a sender on a domain verified in Resend

Without a key the form says it is not connected and shows the email address.
