"use client";

import { useStore } from "@/lib/store";

export default function EarningsPage() {
  const { engineers, tasks } = useStore();

  const activeEngineers = engineers.filter((e) => e.subscription.status === "active");
  const totalCommission = tasks.reduce((sum, t) => sum + t.platformFee, 0);
  const receivedCommission = tasks.filter((t) => t.paymentReceived).reduce((sum, t) => sum + t.platformFee, 0);
  const pendingCommission = totalCommission - receivedCommission;
  const subscriptionRevenue = activeEngineers.length * 99;
  const totalRevenue = receivedCommission + subscriptionRevenue;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Earnings</h1>
      <p className="mt-1 text-gray-500 dark:text-gray-400 dark:text-gray-500">Track your revenue from subscriptions and commissions</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-4">
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
          <p className="text-sm text-blue-700">Total Revenue</p>
          <p className="mt-2 text-3xl font-bold text-blue-700">₹{totalRevenue.toLocaleString()}</p>
        </div>
        <div className="rounded-xl border border-green-200 bg-green-50 p-6">
          <p className="text-sm text-green-700">Commission Received</p>
          <p className="mt-2 text-3xl font-bold text-green-700">₹{receivedCommission.toLocaleString()}</p>
        </div>
        <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-6">
          <p className="text-sm text-yellow-700">Pending Commission</p>
          <p className="mt-2 text-3xl font-bold text-yellow-700">₹{pendingCommission.toLocaleString()}</p>
        </div>
        <div className="rounded-xl border border-purple-200 bg-purple-50 p-6">
          <p className="text-sm text-purple-700">Subscription Revenue</p>
          <p className="mt-2 text-3xl font-bold text-purple-700">₹{subscriptionRevenue.toLocaleString()}</p>
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-gray-200 dark:border-gray-700 bg-white p-6 dark:bg-gray-800">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">How Earnings Work</h2>
        <div className="mt-4 grid gap-6 sm:grid-cols-2">
          <div className="rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 p-4 dark:bg-gray-800">
            <h3 className="font-medium text-gray-900 dark:text-gray-100">📋 Commission per Task</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 dark:text-gray-500">
              You set a commission percentage (10-20%) on each task. This amount is deducted from the task total and paid to you.
            </p>
          </div>
          <div className="rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 p-4 dark:bg-gray-800">
            <h3 className="font-medium text-gray-900 dark:text-gray-100">💳 Engineer Subscription</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 dark:text-gray-500">
              Each engineer pays ₹99/month subscription to get access to tasks.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Active Subscribers ({activeEngineers.length})
        </h2>
        <div className="mt-4 space-y-3">
          {activeEngineers.length === 0 && (
            <p className="text-sm text-gray-400 dark:text-gray-500">No active subscribers yet.</p>
          )}
          {activeEngineers.map((eng) => (
            <div key={eng.id} className="flex items-center justify-between rounded-lg border border-gray-200 dark:border-gray-700 bg-white p-4 dark:bg-gray-800">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                  {eng.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{eng.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-500">{eng.profession}</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-500">₹{eng.subscription.amount}/mo</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Commission from Tasks</h2>
        <div className="mt-4 space-y-3">
          {tasks.length === 0 && (
            <p className="text-sm text-gray-400 dark:text-gray-500">No tasks yet.</p>
          )}
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between rounded-lg border border-gray-200 dark:border-gray-700 bg-white p-4 dark:bg-gray-800">
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">{task.title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-500">Amount: ₹{task.amount}</p>
              </div>
              <div className="flex items-center gap-3">
                {task.paymentReceived ? (
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">✅ Paid</span>
                ) : (
                  <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-700">Pending</span>
                )}
                <p className="font-semibold text-blue-600">+₹{task.platformFee}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
