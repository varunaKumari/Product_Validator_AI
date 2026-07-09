"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Check,
  Shield,
  Zap,
  Sparkles,
  BarChart2,
  Users,
  FileText,
  Search,
  Star,
  Target,
  Compass,
  Globe,
  TrendingUp,
  Mail,
  Lock,
  Briefcase,
  Award,
  Volume2,
  RefreshCw,
  Layers,
  Eye,
  Activity,
  Radio,
  AlertTriangle,
  Database,
  Calculator,
  BookOpen,
  ChevronRight,
} from "lucide-react";

import { Navbar } from "@/components/landing/Navbar";
import { SectionLabel } from "@/components/landing/SectionLabel";
import { ToolCard } from "@/components/landing/ToolCard";
import { StatCounter } from "@/components/landing/StatCounter";
import { TestimonialCard } from "@/components/landing/TestimonialCard";
import { PricingCard } from "@/components/landing/PricingCard";
import { FAQAccordion } from "@/components/landing/FAQAccordion";
import { SocialProofToast } from "@/components/landing/SocialProofToast";
import { DarkSectionWrapper } from "@/components/landing/DarkSectionWrapper";
import { cn } from "@/lib/cn";

/* ───────────────────────────── animation variants ───────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
} as const;

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 },
  },
};

/* ───────────────────────────── data arrays ───────────────────────────────────── */

const GENERATORS = [
  {
    icon: BarChart2,
    name: "Idea Validator",
    description: "AI-powered viability scoring with GO/NO-GO verdicts.",
    credits: "40cr",
    value: "$500+",
    hasLink: true,
    slug: "/dashboard",
  },
  {
    icon: Search,
    name: "Market Analysis",
    description:
      "TAM/SAM/SOM sizing with competitor matrix and demand signals.",
    credits: "100cr",
    value: "$5,000+",
    hasLink: true,
    slug: "/dashboard",
  },
  {
    icon: Sparkles,
    name: "Idea Generator",
    description:
      "Generate validated startup ideas from trends and industry gaps.",
    credits: "10cr",
    value: "priceless",
    hasLink: false,
  },
  {
    icon: Target,
    name: "Brand Strategy",
    description: "AI brand archetype — voice, mission, UVP, and positioning.",
    credits: "50cr",
    value: "$5,000+",
    hasLink: true,
    slug: "/dashboard",
  },
  {
    icon: Compass,
    name: "Logo Generator",
    description:
      "AI logo design — color palette, typography, and brand marks.",
    credits: "150cr",
    value: "$2,000+",
    hasLink: true,
    slug: "/dashboard",
  },
  {
    icon: Globe,
    name: "Visual Identity",
    description:
      "Complete visual identity system — mockups, templates, and design tokens.",
    credits: "150cr",
    value: "$8,000+",
    hasLink: true,
    slug: "/dashboard",
  },
  {
    icon: Users,
    name: "Customer Personas",
    description:
      "Deep ICP profiling with pain points, behaviors, and demographics.",
    credits: "30cr",
    value: "$1,500+",
    hasLink: false,
  },
  {
    icon: Layers,
    name: "SWOT Analysis",
    description:
      "Structured strengths, weaknesses, opportunities, and threats breakdown.",
    credits: "25cr",
    value: "$1,000+",
    hasLink: false,
  },
  {
    icon: Zap,
    name: "MVP Recommendations",
    description:
      "Feature prioritization matrix and minimum viable scope definition.",
    credits: "35cr",
    value: "$2,000+",
    hasLink: false,
  },
  {
    icon: TrendingUp,
    name: "GTM Strategy",
    description:
      "Go-to-market playbook with channel mix, messaging, and launch timeline.",
    credits: "60cr",
    value: "$3,000+",
    hasLink: true,
    slug: "/dashboard",
  },
  {
    icon: AlertTriangle,
    name: "Risk Assessment",
    description:
      "Comprehensive risk matrix with mitigation strategies and scoring.",
    credits: "20cr",
    value: "$800+",
    hasLink: false,
  },
  {
    icon: RefreshCw,
    name: "Business Name Generator",
    description:
      "AI name generator with instant domain availability checks.",
    credits: "5cr",
    value: "$500+",
    hasLink: false,
  },
  {
    icon: Briefcase,
    name: "Lean Canvas Builder",
    description:
      "Complete 9-block lean canvas with validated startup framework.",
    credits: "15cr",
    value: "$1,500+",
    hasLink: false,
  },
];

