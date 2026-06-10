# Watson Legacy Group — Official Website

Black & gold luxury site for WatsonLegacyGroup.com. Built with Next.js 14. Deploy-ready for Vercel.

---

## 🚀 PART 1 — Deploy to Vercel (same flow as Travel Plug)

### Option A: GitHub → Vercel (recommended)

1. Go to **github.com** → click **+** → **New repository**
2. Name it `watson-legacy-group` → Create repository
3. Click **uploading an existing file** link
4. Drag ALL the files/folders from this unzipped project in (app folder, package.json, next.config.js, .gitignore)
5. Click **Commit changes**
6. Go to **vercel.com** → **Add New** → **Project**
7. Import the `watson-legacy-group` repo
8. Leave all settings as default (Vercel auto-detects Next.js)
9. Click **Deploy**
10. Done — you'll get a live URL like `watson-legacy-group.vercel.app`

### Option B: Vercel CLI (if you have Node installed)

```bash
npm install -g vercel
cd watson-legacy-group
vercel
```

Follow the prompts, accept defaults.

---

## 🌐 PART 2 — Connect Your Squarespace Domain

### Step 1: Add the domain in Vercel
1. In Vercel, open your project → **Settings** → **Domains**
2. Type `watsonlegacygroup.com` → **Add**
3. Also add `www.watsonlegacygroup.com`
4. Vercel will show you the DNS records you need (they should match the values below)

### Step 2: Update DNS in Squarespace
1. Log into **Squarespace** → **Settings** → **Domains**
2. Click your domain → **DNS Settings** (or "Advanced DNS")
3. **DELETE** any existing A records pointing to Squarespace (usually 198.185.159.x and 198.49.23.x IPs) and the default CNAME for www
4. **ADD** these records:

| Type  | Host | Value                 |
|-------|------|-----------------------|
| A     | @    | 76.76.21.21           |
| CNAME | www  | cname.vercel-dns.com  |

5. Save

### Step 3: Wait
- DNS usually updates in 5–30 minutes, can take up to 48 hours
- Vercel will show a green checkmark in Settings → Domains when it's live
- Vercel issues your SSL certificate (https) automatically — nothing to do

---

## ✏️ Making Updates Later

All content lives in one file: `app/page.js`

- Edit text, links, sections there
- Push the change to GitHub (or upload the edited file again)
- Vercel auto-redeploys in ~1 minute

### Links you may want to update in app/page.js:
- Amazon books link (currently a search link for "Ya Boy Rick")
- Google Play audiobooks link
- Stan Store URL (add your actual store handle)
- Eventbrite event link
- YouTube channel link
- Instagram (currently @youngrickon1)

Search the file for `platforms` to find them all in one spot.

---

## 🏠 Run Locally (optional)

```bash
npm install
npm run dev
```

Open http://localhost:3000

---

© Watson Legacy Group. We build dynasties.
