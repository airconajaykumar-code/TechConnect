"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";

export default function EngineersPage() {
  const { engineers } = useStore();

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Engineers</h1>
          <p className="mt-1 text-gray-500 dark:text-gray-400">Manage your engineers and their subscriptions</p>
        </div>
        <Link
          href="/admin/engineers/add"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          + Add Engineer
        </Link>
      </div>

      {engineers.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-gray-300 dark:border-gray-600 bg-white p-12 text-center dark:bg-gray-800">
          <p className="text-4xl">👷</p>
          <p className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">No engineers yet</p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Add your first engineer to get started</p>
          <Link
            href="/admin/engineers/add"
            className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Add Engineer
          </Link>
        </div>
      ) : (
        <div className="mt-8 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <table className="w-full text-left">
            <thead className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-xs font-medium uppercase text-gray-500 dark:text-gray-400">Engineer</th>
                <th className="px-6 py-3 text-xs font-medium uppercase text-gray-500 dark:text-gray-400">Profession</th>
                <th className="px-6 py-3 text-xs font-medium uppercase text-gray-500 dark:text-gray-400">Phone</th>
                <th className="px-6 py-3 text-xs font-medium uppercase text-gray-500 dark:text-gray-400">Subscription</th>
                <th className="px-6 py-3 text-xs font-medium uppercase text-gray-500 dark:text-gray-400">Tasks</th>
                <th className="px-6 py-3 text-xs font-medium uppercase text-gray-500 dark:text-gray-400">Earnings</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {engineers.map((eng) => (
                <tr key={eng.id} className="transition hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">
                    <Link href={`/admin/engineers/${eng.id}`} className="group">
                      <p className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600">{eng.name}</p>
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{eng.profession}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{eng.phone}</td>
                  <td className="px-6 py-4">
                    {eng.subscription.status === "active" ? (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">Active</span>
                    ) : (
                      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">Expired</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{eng.totalTasks}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">₹{eng.totalEarnings.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
