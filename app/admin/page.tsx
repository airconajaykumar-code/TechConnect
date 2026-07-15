"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";

export default function AdminDashboard() {
  const { engineers, tasks } = useStore();

  const activeSubscriptions = engineers.filter((e) => e.subscription.status === "active").length;
  const pendingTasks = tasks.filter((t) => t.status === "pending").length;
  const inProgressTasks = tasks.filter((t) => t.status === "in_progress").length;
  const completedTasks = tasks.filter((t) => t.status === "completed").length;
  const totalCommission = tasks.reduce((sum, t) => sum + t.platformFee, 0);
  const totalRevenue = totalCommission + engineers.reduce((sum, e) => {
    if (e.subscription.status === "active") sum += e.subscription.amount;
    return sum;
  }, 0);

  const recentTasks = [...tasks].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 5);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
      <p className="mt-1 text-gray-500 dark:text-gray-400 dark:text-gray-500">Overview of your platform</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Engineers" value={engineers.length} color="blue" />
        <StatCard label="Active Subscriptions" value={activeSubscriptions} color="green" />
        <StatCard label="Total Tasks" value={tasks.length} color="purple" />
        <StatCard label="Total Revenue" value={`₹${totalRevenue.toLocaleString()}`} color="amber" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white p-6 dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Task Status</h2>
          <div className="mt-4 space-y-3">
            <StatusRow label="Pending" count={pendingTasks} color="bg-yellow-400" />
            <StatusRow label="In Progress" count={inProgressTasks} color="bg-indigo-400" />
            <StatusRow label="Completed" count={completedTasks} color="bg-green-400" />
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white p-6 dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Quick Actions</h2>
          <div className="mt-4 space-y-3">
            <Link href="/admin/engineers/add" className="flex items-center justify-between rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 p-4 transition hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700">
              <span className="font-medium text-gray-700 dark:text-gray-300">Add New Engineer</span>
              <span className="text-xl">👷</span>
            </Link>
            <Link href="/admin/tasks/new" className="flex items-center justify-between rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 p-4 transition hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700">
              <span className="font-medium text-gray-700 dark:text-gray-300">Create New Task</span>
              <span className="text-xl">📋</span>
            </Link>
            <Link href="/admin/earnings" className="flex items-center justify-between rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 p-4 transition hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700">
              <span className="font-medium text-gray-700 dark:text-gray-300">View Earnings</span>
              <span className="text-xl">💰</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-gray-200 dark:border-gray-700 bg-white p-6 dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Recent Tasks</h2>
          <Link href="/admin/tasks" className="text-sm text-blue-600 hover:text-blue-700">View All</Link>
        </div>
        <div className="mt-4 divide-y divide-gray-100 dark:divide-gray-800">
          {recentTasks.length === 0 && (
            <p className="py-4 text-sm text-gray-400 dark:text-gray-500">No tasks yet. Create your first task!</p>
          )}
          {recentTasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">{task.title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-500">{task.customerName} — ₹{task.amount}</p>
              </div>
              <TaskBadge status={task.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: string | number; color: string }) {
  const colors: Record<string, string> = {
    blue: "border-blue-200 bg-blue-50 text-blue-700",
    green: "border-green-200 bg-green-50 text-green-700",
    purple: "border-purple-200 bg-purple-50 text-purple-700",
    amber: "border-amber-200 bg-amber-50 text-amber-700",
  };
  return (
    <div className={`rounded-xl border p-6 ${colors[color] || colors.blue}`}>
      <p className="text-sm opacity-75">{label}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
    </div>
  );
}

function StatusRow({ label, count, color }: { label: string; count: number; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`h-3 w-3 rounded-full ${color}`} />
      <span className="flex-1 text-sm text-gray-600 dark:text-gray-400 dark:text-gray-500">{label}</span>
      <span className="font-semibold text-gray-900 dark:text-gray-100">{count}</span>
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
