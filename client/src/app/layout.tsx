import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Product Validator AI - Validate Startup Ideas in Minutes',
  description: 'AI-powered platform to analyze startup feasibility, market demand, competition, SWOT, customer personas, GTM strategy, and generate investor-ready PDF reports.',
  keywords: ['startup validation', 'AI business plan', 'market research AI', 'product validator', 'SWOT analysis generator', 'customer persona AI'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-full flex flex-col font-sans bg-background text-foreground antialiased`}
      >
        <div className="flex-1 flex flex-col">{children}</div>
      </body>
    </html>
  );
}
