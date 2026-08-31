# Wrench - Micro-Services & Household Service Marketplace

Wrench is an on-demand web application that lets users hire electricians, plumbers, handymen, painters, locksmiths, HVAC technicians, cleaners, and appliance repair professionals.

## Features

- **Service Categories & Search:** Search and filter certified local service professionals by category, rating, and availability.
- **Quick Micro-Tasks:** Book fixed-price micro-services directly (e.g., drain unblocking, TV wall mounting, light switch replacement).
- **Verified Provider Profiles:** Detailed profiles with reviews, hourly rates, specialties, and experience badges.
- **Interactive Scheduling:** Book appointments with customizable dates, time windows, and service notes.
- **My Scheduled Services:** Manage upcoming and past bookings (view details, mark completed, or cancel).
- **Custom Task Posting & Pro Onboarding:** Modals for broadcasting custom job requests and signing up as a verified service professional.

## Setup & Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to GitHub Pages

The project is pre-configured with relative asset paths (`base: './'` in `vite.config.js`) so that it deploys seamlessly to GitHub Pages.

### Option 1: Deploy via GitHub Actions (Recommended)
1. In your GitHub repository, go to **Settings** > **Pages**.
2. Under **Build and deployment** > **Source**, select **GitHub Actions**.
3. GitHub will suggest the standard **Static HTML / Vite** action. Accept it to automatically build and deploy whenever you push to `main`.

### Option 2: Deploy `dist` folder manually or via `gh-pages`
1. Build the production files:
   ```bash
   npm run build
   ```
2. Deploy the generated `dist` folder to your `gh-pages` branch.
3. In repository **Settings** > **Pages**, set the source branch to `gh-pages` (or `/root` of gh-pages branch).
