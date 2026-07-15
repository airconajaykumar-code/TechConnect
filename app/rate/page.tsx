"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Task, Engineer } from "@/lib/data";

export default function RatePage() {
  const [phone, setPhone] = useState("");
  const [engineers, setEngineers] = useState<Engineer[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const eng = localStorage.getItem("tc_engineers");
    const tsk = localStorage.getItem("tc_tasks");
    if (eng) setEngineers(JSON.parse(eng));
    if (tsk) setTasks(JSON.parse(tsk));
    const saved = localStorage.getItem("tc_ratings");
    if (saved) setSubmitted(JSON.parse(saved));
  }, []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const data = localStorage.getItem("tc_tasks");
    if (data) {
      const all: Task[] = JSON.parse(data);
      setTasks(all.filter((t) => t.customerPhone.includes(phone) && t.status === "completed"));
    }
  }

  function submitRating(taskId: string, engineerId: string) {
    const rating = ratings[taskId];
    if (!rating) return;

    const updated = { ...submitted, [taskId]: true };
    setSubmitted(updated);
    localStorage.setItem("tc_ratings", JSON.stringify(updated));

    const eng = engineers.map((e) =>
      e.id === engineerId
        ? { ...e, rating: e.rating === 0 ? rating : (e.rating + rating) / 2, totalTasks: e.totalTasks + 1 }
        : e
    );
    setEngineers(eng);
    localStorage.setItem("tc_engineers", JSON.stringify(eng));
  }

  const completedTasks = tasks.filter((t) => t.status === "completed");

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <Link href="/" className="mb-8 inline-flex items-center text-sm text-blue-600 hover:text-blue-700">← Back to Home</Link>

        <div className="rounded-2xl bg-white p-8 shadow-sm dark:shadow-gray-900/50 dark:bg-gray-800">
          <div className="text-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-100 text-3xl">⭐</div>
            <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-gray-100">Rate Your Technician</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Share your experience to help us improve</p>
          </div>

          <form onSubmit={handleSearch} className="mt-8 flex gap-3">
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Your phone number" required
              className="flex-1 rounded-xl border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none dark:bg-gray-800" />
            <button type="submit" className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700">Find Tasks</button>
          </form>

          {completedTasks.length > 0 && (
            <div className="mt-8 space-y-4">
              {completedTasks.map((task) => {
                const eng = engineers.find((e) => e.id === task.assignedTo);
                return (
                  <div key={task.id} className="rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-gray-100">{task.title}</h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Technician: {eng?.name || "Unknown"}</p>
                      </div>
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">Completed</span>
                    </div>

                    {submitted[task.id] ? (
                      <div className="mt-4 rounded-xl bg-green-50 p-4 text-center">
                        <p className="font-medium text-green-700">✅ Thank you! Rating submitted.</p>
                      </div>
                    ) : (
                      <div className="mt-4">
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-gray-600 dark:text-gray-400">Your rating:</p>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button key={star} onClick={() => setRatings({ ...ratings, [task.id]: star })}
                                className={`text-2xl transition hover:scale-110 ${
                                  (ratings[task.id] || 0) >= star ? "text-yellow-400" : "text-gray-300 dark:text-gray-500"
                                }`}>★</button>
                            ))}
                          </div>
                        </div>
                        <button onClick={() => submitRating(task.id, task.assignedTo)} disabled={!ratings[task.id]}
                          className="mt-3 rounded-xl bg-yellow-500 px-5 py-2 text-sm font-medium text-white transition hover:bg-yellow-600 disabled:opacity-50">
                          Submit Rating
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {tasks.length > 0 && completedTasks.length === 0 && (
            <div className="mt-8 rounded-xl bg-yellow-50 p-6 text-center text-sm text-yellow-700 dark:bg-gray-900">
              No completed tasks found for this number
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
