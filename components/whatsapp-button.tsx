"use client";

const PHONE = "917217357366";

export function getWhatsAppUrl(message: string) {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
}

export default function WhatsAppButton() {
  return (
    <a
      href={getWhatsAppUrl("Hi! I need a service from TechConnect.")}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 shadow-lg dark:shadow-gray-900/50 transition hover:bg-green-600 hover:scale-110 hover:shadow-xl"
    >
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-30" />
      <svg viewBox="0 0 32 32" className="relative h-7 w-7 fill-white">
        <path d="M16 2C8.2 2 2 8.2 2 16c0 3.1 1 6 2.7 8.4L2.5 29.5l5.3-2.1C10.1 29 13 30 16 30c7.8 0 14-6.2 14-14S23.8 2 16 2zm0 25.5c-2.7 0-5.2-.9-7.2-2.4l-.5-.4-3.3 1.3 1.3-3.2-.4-.5C4.7 20.2 4 18 4 16 4 9.4 9.4 4 16 4s12 5.4 12 12-5.4 12-12 12zm6.6-9.2c-.4-.2-2.2-1.1-2.5-1.2-.3-.1-.6-.2-.8.2-.2.4-.9 1.2-1.1 1.4-.2.2-.4.3-.8.1-.4-.2-1.6-.6-3-1.9-1.1-1-1.9-2.2-2.1-2.6-.2-.4 0-.6.2-.8.2-.2.4-.4.5-.7.1-.2.2-.4.1-.6-.1-.2-.5-1.2-.7-1.6-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1 2.9 1.2 3.1c.2.2 2 3.1 4.9 4.3.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.8-.7 2.1-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.3-.7-.5z"/>
      </svg>
    </a>
  );
}
