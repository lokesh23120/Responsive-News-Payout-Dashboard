import { getSession, useSession, signOut } from "next-auth/react";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import Filters from "@/components/Filters";
import Image from "next/image";
import PayoutCalculator from "@/components/PayoutCalculator";
import ExportButtons from "@/components/ExportButtons";
import SearchBar from "@/components/SearchBar";
import DateFilter from "@/components/DateFilter";
import NewsChart from "@/components/NewsChart";
import PayoutTable from "@/components/PayoutTable";


interface NewsItem {
  title: string;
  url: string;
  urlToImage: string;
  author: string;
  publishedAt: string;
  description: string;
}

export default function Dashboard() {
  const { data: session } = useSession();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [rate, setRate] = useState<number>(20);
  const [dateRange, setDateRange] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;

  const authors = Array.from(new Set(news.map((n) => n.author?.trim() || "Unknown")));
  const types = ["news", "blog"];

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("/api/news");
        const data = await res.json();
        setNews(data.articles || []);
      } catch (err) {
        console.error("Failed to fetch news", err);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    setCurrentPage(1); // reset page on filter
  }, [selectedAuthor, selectedType, searchQuery, dateRange]);

  const isValidDate = (date: Date | null): boolean =>
    date instanceof Date && !isNaN(date.getTime());

  const safeDate = (date: Date | null) =>
    isValidDate(date) ? date!.toISOString().split("T")[0] : "";

  const filteredNews = news.filter((item) => {
    const date = new Date(item.publishedAt);

    const title = item.title?.toLowerCase() || "";
    const description = item.description?.toLowerCase() || "";
    const author = item.author?.toLowerCase() || "unknown";

    const authorMatch =
      selectedAuthor === "" || author.includes(selectedAuthor.toLowerCase());

    const typeMatch = selectedType === "" || selectedType === "news"; // Extendable

    const searchMatch =
      searchQuery === "" ||
      title.includes(searchQuery.toLowerCase()) ||
      description.includes(searchQuery.toLowerCase()) ||
      author.includes(searchQuery.toLowerCase());

    const dateMatch =
      (!isValidDate(dateRange.start) || date >= dateRange.start!) &&
      (!isValidDate(dateRange.end) || date <= dateRange.end!);

    return authorMatch && typeMatch && searchMatch && dateMatch;
  });

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredNews.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(filteredNews.length / articlesPerPage);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex flex-col items-center mb-6">
        <h1 className="text-3xl font-bold mb-2">News Dashboard</h1>
        <p className="text-lg">
          Welcome, <strong>{session?.user?.name || "User"}</strong>
        </p>
        <p className="text-sm text-gray-600">{session?.user?.email}</p>
        <button
          onClick={() => signOut()}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Sign Out
        </button>
      </div>

      <SearchBar searchQuery={searchQuery} onChange={setSearchQuery} />

      <div className="mb-4">
        <DateFilter
          startDate={safeDate(dateRange.start)}
          endDate={safeDate(dateRange.end)}
          onStartDateChange={(date) => {
            const startDate = new Date(date);
            startDate.setHours(0, 0, 0, 0);
            setDateRange((prev) => ({ ...prev, start: startDate }));
          }}
          onEndDateChange={(date) => {
            const endDate = new Date(date);
            endDate.setHours(23, 59, 59, 999);
            setDateRange((prev) => ({ ...prev, end: endDate }));
          }}
        />
      </div>

      <div className="mb-6">
        <Filters
          selectedAuthor={selectedAuthor}
          onAuthorChange={setSelectedAuthor}
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          authors={authors}
          types={types}
        />
      </div>

      <div className="mb-6">
        <PayoutCalculator articleCount={filteredNews.length} onRateChange={setRate} />
      </div>

      <ExportButtons data={filteredNews} />

      <div className="mb-6">
        <NewsChart data={filteredNews} />
      </div>

      <div className="mb-6">
        <PayoutTable data={filteredNews} rate={rate} />
      </div>

      {currentArticles.length === 0 ? (
        <p className="text-center text-gray-600 text-lg mt-10">
          No articles found for the selected filters.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentArticles.map((item, idx) => (
            <div key={idx} className="border rounded shadow p-4 bg-white">
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                <Image
                  src={item.urlToImage || "/fallback.svg"}
                  alt={item.title}
                  width={400}
                  height={200}
                  className="rounded mb-2 object-cover w-full h-48"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/fallback.svg";
                  }}
                />
              </a>
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-sm text-gray-500">
                {item.author || "Unknown"} - {new Date(item.publishedAt).toISOString().split("T")[0]}
              </p>
              <p className="text-sm mt-2">{item.description}</p>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`px-4 py-2 rounded border ${
                i + 1 === currentPage ? "bg-blue-600 text-white" : "bg-white"
              }`}
              onClick={() => setCurrentPage(i + 1)}
              aria-label={`Go to page ${i + 1}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
