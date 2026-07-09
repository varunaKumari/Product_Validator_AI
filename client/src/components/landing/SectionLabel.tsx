"use client";

import React from "react";

interface SectionLabelProps {
  number: string;
  label: string;
}

export function SectionLabel({ number, label }: SectionLabelProps) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span
        className="inline-block w-8 h-[2px] rounded-full"
        style={{ background: "linear-gradient(90deg, #9333ea, #d946ef)" }}
      />
      <span
        className="text-[11px] font-bold tracking-[0.2em] uppercase"
        style={{ color: "#9ca3af" }}
      >
        {number} — {label}
      </span>
    </div>
  );
}
