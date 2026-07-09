"use client";

import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/cn";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  past: string;
  metric: string;
  stars: number;
  variant?: "featured" | "compact";
}

export function TestimonialCard({
  quote,
  author,
  role,
  past,
  metric,
  stars,
  variant = "compact",
}: TestimonialCardProps) {
  const initials = author
    .split(" ")
    .map((n) => n[0])
    .join("");

  if (variant === "featured") {
    return (
      <div
        className="relative rounded-3xl p-10 overflow-hidden"
        style={{
          background: "white",
          border: "1px solid rgba(124,58,237,0.1)",
          boxShadow:
            "0 4px 16px rgba(124,58,237,0.06), 0 20px 60px rgba(124,58,237,0.04)",
        }}
      >
        {/* Decorative quote mark */}
        <div
          className="absolute text-[120px] font-serif -top-2 left-6 leading-none pointer-events-none select-none"
          style={{ color: "rgba(124,58,237,0.05)" }}
        >
          &ldquo;
        </div>

        {/* Stars */}
        <div className="flex gap-1 mb-6 relative z-10">
          {Array.from({ length: stars }).map((_, i) => (
            <Star
              key={i}
              className="w-4 h-4 fill-current text-yellow-400"
            />
          ))}
        </div>

        {/* Quote */}
        <p
          className="text-lg md:text-xl font-medium leading-relaxed italic relative z-10 mb-8"
          style={{ color: "#1a1a2e" }}
        >
          &ldquo;{quote}&rdquo;
        </p>

        {/* Author */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 relative z-10"
          style={{ borderTop: "1px solid rgba(124,58,237,0.06)" }}
        >
          <div className="flex items-center gap-3.5">
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm text-white"
              style={{
                background: "linear-gradient(135deg, #9333ea, #d946ef)",
              }}
            >
              {initials}
            </div>
            <div>
              <h4 className="font-bold text-sm" style={{ color: "#1a1a2e" }}>
                {author}
              </h4>
              <p className="text-[10px]" style={{ color: "#6b6280" }}>
                {role} — {past}
              </p>
            </div>
          </div>
          <div
            className="px-3 py-1.5 rounded-lg text-xs font-bold"
            style={{
              background: "#f0fdf4",
              color: "#10b981",
              border: "1px solid rgba(16,185,129,0.1)",
            }}
          >
            {metric}
          </div>
        </div>
      </div>
    );
  }

  // Compact variant
  return (
    <div
      className="rounded-2xl p-6 flex flex-col justify-between transition-all hover:-translate-y-1"
      style={{
        background: "white",
        border: "1px solid rgba(124,58,237,0.06)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.03), 0 8px 24px rgba(124,58,237,0.04)",
      }}
    >
      <div>
        {/* Stars */}
        <div className="flex gap-0.5 mb-4">
          {Array.from({ length: stars }).map((_, i) => (
            <Star
              key={i}
              className="w-3.5 h-3.5 fill-current text-yellow-400"
            />
          ))}
        </div>

        {/* Quote */}
        <p
          className="text-sm leading-relaxed italic mb-6"
          style={{ color: "#374151" }}
        >
          &ldquo;{quote}&rdquo;
        </p>
      </div>

      {/* Author */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs text-white"
            style={{
              background: "linear-gradient(135deg, #9333ea, #d946ef)",
            }}
          >
            {initials}
          </div>
          <div>
            <h4 className="font-bold text-xs" style={{ color: "#1a1a2e" }}>
              {author}
            </h4>
            <p className="text-[10px]" style={{ color: "#6b6280" }}>
              {role}
            </p>
          </div>
        </div>
        <div
          className="px-2.5 py-1 rounded-md text-[10px] font-bold"
          style={{
            background: "#f0fdf4",
            color: "#10b981",
            border: "1px solid rgba(16,185,129,0.1)",
          }}
        >
          {metric}
        </div>
      </div>
    </div>
  );
}
