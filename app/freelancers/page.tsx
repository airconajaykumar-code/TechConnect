"use client";

import Link from "next/link";
import { useEngineers } from "@/lib/use-firestore";

export default function FreelancersPage() {
  const { engineers, loading } = useEngineers();

  return (
    <main className="min-h-screen bg-orange-50 dark:bg-gray-900">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">Our Technicians</h1>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
            Skilled professionals ready to help with your tech needs
          </p>
        </div>

        {engineers.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 dark:border-gray-600 bg-white p-12 text-center dark:bg-gray-800">
            <p className="text-4xl">👷</p>
            <p className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">No technicians yet</p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Check back soon!</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {engineers.map((eng) => (
              <Link key={eng.id} href={`/freelancers/${eng.id}`}>
                <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white p-6 shadow-sm dark:shadow-gray-900/50 dark:bg-gray-800 transition hover:shadow-md">
                  <div className="flex items-start gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-600">
                      {eng.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{eng.name}</h2>
                      <p className="text-sm text-blue-600">{eng.profession}</p>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{eng.location || "Location not set"}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-gray-100">
                        <span className="text-yellow-500">★</span>
                        {eng.rating || "New"}
                      </div>
                      {eng.subscription.status === "active" ? (
                        <span className="mt-1 inline-block rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                          Available
                        </span>
                      ) : (
                        <span className="mt-1 inline-block rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500 dark:text-gray-400 dark:text-gray-500">
                          Unavailable
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {eng.skills.slice(0, 3).map((skill) => (
                      <span key={skill} className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 dark:text-gray-400 dark:bg-gray-800 dark:text-gray-500">
                        {skill}
                      </span>
                    ))}
                    {eng.skills.length > 3 && (
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-400 dark:text-gray-500 dark:bg-gray-800">
                        +{eng.skills.length - 3}
                      </span>
                    )}
                  </div>
                  {eng.bio && (
                    <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 dark:text-gray-500 line-clamp-2">{eng.bio}</p>
                  )}
                  {!eng.bio && (
                    <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 dark:text-gray-500">
                      {eng.profession} with {eng.totalTasks} tasks completed
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
