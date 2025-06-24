## 🎥 Live Demo
[Click here to watch the demo video](https://drive.google.com/file/d/1qPevInLBUEw05xKPKTfeOhA_hjKjXr8r/view?usp=sharing)

# Responsive News & Payout Dashboard
Responsive News & Payout Dashboard (screenshots and output files are in the 'OUTPUT' folder)
This project is a fully functional admin dashboard built with Next.js and Tailwind CSS. It connects to a public news API and allows users to browse, filter, and export news articles. I also added a custom payout calculator that helps estimate article-based earnings — useful for content management teams or editorial dashboards.

What This Project Can Do
Authentication
Users can securely log in using GitHub (via OAuth). Once logged in, they’re redirected to a private dashboard. Only authenticated users can view or interact with dashboard data.

News Aggregation
The app pulls in live articles using [NewsAPI.org]. Articles are displayed in cards and stored in state for further filtering.

Powerful Filtering
user can filter articles based on:
1) Author
2) Type (e.g., blog/news)
3) Date Range
4) Search Keywords (in title or description)

Everything updates live — there’s no need to reload the page.

Dashboard Analytics
There’s a chart component that visualizes article trends (e.g., articles per author or over time). This helps users see content trends at a glance.

Payout Calculator
One of my favorite features. It lets you set a payout rate per article (say ₹20/article), and the dashboard calculates the total based on the filtered results. Admins can also edit this rate and see the impact instantly.

Export Options
user can export filtered news data into:
1) CSV files
2) PDF reports
3) Google Sheets (for collaborative editing)
The export features are useful for reporting or sharing data with teams.

🛠 Tech Stack
Here’s what I used to build the project:

Next.js — for the React framework with server-side rendering
Tailwind CSS — for styling and responsive layouts
NextAuth — for GitHub login authentication
NewsAPI — to fetch live news articles
Google Sheets API — to export data
jsPDF, csv-writer — for PDF/CSV download

Folder Structure
bash
Copy
Edit
/components      → re-usable UI like filters, table, chart
/pages           → Next.js routes (e.g., /dashboard, /api/news)
public/          → images, icons, and default assets
utils/           → helper functions


How to Run Locally :- npm run dev

