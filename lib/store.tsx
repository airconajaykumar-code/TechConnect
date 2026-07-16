"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  getDocs,
  query,
  orderBy,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import type { Engineer, Task } from "@/lib/data";
import { SUBSCRIPTION_PRICE } from "@/lib/data";

interface AppStore {
  engineers: Engineer[];
  tasks: Task[];
  addEngineer: (e: Omit<Engineer, "id" | "skills" | "email" | "joinedAt" | "subscription" | "totalEarnings" | "totalTasks" | "rating">) => void;
  addTask: (t: Omit<Task, "id" | "status" | "commissionPercent" | "platformFee" | "engineerPayout" | "createdAt" | "paymentReceived"> & { commissionAmount: number }) => void;
  updateTaskStatus: (id: string, status: Task["status"]) => void;
  markPaymentReceived: (id: string) => void;
}

const StoreContext = createContext<AppStore | null>(null);

const engineersCol = collection(db, "engineers");
const tasksCol = collection(db, "tasks");

const seedEngineers: Omit<Engineer, "id">[] = [
  { name: "Vikas Rajput", phone: "+91 88688 55921", email: "", profession: "CCTV Technician", skills: ["CCTV Installation", "Camera Setup", "DVR Config", "Networking", "Broadband Setup"], location: "Bareilly Road, Ambedkar Nagar, Haldwani, Nainital, Uttarakhand", bio: "CCTV Technician based in Haldwani with 8 years of experience in CCTV installation and networking.", experience: "8 years", joinedAt: "2025-07-01", subscription: { status: "active" as const, amount: 99, validTill: "2026-07-01" }, totalEarnings: 0, totalTasks: 0, rating: 0 },
  { name: "Durgesh Bhardwaj", phone: "+91 98765 43210", email: "", profession: "Network Engineer", skills: ["Broadband Setup", "WiFi", "Cabling"], location: "Nawabi Road, Haldwani, Uttarakhand", joinedAt: "2025-07-01", subscription: { status: "active" as const, amount: 99, validTill: "2026-07-01" }, totalEarnings: 0, totalTasks: 0, rating: 0 },
  { name: "Abhishek Bisht", phone: "+91 97531 24680", email: "", profession: "Electrical Specialist", skills: ["Electrical Wiring", "Repairs", "Lighting"], location: "Kusumkhera, Haldwani, Nainital, Uttarakhand", joinedAt: "2025-07-01", subscription: { status: "active" as const, amount: 99, validTill: "2026-07-01" }, totalEarnings: 0, totalTasks: 0, rating: 0 },
  { name: "Ajay Kumar", phone: "+91 72173 57366", email: "", profession: "General Technician", skills: ["Smart Home", "Electrical", "Networking"], location: "Rajendra Nagar, Rajpura, Haldwani, Uttarakhand", joinedAt: "2025-07-01", subscription: { status: "active" as const, amount: 99, validTill: "2026-07-01" }, totalEarnings: 0, totalTasks: 0, rating: 0 },
];

async function seedIfEmpty() {
  const snap = await getDocs(query(engineersCol, orderBy("name")));
  if (snap.empty) {
    for (const eng of seedEngineers) {
      await addDoc(engineersCol, { ...eng, createdAt: Timestamp.now() });
    }
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [engineers, setEngineers] = useState<Engineer[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    seedIfEmpty();

    const unsubEng = onSnapshot(engineersCol, (snap) => {
      const list: Engineer[] = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Engineer));
      setEngineers(list);
    });

    const unsubTasks = onSnapshot(tasksCol, (snap) => {
      const list: Task[] = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Task));
      setTasks(list);
      setLoaded(true);
    });

    return () => { unsubEng(); unsubTasks(); };
  }, []);

  async function addEngineer(data: Omit<Engineer, "id" | "skills" | "email" | "joinedAt" | "subscription" | "totalEarnings" | "totalTasks" | "rating">) {
    const engineer = {
      name: data.name,
      phone: data.phone,
      email: "",
      profession: data.profession,
      skills: [] as string[],
      location: data.location || "",
      joinedAt: new Date().toISOString().split("T")[0],
      subscription: { status: "active" as const, amount: SUBSCRIPTION_PRICE, validTill: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0] },
      totalEarnings: 0,
      totalTasks: 0,
      rating: 0,
      createdAt: Timestamp.now(),
    };
    await addDoc(engineersCol, engineer);
  }

  async function addTask(data: Omit<Task, "id" | "status" | "commissionPercent" | "platformFee" | "engineerPayout" | "createdAt" | "paymentReceived"> & { commissionAmount: number }) {
    const platformFee = data.commissionAmount || 0;
    const task = {
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
    await addDoc(tasksCol, task);
  }

  async function updateTaskStatus(id: string, status: Task["status"]) {
    const payload: Record<string, unknown> = { status };
    if (status === "completed") {
      payload.completedAt = new Date().toISOString().split("T")[0];
    }
    await updateDoc(doc(tasksCol, id), payload);
  }

  async function markPaymentReceived(id: string) {
    await updateDoc(doc(tasksCol, id), { paymentReceived: true });
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
