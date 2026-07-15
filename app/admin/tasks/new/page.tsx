"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { getWhatsAppLink } from "@/lib/whatsapp";

interface CreatedTask {
  id: string;
  title: string;
  description: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  engineerPhone: string;
  engineerName: string;
  amount: number;
  commissionAmount: number;
}

export default function NewTaskPage() {
  const router = useRouter();
  const { engineers, addTask } = useStore();
  const [createdTask, setCreatedTask] = useState<CreatedTask | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    customerName: "",
    customerPhone: "",
    customerAddress: "",
    assignedTo: "",
    amount: "",
    commissionAmount: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const amount = Number(form.amount) || 0;
  const commissionAmount = Number(form.commissionAmount) || 0;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    addTask({
      title: form.title,
      description: form.description,
      customerName: form.customerName,
      customerPhone: form.customerPhone,
      customerAddress: form.customerAddress,
      assignedTo: form.assignedTo,
      amount,
      commissionAmount,
    });
    const engineer = engineers.find((e) => e.id === form.assignedTo);
    const task = {
      id: "",
      title: form.title,
      description: form.description,
      customerName: form.customerName,
      customerPhone: form.customerPhone,
      customerAddress: form.customerAddress,
      engineerPhone: engineer?.phone || "",
      engineerName: engineer?.name || "",
      amount,
      commissionAmount,
    };
    setCreatedTask(task);
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Create New Task</h1>
      <p className="mt-1 text-gray-500 dark:text-gray-400 dark:text-gray-500">Assign a new job to an engineer</p>

      <form onSubmit={handleSubmit} className="mt-8 max-w-2xl space-y-6">
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white p-6 dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Task Details</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Task Title</label>
              <input name="title" value={form.title} onChange={handleChange} required
                className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none dark:bg-gray-800"
                placeholder="e.g. CCTV Installation - Client Home" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} required rows={3}
                className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none dark:bg-gray-800"
                placeholder="Describe the job details..." />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white p-6 dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Customer Details</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Customer Name</label>
              <input name="customerName" value={form.customerName} onChange={handleChange} required
                className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none dark:bg-gray-800" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Customer Phone</label>
              <input name="customerPhone" value={form.customerPhone} onChange={handleChange} required
                className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none dark:bg-gray-800" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Customer Address</label>
              <input name="customerAddress" value={form.customerAddress} onChange={handleChange} required
                className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none dark:bg-gray-800" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white p-6 dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Assignment & Commission</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Assign to Engineer</label>
              <select name="assignedTo" value={form.assignedTo} onChange={handleChange} required
                className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none dark:bg-gray-800">
                <option value="">Select engineer...</option>
                {engineers.map((eng) => (
                  <option key={eng.id} value={eng.id}>{eng.name} — {eng.profession}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Total Amount (₹) <span className="text-gray-400 dark:text-gray-500">(optional)</span></label>
              <input name="amount" type="number" value={form.amount} onChange={handleChange} min="0"
                className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none dark:bg-gray-800"
                placeholder="e.g. 1000" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Your Commission (₹)</label>
              <input name="commissionAmount" type="number" value={form.commissionAmount} onChange={handleChange} min="0"
                className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none dark:bg-gray-800"
                placeholder="e.g. 100" />
              <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">Direct amount, not percentage</p>
            </div>
          </div>
        </div>

        <button type="submit"
          className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700">
          Create Task
        </button>
      </form>

      {createdTask && (
        <div className="mt-8 max-w-2xl">
          <div className="rounded-xl border border-green-200 bg-green-50 p-6 dark:bg-green-900/20 dark:border-green-800">
            <div className="flex items-center gap-3">
              <span className="text-2xl">✅</span>
              <div>
                <h2 className="text-lg font-semibold text-green-800">Task Created Successfully!</h2>
                <p className="text-sm text-green-700">Assigned to {createdTask.engineerName}</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={getWhatsAppLink(createdTask.engineerPhone, createdTask as any)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-green-700"
              >
                <span>📱</span>
                Send via WhatsApp to {createdTask.engineerName}
              </a>
              <button
                onClick={() => {
                  setCreatedTask(null);
                  setForm({ title: "", description: "", customerName: "", customerPhone: "", customerAddress: "", assignedTo: "", amount: "", commissionAmount: "" });
                }}
                className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white px-5 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 transition hover:bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-800"
              >
                + Create Another Task
              </button>
              <button
                onClick={() => router.push("/admin/tasks")}
                className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white px-5 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 transition hover:bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-800"
              >
                View All Tasks
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
