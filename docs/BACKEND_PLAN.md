# Wrench backend plan

Baseline: 0344b4148cdfea104d8e42e6fe2e493b2e2b2b72 (new reference-based UI).
The UI has 15 page groups and mobile navigation. Data is still local mock data;
authentication, uploads, hiring, withdrawal, completion and settings are simulated.

## Implementation sequence
1. Supabase Auth and public profiles; private account preferences/contact details.
2. Jobs and worker profiles; authenticated posting; public discovery.
3. Quotes: one per worker/job; owner-only acceptance with a row lock; all other
   quotes rejected atomically. Workers cannot quote their own or closed jobs.
4. Completion/cancellation, completed-job reviews, persistent questions and saved jobs.
5. Private job-linked conversations/messages, public job/work images.
6. Replace UI fixtures with server data without redesigning pages; errors and empty
   states must be honest. Verify grants/RLS and state changes using real Postgres.

## Data and trust boundaries
- Public: profile display names, worker descriptions, job descriptions/towns/photos,
  questions and completed-job reviews. Never put a phone/address in these fields.
- Private: account phone/preferences (owner only), exact job address (owner and
  selected worker only), quotes (author and job owner), messages (participants only).
- Browser uses only project URL and publishable/anon key, never a service-role key.
- A role switch changes navigation only, not database permissions.
- Sensitive writes go through a constrained database RPC with authenticated identity,
  explicit field lists and lifecycle checks. No client-authored ratings/verification.

## Deployment gate
Apply migrations to a new Supabase development project first. Configure Auth redirect
URLs and email delivery, add public client variables to hosting, and run two-account
browser tests. Project access is not available in this session: no remote migration,
Auth configuration or production deployment can be verified here.

## Follow-up scope
Payments/escrow, SMS, push/email job alerts, moderation/admin, full Sinhala/Tamil copy,
server-paginated discovery at larger scale, and operational backups are separate work.
