"use client";

import React from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

interface PricingCardProps {
  tier: string;
  tagline: string;
  description: string;
  price: string;
  period: string;
  credits: string;
  features: string[];
  cta: string;
  popular?: boolean;
}

export function PricingCard({
  tier,
  tagline,
  description,
  price,
  period,
  credits,
  features,
  cta,
  popular = false,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300",
        popular
          ? "scale-[1.04] z-10 hover:scale-[1.06]"
          : "hover:scale-[1.02]"
      )}
      style={
        popular
          ? {
              background: "#0a0a0f",
              border: "2px solid #7c3aed",
              boxShadow:
                "0 0 60px rgba(124,58,237,0.15), 0 20px 60px rgba(0,0,0,0.3)",
            }
          : {
              background: "white",
              border: "1px solid rgba(124,58,237,0.06)",
              boxShadow:
                "0 1px 3px rgba(0,0,0,0.03), 0 8px 24px rgba(124,58,237,0.04)",
            }
      }
    >
      {/* Popular badge */}
      {popular && (
        <div
          className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-white text-[9px] uppercase font-black tracking-widest px-5 py-1.5 rounded-full"
          style={{
            background: "linear-gradient(135deg, #9333ea, #d946ef)",
          }}
        >
          Most Popular
        </div>
      )}

      <div>
        {/* Tier name */}
        <h3
          className="text-xs uppercase tracking-wider font-bold"
          style={{ color: popular ? "#a78bfa" : "#9ca3af" }}
        >
          {tier}
        </h3>

        {/* Tagline */}
        <p
          className="font-extrabold text-lg mt-1"
          style={{ color: popular ? "#ffffff" : "#1a1a2e" }}
        >
          {tagline}
        </p>

        {/* Description */}
        <p
          className="text-[10px] mt-2"
          style={{ color: popular ? "#6b7280" : "#6b6280" }}
        >
          {description}
        </p>

        {/* Price */}
        <div className="flex items-baseline my-6">
          <span
            className="text-4xl font-extrabold"
            style={{ color: popular ? "#ffffff" : "#1a1a2e" }}
          >
            {price}
          </span>
          <span
            className="text-xs ml-2"
            style={{ color: popular ? "#6b7280" : "#6b6280" }}
          >
            {period}
          </span>
        </div>

        {/* Credits */}
        <p
          className="text-[10px] font-semibold mb-6"
          style={{ color: popular ? "#a78bfa" : "#6b6280" }}
        >
          {credits}
        </p>

        {/* Features */}
        <ul
          className="space-y-3 mb-8 text-xs pt-5"
          style={{
            borderTop: popular
              ? "1px solid rgba(124,58,237,0.2)"
              : "1px solid rgba(124,58,237,0.06)",
            color: popular ? "#e5e7eb" : "#6b6280",
          }}
        >
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-3">
              <Check
                className="w-4 h-4 shrink-0 mt-0.5"
                style={{ color: popular ? "#a78bfa" : "#7c3aed" }}
              />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <Link
        href="/signup"
        className="w-full text-center py-3.5 px-4 rounded-xl text-sm font-bold transition-all block"
        style={
          popular
            ? {
                background: "linear-gradient(135deg, #9333ea, #d946ef)",
                color: "white",
                boxShadow: "0 4px 20px rgba(124,58,237,0.35)",
              }
            : {
                background: "#f3f0ff",
                color: "#7c3aed",
                border: "1px solid rgba(124,58,237,0.1)",
              }
        }
      >
        {cta}
      </Link>
    </div>
  );
}
