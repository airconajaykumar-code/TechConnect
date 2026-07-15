import type { Task } from "./data";

export function getWhatsAppLink(phone: string, task: Task): string {
  const message = encodeURIComponent(
    `📋 *New Task Assigned!*\n\n` +
    `*Title:* ${task.title}\n` +
    `*Description:* ${task.description}\n\n` +
    `*Customer Details:*\n` +
    `👤 Name: ${task.customerName}\n` +
    `📞 Phone: ${task.customerPhone}\n` +
    `📍 Address: ${task.customerAddress}\n\n` +
    `*Pricing:*\n` +
    `💰 Total Amount: ₹${task.amount}\n` +
    `📋 Commission: ₹${task.platformFee}\n` +
    `💵 Your Payout: ₹${task.engineerPayout}\n\n` +
    `Please contact the customer and start the work. ✅`
  );

  const cleanPhone = phone.replace(/[\s+\-()]/g, "");
  return `https://wa.me/${cleanPhone}?text=${message}`;
}
