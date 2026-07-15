"use client";

import { useEffect, useState } from "react";

const WORDS = ["TechConnect", "Your Local Tech Partner"];

export default function AnimatedLogo() {
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % WORDS.length);
        setShow(true);
      }, 400);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        <div className="animate-pulse-glow absolute inset-0 rounded-full bg-orange-400/20 blur-xl" />
        <div className="animate-bounce-slow relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-blue-500 shadow-lg shadow-orange-500/30">
          <span className="text-4xl">🔧</span>
        </div>
      </div>

      <h1 className="mt-4 bg-gradient-to-r from-orange-500 via-orange-600 to-blue-600 bg-clip-text text-6xl font-extrabold text-transparent animate-gradient-x">
        TechConnect
      </h1>

      <div className="h-8 overflow-hidden">
        <p
          className={`text-lg font-medium text-gray-600 dark:text-gray-400 transition-all duration-500 ${
            show ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          {index === 0 ? "Professional Services at Your Doorstep" : "Trusted Since 2025"}
        </p>
      </div>
    </div>
  );
}
