"use client";

import React, { useState } from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  defaultOpen?: number;
}

export function FAQAccordion({ items, defaultOpen = 0 }: FAQAccordionProps) {
  // Split items into two columns
  const mid = Math.ceil(items.length / 2);
  const col1 = items.slice(0, mid);
  const col2 = items.slice(mid);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FAQColumn items={col1} startIndex={0} defaultOpen={defaultOpen} />
      <FAQColumn items={col2} startIndex={mid} defaultOpen={defaultOpen} />
    </div>
  );
}

function FAQColumn({
  items,
  startIndex,
  defaultOpen,
}: {
  items: FAQItem[];
  startIndex: number;
  defaultOpen: number;
}) {
  const defaultValue =
    defaultOpen >= startIndex && defaultOpen < startIndex + items.length
      ? `item-${defaultOpen}`
      : undefined;

  return (
    <AccordionPrimitive.Root
      type="single"
      collapsible
      defaultValue={defaultValue}
      className="flex flex-col gap-3"
    >
      {items.map((faq, idx) => {
        const globalIndex = startIndex + idx;
        return (
          <AccordionPrimitive.Item
            key={globalIndex}
            value={`item-${globalIndex}`}
            className="rounded-2xl overflow-hidden transition-all"
            style={{
              background: "white",
              border: "1px solid rgba(124,58,237,0.06)",
            }}
          >
            <AccordionPrimitive.Trigger className="w-full text-left p-5 flex items-center justify-between text-sm font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 transition-all group cursor-pointer"
              style={{ color: "#1a1a2e" }}
            >
              <span className="pr-4">{faq.question}</span>
              <ChevronDown
                className="w-4 h-4 shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-180"
                style={{ color: "#9ca3af" }}
              />
            </AccordionPrimitive.Trigger>

            <AccordionPrimitive.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
              <div
                className="px-5 pb-5 text-xs leading-relaxed pt-2"
                style={{
                  color: "#6b6280",
                  borderTop: "1px solid rgba(124,58,237,0.04)",
                }}
              >
                {faq.answer}
              </div>
            </AccordionPrimitive.Content>
          </AccordionPrimitive.Item>
        );
      })}
    </AccordionPrimitive.Root>
  );
}
