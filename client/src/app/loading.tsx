import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center min-h-screen bg-background">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <p className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
          Loading assets...
        </p>
      </div>
    </div>
  );
}
