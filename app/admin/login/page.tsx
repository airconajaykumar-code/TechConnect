"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoggedIn } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (isLoggedIn) {
    router.push("/admin");
    return null;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (login(username, password)) {
      router.push("/admin");
    } else {
      setError("Invalid username or password");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-950">
      <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-lg dark:shadow-gray-900/50 dark:bg-gray-800">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">TechConnect</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Admin Panel Login</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2.5 text-sm text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none dark:bg-gray-800"
              placeholder="admin"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2.5 text-sm text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none dark:bg-gray-800"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-sm font-medium text-red-600">{error}</p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
