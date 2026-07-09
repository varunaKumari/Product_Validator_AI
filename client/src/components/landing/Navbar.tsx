"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ChevronDown,
  ArrowUpRight,
  Menu,
  X,
  Search,
} from "lucide-react";

const NAV_ITEMS = [
  {
    label: "Validate",
    highlighted: true,
    children: [
      { label: "Idea Validator", href: "/dashboard" },
      { label: "Competitor Scans", href: "/dashboard" },
      { label: "Market Size Est.", href: "/dashboard" },
    ],
  },
  {
    label: "Learn",
    children: [
      { label: "How It Works", href: "#how-it-works" },
      { label: "Failure Atlas", href: "#knowledge-library" },
      { label: "Founder Resources", href: "#knowledge-library" },
    ],
  },
  {
    label: "Free Tools",
    children: [
      { label: "LTV Calculator", href: "#knowledge-library" },
      { label: "Runway Calculator", href: "#knowledge-library" },
      { label: "Valuation Calculator", href: "#knowledge-library" },
    ],
  },
  {
    label: "Pricing",
    href: "#pricing",
  },
  {
    label: "Search",
    isSearch: true,
  },
];

export function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-6xl">
      <nav
        className="rounded-full px-4 md:px-6 h-14 flex items-center justify-between"
        style={{
          background: "rgba(255,255,255,0.78)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(124,58,237,0.08)",
          boxShadow:
            "0 4px 24px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.02)",
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #9333ea, #d946ef)",
            }}
          >
            <Check className="w-4 h-4 stroke-[3] text-white" />
          </div>
          <span className="font-extrabold text-[15px] tracking-tight hidden sm:block">
            <span style={{ color: "#1a1a2e" }}>Product</span>
            <span style={{ color: "#7c3aed" }}>Validator</span>
            <span style={{ color: "#1a1a2e" }}> AI</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div
          className="hidden md:flex items-center gap-1 text-[13px] font-medium"
          style={{ color: "#6b6280" }}
        >
          {NAV_ITEMS.map((item) => {
            if (item.isSearch) {
              return (
                <button
                  key="search"
                  className="p-2 rounded-full hover:bg-purple-50 transition-colors cursor-pointer"
                  aria-label="Search"
                >
                  <Search className="w-4 h-4" style={{ color: "#6b6280" }} />
                </button>
              );
            }

            if (item.children) {
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setActiveMenu(item.label)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <button
                    className="flex items-center gap-1 px-3 py-2 rounded-full hover:bg-purple-50 transition-colors cursor-pointer"
                    style={
                      item.highlighted
                        ? { color: "#7c3aed", fontWeight: 600 }
                        : {}
                    }
                  >
                    <span>{item.label}</span>
                    <ChevronDown className="w-3 h-3" />
                  </button>

                  <AnimatePresence>
                    {activeMenu === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-2 w-52 p-3 rounded-xl bg-white shadow-xl flex flex-col gap-1 z-50"
                        style={{
                          border: "1px solid rgba(124,58,237,0.08)",
                        }}
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="flex items-center justify-between px-3 py-2 rounded-lg text-xs hover:bg-purple-50 transition-colors"
                            style={{ color: "#6b6280" }}
                          >
                            <span>{child.label}</span>
                            <ArrowUpRight className="w-3 h-3 opacity-50" />
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <a
                key={item.label}
                href={item.href}
                className="px-3 py-2 rounded-full hover:bg-purple-50 transition-colors"
              >
                {item.label}
              </a>
            );
          })}
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="text-[13px] font-medium px-3 py-2 transition-colors hidden sm:block"
            style={{ color: "#6b6280" }}
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="text-[13px] font-semibold text-white px-5 py-2 rounded-full transition-all hover:scale-[1.03] active:scale-[0.97]"
            style={{
              background: "linear-gradient(135deg, #9333ea, #d946ef)",
              boxShadow: "0 4px 14px rgba(124,58,237,0.3)",
            }}
          >
            Get Report
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-full hover:bg-purple-50 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" style={{ color: "#1a1a2e" }} />
            ) : (
              <Menu className="w-5 h-5" style={{ color: "#1a1a2e" }} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="md:hidden mt-2 rounded-2xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(124,58,237,0.08)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
            }}
          >
            <div className="p-4 flex flex-col gap-1 text-sm font-medium" style={{ color: "#6b6280" }}>
              {NAV_ITEMS.filter((n) => !n.isSearch).map((item) => {
                if (item.children) {
                  return (
                    <div key={item.label} className="flex flex-col">
                      <span
                        className="px-3 py-2 text-xs uppercase tracking-wider font-bold"
                        style={{ color: "#9ca3af" }}
                      >
                        {item.label}
                      </span>
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="px-3 py-2 rounded-lg hover:bg-purple-50 transition-colors text-sm"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  );
                }
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-3 py-2 rounded-lg hover:bg-purple-50 transition-colors"
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
