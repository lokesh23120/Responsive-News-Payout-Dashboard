import NextAuth from "next-auth";
import { NewsItem } from "@/types/news";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: "admin" | "user";
    };
  }

  interface User {
    role?: "admin" | "user";
  }
}
