export interface Task {
  id: string;
  title: string;
  description: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  status: "pending" | "assigned" | "in_progress" | "completed" | "cancelled";
  amount: number;
  yourPayout: number;
  createdAt: string;
  completedAt?: string;
}

export const MOCK_TASKS: Task[] = [
  {
    id: "1",
    title: "CCTV Installation - Home Security",
    description: "Install 4 CCTV cameras with DVR setup for a 3BHK home.",
    customerName: "Rajesh Kumar",
    customerPhone: "+91 98765 01122",
    customerAddress: "Juhu, Mumbai - 400049",
    status: "in_progress",
    amount: 5999,
    yourPayout: 5099,
    createdAt: "2025-06-05",
  },
  {
    id: "2",
    title: "Broadband Setup - BKC Office",
    description: "New fiber broadband connection with WiFi 6 router.",
    customerName: "Meera Joshi",
    customerPhone: "+91 99887 71122",
    customerAddress: "BKC, Bandra East, Mumbai",
    status: "assigned",
    amount: 2499,
    yourPayout: 2124,
    createdAt: "2025-06-10",
  },
];

export const MOCK_ENGINEER = {
  name: "Vikas Rajput",
  phone: "+91 88688 55921",
  profession: "CCTV Technician",
  totalTasks: 12,
  totalEarnings: 28500,
  rating: 4.8,
};
