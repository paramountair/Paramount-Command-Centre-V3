# Paramount Command Centre V3

GitHub-ready static web app for the Paramount Command Centre prototype.

## Files
- `index.html` — app shell
- `styles.css` — Paramount Air design system styling
- `data.js` — realistic fake HVAC, quote, technician, contract and leave data
- `app.js` — dashboard logic, drill-downs, CSV export and proposal generation

## Brand Colours Used
- Paramount Orange `#E87722`
- Deep Navy `#0E2A47`
- Steel Blue `#2C5F7C`
- Sand `#EFE9DD`
- Light Grey `#F4F4F4`
- Cool Grey `#6B6F73`

## How to use
Upload all files to the root of your GitHub repository, or upload the ZIP contents. Open `index.html` through GitHub Pages or Vercel.

## Notes
The dashboard is intentionally static for prototype use. It is structured so Supabase and Simpro data can replace the fake data later.

The proposal generator uses jsPDF from a CDN to download a PDF. If the CDN is blocked, it falls back to downloading an HTML proposal.
