"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import { useParams } from "next/navigation";
import { getWhatsAppLink } from "@/lib/whatsapp";

export default function EngineerDetail() {
  const { id } = useParams<{ id: string }>();
  const { engineers, tasks } = useStore();

  const engineer = engineers.find((e) => e.id === id);
  if (!engineer) {
    return (
      <div className="p-8">
        <Link href="/admin/engineers" className="mb-6 inline-flex items-center text-sm text-blue-600 hover:text-blue-700">← Back to Engineers</Link>
        <div className="mt-8 text-center text-gray-500 dark:text-gray-400 dark:text-gray-500">Engineer not found</div>
      </div>
    );
  }

  const engTasks = tasks.filter((t) => t.assignedTo === engineer.id);

  return (
    <div className="p-8">
      <Link href="/admin/engineers" className="mb-6 inline-flex items-center text-sm text-blue-600 hover:text-blue-700">← Back to Engineers</Link>

      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white p-6 dark:bg-gray-800">
        <div className="flex items-start gap-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-3xl font-bold text-blue-600">
            {engineer.name.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{engineer.name}</h1>
              {engineer.subscription.status === "active" ? (
                <span className="rounded-full bg-green-100 px-3 py-0.5 text-xs font-medium text-green-700">Active</span>
              ) : (
                <span className="rounded-full bg-red-100 px-3 py-0.5 text-xs font-medium text-red-700">Expired</span>
              )}
            </div>
            <p className="mt-1 text-blue-600">{engineer.profession}</p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 dark:text-gray-500">Phone: {engineer.phone}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">₹{engineer.totalEarnings.toLocaleString()}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-500">Total Earnings</p>
            <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">{engineer.totalTasks} tasks</p>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-100 dark:border-gray-800 pt-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 dark:text-gray-500">Subscription</h3>
          <p className="mt-1 text-gray-900 dark:text-gray-100">₹{engineer.subscription.amount}/month — {engineer.subscription.status}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-500">Joined: {engineer.joinedAt} | Valid till: {engineer.subscription.validTill}</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Tasks ({engTasks.length})</h2>
        <div className="mt-4 space-y-3">
          {engTasks.length === 0 && (
            <p className="text-sm text-gray-400 dark:text-gray-500">No tasks assigned yet.</p>
          )}
          {engTasks.map((task) => (
            <div key={task.id} className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white p-4 dark:bg-gray-800">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{task.title}</p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 dark:text-gray-500">{task.customerName} — ₹{task.amount}</p>
                </div>
                <TaskBadge status={task.status} />
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-400 dark:text-gray-500">
                <span>Commission: ₹{task.platformFee}</span>
                <span>Engineer gets: ₹{task.engineerPayout}</span>
                <a href={getWhatsAppLink(engineer.phone, task)} target="_blank" rel="noopener noreferrer"
                  className="ml-auto inline-flex items-center gap-1 rounded-lg bg-green-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-green-700">
                  📱 Send via WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
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
    <span className={`rounded-full px-3 py-1 text-xs font-medium ${styles[status] || "bg-gray-100 text-gray-600"}`}>
      {status.replace("_", " ")}
    </span>
  );
}
