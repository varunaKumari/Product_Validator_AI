"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, type LucideIcon } from "lucide-react";
import Link from "next/link";

interface ToolCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  credits: string;
  value: string;
  hasLink?: boolean;
  slug?: string;
  onActivate?: () => void;
}

export function ToolCard({
  icon: Icon,
  title,
  description,
  credits,
  value,
  hasLink = false,
  slug,
  onActivate,
}: ToolCardProps) {
  const handleActivate = () => {
    if (onActivate) {
      onActivate();
    }
  };

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative rounded-2xl p-6 flex flex-col justify-between overflow-hidden h-full"
      style={{
        background: "white",
        border: "1px solid rgba(124, 58, 237, 0.06)",
        boxShadow:
          "0 1px 3px rgba(0,0,0,0.03), 0 8px 24px rgba(124,58,237,0.04)",
      }}
    >
      <div>
        {/* Header: icon + pill tags */}
        <div className="flex items-center justify-between mb-5">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{ background: "#f3f0ff" }}
          >
            <Icon className="w-5 h-5" style={{ color: "#7c3aed" }} />
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-wider">
            <span
              className="px-2.5 py-1 rounded-md"
              style={{ background: "#f0edf5", color: "#6b6280" }}
            >
              {credits}
            </span>
            <span
              className="px-2.5 py-1 rounded-md"
              style={{
                background: "#f3f0ff",
                color: "#7c3aed",
                border: "1px solid rgba(124,58,237,0.1)",
              }}
            >
              {value}
            </span>
          </div>
        </div>

        {/* Tool name */}
        <h3
          className="text-base font-bold mb-2 flex items-center gap-1.5 group-hover:text-purple-600 transition-colors"
          style={{ color: "#1a1a2e" }}
        >
          <span>{title}</span>
          {hasLink && (
            <ArrowUpRight
              className="w-3.5 h-3.5 shrink-0"
              style={{ color: "#a78bfa" }}
            />
          )}
        </h3>

        {/* Description */}
        <p
          className="text-xs leading-relaxed mb-5"
          style={{ color: "#6b6280" }}
        >
          {description}
        </p>
      </div>

      {/* CTA Button */}
      {slug ? (
        <Link
          href={slug}
          className="w-full text-center py-2.5 rounded-xl text-xs font-semibold transition-all hover:bg-purple-100 active:scale-[0.98]"
          style={{
            background: "#f3f0ff",
            color: "#7c3aed",
            border: "1px solid rgba(124,58,237,0.08)",
          }}
        >
          Activate Generator
        </Link>
      ) : (
        <button
          onClick={handleActivate}
          className="w-full text-center py-2.5 rounded-xl text-xs font-semibold transition-all hover:bg-purple-100 active:scale-[0.98] cursor-pointer"
          style={{
            background: "#f3f0ff",
            color: "#7c3aed",
            border: "1px solid rgba(124,58,237,0.08)",
          }}
        >
          Activate Generator
        </button>
      )}
    </motion.div>
  );
}
