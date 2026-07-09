import type { Metadata } from 'next';
import { Inter, DM_Sans } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Product Validator AI — Validate Your Startup Idea in 2 Minutes',
  description:
    '90% of startups fail from poor validation. Get a complete AI-powered viability report with competitor analysis, market sizing, SWOT, and GO/NO-GO verdict in minutes — not months.',
  keywords: [
    'startup validation',
    'AI business plan',
    'market research AI',
    'product validator',
    'SWOT analysis generator',
    'customer persona AI',
    'idea validation',
    'feasibility scoring',
    'competitor analysis',
    'MVP recommendations',
    'GTM strategy',
  ],
  openGraph: {
    title: 'Product Validator AI — Validate Your Startup Idea in 2 Minutes',
    description:
      'Get a complete AI-powered viability report with competitor analysis, market sizing, SWOT, and GO/NO-GO verdict in minutes.',
    type: 'website',
    siteName: 'Product Validator AI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Product Validator AI — Validate Your Startup Idea in 2 Minutes',
    description:
      'Get a complete AI-powered viability report with competitor analysis, market sizing, SWOT, and GO/NO-GO verdict in minutes.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${inter.variable} ${dmSans.variable} min-h-full flex flex-col antialiased`}
        style={{ fontFamily: "'Inter', 'DM Sans', system-ui, sans-serif" }}
      >
        <div className="flex-1 flex flex-col">{children}</div>
      </body>
    </html>
  );
}
