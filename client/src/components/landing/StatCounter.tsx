"use client";

import React, { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

interface StatCounterProps {
  end: number;
  label: string;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function StatCounter({
  end,
  label,
  prefix = "",
  suffix = "",
  duration = 2000,
  className = "",
}: StatCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!inView || hasStarted.current) return;
    hasStarted.current = true;

    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, end, duration]);

  return (
    <div ref={ref} className={`flex flex-col items-center text-center ${className}`}>
      <span className="text-4xl md:text-5xl font-black tracking-tight" style={{ color: "inherit" }}>
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </span>
      <span
        className="text-[11px] uppercase tracking-[0.15em] font-semibold mt-2"
        style={{ color: "#9ca3af" }}
      >
        {label}
      </span>
    </div>
  );
}
