import type { NextApiRequest, NextApiResponse } from "next";
import { NewsItem } from "@/types/news"; 


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&pageSize=100&apiKey=${process.env.NEWS_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`News API error: ${response.statusText}`);
    }

    const data = await response.json();
    res.status(200).json(data); 
  } catch (error) {
    console.error("News fetch error:", error);
    res.status(500).json({ error: "Failed to fetch news" });
  }
}
