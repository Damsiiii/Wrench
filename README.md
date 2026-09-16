# Wrench

A Sri Lankan household-jobs marketplace built with React, Vite, Tailwind and Supabase.
Customers post jobs and compare quotes; local workers create profiles and quote for
work. The existing white/teal UI is connected to persistent backend data.

## Implemented

- Email/password accounts, confirmation/reset flows, optional Google sign-in
- Public worker profiles and job discovery; private contact settings
- Job posting, editing before quotes arrive, cancellation, and saved jobs
- Quotes with owner-only, atomic hiring; worker withdrawal
- Private job conversations and invitations, exact-address sharing with the hired worker
- Customer completion and one review per completed job; ratings from real reviews
- Public listing/profile images with restricted upload ownership

See [the backend plan](docs/BACKEND_PLAN.md) and
[Supabase setup and live acceptance checks](docs/SUPABASE_SETUP.md).

## Development

Requires Node 22+ and a configured Supabase development project.

```sh
npm ci
cp .env.example .env.local
# Fill the two public Supabase client variables in .env.local.
npm run dev
```

```sh
npm test
npm run build
```

GitHub Actions runs tests/build on pull requests. The existing Pages workflow deploys
`main`; configure the two repository variables described in the setup guide first.
No hosted database has been configured as part of this code change.

Legacy mock data/components remain for design reference but are not used as live
marketplace records. Payments, moderation, full translations, notifications and
production operations remain follow-up work.
