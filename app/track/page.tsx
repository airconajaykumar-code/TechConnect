"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Task } from "@/lib/data";

const STATUS_STEPS = ["pending", "assigned", "in_progress", "completed"] as const;
const STATUS_LABELS: Record<string, string> = {
  pending: "Order Placed",
  assigned: "Technician Assigned",
  in_progress: "Work in Progress",
  completed: "Completed",
  cancelled: "Cancelled",
};

export default function TrackPage() {
  const [phone, setPhone] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searched, setSearched] = useState(false);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const data = localStorage.getItem("tc_tasks");
    if (data) {
      const all: Task[] = JSON.parse(data);
      setTasks(all.filter((t) => t.customerPhone.includes(phone)));
    }
    setSearched(true);
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <Link href="/" className="mb-8 inline-flex items-center text-sm text-blue-600 hover:text-blue-700">← Back to Home</Link>

        <div className="rounded-2xl bg-white p-8 shadow-sm dark:shadow-gray-900/50 dark:bg-gray-800 dark:shadow-gray-900/50">
          <div className="text-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-3xl">🔍</div>
            <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-gray-100">Track Booking Status</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Enter your phone number to check your booking status</p>
          </div>

          <form onSubmit={handleSearch} className="mt-8 flex gap-3">
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210" required
              className="flex-1 rounded-xl border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none dark:bg-gray-800" />
            <button type="submit" className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700">Search</button>
          </form>

          {searched && (
            <div className="mt-8 space-y-4">
              {tasks.length === 0 ? (
                <div className="rounded-xl bg-gray-50 dark:bg-gray-950 p-8 text-center text-gray-500 dark:text-gray-400">No bookings found with this number</div>
              ) : (
                tasks.map((task) => {
                  const currentIndex = STATUS_STEPS.indexOf(task.status as typeof STATUS_STEPS[number]);
                  return (
                    <div key={task.id} className="rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-gray-900 dark:text-gray-100">{task.title}</h3>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{task.customerAddress}</p>
                        </div>
                        <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                          task.status === "completed" ? "bg-green-100 text-green-700" :
                          task.status === "cancelled" ? "bg-red-100 text-red-700" :
                          task.status === "in_progress" ? "bg-blue-100 text-blue-700" :
                          "bg-yellow-100 text-yellow-700"
                        }`}>
                          {STATUS_LABELS[task.status] || task.status}
                        </span>
                      </div>

                      {/* Progress Bar */}
                      {task.status !== "cancelled" && (
                        <div className="mt-4">
                          <div className="flex items-center justify-between">
                            {STATUS_STEPS.map((step, i) => (
                              <div key={step} className="flex flex-col items-center">
                                <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                                  i <= currentIndex ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500"
                                }`}>{i + 1}</div>
                                <span className={`mt-1 text-[10px] ${i <= currentIndex ? "text-blue-600 font-medium" : "text-gray-400 dark:text-gray-500"}`}>
                                  {STATUS_LABELS[step].split(" ")[0]}
                                </span>
                              </div>
                            ))}
                          </div>
                          <div className="relative mt-2 h-1.5 rounded-full bg-gray-200 dark:bg-gray-700">
                            <div className="absolute h-1.5 rounded-full bg-blue-600 transition-all"
                              style={{ width: `${(currentIndex / (STATUS_STEPS.length - 1)) * 100}%` }} />
                          </div>
                        </div>
                      )}

                      <div className="mt-4 flex items-center justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Amount: <strong className="text-gray-900 dark:text-gray-100">₹{task.amount}</strong></span>
                        <span className="text-gray-500 dark:text-gray-400">Date: {task.createdAt}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
