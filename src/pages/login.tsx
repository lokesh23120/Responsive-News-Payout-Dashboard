
import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginPage() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="p-8">
        <h2 className="text-xl">Signed in as {session.user?.email}</h2>
        <button
          onClick={() => signOut()}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h2 className="text-xl mb-4">Not signed in</h2>
      <button
        onClick={() => signIn("github")}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Sign in with GitHub
      </button>
    </div>
  );
}
