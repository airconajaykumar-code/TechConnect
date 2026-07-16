import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { db } from "./firebase";
import {
  collection,
  query,
  orderBy,
  where,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";
import type { Task } from "./data";

interface EngineerInfo {
  name: string;
  phone: string;
  profession: string;
  location?: string;
  totalTasks: number;
  totalEarnings: number;
  rating: number;
}

interface TaskContextType {
  tasks: Task[];
  updateTaskStatus: (taskId: string, status: Task["status"]) => void;
  engineer: EngineerInfo;
  setEngineer: (data: EngineerInfo) => void;
  updateEngineer: (data: Partial<EngineerInfo>) => void;
}

const TaskContext = createContext<TaskContextType | null>(null);

const DEFAULT_ENGINEER: EngineerInfo = {
  name: "",
  phone: "",
  profession: "",
  totalTasks: 0,
  totalEarnings: 0,
  rating: 0,
};

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [engineer, setEngineerState] = useState<EngineerInfo>(DEFAULT_ENGINEER);

  useEffect(() => {
    const unsub = onSnapshot(
      query(collection(db, "tasks"), orderBy("createdAt", "desc")),
      (snap) => {
        setTasks(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Task)));
      }
    );
    return unsub;
  }, []);

  function setEngineer(data: EngineerInfo) {
    setEngineerState(data);
  }

  async function updateTaskStatus(taskId: string, status: Task["status"]) {
    const payload: Record<string, unknown> = { status };
    if (status === "completed") {
      payload.completedAt = new Date().toISOString();
    }
    await updateDoc(doc(db, "tasks", taskId), payload);
  }

  function updateEngineer(data: Partial<EngineerInfo>) {
    setEngineerState((prev) => ({ ...prev, ...data }));
  }

  return (
    <TaskContext.Provider value={{ tasks, updateTaskStatus, engineer, setEngineer, updateEngineer }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTasks must be used within TaskProvider");
  return ctx;
}
