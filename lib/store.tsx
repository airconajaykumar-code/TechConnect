"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Engineer, Task, EarningsRecord } from "@/lib/data";
import { SUBSCRIPTION_PRICE, DEFAULT_COMMISSION_PERCENT } from "@/lib/data";

interface AppStore {
  engineers: Engineer[];
  tasks: Task[];
  addEngineer: (e: Omit<Engineer, "id" | "skills" | "email" | "joinedAt" | "subscription" | "totalEarnings" | "totalTasks" | "rating">) => void;
  addTask: (t: Omit<Task, "id" | "status" | "commissionPercent" | "platformFee" | "engineerPayout" | "createdAt" | "paymentReceived"> & { commissionAmount: number }) => void;
  updateTaskStatus: (id: string, status: Task["status"]) => void;
  markPaymentReceived: (id: string) => void;
}

const StoreContext = createContext<AppStore | null>(null);

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [engineers, setEngineers] = useState<Engineer[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const savedEng = localStorage.getItem("tc_engineers");
    const savedTasks = localStorage.getItem("tc_tasks");

    const SEED_PATCH: Record<string, Partial<Engineer>> = {
      "seed-1": {
        phone: "+91 88688 55921",
        skills: ["CCTV Installation", "Camera Setup", "DVR Config", "Networking", "Broadband Setup"],
        bio: "CCTV Technician based in Haldwani with 8 years of experience in CCTV installation and networking.",
        experience: "8 years",
      },
    };

    const seedEngineers: Engineer[] = [
      { id: "seed-1", name: "Vikas Rajput", phone: "+91 88688 55921", email: "", profession: "CCTV Technician", skills: ["CCTV Installation", "Camera Setup", "DVR Config", "Networking", "Broadband Setup"], location: "Bareilly Road, Ambedkar Nagar, Haldwani, Nainital, Uttarakhand", bio: "CCTV Technician based in Haldwani with 8 years of experience in CCTV installation and networking.", experience: "8 years", joinedAt: "2025-07-01", subscription: { status: "active", amount: 99, validTill: "2026-07-01" }, totalEarnings: 0, totalTasks: 0, rating: 0 },
      { id: "seed-2", name: "Durgesh Bhardwaj", phone: "", email: "", profession: "Network Engineer", skills: ["Broadband Setup", "WiFi", "Cabling"], location: "Nawabi Road, Haldwani, Uttarakhand", joinedAt: "2025-07-01", subscription: { status: "active", amount: 99, validTill: "2026-07-01" }, totalEarnings: 0, totalTasks: 0, rating: 0 },
      { id: "seed-3", name: "Abhishek Bisht", phone: "", email: "", profession: "Electrical Specialist", skills: ["Electrical Wiring", "Repairs", "Lighting"], location: "Kusumkhera, Haldwani, Nainital, Uttarakhand", joinedAt: "2025-07-01", subscription: { status: "active", amount: 99, validTill: "2026-07-01" }, totalEarnings: 0, totalTasks: 0, rating: 0 },
      { id: "seed-4", name: "Ajay Kumar", phone: "", email: "", profession: "General Technician", skills: ["Smart Home", "Electrical", "Networking"], location: "Rajendra Nagar, Rajpura, Haldwani, Uttarakhand", joinedAt: "2025-07-01", subscription: { status: "active", amount: 99, validTill: "2026-07-01" }, totalEarnings: 0, totalTasks: 0, rating: 0 },
    ];

    if (savedEng) {
      let parsed = JSON.parse(savedEng) as Engineer[];
      if (parsed.length === 0) {
        setEngineers(seedEngineers);
      } else {
        let changed = false;
        parsed = parsed.map((e) => {
          const patch = SEED_PATCH[e.id];
          if (patch && patch.bio && !e.bio) {
            changed = true;
            return { ...e, ...patch };
          }
          return e;
        });
        if (changed) {
          localStorage.setItem("tc_engineers", JSON.stringify(parsed));
        }
        setEngineers(parsed);
      }
    } else {
      setEngineers(seedEngineers);
    }
    if (savedTasks) setTasks(JSON.parse(savedTasks));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem("tc_engineers", JSON.stringify(engineers));
  }, [engineers, loaded]);

  useEffect(() => {
    if (loaded) localStorage.setItem("tc_tasks", JSON.stringify(tasks));
  }, [tasks, loaded]);

  function addEngineer(data: Omit<Engineer, "id" | "skills" | "email" | "joinedAt" | "subscription" | "totalEarnings" | "totalTasks" | "rating">) {
    const engineer: Engineer = {
      id: generateId(),
      name: data.name,
      phone: data.phone,
      email: "",
      profession: data.profession,
      skills: [],
      location: data.location || "",
      joinedAt: new Date().toISOString().split("T")[0],
      subscription: { status: "active", amount: SUBSCRIPTION_PRICE, validTill: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0] },
      totalEarnings: 0,
      totalTasks: 0,
      rating: 0,
    };
    setEngineers((prev) => [...prev, engineer]);
  }

  function addTask(data: Omit<Task, "id" | "status" | "commissionPercent" | "platformFee" | "engineerPayout" | "createdAt" | "paymentReceived"> & { commissionAmount: number }) {
    const platformFee = data.commissionAmount || 0;
    const task: Task = {
      id: generateId(),
      title: data.title,
      description: data.description,
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      customerAddress: data.customerAddress,
      assignedTo: data.assignedTo,
      status: "pending",
      amount: data.amount,
      commissionPercent: 0,
      platformFee,
      engineerPayout: data.amount - platformFee,
      createdAt: new Date().toISOString().split("T")[0],
      paymentReceived: false,
    };
    setTasks((prev) => [...prev, task]);
  }

  function updateTaskStatus(id: string, status: Task["status"]) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status, completedAt: status === "completed" ? new Date().toISOString().split("T")[0] : t.completedAt } : t))
    );
  }

  function markPaymentReceived(id: string) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, paymentReceived: true } : t))
    );
  }

  return (
    <StoreContext.Provider value={{ engineers, tasks, addEngineer, addTask, updateTaskStatus, markPaymentReceived }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
