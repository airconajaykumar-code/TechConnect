export interface Task {
  id: string;
  title: string;
  description: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  status: "pending" | "assigned" | "in_progress" | "completed" | "cancelled";
  amount: number;
  engineerPayout: number;
  createdAt: string;
  completedAt?: string;
}

export const ENGINEERS = [
  {
    id: "1",
    title: "CCTV Installation - Home Security",
    description: "Install 4 CCTV cameras with DVR setup for a 3BHK home.",
    customerName: "Rajesh Kumar",
    customerPhone: "+91 98765 01122",
    customerAddress: "Ambedkar Nagar, Haldwani - 263139",
    status: "in_progress",
    amount: 5999,
    yourPayout: 5099,
    createdAt: "2025-07-10",
  },
  {
    id: "2",
    title: "Fiber Broadband Setup - Nawabi Road",
    description: "New fiber broadband connection with WiFi 6 router.",
    customerName: "Meera Joshi",
    customerPhone: "+91 99887 71122",
    customerAddress: "Nawabi Road, Haldwani",
    status: "assigned",
    amount: 2499,
    yourPayout: 2124,
    createdAt: "2025-07-12",
  },
  {
    id: "3",
    title: "PTZ Camera Installation",
    description: "Install 360° PTZ camera with night vision at shop.",
    customerName: "Suresh Verma",
    customerPhone: "+91 97531 24680",
    customerAddress: "Rajpura, Haldwani",
    status: "pending",
    amount: 4499,
    yourPayout: 3824,
    createdAt: "2025-07-14",
  },
  {
    id: "4",
    title: "Office Network Infrastructure",
    description: "Full LAN setup with server rack & switches for office.",
    customerName: "Priya Singh",
    customerPhone: "+91 88888 99999",
    customerAddress: "Bareilly Road, Haldwani",
    status: "completed",
    amount: 12999,
    yourPayout: 11049,
    createdAt: "2025-07-05",
    completedAt: "2025-07-08",
  },
];

export const MOCK_ENGINEER = {
  name: "Vikas Rajput",
  phone: "+91 88688 55921",
  profession: "CCTV Technician",
  location: "Haldwani, Uttarakhand",
  totalTasks: 12,
  totalEarnings: 28500,
  rating: 4.8,
};
