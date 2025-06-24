# Responsive News & Payout Dashboard

📁 **Screenshots and output files are in the `OUTPUT` folder.**

## 🎥 Live Demo  
[Click here to watch the demo video](https://drive.google.com/file/d/1qPevInLBUEw05xKPKTfeOhA_hjKjXr8r/view?usp=sharing)

---

This project is a fully functional admin dashboard built with Next.js and Tailwind CSS. It connects to a public news API and allows users to browse, filter, and export news articles. I also added a custom payout calculator that helps estimate article-based earnings — useful for content management teams or editorial dashboards.

---

## 🔐 Authentication
Users can securely log in using GitHub (via OAuth). Once logged in, they’re redirected to a private dashboard. Only authenticated users can view or interact with dashboard data.

---

## 📰 News Aggregation
The app pulls in live articles using [NewsAPI.org]. Articles are displayed in cards and stored in state for further filtering.

---

## 🔍 Powerful Filtering
Users can filter articles based on:
1. Author  
2. Type (e.g., blog/news)  
3. Date Range  
4. Search Keywords (in title or description)  

Everything updates live — there’s no need to reload the page.

---

## 📊 Dashboard Analytics
A chart visualizes article trends (e.g., articles per author or over time) to help users see content patterns at a glance.

---

## 💰 Payout Calculator
Lets you set a payout rate per article (e.g., ₹20/article). The dashboard calculates the total based on filtered results. Admins can edit the rate and see instant updates.

---

## 📤 Export Options
Users can export filtered news data into:
- CSV files  
- PDF reports  
- Google Sheets (for collaborative editing)

---

## 🛠 Tech Stack

- **Next.js** — React framework with server-side rendering  
- **Tailwind CSS** — Styling and responsive layout  
- **NextAuth.js** — GitHub login authentication  
- **NewsAPI** — To fetch live news articles  
- **Google Sheets API** — To export data  
- **jsPDF**, **csv-writer** — For PDF/CSV export

---

## 📁 Folder Structure

---

## 🚀 How to Run Locally

```bash
npm install
npm run dev