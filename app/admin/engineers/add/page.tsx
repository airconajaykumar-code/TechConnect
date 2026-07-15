"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";

export default function AddEngineerPage() {
  const router = useRouter();
  const { addEngineer } = useStore();
  const [form, setForm] = useState({ name: "", phone: "", profession: "", location: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    addEngineer({ name: form.name, phone: form.phone, profession: form.profession, location: form.location });
    alert(`"${form.name}" added successfully!`);
    router.push("/admin/engineers");
  }

  function autoFillVikash() {
    setForm({ name: "Vikash Rajpoot", phone: "8868855921", profession: "CCTV Technician", location: "" });
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Add New Engineer</h1>
      <p className="mt-1 text-gray-500 dark:text-gray-400">Enter engineer details one by one</p>

      <form onSubmit={handleSubmit} className="mt-8 max-w-xl space-y-6">
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white p-6 dark:bg-gray-800">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
              <input name="name" value={form.name} onChange={handleChange} required
                className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2.5 text-sm text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none dark:bg-gray-800"
                placeholder="e.g. Vikash Rajpoot" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Mobile Number</label>
              <input name="phone" type="tel" value={form.phone} onChange={handleChange} required
                className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2.5 text-sm text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none dark:bg-gray-800"
                placeholder="e.g. +91 88688 55921" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Type of Engineer</label>
              <select name="profession" value={form.profession} onChange={handleChange} required
                className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2.5 text-sm text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none dark:bg-gray-800">
                <option value="">Select engineer type...</option>
                <option value="Network Engineer">Network Engineer</option>
                <option value="CCTV Technician">CCTV Technician</option>
                <option value="Electrical Specialist">Electrical Specialist</option>
                <option value="Broadband Technician">Broadband Technician</option>
                <option value="Smart Home Integrator">Smart Home Integrator</option>
                <option value="General Technician">General Technician</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address / Location</label>
              <input name="location" value={form.location} onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2.5 text-sm text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none dark:bg-gray-800"
                placeholder="e.g. Haldwani, Nainital, Uttarakhand" />
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button type="submit"
            className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700">
            Add Engineer
          </button>
          <button type="button" onClick={autoFillVikash}
            className="rounded-lg border border-gray-300 dark:border-gray-600 px-6 py-3 text-sm font-medium text-gray-600 dark:text-gray-400 transition hover:bg-gray-50 dark:hover:bg-gray-800">
            Auto-fill Vikash
          </button>
        </div>
      </form>
    </div>
  );
}
