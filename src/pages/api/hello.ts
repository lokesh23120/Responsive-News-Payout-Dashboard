import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import type { Session } from "next-auth";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session: Session | null = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Now this will NOT throw TypeScript error
  if (session.user.role === "admin") {
    res.status(200).json({ message: "Hello Admin!" });
  } else {
    res.status(200).json({ message: "Hello User!" });
  }
}
