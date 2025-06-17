import type { NextApiRequest, NextApiResponse } from "next";
import { addArticleToSheet } from "../../../lib/googleSheets";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { title, description, author, date } = req.body;

    try {
      await addArticleToSheet({ title, description, author, date });
      res.status(200).json({ message: "Article added successfully!" });
    } catch (error: any) {
      console.error("Error adding article:", error.message || error);
      res.status(500).json({ error: "Failed to add article" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