const TESTIMONIALS = [
  {
    quote:
      "I killed two bad ideas in a single afternoon and saved myself four months of building the wrong thing. Best investment I have ever made.",
    author: "Marco D.",
    role: "Solo founder",
    past: "ex-Stripe",
    metric: "4 mo saved",
    stars: 5,
  },
  {
    quote:
      "The competitor landscape scan identified a massive market gap in localized delivery integrations we completely missed.",
    author: "Elena R.",
    role: "Co-founder",
    past: "B2B SaaS",
    metric: "$180k raised",
    stars: 5,
  },
  {
    quote:
      "We generated a structured pitch deck outline that booked our first three angel investor meetings within 48 hours.",
    author: "Jordan K.",
    role: "Founder",
    past: "FinTech Hub",
    metric: "3 VCs booked",
    stars: 5,
  },
  {
    quote:
      "The SWOT analysis alone was worth the price. It showed us risks our team had been blind to for months.",
    author: "Aisha M.",
    role: "CTO",
    past: "HealthTech",
    metric: "$45k saved",
    stars: 5,
  },
];

const FAQS = [
  {
    question: "Is this just ChatGPT with a wrapper?",
    answer:
      "No. Product Validator AI orchestrates multiple models and runs real-time live scrapers across Reddit, Product Hunt, App Store, and search networks to fetch fresh market signals. ChatGPT alone cannot access live market data or generate structured validation reports with scoring matrices.",
  },
  {
    question: "How does the AI validation actually work?",
    answer:
      "When you submit your idea, we launch concurrent background crawlers to check for competitors and consumer sentiment. We feed this live data into our business model scoring matrix to calculate a validation score, risk flags, and a clear GO/NO-GO verdict.",
  },
  {
    question: "What do I get with the free credits?",
    answer:
      "Your free credits are enough to run a full idea validation, including competitor matrices, market sizing estimates, and a downloadable PDF report.",
  },
  {
    question: "Do credits expire?",
    answer:
      "No. Any credits you purchase or receive upon signup remain valid for 12 months from the date they are credited to your account.",
  },
  {
    question: "Can I export the reports?",
    answer:
      "Yes. All reports can be downloaded as professional vector PDFs that are print-ready and formatted for sharing with investors, advisors, and co-founders.",
  },
  {
    question: "Who owns the generated output?",
    answer:
      "You do. You retain 100% intellectual property ownership over all generated briefs, ideas, strategies, plans, and visual assets. We claim zero rights to your content.",
  },
];

const PRICING_TIERS = [
  {
    tier: "Starter",
    tagline: "Validate Before You Build",
    description: "Founders exploring a single idea",
    price: "€19.99",
    period: "/ one-time",
    credits: "150 credits • 12-month validity",
    features: [
      "1 deep AI Validation + Market Analysis",
      "TAM / SAM / SOM sizing",
      "Competitor map + Risk flags",
      "Viability score + GO/NO-GO signal",
      "PDF export — investor ready",
    ],
    cta: "Start Validating",
    popular: false,
  },
  {
    tier: "Builder",
    tagline: "Know What To Build Next",
    description: "Founders ready to commit to one idea",
    price: "€49.99",
    period: "/ one-time",
    credits: "700 credits • 12-month validity",
    features: [
      "2 Validations + 1 Market Analysis",
      "1 Investor-Ready Business Plan",
      "Brand Strategy + Visual Identity",
      "Full Marketing Suite",
      "ICP persona + GTM messaging",
    ],
    cta: "Get The Full Toolkit",
    popular: true,
  },
  {
    tier: "Founder",
    tagline: "Go From Idea to Launch",
    description: "Founders ready to launch and scale",
    price: "€99.99",
    period: "/ one-time",
    credits: "1500 credits • 12-month validity",
    features: [
      "5 Validations + 3 Market Analyses",
      "2 Investor-Ready Business Plans",
      "Brand Strategy + AI Visual Identity",
      "2× Marketing Suite (all platforms)",
      "GTM Strategy + Landing Page messaging",
    ],
    cta: "Launch My Startup",
    popular: false,
  },
];

