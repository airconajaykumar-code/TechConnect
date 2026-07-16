"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import type { Engineer, Task } from "@/lib/data";

export function useEngineers() {
  const [engineers, setEngineers] = useState<Engineer[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsub = onSnapshot(
      query(collection(db, "engineers"), orderBy("name")),
      (snap) => {
        setEngineers(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Engineer)));
        setLoading(false);
      }
    );
    return unsub;
  }, []);
  return { engineers, loading };
}

export function useTasksList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsub = onSnapshot(
      query(collection(db, "tasks"), orderBy("createdAt", "desc")),
      (snap) => {
        setTasks(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Task)));
        setLoading(false);
      }
    );
    return unsub;
  }, []);
  return { tasks, loading };
}
