import { createContext, useContext, useState, type ReactNode } from "react";
import { MOCK_TASKS, MOCK_ENGINEER, type Task } from "./data";

interface EngineerInfo {
  name: string;
  phone: string;
  profession: string;
  totalTasks: number;
  totalEarnings: number;
  rating: number;
}

interface TaskContextType {
  tasks: Task[];
  updateTaskStatus: (taskId: string, status: Task["status"]) => void;
  engineer: EngineerInfo;
  updateEngineer: (data: Partial<EngineerInfo>) => void;
}

const TaskContext = createContext<TaskContextType | null>(null);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [engineer, setEngineer] = useState<EngineerInfo>(MOCK_ENGINEER);

  function updateTaskStatus(taskId: string, status: Task["status"]) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? { ...t, status, completedAt: status === "completed" ? new Date().toISOString() : t.completedAt }
          : t
      )
    );
  }

  function updateEngineer(data: Partial<EngineerInfo>) {
    setEngineer((prev) => ({ ...prev, ...data }));
  }

  return (
    <TaskContext.Provider value={{ tasks, updateTaskStatus, engineer, updateEngineer }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTasks must be used within TaskProvider");
  return ctx;
}
