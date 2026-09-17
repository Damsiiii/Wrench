# Connect Wrench to Supabase

The code and migrations are ready for a development project. They have **not** been
applied to a hosted project. No project credentials are committed.

## 1. Create the database

Use a fresh Supabase project for the first run. In its SQL editor, run these files,
in this order, once each:

1. `supabase/migrations/202609160001_marketplace.sql`
2. `supabase/migrations/202609160002_storage.sql`

Alternatively, with Supabase CLI authentication configured: `supabase link
--project-ref YOUR_PROJECT_REF`, then `supabase db push`. Review its migration list
before applying. Do not run these initial table-creation scripts over an existing
unrelated schema or rerun them after application.

The first migration creates profiles, worker profiles, jobs, quotes, exact addresses,
reviews, questions, saved jobs, conversations, and messages. It also backfills profiles
for existing Auth users. RLS protects reads; the `marketplace` RPC validates all writes
and derives the actor from the authenticated session.

The second creates the public `marketplace-images` bucket. Only JPG/PNG/WebP up to
2 MB are allowed. Each user can upload/delete only within their UUID folder.
Images are public: do not upload identity documents or private addresses. Removing
an image from a draft removes the reference, not the stored object. Orphan-image
cleanup is a follow-up before substantial upload traffic.

## 2. Configure Auth

- Enable email/password sign-in; keep email confirmation enabled.
- Set Site URL to the canonical site URL, including `/Wrench/` for GitHub Pages.
- Add exact redirect URLs for `http://localhost:3000/` and the deployed URL to the
  Auth redirect allowlist. The app uses its current origin/path for confirmation,
  password reset and Google sign-in redirects.
- Configure email delivery suitable for your intended users. Test confirmation and
  password reset using two real inboxes before inviting customers.
- Google sign-in is wired but requires the Google provider and OAuth client to be
  configured in the project. Email/password works independently.

The app handles password recovery without letting a recovered session skip the new
password form. An account can post jobs and create a worker profile; the navigation
role switch never grants database permissions.

## 3. Run locally

Use Node 22 or later.

```sh
npm ci
cp .env.example .env.local
```

Fill `.env.local` with your project URL and **publishable key**. A legacy anon key is
also accepted through `VITE_SUPABASE_ANON_KEY`. Never put a secret/service-role key
in any `VITE_` variable; these variables are included in the public browser bundle.

```sh
npm run dev
```

The app shows an explicit setup message and empty data without configuration. It
never silently substitutes demo accounts or jobs.

## 4. GitHub Pages

In repository Settings → Secrets and variables → Actions → Variables, add:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

The deployment workflow injects these at build time and runs tests. Environment
changes require a new build. The backend branch does not automatically deploy;
merging to `main` triggers the existing Pages workflow.

## 5. Live acceptance checks (still required)

Use separate browser profiles for a customer, two workers, and a signed-out visitor.

1. Sign up, confirm email, sign out/in, refresh, and complete password recovery.
2. Create worker profiles and upload images; reload to verify persistence.
3. Customer posts a job in Kurunegala, edits it before receiving quotes, and shares
   an exact address. Signed-out discovery sees the town, never the address.
4. Both workers quote. Each sees only their own quote; the customer sees both.
5. Invite a worker from their profile, choosing one of your open jobs; verify the
   invitation message appears for both participants.
6. Accept the **second** worker's quote. Only that worker sees the exact address;
   the job closes to new quotes. Try accepting another quote from a stale tab.
7. Exchange messages; reload both browsers. Messages refresh while viewing the
   inbox every 30 seconds, and on returning to the browser tab.
8. Customer completes the job and reviews once. Worker rating updates. The worker
   and unrelated users cannot complete/review it.
9. Cancel a separate open/in-progress job; quoting is blocked and address access
   is removed from the previously selected worker.
10. Check mobile navigation, sign-out isolation, failed uploads, and network errors.

## Automated verification

`npm test` executes the actual marketplace migration in PGlite (Postgres compiled
to WASM), with authenticated/anonymous roles and simulated `auth.uid()` identities.
It tests RLS, forbidden writes, spoofed actor fields, hiring the correct quote,
withdrawal, completion, reviews, cancellation, and storage folder policies. Storage
schema helpers are test doubles; the hosted storage API and Auth email delivery are
not simulated. UI tests render connected pages with empty/representative data.
`npm run build` checks the production bundle. These are not substitutes for the live
checks above or a concurrent hosted-Postgres stress test.

## Current limits

- No payments/escrow, SMS, notifications, read receipts, moderation or identity checks.
- Sinhala/Tamil navigation labels are design placeholders; translations are not done.
- Discovery/filtering currently loads accessible rows in ordered batches and filters
  locally. Move filtering/pagination and aggregate counts server-side as data grows.
- Inbox polling refreshes the current data snapshot; replace it with scoped realtime
  subscriptions if chat traffic justifies it.
- Add abuse/rate controls, moderation, backup/restore procedures, and orphan upload
  cleanup before a broad public launch. Free-plan suitability depends on actual usage;
  this implementation does not require paid-only features.
