# Artificial Horizon — YouTube channel site

A Next.js site for the **Artificial Horizon** YouTube channel (`@ArtificialHorizonTV`). It pulls
your uploads automatically from YouTube — no manual updating — shows 10 per page, and every video
click opens the real video on YouTube.

- Auto-refreshes from YouTube every hour (no redeploy needed for new uploads)
- Home page: hero + latest video embed + paginated grid (10 per page, as many pages as you have videos)
- About, Contact, Terms & Conditions, and Privacy Policy pages included
- Site title, description, and favicon are pulled live from your channel's YouTube branding

## 1. Get a free YouTube Data API key

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project (or pick an existing one).
3. Go to **APIs & Services → Library**, search for **YouTube Data API v3**, and click **Enable**.
4. Go to **APIs & Services → Credentials → Create Credentials → API key**.
5. Copy the key. (Optional but recommended: click the key, restrict it to **YouTube Data API v3**
   under "API restrictions" so it can't be used for anything else.)

This is free — the site only reads public data (your channel info and video list), which uses a
tiny amount of the default daily quota.

## 2. Run it locally

```bash
npm install
cp .env.example .env.local
```

Open `.env.local` and paste your key:

```
YOUTUBE_API_KEY=your_key_here
```

The channel handle and ID are already filled in for `@ArtificialHorizonTV`. Then:

```bash
npm run dev
```

Visit `http://localhost:3000`. Until you add a key, the site shows clearly-marked placeholder
videos so nothing looks broken.

## 3. Deploy to Vercel

**Option A — via GitHub (recommended):**
1. Push this folder to a new GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import that repository.
3. Vercel auto-detects Next.js — no build settings to change.
4. Before the first deploy (or right after, then redeploy), add an environment variable:
   - `YOUTUBE_API_KEY` → your key from step 1.
5. Click **Deploy**.

**Option B — via CLI:**
```bash
npm install -g vercel
vercel
vercel env add YOUTUBE_API_KEY
vercel --prod
```

## 4. Keep it up to date

You don't have to do anything else. Every page load revalidates the video list at most once an
hour, so new uploads appear on their own. If you ever want changes to show up instantly after
publishing a video, redeploy or use Vercel's "Redeploy" button — it'll pick up the latest list
immediately.

## Customizing

- **Copy & links**: `lib/constants.js` — channel description, email, nav labels, subscribe link.
- **Colors & type**: `tailwind.config.js` (the "instrument panel" palette — sky blue, ground
  bronze, signal amber) and the fonts loaded in `app/layout.js`.
- **Legal pages**: `app/terms/page.js` and `app/privacy/page.js` are starting templates — they
  are not legal advice, so review and adjust them (or have a lawyer look them over) before you
  rely on them, especially if you ever add a store, accounts, or ad tracking.
- **Contact form**: `components/ContactForm.js` currently opens the visitor's email app with a
  pre-filled message (zero backend required). If you'd rather receive submissions directly, swap
  the `handleSubmit` function for a service like Formspree or Resend.
- **Videos per page**: `PAGE_SIZE` in `lib/constants.js` (defaults to 10).

## How the YouTube integration works

`lib/youtube.js` does three things:

1. Converts your channel ID into its "uploads" playlist ID (a standard YouTube trick — swap the
   `UC` prefix for `UU`).
2. Pages through `playlistItems.list` 50 videos at a time until it has every upload, sorted
   newest first.
3. Slices that list into pages of 10 for the grid, and separately fetches `channels.list` for
   your title, description, avatar, and stats.

Both calls are cached for an hour via Next.js's built-in `fetch` caching (`revalidate: 3600`), so
the site stays fast without hitting the YouTube API on every single page view.
