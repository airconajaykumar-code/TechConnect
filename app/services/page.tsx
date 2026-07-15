"use client";

import { useState } from "react";
import Link from "next/link";

const services = [
  {
    id: "cctv",
    title: "CCTV Installation",
    icon: "📹",
    description: "Professional CCTV camera installation for home and office security.",
    features: ["HD Camera Installation", "DVR/NVR Setup", "Mobile Viewing", "Night Vision"],
    price: "₹1,499 onwards",
    image: "/images/pexels-asphotography-96612.jpg",
  },
  {
    id: "networking",
    title: "Networking",
    icon: "🌐",
    description: "Complete networking solutions for homes and businesses.",
    features: ["Router Configuration", "LAN Setup", "WiFi Optimization", "Server Setup"],
    price: "₹499 onwards",
    image: "/images/pexels-vladimirsrajber-13963756.jpg",
  },
  {
    id: "broadband",
    title: "Broadband Services",
    icon: "📡",
    description: "Fiber broadband installation and internet setup services.",
    features: ["Fiber Installation", "ONT/Router Setup", "Signal Testing", "Speed Optimization"],
    price: "₹399 onwards",
  },
  {
    id: "electrical",
    title: "Electrical Services",
    icon: "⚡",
    description: "Expert electrical repair, wiring, and installation services.",
    features: ["Wiring & Rewiring", "Switchboard Repair", "Lighting Installation", "Safety Audit"],
    price: "₹199 onwards",
  },
  {
    id: "smart-home",
    title: "Smart Home Setup",
    icon: "🏠",
    description: "Transform your home with smart devices and automation.",
    features: ["Smart Lights", "Voice Assistants", "Home Automation", "IoT Setup"],
    price: "₹699 onwards",
    image: "/images/pexels-jakubzerdzicki-21284445.jpg",
  },
  {
    id: "security",
    title: "Security Systems",
    icon: "🔒",
    description: "Complete security solutions including alarms and access control.",
    features: ["Alarm Systems", "Access Control", "Video Door Phone", "Fire Alarms"],
    price: "₹2,999 onwards",
  },
];

const WHATSAPP_NUMBER = "917217357366";

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", address: "", message: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const service = services.find((s) => s.id === selectedService);
    const msg =
      `🛠️ *New Service Booking*%0A%0A` +
      `*Service:* ${service?.title}%0A` +
      `*Name:* ${form.name}%0A` +
      `*Phone:* ${form.phone}%0A` +
      `*Address:* ${form.address}%0A` +
      `${form.message ? `*Message:* ${form.message}%0A` : ""}%0A` +
      `📍 *Location:* Haldwani`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
    setSelectedService(null);
    setForm({ name: "", phone: "", address: "", message: "" });
  }

  return (
    <main className="min-h-screen bg-orange-50 dark:bg-gray-900">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-12 text-center">
          <Link href="/" className="mb-6 inline-flex items-center text-sm text-blue-600 hover:text-blue-700">
            ← Back to Home
          </Link>
          <h1 className="mt-4 text-4xl font-bold text-gray-900 dark:text-gray-100">Our Services</h1>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-400 dark:text-gray-500">
            Professional tech services at your doorstep
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white p-6 shadow-sm dark:shadow-gray-900/50 dark:bg-gray-800 transition hover:shadow-md"
            >
              <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${"image" in service ? "overflow-hidden" : "bg-blue-100 text-2xl"}`}>
                {"image" in service ? (
                  <img src={(service as any).image} alt={service.title} className="h-full w-full object-cover" />
                ) : (
                  service.icon
                )}
              </div>
              <h2 className="mt-4 text-xl font-bold text-gray-900 dark:text-gray-100">{service.title}</h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 dark:text-gray-500">{service.description}</p>
              <ul className="mt-4 space-y-2">
                {service.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 dark:text-gray-500">
                    <span className="text-blue-600">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-lg font-bold text-blue-600">{service.price}</p>
              <button
                onClick={() => setSelectedService(service.id)}
                className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>

        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-2xl dark:shadow-gray-900/50 dark:bg-gray-800">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  Book {services.find((s) => s.id === selectedService)?.title}
                </h2>
                <button onClick={() => setSelectedService(null)} className="text-2xl text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:text-gray-500">✕</button>
              </div>
              <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2.5 text-sm text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none dark:bg-gray-800" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                  <input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2.5 text-sm text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none dark:bg-gray-800" placeholder="+91 98765 43210" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
                  <textarea required rows={2} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2.5 text-sm text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none dark:bg-gray-800" placeholder="Your full address" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message (optional)</label>
                  <textarea rows={2} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2.5 text-sm text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none dark:bg-gray-800" placeholder="Any specific requirements..." />
                </div>
                <button type="submit" className="flex items-center justify-center gap-2 w-full rounded-lg bg-green-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-green-700">
                  <svg viewBox="0 0 32 32" className="h-5 w-5 fill-white"><path d="M16 2C8.2 2 2 8.2 2 16c0 3.1 1 6 2.7 8.4L2.5 29.5l5.3-2.1C10.1 29 13 30 16 30c7.8 0 14-6.2 14-14S23.8 2 16 2zm0 25.5c-2.7 0-5.2-.9-7.2-2.4l-.5-.4-3.3 1.3 1.3-3.2-.4-.5C4.7 20.2 4 18 4 16 4 9.4 9.4 4 16 4s12 5.4 12 12-5.4 12-12 12zm6.6-9.2c-.4-.2-2.2-1.1-2.5-1.2-.3-.1-.6-.2-.8.2-.2.4-.9 1.2-1.1 1.4-.2.2-.4.3-.8.1-.4-.2-1.6-.6-3-1.9-1.1-1-1.9-2.2-2.1-2.6-.2-.4 0-.6.2-.8.2-.2.4-.4.5-.7.1-.2.2-.4.1-.6-.1-.2-.5-1.2-.7-1.6-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1 2.9 1.2 3.1c.2.2 2 3.1 4.9 4.3.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.8-.7 2.1-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.3-.7-.5z"/></svg>
                  Send via WhatsApp
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
