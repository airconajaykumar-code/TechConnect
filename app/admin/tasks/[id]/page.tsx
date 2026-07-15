"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useStore } from "@/lib/store";
import { useParams } from "next/navigation";
import { getWhatsAppLink } from "@/lib/whatsapp";

export default function TaskDetail() {
  const { id } = useParams<{ id: string }>();
  const { tasks, engineers, updateTaskStatus, markPaymentReceived } = useStore();

  const task = tasks.find((t) => t.id === id);
  if (!task) {
    return (
      <div className="p-8">
        <Link href="/admin/tasks" className="mb-6 inline-flex items-center text-sm text-blue-600 hover:text-blue-700">← Back to Tasks</Link>
        <div className="mt-8 text-center text-gray-500 dark:text-gray-400 dark:text-gray-500">Task not found</div>
      </div>
    );
  }

  const [upiId, setUpiId] = useState("");
  useEffect(() => {
    const stored = localStorage.getItem("tc_upi");
    if (stored) setUpiId(stored);
  }, []);

  const engineer = engineers.find((e) => e.id === task.assignedTo);
  const otherTasks = tasks.filter((t) => t.id !== task.id).slice(0, 3);
  const qrData = upiId ? `upi://pay?pa=${encodeURIComponent(upiId)}&pn=TechConnect&am=${task.platformFee}&cu=INR` : "";
  const qrUrl = qrData ? `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(qrData)}` : "";

  const statuses: { label: string; key: typeof task.status; color: string }[] = [
    { label: "Pending", key: "pending", color: "yellow" },
    { label: "In Progress", key: "in_progress", color: "indigo" },
    { label: "Completed", key: "completed", color: "green" },
    { label: "Cancelled", key: "cancelled", color: "red" },
  ];

  return (
    <div className="p-8">
      <Link href="/admin/tasks" className="mb-6 inline-flex items-center text-sm text-blue-600 hover:text-blue-700">← Back to Tasks</Link>

      {/* Header */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white p-6 dark:bg-gray-800">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{task.title}</h1>
              <TaskBadge status={task.status} />
              {task.paymentReceived && (
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">💰 Paid</span>
              )}
            </div>
            <p className="mt-2 text-gray-600 dark:text-gray-400 dark:text-gray-500">{task.description}</p>
          </div>
          <div className="ml-6 text-right">
            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">₹{task.amount}</p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 dark:text-gray-500">Total Budget</p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 border-t border-gray-100 dark:border-gray-800 pt-6 sm:grid-cols-3">
          <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <p className="text-xs font-medium text-green-700">Task Amount</p>
            <p className="mt-1 text-xl font-bold text-green-700">₹{task.amount || 0}</p>
          </div>
          <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
            <p className="text-xs font-medium text-blue-700">Your Commission</p>
            <p className="mt-1 text-xl font-bold text-blue-700">₹{task.platformFee}</p>
          </div>
          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
            <p className="text-xs font-medium text-gray-700">Engineer Payout</p>
            <p className="mt-1 text-xl font-bold text-gray-700">₹{task.engineerPayout}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Customer Details */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white p-6 dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Customer Details</h2>
          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
              <span className="text-xl">👤</span>
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">{task.customerName}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-500">{task.customerPhone}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-3">
              <span className="text-xl">📍</span>
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">Service Address</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-500">{task.customerAddress}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Assigned Engineer */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white p-6 dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Assigned Engineer</h2>
          {engineer ? (
            <div className="mt-4">
              <Link href={`/admin/engineers/${engineer.id}`}
                className="flex items-center gap-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-800 transition hover:bg-gray-100">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-600">
                  {engineer.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 dark:text-gray-100">{engineer.name}</p>
                  <p className="text-sm text-blue-600">{engineer.profession}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-500">{engineer.phone}</p>
                </div>
              </Link>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400 dark:text-gray-500">
                <span>📅 Created: {task.createdAt}</span>
                {task.completedAt && <span>✅ Completed: {task.completedAt}</span>}
              </div>
              <a href={getWhatsAppLink(engineer.phone, task)} target="_blank" rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-green-700">
                <span>📱</span> Send Task via WhatsApp
              </a>
            </div>
          ) : (
            <p className="mt-4 text-sm text-gray-400 dark:text-gray-500">Not assigned yet</p>
          )}
        </div>
      </div>

      {/* Status & Payment Actions */}
      <div className="mt-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white p-6 dark:bg-gray-800">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Update Status</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {statuses.map((s) => (
            <button
              key={s.key}
              onClick={() => updateTaskStatus(id, s.key)}
              disabled={task.status === s.key}
              className={`rounded-lg border px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-40 ${
                task.status === s.key
                  ? "border-gray-300 dark:border-gray-600 bg-gray-100 text-gray-400 dark:text-gray-500 dark:bg-gray-800"
                  : STATUS_STYLES[s.color]
              }`}
            >
              {task.status === s.key ? `✓ ${s.label}` : `Mark ${s.label}`}
            </button>
          ))}
        </div>

        <div className="mt-6 border-t border-gray-100 dark:border-gray-800 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Payment</h2>
          <div className="mt-3 flex flex-wrap items-start gap-6">
            {task.paymentReceived ? (
              <span className="inline-flex items-center gap-2 rounded-lg bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                ✅ Payment Received — ₹{task.platformFee}
              </span>
            ) : (
              <div className="flex flex-wrap items-start gap-6">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Commission: ₹{task.platformFee} — Not yet received</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => markPaymentReceived(id)}
                      className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                    >
                      Mark Payment Received
                    </button>
                  </div>
                </div>
                {qrUrl ? (
                  <div className="rounded-lg border border-gray-200 bg-white p-3 text-center dark:bg-gray-800 dark:border-gray-700">
                    <img
                      src={qrUrl}
                      alt="Pay via UPI"
                      className="mx-auto h-40 w-40"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                        (e.target as HTMLImageElement).nextElementSibling?.classList.remove("hidden");
                      }}
                    />
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Scan to pay ₹{task.platformFee}</p>
                    <p className="mt-1 hidden text-xs text-red-500">QR load nahi hua. Niche UPI ID copy karein</p>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(upiId);
                        alert("UPI ID copied: " + upiId);
                      }}
                      className="mt-2 rounded bg-gray-100 px-3 py-1 text-xs text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                      📋 Copy UPI ID
                    </button>
                  </div>
                ) : upiId ? (
                  <div className="rounded-lg border border-gray-200 bg-white p-3 text-center dark:bg-gray-800 dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400">QR generate karne mein problem</p>
                    <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">UPI ID: {upiId}</p>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(upiId);
                        alert("UPI ID copied!");
                      }}
                      className="mt-2 rounded bg-blue-100 px-3 py-1 text-xs text-blue-600 hover:bg-blue-200"
                    >
                      📋 Copy UPI ID
                    </button>
                  </div>
                ) : (
                  <div className="rounded-lg border border-dashed border-gray-300 bg-white p-3 text-center dark:bg-gray-800 dark:border-gray-600">
                    <p className="text-xs text-gray-400 dark:text-gray-500">Payment QR set nahi hai</p>
                    <a href="/admin/payment" className="mt-1 block text-xs text-blue-600 underline">Set UPI ID</a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Other Recent Tasks */}
      {otherTasks.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Other Tasks</h2>
            <Link href="/admin/tasks" className="text-sm text-blue-600 hover:text-blue-700">View All</Link>
          </div>
          <div className="mt-4 space-y-3">
            {otherTasks.map((t) => {
              const eng = engineers.find((e) => e.id === t.assignedTo);
              return (
                <Link key={t.id} href={`/admin/tasks/${t.id}`}
                  className="flex items-center justify-between rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 p-4 transition hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{t.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 dark:text-gray-500">{eng?.name} — ₹{t.amount}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {t.paymentReceived && <span className="text-xs text-green-600">💰</span>}
                    <TaskBadge status={t.status} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

const STATUS_STYLES: Record<string, string> = {
  yellow: "border-yellow-200 text-yellow-700 hover:bg-yellow-50",
  indigo: "border-indigo-200 text-indigo-700 hover:bg-indigo-50",
  green: "border-green-200 text-green-700 hover:bg-green-50",
  red: "border-red-200 text-red-700 hover:bg-red-50",
  blue: "border-blue-200 text-blue-700 hover:bg-blue-50",
};

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
