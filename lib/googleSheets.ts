// lib/googleSheets.ts
import { google } from "googleapis";
import { JWT } from "google-auth-library";

interface Article {
  title: string;
  description: string;
  author: string;
  date: string;
}

export async function addArticleToSheet(article: Article) {
  const auth = new JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL!,
    key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  const spreadsheetId = process.env.GOOGLE_SHEET_ID!;
  const range = "Sheet1!A:D";

  const values = [[article.title, article.description, article.author, article.date]];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: "RAW",
    requestBody: {
      values,
    },
  });
}
