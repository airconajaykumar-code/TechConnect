"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import type { Task } from "@/lib/data";

const STATUS_STEPS = ["pending", "assigned", "in_progress", "completed"];

export default function TrackPage() {
  const [phone, setPhone] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(
      query(collection(db, "tasks"), orderBy("createdAt", "desc")),
      (snap) => {
        setTasks(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Task)));
      }
    );
    return unsub;
  }, []);

  const filtered = phone.trim()
    ? tasks.filter((t) => t.customerPhone?.includes(phone.trim()))
    : [];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-2xl px-6 py-16">
        <div className="mb-12 text-center">
          <Link href="/" className="mb-6 inline-flex items-center text-sm text-blue-600 hover:text-blue-700">← Back to Home</Link>
          <h1 className="mt-4 text-4xl font-bold text-gray-900 dark:text-gray-100">Track Booking</h1>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">Enter your phone number to check booking status</p>
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
            <p className="text-4xl">🔍</p>
            <p className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">No bookings found</p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Check the number and try again</p>
          </div>
        )}

        <div className="space-y-6">
          {filtered.map((task) => {
            const stepIndex = STATUS_STEPS.indexOf(task.status as typeof STATUS_STEPS[number]);
            const isCancelled = task.status === "cancelled";
            return (
              <div key={task.id} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white p-6 shadow-sm dark:shadow-gray-900/50 dark:bg-gray-800">
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{task.title}</h2>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{task.customerName}</p>
                  </div>
                  <span className="text-lg font-bold text-blue-600">₹{task.amount}</span>
                </div>

                {isCancelled ? (
                  <div className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:bg-red-900/20 dark:text-red-400">
                    This booking has been cancelled
                  </div>
                ) : (
                  <div className="space-y-2">
                    {STATUS_STEPS.map((step, i) => (
                      <div key={step} className="flex items-center gap-3">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                          i <= stepIndex ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500"
                        }`}>
                          {i < stepIndex ? "✓" : i + 1}
                        </div>
                        <span className={`text-sm ${
                          i <= stepIndex ? "font-medium text-gray-900 dark:text-gray-100" : "text-gray-400 dark:text-gray-500"
                        }`}>
                          {step.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
