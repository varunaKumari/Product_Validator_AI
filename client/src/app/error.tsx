'use client';

import { useEffect } from 'react';
import { AlertOctagon, RotateCcw, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service if present
    console.error(error);
  }, [error]);

  return (
    <div className="flex-1 flex flex-col justify-center items-center min-h-screen bg-background relative px-6">
      {/* Background ambient glows */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-destructive/5 blur-[120px] pointer-events-none" />

      <div className="text-center w-full max-w-md glass p-10 rounded-3xl border border-white/10 shadow-2xl relative z-10">
        <div className="w-16 h-16 bg-destructive/10 rounded-2xl flex items-center justify-center text-destructive mx-auto mb-6">
          <AlertOctagon className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
        <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
          An unexpected application error occurred. We have logged the trace for our team to review.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-primary hover:bg-primary/95 text-white font-medium px-5 py-3 rounded-xl transition-all shadow-md shadow-primary/20 hover:scale-[1.02] cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-secondary hover:bg-secondary/80 text-foreground font-medium px-5 py-3 rounded-xl border border-white/5 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
