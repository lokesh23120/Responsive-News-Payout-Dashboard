import { useEffect, useState } from "react";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { useSession, signIn, signOut } from "next-auth/react";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
}

export default function Home() {
  const { data: session, status } = useSession();
  const [news, setNews] = useState<Article[]>([]);
  const [payoutRate, setPayoutRate] = useState<number>(20);

useEffect(() => {
  if (session) {
    fetch("/api/news")
      .then((res) => res.json())
      .then(async (data) => {
        const articles = data.articles || [];
        setNews(articles);

        // Save top 5 articles to Google Sheet
        for (let i = 0; i < Math.min(5, articles.length); i++) {
          const article = articles[i];
          await fetch("/api/add-article", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title: article.title,
              description: article.description,
              author: session.user?.name || "Anonymous",
              date: new Date().toISOString().split("T")[0],
            }),
          });
        }
      })
      .catch((err) => console.error("Error fetching news:", err));
  }
}, [session]);


  const handleExportToSheet = async (article: Article) => {
    const today = new Date().toISOString().split("T")[0];
    await fetch("/api/add-article", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: article.title,
        description: article.description,
        author: session?.user?.name || "Unknown",
        date: today,
      }),
    });
  };

  const totalPayout = news.length * payoutRate;

  return (
    <div className={`${geistSans.className} ${geistMono.className} min-h-screen grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 sm:p-20 font-sans`}>
      <main className="row-start-2 flex flex-col gap-8 items-center text-center sm:text-left w-full">
        <Image className="dark:invert" src="/next.svg" alt="Next.js logo" width={180} height={38} priority />

        {status === "loading" ? (
          <p className="text-gray-600">Loading session...</p>
        ) : !session ? (
          <>
            <h2 className="text-xl font-semibold">Please sign in with GitHub</h2>
            <button className="bg-black text-white px-6 py-2 rounded hover:opacity-80 transition" onClick={() => signIn("github")}>
              Sign in with GitHub
            </button>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold">Welcome, {session.user?.name}!</h2>
            {session.user?.image && <Image src={session.user.image} alt="User avatar" width={60} height={60} className="rounded-full" />}
            <p className="text-sm text-gray-600">{session.user?.email}</p>
            <button className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition mt-2" onClick={() => signOut()}>
              Sign Out
            </button>

            <div className="mt-8 w-full max-w-2xl">
              <h3 className="text-xl font-bold mb-4">Top Headlines</h3>
              {news.length === 0 ? (
                <p className="text-sm text-gray-500">No news found or loading...</p>
              ) : (
                <ul className="space-y-6">
                  {news.map((article, index) => (
                    <li key={index} className="border-b pb-4">
                      <a href={article.url} target="_blank" rel="noopener noreferrer" className="block hover:bg-gray-50 p-2 rounded transition">
                        {article.urlToImage && <Image src={article.urlToImage} alt="News thumbnail" width={600} height={300} className="rounded mb-2" />}
                        <h4 className="text-lg font-semibold text-blue-600 hover:underline">{article.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{article.description}</p>
                      </a>
                      <button onClick={() => handleExportToSheet(article)} className="mt-2 bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700">
                        Save to Google Sheet
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mt-8 w-full max-w-md border-t pt-4">
              <h4 className="text-lg font-semibold mb-2">
                💵 Payout Calculator
              </h4>
              <div className="flex items-center gap-2 mb-2">
                <label htmlFor="rate" className="text-sm">Payout Rate per Article:</label>
                <input
                  id="rate"
                  type="number"
                  value={payoutRate}
                  onChange={(e) => setPayoutRate(Number(e.target.value))}
                  className="border rounded px-2 py-1 w-20 text-right"
                />
              </div>
              <p>Total Payout: ${totalPayout.toFixed(2)}</p>
            </div>
          </>
        )}
      </main>

      <footer className="row-start-3 flex flex-wrap gap-6 items-center justify-center text-sm text-gray-500 mt-8">
        <a href="https://nextjs.org/learn" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
          <Image src="/file.svg" alt="File icon" width={16} height={16} /> Learn
        </a>
        <a href="https://vercel.com/templates?framework=next.js" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
          <Image src="/window.svg" alt="Window icon" width={16} height={16} /> Examples
        </a>
        <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
          <Image src="/globe.svg" alt="Globe icon" width={16} height={16} /> Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
