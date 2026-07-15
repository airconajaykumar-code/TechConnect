"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import type { Engineer, Task } from "@/lib/data";

export default function FreelancerProfile() {
  const { id } = useParams<{ id: string }>();
  const [engineer, setEngineer] = useState<Engineer | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const engData = localStorage.getItem("tc_engineers");
    const taskData = localStorage.getItem("tc_tasks");

    const SEED_BIO: Record<string, { bio: string; experience: string }> = {
      "seed-1": {
        bio: "CCTV Technician based in Haldwani with 8 years of experience in CCTV installation and networking.",
        experience: "8 years",
      },
    };

    if (engData) {
      let engineers: Engineer[] = JSON.parse(engData);
      let changed = false;
      engineers = engineers.map((e) => {
        const seed = SEED_BIO[e.id];
        if (seed && (!e.bio || !e.experience)) {
          changed = true;
          return { ...e, bio: seed.bio, experience: seed.experience };
        }
        return e;
      });
      if (changed) {
        localStorage.setItem("tc_engineers", JSON.stringify(engineers));
      }
      setEngineer(engineers.find((e) => e.id === id) || null);
    }
    if (taskData) {
      const allTasks: Task[] = JSON.parse(taskData);
      setTasks(allTasks.filter((t) => t.assignedTo === id));
    }
  }, [id]);

  if (!engineer) {
    return (
      <main className="min-h-screen bg-orange-50 dark:bg-gray-900">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <Link href="/freelancers" className="mb-8 inline-flex items-center text-sm text-blue-600 hover:text-blue-700">
            ← Back to Technicians
          </Link>
          <div className="mt-8 text-center text-gray-500 dark:text-gray-400 dark:text-gray-500">Technician not found</div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-orange-50 dark:bg-gray-900">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <Link href="/freelancers" className="mb-8 inline-flex items-center text-sm text-blue-600 hover:text-blue-700">
          ← Back to Technicians
        </Link>

        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white p-8 shadow-sm dark:shadow-gray-900/50 dark:bg-gray-800">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-4xl font-bold text-blue-600">
              {engineer.name.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{engineer.name}</h1>
                {engineer.subscription.status === "active" ? (
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">Available</span>
                ) : (
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 dark:text-gray-500">Unavailable</span>
                )}
              </div>
              <p className="mt-1 text-lg text-blue-600">{engineer.profession}</p>
              <p className="text-gray-500 dark:text-gray-400 dark:text-gray-500">{engineer.phone}</p>
            </div>
            <div className="flex items-center gap-1 text-lg font-medium text-gray-900 dark:text-gray-100">
              <span className="text-yellow-500">★</span>
              {engineer.rating || "New"}
              <span className="text-sm text-gray-400 dark:text-gray-500">({engineer.totalTasks} tasks)</span>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Skills</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {engineer.skills.length === 0 && (
                <span className="text-sm text-gray-400 dark:text-gray-500">No skills listed yet</span>
              )}
              {engineer.skills.map((skill) => (
                <span key={skill} className="rounded-full bg-blue-50 px-4 py-1.5 text-sm text-blue-700">{skill}</span>
              ))}
            </div>
          </div>

          {engineer.experience && (
            <div className="mt-6">
              <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-4 py-1.5 text-sm font-medium text-orange-700 dark:bg-gray-900">
                🏆 {engineer.experience} experience
              </span>
            </div>
          )}

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">About</h2>
            <p className="mt-3 leading-relaxed text-gray-600 dark:text-gray-400 dark:text-gray-500">
              {engineer.bio || `${engineer.profession} based in ${engineer.location || "Haldwani"}. Completed ${engineer.totalTasks} tasks with a rating of ${engineer.rating || "new"}. Joined on ${engineer.joinedAt}.`}
            </p>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Recent Tasks</h2>
            <div className="mt-4 space-y-3">
              {tasks.length === 0 && (
                <p className="text-sm text-gray-400 dark:text-gray-500">No tasks yet</p>
              )}
              {tasks.slice(0, 5).map((task) => (
                <div key={task.id} className="rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 p-4 dark:bg-gray-800">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">{task.title}</h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 dark:text-gray-500">{task.customerName}</p>
                    </div>
                    <span className="text-lg font-bold text-blue-600">₹{task.amount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <button className="w-full rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700 sm:w-auto">
              Book {engineer.name.split(" ")[0]} for Service
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