const LIVE_INTEL_FEATURES = [
  "Real-time competitor monitoring across 12+ data sources",
  "Automated demand signal detection from Reddit, Twitter, and forums",
  "Weekly market shift alerts delivered to your dashboard",
  "Trend velocity scoring with confidence intervals",
  "Patent and trademark filing watchers",
  "Pricing intelligence across competitor landscapes",
];

/* ───────────────────────────── helper sub-components ─────────────────────────── */

function AnimatedSection({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
    >
      {children}
    </motion.section>
  );
}

/* ───────────────────────────── page component ───────────────────────────────── */

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setEmailSubmitted(true);
    }
  };

  return (
    <>
      <Navbar />
      <SocialProofToast />

      <main className="overflow-x-hidden">
        {/* ─────────────── 01 · HERO ─────────────── */}
        <section className="relative pt-32 pb-20 gradient-bg-hero">
          {/* ambient blobs */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div
              className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full opacity-30 blur-[120px] animate-morph animate-pulse-glow"
              style={{
                background:
                  "radial-gradient(circle, #a78bfa 0%, #7c3aed 40%, transparent 70%)",
              }}
            />
            <div
              className="absolute top-20 right-0 w-[350px] h-[350px] rounded-full opacity-20 blur-[100px] animate-morph animate-pulse-glow"
              style={{
                background:
                  "radial-gradient(circle, #d946ef 0%, #a855f7 40%, transparent 70%)",
                animationDelay: "2s",
              }}
            />
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full opacity-15 blur-[140px] animate-morph"
              style={{
                background:
                  "radial-gradient(circle, #6366f1 0%, #8b5cf6 40%, transparent 70%)",
                animationDelay: "4s",
              }}
            />
          </div>

          <motion.div
            className="relative max-w-5xl mx-auto px-6 text-center"
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            <SectionLabel number="01" label="IDEA VALIDATION" />

            <h1 className="mt-6 text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.08]" style={{ color: "#1a1a2e" }}>
              Validate Before You Build.
              <br />
              <span className="gradient-text italic">
                Kill bad ideas in 2&nbsp;minutes.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl mx-auto text-lg" style={{ color: "#6b6280" }}>
              Product Validator AI runs live market scrapers, competitor scans,
              and AI scoring models so you can get a GO/NO-GO verdict before
              writing a single line of code.
            </p>

            <div className="mt-10 flex flex-col items-center gap-5">
              <Link
                href="/signup"
                className="gradient-cta inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-semibold text-white shadow-lg shadow-purple-500/20 transition-transform hover:scale-[1.03] active:scale-[0.98]"
              >
                Start Free Validation
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* trust badge */}
              <span className="inline-flex items-center gap-2 text-xs font-medium" style={{ color: "#6b6280" }}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                All Systems Operational
              </span>
            </div>

            {/* social proof avatars */}
            <div className="mt-12 flex flex-col items-center gap-3">
              <div className="flex items-center -space-x-2">
                {[
                  { bg: "#7c3aed", initials: "MD" },
                  { bg: "#d946ef", initials: "ER" },
                  { bg: "#6366f1", initials: "JK" },
                  { bg: "#a855f7", initials: "AM" },
                ].map((a, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold text-white ring-2 ring-white"
                    style={{ backgroundColor: a.bg }}
                  >
                    {a.initials}
                  </div>
                ))}
                <div className="ml-3 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              </div>
              <p className="text-xs font-medium" style={{ color: "#6b6280" }}>
                57,000+ Ideas Validated
              </p>
            </div>
          </motion.div>
        </section>

        {/* ─────────────── 03 · TOOLS GRID ─────────────── */}
        <AnimatedSection id="tools" className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-14">
              <SectionLabel number="03" label="AI GENERATORS" />
              <h2 className="mt-4 text-3xl md:text-5xl font-extrabold tracking-tight" style={{ color: "#1a1a2e" }}>
                13 specialist tools.{" "}
                <span className="gradient-text italic">
                  One unified brand.
                </span>
              </h2>
              <p className="mt-4 text-sm max-w-xl mx-auto" style={{ color: "#6b6280" }}>
                From idea to launch — generate everything you need without
                paying agency fees.
              </p>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
            >
              {GENERATORS.map((gen, i) => (
                <motion.div key={i} variants={staggerItem}>
                  <ToolCard
                    icon={gen.icon}
                    title={gen.name}
                    description={gen.description}
                    credits={gen.credits}
                    value={gen.value}
                    hasLink={gen.hasLink}
                    slug={gen.slug}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>

        {/* ─────────────── 04 · STATS BAR ─────────────── */}
        <AnimatedSection className="py-16">
          <div
            className="rounded-3xl mx-4 md:mx-auto max-w-6xl px-8 py-14"
            style={{
              background:
                "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 40%, #fae8ff 100%)",
            }}
          >
            <div className="text-center mb-10">
              <SectionLabel number="04" label="NUMBERS WE STAND BEHIND" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <StatCounter end={57042} suffix="+" label="Founders Served" />
              </div>
              <div className="flex flex-col items-center justify-center">
                <span className="text-3xl md:text-4xl font-extrabold tracking-tight" style={{ color: "#1a1a2e" }}>
                  $2.3M+
                </span>
                <span className="mt-1 text-sm font-medium" style={{ color: "#6b6280" }}>
                  Money Influenced
                </span>
              </div>
              <div>
                <StatCounter end={89} suffix="%" label="Validation Accuracy" />
              </div>
              <div className="flex flex-col items-center justify-center">
                <span className="text-3xl md:text-4xl font-extrabold tracking-tight" style={{ color: "#1a1a2e" }}>
                  1.2M+
                </span>
                <span className="mt-1 text-sm font-medium" style={{ color: "#6b6280" }}>
                  Data Points Analyzed
                </span>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* ─────────────── 05 · KNOWLEDGE LIBRARY ─────────────── */}
        <AnimatedSection className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-14">
              <SectionLabel number="05" label="KNOWLEDGE LIBRARY" />
              <h2 className="mt-4 text-3xl md:text-5xl font-extrabold tracking-tight" style={{ color: "#1a1a2e" }}>
                Data-backed insights.{" "}
                <span className="gradient-text italic">Always current.</span>
              </h2>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {[
                {
                  icon: Database,
                  title: "Ideas Database",
                  stat: "3,200+",
                  description:
                    "Curated startup ideas scored by market potential and competition density.",
                },
                {
                  icon: BarChart2,
                  title: "Benchmarks",
                  stat: "420+",
                  description:
                    "Industry-specific benchmarks for CAC, LTV, churn, and conversion rates.",
                },
                {
                  icon: Calculator,
                  title: "Free Tools",
                  stat: "1,060+",
                  description:
                    "Calculators, templates, and interactive frameworks for lean founders.",
                },
                {
                  icon: BookOpen,
                  title: "Knowledge Hub",
                  stat: "Always On",
                  description:
                    "Guides, playbooks, and founder case studies updated weekly.",
                },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div
                    className="inline-flex items-center justify-center w-10 h-10 rounded-xl mb-4"
                    style={{
                      background:
                        "linear-gradient(135deg, #ede9fe, #fae8ff)",
                    }}
                  >
                    <card.icon className="w-5 h-5 text-purple-600" />
                  </div>
                  <p className="text-2xl font-extrabold tracking-tight" style={{ color: "#1a1a2e" }}>
                    {card.stat}
                  </p>
                  <h3 className="mt-1 text-sm font-semibold" style={{ color: "#1a1a2e" }}>
                    {card.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed" style={{ color: "#6b6280" }}>
                    {card.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* built on */}
            <div className="mt-14 text-center">
              <p className="text-[11px] uppercase tracking-[0.15em] font-semibold mb-4" style={{ color: "#a5a0b8" }}>
                Built on
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {["OpenAI GPT", "Tavily", "News API"].map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-xs font-medium"
                    style={{ color: "#6b6280" }}
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* ─────────────── 06 · TESTIMONIALS ─────────────── */}
        <AnimatedSection className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-14">
              <SectionLabel number="06" label="FOUNDERS SPEAK" />
              <h2 className="mt-4 text-3xl md:text-5xl font-extrabold tracking-tight" style={{ color: "#1a1a2e" }}>
                Less FOMO.{" "}
                <span className="gradient-text italic">More signal.</span>
              </h2>
            </div>

            <div className="space-y-6">
              {/* featured */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <TestimonialCard
                  quote={TESTIMONIALS[0].quote}
                  author={TESTIMONIALS[0].author}
                  role={TESTIMONIALS[0].role}
                  past={TESTIMONIALS[0].past}
                  metric={TESTIMONIALS[0].metric}
                  stars={TESTIMONIALS[0].stars}
                  variant="featured"
                />
              </motion.div>

              {/* compact grid */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {TESTIMONIALS.slice(1).map((t, i) => (
                  <motion.div key={i} variants={staggerItem}>
                    <TestimonialCard
                      quote={t.quote}
                      author={t.author}
                      role={t.role}
                      past={t.past}
                      metric={t.metric}
                      stars={t.stars}
                      variant="compact"
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </AnimatedSection>

        {/* ─────────────── 07 · LIVE INTELLIGENCE (DARK) ─────────────── */}
        <DarkSectionWrapper className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            {/* custom light-on-dark section label */}
            <div className="flex items-center gap-3 mb-6">
              <span
                className="inline-block w-8 h-[2px] rounded-full"
                style={{
                  background: "linear-gradient(90deg, #a78bfa, #d946ef)",
                }}
              />
              <span
                className="text-[11px] font-bold tracking-[0.2em] uppercase"
                style={{ color: "#6b7280" }}
              >
                07 — LIVE INTELLIGENCE
              </span>
            </div>

            <motion.h2
              className="text-3xl md:text-5xl font-extrabold tracking-tight text-white"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              Your market never sleeps.{" "}
              <span className="gradient-text italic">Neither do we.</span>
            </motion.h2>

            <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
              {/* left: feature list */}
              <motion.ul
                className="space-y-5"
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                {LIVE_INTEL_FEATURES.map((feature, i) => (
                  <motion.li
                    key={i}
                    variants={staggerItem}
                    className="flex items-start gap-3"
                  >
                    <Check className="w-5 h-5 mt-0.5 shrink-0 text-purple-400" />
                    <span className="text-sm leading-relaxed text-gray-300">
                      {feature}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>

              {/* right: radar graphic */}
              <motion.div
                className="flex items-center justify-center"
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <div className="relative w-64 h-64">
                  {/* concentric circles */}
                  {[1, 0.7, 0.4].map((scale, i) => (
                    <div
                      key={i}
                      className="absolute inset-0 m-auto rounded-full border border-dashed border-gray-700"
                      style={{
                        width: `${scale * 100}%`,
                        height: `${scale * 100}%`,
                      }}
                    />
                  ))}

                  {/* center dot */}
                  <div className="absolute inset-0 m-auto w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_12px_4px_rgba(168,85,247,0.5)]" />

                  {/* rotating sweep */}
                  <div
                    className="absolute inset-0 m-auto w-full h-full animate-radar-sweep"
                    style={{ transformOrigin: "center center" }}
                  >
                    <div
                      className="absolute top-0 left-1/2 -translate-x-px w-[2px] h-1/2 origin-bottom"
                      style={{
                        background:
                          "linear-gradient(to top, transparent 0%, rgba(168,85,247,0.6) 100%)",
                      }}
                    />
                  </div>

                  {/* floating callout cards */}
                  <div
                    className="absolute -top-2 -right-4 rounded-lg px-3 py-2 shadow-xl animate-float"
                    style={{
                      background: "rgba(20,20,30,0.9)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      animationDelay: "0s",
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_6px_2px_rgba(239,68,68,0.5)]" />
                      <span className="text-[10px] font-semibold text-white whitespace-nowrap">
                        Competitor Alert
                      </span>
                    </div>
                  </div>

                  <div
                    className="absolute -bottom-4 -left-6 rounded-lg px-3 py-2 shadow-xl animate-float-slow"
                    style={{
                      background: "rgba(20,20,30,0.9)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      animationDelay: "1.5s",
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_6px_2px_rgba(34,197,94,0.5)]" />
                      <div className="flex flex-col">
                        <span className="text-[10px] font-semibold text-white">
                          Demand Signal
                        </span>
                        <span className="text-[9px] text-green-400">
                          +23% this week
                        </span>
                      </div>
                    </div>
                  </div>

                  <div
                    className="absolute top-1/2 -left-10 -translate-y-1/2 rounded-lg px-3 py-2 shadow-xl animate-float"
                    style={{
                      background: "rgba(20,20,30,0.9)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      animationDelay: "3s",
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_6px_2px_rgba(234,179,8,0.5)]" />
                      <div className="flex flex-col">
                        <span className="text-[10px] font-semibold text-white">
                          Market Shift
                        </span>
                        <span className="text-[9px] text-yellow-400">
                          Trend detected
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </DarkSectionWrapper>

        {/* ─────────────── 08 · PRICING ─────────────── */}
        <AnimatedSection id="pricing" className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-14">
              <SectionLabel number="08" label="PRICING" />
              <h2 className="mt-4 text-3xl md:text-5xl font-extrabold tracking-tight" style={{ color: "#1a1a2e" }}>
                Start free.{" "}
                <span className="gradient-text italic">
                  Pay only when ready.
                </span>
              </h2>
              <p className="mt-4 text-sm max-w-xl mx-auto" style={{ color: "#6b6280" }}>
                Every account starts with free credits — enough for a full
                validation.
              </p>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch"
            >
              {PRICING_TIERS.map((plan, i) => (
                <motion.div key={i} variants={staggerItem}>
                  <PricingCard
                    tier={plan.tier}
                    tagline={plan.tagline}
                    description={plan.description}
                    price={plan.price}
                    period={plan.period}
                    credits={plan.credits}
                    features={plan.features}
                    cta={plan.cta}
                    popular={plan.popular}
                  />
                </motion.div>
              ))}
            </motion.div>

            <div className="mt-8 text-center">
              <Link
                href="/pricing"
                className="inline-flex items-center gap-1 text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors"
              >
                See all plans and what each credit unlocks
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </AnimatedSection>

        {/* ─────────────── 09 · FAQ ─────────────── */}
        <AnimatedSection className="py-24">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-14">
              <SectionLabel number="09" label="FAQ" />
              <h2 className="mt-4 text-3xl md:text-5xl font-extrabold tracking-tight" style={{ color: "#1a1a2e" }}>
                Honest answers to{" "}
                <span className="gradient-text italic">fair questions.</span>
              </h2>
              <p className="mt-4 text-sm" style={{ color: "#6b6280" }}>
                Still have questions? Reach out at{" "}
                <a
                  href="mailto:support@productvalidatorai.com"
                  className="text-purple-600 hover:underline"
                >
                  support@productvalidatorai.com
                </a>
              </p>
            </div>

            <FAQAccordion items={FAQS} defaultOpen={0} />
          </div>
        </AnimatedSection>

        {/* ─────────────── 10 · EMAIL CAPTURE ─────────────── */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              className="relative overflow-hidden rounded-3xl px-8 py-16 md:px-16 md:py-20 text-center"
              style={{ background: "#0a0a0f" }}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {/* blurred gradient shapes */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div
                  className="absolute -top-20 -left-20 w-72 h-72 rounded-full opacity-25 blur-[100px]"
                  style={{
                    background:
                      "radial-gradient(circle, #7c3aed 0%, transparent 70%)",
                  }}
                />
                <div
                  className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full opacity-20 blur-[100px]"
                  style={{
                    background:
                      "radial-gradient(circle, #d946ef 0%, transparent 70%)",
                  }}
                />
              </div>

              <div className="relative z-10">
                <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-gray-500 mb-4">
                  FOUNDER INTELLIGENCE — WEEKLY
                </p>

                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
                  Get the data that{" "}
                  <span className="gradient-text italic">
                    kills bad ideas early.
                  </span>
                </h2>

                <p className="mt-4 text-sm text-gray-400 max-w-lg mx-auto">
                  One email per week with market signals, validation
                  frameworks, and founder case studies. Read by 8,000+
                  founders.
                </p>

                {!emailSubmitted ? (
                  <form
                    onSubmit={handleEmailSubmit}
                    className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
                  >
                    <input
                      type="email"
                      required
                      placeholder="founder@startup.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full sm:flex-1 rounded-full border border-gray-700 bg-white/5 px-5 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                    />
                    <button
                      type="submit"
                      className="gradient-cta shrink-0 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition-transform hover:scale-[1.03] active:scale-[0.98]"
                    >
                      <Mail className="w-4 h-4" />
                      Subscribe
                    </button>
                  </form>
                ) : (
                  <div className="mt-8 flex flex-col items-center gap-2">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500/20">
                      <Check className="w-6 h-6 text-green-400" />
                    </div>
                    <p className="text-base font-semibold text-white">
                      You&apos;re in!
                    </p>
                    <p className="text-xs text-gray-500">
                      Check your inbox to confirm your subscription.
                    </p>
                  </div>
                )}

                <p className="mt-4 text-[11px] text-gray-600">
                  Weekly. No spam. Unsubscribe in one click.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─────────────── 11 · FOOTER ─────────────── */}
        <footer className="py-16 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            {/* top row */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-14">
              <div>
                <p className="text-lg font-extrabold tracking-tight" style={{ color: "#1a1a2e" }}>
                  Product Validator AI
                </p>
                <p className="mt-1 text-xs" style={{ color: "#6b6280" }}>
                  Validate ideas. Ship what matters.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 text-xs font-medium" style={{ color: "#6b6280" }}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                All Systems Operational
              </span>
            </div>

            {/* link columns */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
              {/* product */}
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.15em] mb-4" style={{ color: "#1a1a2e" }}>
                  Product
                </p>
                <ul className="space-y-2.5">
                  {[
                    { label: "Idea Validator", href: "/dashboard" },
                    { label: "Market Analysis", href: "/dashboard" },
                    { label: "Brand Strategy", href: "/dashboard" },
                    { label: "GTM Strategy", href: "/dashboard" },
                    { label: "Pricing", href: "/pricing" },
                  ].map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm hover:text-purple-600 transition-colors"
                        style={{ color: "#6b6280" }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* free tools */}
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.15em] mb-4" style={{ color: "#1a1a2e" }}>
                  Free Tools
                </p>
                <ul className="space-y-2.5">
                  {[
                    { label: "LTV Calculator", href: "/tools/ltv" },
                    { label: "Runway Calculator", href: "/tools/runway" },
                    { label: "Valuation Calculator", href: "/tools/valuation" },
                    {
                      label: "Break-Even Calculator",
                      href: "/tools/break-even",
                    },
                  ].map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm hover:text-purple-600 transition-colors"
                        style={{ color: "#6b6280" }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* resources */}
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.15em] mb-4" style={{ color: "#1a1a2e" }}>
                  Resources
                </p>
                <ul className="space-y-2.5">
                  {[
                    { label: "How It Works", href: "/how-it-works" },
                    { label: "Knowledge Library", href: "/knowledge" },
                    { label: "Failure Atlas", href: "/failure-atlas" },
                    { label: "API Documentation", href: "/docs/api" },
                  ].map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm hover:text-purple-600 transition-colors"
                        style={{ color: "#6b6280" }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* company */}
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.15em] mb-4" style={{ color: "#1a1a2e" }}>
                  Company
                </p>
                <ul className="space-y-2.5">
                  {[
                    { label: "About", href: "/about" },
                    { label: "Careers", href: "/careers" },
                    { label: "Contact", href: "/contact" },
                    { label: "Blog", href: "/blog" },
                    { label: "Press", href: "/press" },
                  ].map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm hover:text-purple-600 transition-colors"
                        style={{ color: "#6b6280" }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* social icons */}
            <div className="flex items-center gap-3 mb-10">
              {[
                { label: "X", href: "https://x.com" },
                { label: "LI", href: "https://linkedin.com" },
                { label: "GH", href: "https://github.com" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 text-xs font-bold transition-colors hover:border-purple-400 hover:text-purple-600"
                  style={{ color: "#6b6280" }}
                >
                  {s.label}
                </a>
              ))}
            </div>

            {/* bottom bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-100">
              <p className="text-xs" style={{ color: "#a5a0b8" }}>
                © 2026 Product Validator AI. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                {[
                  { label: "Privacy Policy", href: "/privacy" },
                  { label: "Terms of Service", href: "/terms" },
                  { label: "Cookie Policy", href: "/cookies" },
                ].map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-xs hover:text-purple-600 transition-colors"
                    style={{ color: "#a5a0b8" }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
