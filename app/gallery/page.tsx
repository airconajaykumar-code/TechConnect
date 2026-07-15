"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const CATEGORIES = ["All", "CCTV", "Broadband", "Networking", "Electrical"];

const projects: {
  id: number;
  title: string;
  category: string;
  location: string;
  color: string;
  icon: string;
  desc: string;
  image?: string;
}[] = [
  { id: 1, title: "4K CCTV Installation", category: "CCTV", location: "Ambedkar Nagar, Haldwani", color: "from-blue-400 to-blue-600", icon: "📹", desc: "Complete 4-camera HD system with DVR setup", image: "/images/pexels-asphotography-96612.jpg" },
  { id: 2, title: "Fiber Broadband Setup", category: "Broadband", location: "Nawabi Road, Haldwani", color: "from-emerald-400 to-emerald-600", icon: "📡", desc: "FTTH broadband with WiFi 6 router" },
  { id: 3, title: "Office Network Infrastructure", category: "Networking", location: "Bareilly Road, Haldwani", color: "from-purple-400 to-purple-600", icon: "🌐", desc: "Full LAN setup with server rack & switches", image: "/images/pexels-vladimirsrajber-13963756.jpg" },
  { id: 4, title: "Home Electrical Wiring", category: "Electrical", location: "Kusumkhera, Haldwani", color: "from-yellow-400 to-yellow-600", icon: "⚡", desc: "Complete rewiring with safety audit" },
  { id: 5, title: "PTZ Camera Installation", category: "CCTV", location: "Rajpura, Haldwani", color: "from-blue-400 to-blue-600", icon: "📹", desc: "360° PTZ camera with night vision", image: "/images/pexels-asphotography-96612.jpg" },
  { id: 6, title: "Smart Home Automation", category: "Electrical", location: "Haldwani", color: "from-yellow-400 to-yellow-600", icon: "🏠", desc: "Smart lights, switches & voice control", image: "/images/pexels-jakubzerdzicki-21284445.jpg" },
  { id: 7, title: "Point to Point Wireless Link", category: "Networking", location: "Nainital Road", color: "from-purple-400 to-purple-600", icon: "📡", desc: "5km wireless bridge with MikroTik", image: "/images/pexels-dextarvision-15483316.jpg" },
  { id: 8, title: "DVR/NVR Setup", category: "CCTV", location: "Ambedkar Nagar, Haldwani", color: "from-blue-400 to-blue-600", icon: "📹", desc: "16-channel NVR with remote viewing", image: "/images/pexels-asphotography-96612.jpg" },
  { id: 9, title: "OFC Cable Laying", category: "Broadband", location: "Bareilly Road, Haldwani", color: "from-emerald-400 to-emerald-600", icon: "💡", desc: "Optical fiber cable installation for high-speed internet", image: "/images/pexels-brett-sayles-4682189.jpg" },
];

type UploadedMedia = {
  id: string;
  type: "image" | "video";
  dataUrl: string;
  caption: string;
  category: string;
};

function getYouTubeEmbed(url: string) {
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

export default function GalleryPage() {
  const [active, setActive] = useState("All");
  const [uploaded, setUploaded] = useState<UploadedMedia[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("tc_gallery");
      if (raw) setUploaded(JSON.parse(raw));
    } catch {}
  }, []);

  const filteredProjects = active === "All" ? projects : projects.filter((p) => p.category === active);
  const filteredUploaded = active === "All" ? uploaded : uploaded.filter((p) => p.category === active);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-12 text-center">
          <Link href="/" className="mb-6 inline-flex items-center text-sm text-blue-600 hover:text-blue-700">← Back to Home</Link>
          <h1 className="mt-4 text-4xl font-bold text-gray-900 dark:text-gray-100">Our Work Gallery</h1>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-400 dark:text-gray-500">Recent projects and installations by TechConnect</p>
        </div>

        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setActive(cat)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                active === cat ? "bg-blue-600 text-white shadow-md dark:shadow-gray-900/50" : "bg-white text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700"
              }`}
            >{cat}</button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredUploaded.map((item) => (
            <div key={item.id} className="overflow-hidden rounded-2xl bg-white shadow-sm dark:shadow-gray-900/50 transition hover:shadow-lg dark:hover:shadow-gray-900/50 dark:bg-gray-800">
              {item.type === "image" ? (
                <img src={item.dataUrl} alt={item.caption} className="h-52 w-full object-cover" />
              ) : (
                <div className="flex h-52 items-center justify-center bg-gray-900">
                  {getYouTubeEmbed(item.dataUrl) ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${getYouTubeEmbed(item.dataUrl)}`}
                      className="h-full w-full"
                      allowFullScreen
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-400 to-purple-600">
                      <span className="text-6xl">🎬</span>
                    </div>
                  )}
                </div>
              )}
              <div className="p-5">
                <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">{item.category}</span>
                <p className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">{item.caption}</p>
              </div>
            </div>
          ))}

          {filteredProjects.map((p) => (
            <div key={p.id} className="group relative overflow-hidden rounded-2xl bg-white shadow-sm dark:shadow-gray-900/50 transition hover:shadow-lg dark:hover:shadow-gray-900/50 dark:bg-gray-800">
              <div className={`flex h-52 items-center justify-center bg-gradient-to-br ${p.color} ${p.image ? "overflow-hidden" : ""}`}>
                {p.image ? (
                  <img src={p.image} alt={p.title} className="h-full w-full object-cover transition group-hover:scale-110" />
                ) : (
                  <span className="text-7xl transition group-hover:scale-110">{p.icon}</span>
                )}
              </div>
              <div className="p-5">
                <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">{p.category}</span>
                <h3 className="mt-2 text-lg font-bold text-gray-900 dark:text-gray-100">{p.title}</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{p.location}</p>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {filteredUploaded.length === 0 && filteredProjects.length === 0 && (
          <div className="py-20 text-center text-gray-400 dark:text-gray-500">
            No projects found in this category.
          </div>
        )}
      </div>
    </main>
  );
}
