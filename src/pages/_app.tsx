import type { AppProps } from "next/app";
import { SessionProvider, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import "../styles/globals.css";

// Navigation bar with Sign Out and Dark Mode toggle
function NavBar({ toggleDarkMode, isDarkMode }: { toggleDarkMode: () => void; isDarkMode: boolean }) {
  const { data: session } = useSession();

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem",
        backgroundColor: "var(--background)",
      }}
    >
      {session && (
        <button
          onClick={() => signOut()}
          style={{
            backgroundColor: "#111",
            color: "#fff",
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Sign Out
        </button>
      )}
      <button
        onClick={toggleDarkMode}
        style={{
          backgroundColor: "#444",
          color: "#fff",
          padding: "0.5rem 1rem",
          borderRadius: "4px",
          border: "none",
          cursor: "pointer",
        }}
      >
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </nav>
  );
}

// Main App Component
export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <SessionProvider session={session}>
      <NavBar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      <Component {...pageProps} />
    </SessionProvider>
  );
}
