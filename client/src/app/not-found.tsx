import Link from 'next/link';
import { HelpCircle, ArrowLeft, Sparkles } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center min-h-screen bg-background relative px-6">
      {/* Background ambient glows */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />

      <div className="text-center w-full max-w-md glass p-10 rounded-3xl border border-white/10 shadow-2xl relative z-10">
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6">
          <HelpCircle className="w-8 h-8" />
        </div>
        <h1 className="text-6xl font-black gradient-text mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>
        <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
          The validation link you followed may have expired, or the page has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center space-x-2 bg-primary hover:bg-primary/95 text-white font-medium px-6 py-3 rounded-xl transition-all shadow-md shadow-primary/20 hover:scale-[1.02]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
}
