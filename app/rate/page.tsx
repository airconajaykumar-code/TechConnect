"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, query, where, orderBy, onSnapshot, doc, updateDoc, addDoc, Timestamp } from "firebase/firestore";
import type { Task } from "@/lib/data";

export default function RatePage() {
  const [phone, setPhone] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const unsub = onSnapshot(
      query(collection(db, "tasks"), where("status", "==", "completed"), orderBy("createdAt", "desc")),
      (snap) => {
        setTasks(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Task)));
      }
    );
    return unsub;
  }, []);

  const filtered = phone.trim()
    ? tasks.filter((t) => t.customerPhone?.includes(phone.trim()))
    : [];

  async function submitRating(taskId: string, rating: number, engineerId?: string) {
    await addDoc(collection(db, "ratings"), {
      taskId,
      engineerId: engineerId || "",
      rating,
      createdAt: Timestamp.now(),
    });
    if (engineerId) {
      const engRef = doc(db, "engineers", engineerId);
      const engSnap = await import("firebase/firestore").then((m) => m.getDoc(engRef));
      if (engSnap.exists()) {
        const eng = engSnap.data();
        const currentRating = eng.rating || 0;
        const taskCount = eng.totalTasks || 0;
        const newRating = currentRating === 0 ? rating : (currentRating * taskCount + rating) / (taskCount + 1);
        await updateDoc(engRef, { rating: Math.round(newRating * 10) / 10, totalTasks: taskCount + 1 });
      }
    }
    setSubmitted((prev) => ({ ...prev, [taskId]: true }));
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-2xl px-6 py-16">
        <div className="mb-12 text-center">
          <Link href="/" className="mb-6 inline-flex items-center text-sm text-blue-600 hover:text-blue-700">← Back to Home</Link>
          <h1 className="mt-4 text-4xl font-bold text-gray-900 dark:text-gray-100">Rate a Technician</h1>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">Share your feedback on the service</p>
        </div>

        <div className="mb-8">
          <input
            type="tel"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-6 py-4 text-lg text-gray-900 dark:text-gray-100 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none"
          />
        </div>

        {phone.trim() && filtered.length === 0 && (
          <div className="rounded-xl border border-dashed border-gray-300 dark:border-gray-600 bg-white p-12 text-center dark:bg-gray-800">
            <p className="text-4xl">⭐</p>
            <p className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">No completed bookings found</p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Complete a service first to rate it</p>
          </div>
        )}

        <div className="space-y-6">
          {filtered.map((task) => (
            <div key={task.id} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white p-6 shadow-sm dark:shadow-gray-900/50 dark:bg-gray-800">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{task.title}</h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{task.customerName}</p>
              </div>

              {submitted[task.id] ? (
                <div className="rounded-lg bg-green-50 px-4 py-3 text-sm font-medium text-green-700 dark:bg-green-900/20 dark:text-green-400">
                  Thank you! Your rating has been submitted.
                </div>
              ) : (
                <div>
                  <p className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">Rate your experience:</p>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => {
                          setRatings((prev) => ({ ...prev, [task.id]: star }));
                          submitRating(task.id, star, task.assignedTo);
                        }}
                        className={`h-12 w-12 rounded-lg text-2xl transition ${
                          (ratings[task.id] || 0) >= star
                            ? "bg-yellow-100 text-yellow-500 dark:bg-yellow-500/20"
                            : "bg-gray-100 text-gray-300 dark:bg-gray-700 dark:text-gray-600"
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
