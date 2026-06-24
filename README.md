# Paramount Command Centre V3

GitHub-ready static prototype for the Paramount Command Centre.

## Files
- `index.html` - main app shell
- `styles.css` - premium Paramount-style UI
- `data.js` - five years of realistic fake HVAC data
- `app.js` - dashboard logic, drill-downs, charts, CSV export and proposal PDF generation

## How to use in GitHub Pages
1. Create a new GitHub repository.
2. Upload these files into the root of the repository.
3. Go to Settings > Pages.
4. Set Source to `Deploy from a branch`.
5. Select `main` and `/root`.
6. Open the GitHub Pages link.

## V3 features included
- One Command Centre with persistent left navigation.
- Reporting Intelligence module with Quote Activity and Technician Activity separated.
- Quote Activity macro view with weekly, monthly, 4-weekly, calendar month, seasonal and yearly filters.
- Clickable time-period drill-down showing technician quote activity.
- Technician Activity profile with jobs, maintenance, service calls, quotes, ratio and peer benchmarks.
- Company KPI target of 1 quote per 1 job.
- Job Report with flags and Changes Made register.
- Technician Labour and Labour Forecast pages.
- Maintenance Contract proposal generator with customer upload, asset upload, editable assets, CSV download and automatic hidden annual price calculation.
- Generate Proposal button immediately downloads a proposal PDF, with no preview page.
- Customers listed alphabetically with clickable asset drill-downs.
- Employee Portal with calendar, annual leave graphs, leave balances and apply-for-leave form.

## Notes
This is a front-end prototype using fake data. It is designed to be Supabase and Simpro ready, but it does not connect to live data yet.
