"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NOTIFICATIONS = [
  { text: "Someone just validated an idea", time: "2 minutes ago" },
  { text: "A founder in Berlin got an 87% score", time: "5 minutes ago" },
  { text: "Sarah from London purchased Builder Pack", time: "8 minutes ago" },
  { text: "Priya ran a competitor landscape scan", time: "3 minutes ago" },
  { text: "David validated a FinTech concept", time: "12 minutes ago" },
  { text: "Elena just exported her PDF report", time: "Just now" },
];

export function SocialProofToast() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % NOTIFICATIONS.length);
        setIsVisible(true);
      }, 500);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const notification = NOTIFICATIONS[currentIndex];

  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-xs pointer-events-none">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
            className="pointer-events-auto flex items-center gap-3 p-4 rounded-2xl shadow-xl"
            style={{
              background: "white",
              border: "1px solid rgba(16,185,129,0.15)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
            }}
          >
            {/* Pulsing dot */}
            <div className="relative flex h-3 w-3 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p
                className="text-xs font-semibold truncate"
                style={{ color: "#1a1a2e" }}
              >
                {notification.text}
              </p>
              <p className="text-[10px] mt-0.5" style={{ color: "#6b6280" }}>
                {notification.time}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
