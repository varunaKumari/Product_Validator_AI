"use client";

import React from "react";

interface DarkSectionWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function DarkSectionWrapper({ children, className = "" }: DarkSectionWrapperProps) {
  return (
    <section
      className={`relative overflow-hidden ${className}`}
      style={{
        background: "linear-gradient(180deg, #0a0a0f 0%, #0f0f1a 50%, #0a0a0f 100%)",
        color: "#e5e7eb",
        /* Scoped CSS custom property overrides for dark theme */
        // @ts-expect-error CSS custom properties
        "--section-bg": "#0a0a0f",
        "--section-fg": "#e5e7eb",
        "--section-muted": "#6b7280",
        "--section-border": "rgba(124, 58, 237, 0.15)",
      }}
    >
      {/* Subtle ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 60%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </section>
  );
}
