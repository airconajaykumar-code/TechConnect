"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import { getWhatsAppLink } from "@/lib/whatsapp";

export default function TasksPage() {
  const { tasks, engineers } = useStore();
  const sortedTasks = [...tasks].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  function getEngineerName(id: string) {
    return engineers.find((e) => e.id === id)?.name ?? "Unknown";
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Tasks</h1>
          <p className="mt-1 text-gray-500 dark:text-gray-400 dark:text-gray-500">Manage all tasks and assignments</p>
        </div>
        <Link href="/admin/tasks/new"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          + New Task
        </Link>
      </div>

      {sortedTasks.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-gray-300 dark:border-gray-600 bg-white p-12 text-center dark:bg-gray-800">
          <p className="text-4xl">📋</p>
          <p className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">No tasks yet</p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 dark:text-gray-500">Create a task and assign it to an engineer</p>
          <Link href="/admin/tasks/new"
            className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700">
            Create Task
          </Link>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {sortedTasks.map((task) => {
            const eng = engineers.find((e) => e.id === task.assignedTo);
            const waLink = eng ? getWhatsAppLink(eng.phone, task) : "#";
            return (
              <div key={task.id} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white p-6 transition hover:shadow-md dark:shadow-gray-900/50 dark:bg-gray-800">
                <Link href={`/admin/tasks/${task.id}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 hover:text-blue-600">{task.title}</h2>
                        <TaskBadge status={task.status} />
                      </div>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 dark:text-gray-500">{task.description}</p>
                      <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 dark:text-gray-400 dark:text-gray-500">
                        <span>👤 {task.customerName}</span>
                        <span>📍 {task.customerAddress}</span>
                        <span>👷 {getEngineerName(task.assignedTo)}</span>
                      </div>
                    </div>
                    <div className="ml-6 text-right">
                      <p className="text-xl font-bold text-gray-900 dark:text-gray-100">₹{task.amount}</p>
                      <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">Commission: ₹{task.platformFee}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">Engineer: ₹{task.engineerPayout}</p>
                    </div>
                  </div>
                </Link>
                <div className="mt-4 flex gap-2 border-t border-gray-100 dark:border-gray-800 pt-4">
                  <Link href={`/admin/tasks/${task.id}`}
                    className="rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 transition hover:bg-gray-50 dark:hover:bg-gray-800">
                    View Details
                  </Link>
                  {eng && (
                    <a href={waLink} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-green-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-green-700">
                      📱 WhatsApp
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function TaskBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    assigned: "bg-blue-100 text-blue-700",
    in_progress: "bg-indigo-100 text-indigo-700",
    completed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-medium ${styles[status] || "bg-gray-100 text-gray-600 dark:text-gray-400 dark:text-gray-500"}`}>
      {status.replace("_", " ")}
    </span>
  );
}
