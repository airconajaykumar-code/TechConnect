export default function EquipmentShowcase() {
  const items = [
    {
      title: "Point to Point Wireless",
      emoji: "📡",
      desc: "Long-range wireless bridges for high-speed connectivity between buildings and remote locations",
      gradient: "from-blue-500 to-blue-700",
      bgGlow: "bg-blue-500/10",
      image: "/images/pexels-dextarvision-15483316.jpg",
    },
    {
      title: "CCTV Camera",
      emoji: "📹",
      desc: "HD security cameras with night vision, DVR/NVR setup for 24/7 monitoring",
      gradient: "from-emerald-500 to-emerald-700",
      bgGlow: "bg-emerald-500/10",
      image: "/images/pexels-asphotography-96612.jpg",
    },
    {
      title: "Optical Fiber Cable",
      emoji: "💡",
      desc: "High-speed optical fiber cable for ultra-fast broadband and data transmission using light signals",
      gradient: "from-orange-500 to-orange-700",
      bgGlow: "bg-orange-500/10",
      image: "/images/pexels-brett-sayles-4682189.jpg",
    },
    {
      title: "Networking Gear",
      emoji: "⚙️",
      desc: "Enterprise-grade routers, switches, and accessories for reliable connectivity",
      gradient: "from-purple-500 to-purple-700",
      bgGlow: "bg-purple-500/10",
      image: "/images/pexels-vladimirsrajber-13963756.jpg",
    },
    {
      title: "WiFi Router",
      emoji: "📶",
      desc: "Dual-band WiFi 6 routers for seamless internet across your home or office",
      gradient: "from-cyan-500 to-cyan-700",
      bgGlow: "bg-cyan-500/10",
      image: "/images/wifi-router.jpg",
    },
    {
      title: "Smart Devices",
      emoji: "🏠",
      desc: "Smart home automation, IoT devices, and voice assistant integration",
      gradient: "from-rose-500 to-rose-700",
      bgGlow: "bg-rose-500/10",
      image: "/images/pexels-jakubzerdzicki-21284445.jpg",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-orange-50 to-white px-6 py-24 dark:from-gray-900 dark:to-gray-900">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <span className="inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-700">
            Our Infrastructure
          </span>
          <h2 className="mt-4 text-4xl font-bold text-gray-900 dark:text-gray-100">
            Equipment & Technology
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            We use industry-grade equipment to deliver reliable and professional services
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <div
              key={item.title}
              className="group relative overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800 bg-white p-8 shadow-sm dark:shadow-gray-900/50 transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-900/50 hover:-translate-y-1 dark:bg-gray-800"
            >
              {/* Glow background */}
              <div
                className={`absolute -right-10 -top-10 h-40 w-40 rounded-full ${item.bgGlow} blur-3xl transition-all duration-500 group-hover:scale-150`}
              />

              {/* Icon */}
              <div
                className={`relative flex h-20 w-20 items-center justify-center rounded-2xl ${item.image ? "overflow-hidden" : `bg-gradient-to-br ${item.gradient}`} shadow-lg dark:shadow-gray-900/50`}
              >
                {item.image ? (
                  <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                ) : (
                  <span className="text-4xl">{item.emoji}</span>
                )}
              </div>

              {/* Content */}
              <div className="relative mt-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-gray-500 dark:text-gray-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
