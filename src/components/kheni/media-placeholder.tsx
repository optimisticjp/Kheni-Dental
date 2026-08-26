import { Camera } from "lucide-react";
import { cn } from "@/lib/utils";

export function MediaPlaceholder({ label, className }: { label: string; className?: string }) {
  return (
    <div className={cn("relative overflow-hidden rounded-[2rem] border border-gold/20 bg-[radial-gradient(circle_at_30%_20%,rgba(197,161,91,.22),transparent_34%),linear-gradient(135deg,#171714,#090909)]", className)}>
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] [background-size:32px_32px]" />
      <div className="relative flex h-full min-h-64 flex-col items-center justify-center p-8 text-center">
        <span className="grid size-12 place-items-center rounded-full border border-gold/30 bg-gold/10 text-gold"><Camera className="size-5" /></span>
        <p className="mt-4 max-w-xs text-sm font-medium text-white/80">{label}</p>
        <p className="mt-2 text-xs text-white/40">Replace with authentic Kheni Elite photography</p>
      </div>
    </div>
  );
}
