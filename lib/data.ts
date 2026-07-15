// ===== Public Types (Freelancers) =====

export interface Freelancer {
  id: string;
  name: string;
  photo: string;
  profession: string;
  skills: string[];
  rating: number;
  reviewCount: number;
  location: string;
  bio: string;
  services: { name: string; price: number; description: string }[];
  experience: string;
  available: boolean;
}

export const freelancers: Freelancer[] = [
  {
    id: "1",
    name: "Rahul Sharma",
    photo: "/avatar.svg",
    profession: "Network Engineer",
    skills: ["Broadband Setup", "WiFi Troubleshooting", "Cabling", "Router Configuration"],
    rating: 4.8,
    reviewCount: 24,
    location: "Andheri West, Mumbai",
    bio: "Certified network engineer with 6+ years of experience in broadband installation.",
    services: [
      { name: "Broadband Installation", price: 499, description: "Complete broadband setup with router configuration" },
      { name: "WiFi Troubleshooting", price: 299, description: "Diagnose and fix WiFi connectivity issues" },
      { name: "Network Cabling", price: 999, description: "Structured cabling for home and office" },
    ],
    experience: "6 years",
    available: true,
  },
  {
    id: "2",
    name: "Priya Patel",
    photo: "/avatar.svg",
    profession: "CCTV Technician",
    skills: ["CCTV Installation", "Camera Setup", "DVR Configuration", "Security Systems"],
    rating: 4.9,
    reviewCount: 31,
    location: "Bandra East, Mumbai",
    bio: "Expert in CCTV and security system installations with 100+ clients.",
    services: [
      { name: "CCTV Camera Installation", price: 1499, description: "Installation of up to 4 cameras with DVR setup" },
      { name: "Camera Maintenance", price: 399, description: "Cleaning and maintenance of existing cameras" },
      { name: "System Upgrade", price: 799, description: "Upgrade existing security system" },
    ],
    experience: "5 years",
    available: true,
  },
  {
    id: "3",
    name: "Amit Verma",
    photo: "/avatar.svg",
    profession: "Electrical Specialist",
    skills: ["Electrical Wiring", "Switchboard Repair", "Lighting Installation", "Safety Audits"],
    rating: 4.7,
    reviewCount: 42,
    location: "Powai, Mumbai",
    bio: "Licensed electrical contractor with 8+ years of experience.",
    services: [
      { name: "Electrical Repair", price: 199, description: "Fix switches, sockets, and minor electrical issues" },
      { name: "Full House Wiring", price: 5999, description: "Complete electrical wiring for new homes" },
      { name: "Lighting Installation", price: 499, description: "Install fans, lights, and fixtures" },
    ],
    experience: "8 years",
    available: false,
  },
  {
    id: "4",
    name: "Sneha Reddy",
    photo: "/avatar.svg",
    profession: "Smart Home Integrator",
    skills: ["Smart Home Setup", "Home Automation", "Voice Assistant Setup", "IoT Devices"],
    rating: 4.9,
    reviewCount: 18,
    location: "Malad West, Mumbai",
    bio: "Passionate about making homes smarter with smart devices and automation.",
    services: [
      { name: "Smart Home Consultation", price: 299, description: "Assess your home and recommend smart solutions" },
      { name: "Device Installation", price: 699, description: "Install and configure smart home devices" },
      { name: "Full Home Automation", price: 4999, description: "End-to-end home automation setup" },
    ],
    experience: "4 years",
    available: true,
  },
];

// ===== Admin Types (Engineers, Tasks, Subscriptions, Earnings) =====

export type TaskStatus = "pending" | "assigned" | "in_progress" | "completed" | "cancelled";
export type SubscriptionStatus = "active" | "expired" | "cancelled";

export interface Engineer {
  id: string;
  name: string;
  phone: string;
  email: string;
  profession: string;
  skills: string[];
  location: string;
  bio?: string;
  experience?: string;
  joinedAt: string;
  subscription: {
    status: SubscriptionStatus;
    amount: number;
    validTill: string;
  };
  totalEarnings: number;
  totalTasks: number;
  rating: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  assignedTo: string;
  status: TaskStatus;
  amount: number;
  commissionPercent: number;
  platformFee: number;
  engineerPayout: number;
  createdAt: string;
  completedAt?: string;
  paymentReceived: boolean;
}

export interface EarningsRecord {
  id: string;
  month: string;
  subscriptionRevenue: number;
  commissionRevenue: number;
  totalRevenue: number;
}

export const SUBSCRIPTION_PRICE = 99;
export const DEFAULT_COMMISSION_PERCENT = 15;

export const engineers: Engineer[] = [];

export const tasks: Task[] = [];

export const earningsRecords: EarningsRecord[] = [];

export function getEngineerById(id: string) {
  return engineers.find((e) => e.id === id);
}

export function getTasksByEngineer(engineerId: string) {
  return tasks.filter((t) => t.assignedTo === engineerId);
}

export function getTasksByStatus(status: TaskStatus) {
  return tasks.filter((t) => t.status === status);
}

export function getDashboardStats() {
  const activeSubscriptions = engineers.filter((e) => e.subscription.status === "active").length;
  const pendingTasks = tasks.filter((t) => t.status === "pending").length;
  const inProgressTasks = tasks.filter((t) => t.status === "in_progress").length;
  const completedTasks = tasks.filter((t) => t.status === "completed").length;
  const totalCommission = tasks.reduce((sum, t) => sum + t.platformFee, 0);
  const totalRevenue = totalCommission + engineers.reduce((sum, e) => {
    if (e.subscription.status === "active") sum += e.subscription.amount;
    return sum;
  }, 0);

  return {
    totalEngineers: engineers.length,
    activeSubscriptions,
    pendingTasks,
    inProgressTasks,
    completedTasks,
    totalTasks: tasks.length,
    totalCommission,
    totalRevenue,
  };
}
