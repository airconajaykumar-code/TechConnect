import Link from "next/link";
import AnimatedLogo from "@/components/animated-logo";
import EquipmentShowcase from "@/components/equipment-showcase";

export default function Home() {
  return (
    <main className="min-h-screen bg-orange-100 dark:bg-gray-900">
      <section className="flex flex-col items-center justify-center text-center px-6 py-24">
        <AnimatedLogo />

        <p className="mt-6 max-w-2xl text-gray-600 dark:text-gray-400 dark:text-gray-500">
          Professional Broadband, CCTV, Networking and Electrical Services
          at your doorstep.
        </p>

        <div className="mt-8 flex gap-4">
          <Link
            href="/services"
            className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 transition-colors"
          >
            Book a Service
          </Link>

          <Link
            href="/freelancers"
            className="rounded-lg border border-blue-600 px-6 py-3 text-blue-600 hover:bg-blue-50 transition-colors"
          >
            View Our Technicians
          </Link>
        </div>
        <p className="mt-6 text-sm text-gray-400 dark:text-gray-500">
          Are you a technician?{" "}
          <Link href="/freelancers" className="text-blue-600 underline hover:text-blue-700">
            Become a Technician
          </Link>
        </p>
      </section>

      <EquipmentShowcase />

      <section className="border-t border-gray-100 dark:border-gray-800 bg-white px-6 py-20 dark:bg-gray-900">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-700">
            Our Partners
          </span>
          <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-gray-100">Brands We Work With</h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400 dark:text-gray-500">
            Trusted equipment from industry-leading manufacturers
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 p-6 dark:bg-gray-800">
              <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-blue-100">
                <img src="/images/wifi-router.jpg" alt="Routers" className="h-full w-full object-cover" />
              </div>
              <h3 className="mt-4 text-base font-bold text-gray-900 dark:text-gray-100">Routers</h3>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                <span className="rounded-lg bg-white px-4 py-2 text-sm font-semibold dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-sm dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-700">TP-Link</span>
                <span className="rounded-lg bg-white px-4 py-2 text-sm font-semibold dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-sm dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-700">Tenda</span>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 p-6 dark:bg-gray-800">
              <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-purple-100">
                <img src="/images/pexels-adempercem-35544262.jpg" alt="RF Devices" className="h-full w-full object-cover" />
              </div>
              <h3 className="mt-4 text-base font-bold text-gray-900 dark:text-gray-100">RF Devices</h3>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                <span className="rounded-lg bg-white px-4 py-2 text-sm font-semibold dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-sm dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-700">MikroTik</span>
                <span className="rounded-lg bg-white px-4 py-2 text-sm font-semibold dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-sm dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-700">Ubiquiti</span>
                <span className="rounded-lg bg-white px-4 py-2 text-sm font-semibold dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-sm dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-700">LHG5</span>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 p-6 dark:bg-gray-800">
              <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-emerald-100">
                <img src="/images/pexels-asphotography-96612.jpg" alt="CCTV" className="h-full w-full object-cover" />
              </div>
              <h3 className="mt-4 text-base font-bold text-gray-900 dark:text-gray-100">CCTV</h3>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                <span className="rounded-lg bg-white px-4 py-2 text-sm font-semibold dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-sm dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-700">Hikvision</span>
                <span className="rounded-lg bg-white px-4 py-2 text-sm font-semibold dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-sm dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-700">CP Plus</span>
                <span className="rounded-lg bg-white px-4 py-2 text-sm font-semibold dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-sm dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-700">Dahua</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-100 dark:border-gray-800 bg-white px-6 py-20 dark:bg-gray-900">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-700">Quick Links</span>
          <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-gray-100">Customer Portal</h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400 dark:text-gray-500">Manage your services and payments</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <a href="/gallery" className="group rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 p-6 dark:bg-gray-800 text-left transition hover:border-blue-200 hover:bg-blue-50">
              <span className="text-3xl">🖼️</span>
              <h3 className="mt-3 font-semibold text-gray-900 dark:text-gray-100">Gallery</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 dark:text-gray-500">Our work showcase</p>
            </a>
            <a href="/payment" className="group rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 p-6 dark:bg-gray-800 text-left transition hover:border-blue-200 hover:bg-blue-50">
              <span className="text-3xl">💰</span>
              <h3 className="mt-3 font-semibold text-gray-900 dark:text-gray-100">Online Payment</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 dark:text-gray-500">Pay via UPI / GPay</p>
            </a>
            <a href="/track" className="group rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 p-6 dark:bg-gray-800 text-left transition hover:border-blue-200 hover:bg-blue-50">
              <span className="text-3xl">🔍</span>
              <h3 className="mt-3 font-semibold text-gray-900 dark:text-gray-100">Track Booking</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 dark:text-gray-500">Check booking status</p>
            </a>
            <a href="/rate" className="group rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 p-6 dark:bg-gray-800 text-left transition hover:border-blue-200 hover:bg-blue-50">
              <span className="text-3xl">⭐</span>
              <h3 className="mt-3 font-semibold text-gray-900 dark:text-gray-100">Rate Technician</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 dark:text-gray-500">Share your feedback</p>
            </a>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-white/20 dark:bg-white/5 px-4 py-1.5 text-sm font-medium text-white/90">
            Get in Touch
          </span>
          <h2 className="mt-4 text-3xl font-bold text-white">Contact Us</h2>
          <p className="mt-3 text-blue-200">
            Call or email us — we are here to help
          </p>
          <div className="mt-10 space-y-5">
            <a
              href="https://wa.me/917217357366?text=Hi%21%20I%20need%20a%20service%20from%20TechConnect."
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-4 rounded-2xl bg-white/10 dark:bg-white/5 px-8 py-5 text-lg text-white backdrop-blur-sm transition hover:bg-white/20 dark:bg-white/5"
            >
              <span className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 dark:bg-white/5 text-2xl transition group-hover:scale-110">
                <span className="absolute inset-0 animate-ping rounded-xl bg-white/20 dark:bg-white/5"></span>
                📞
              </span>
              <span className="font-semibold tracking-wide">+91 7217357366</span>
            </a>
            <a
              href="mailto:airconajaykumar@gmail.com"
              className="group flex items-center justify-center gap-4 rounded-2xl bg-white/10 dark:bg-white/5 px-8 py-5 text-lg text-white backdrop-blur-sm transition hover:bg-white/20 dark:bg-white/5"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 dark:bg-white/5 text-2xl transition group-hover:scale-110">
                ✉️
              </span>
              <span className="font-semibold tracking-wide">airconajaykumar@gmail.com</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

