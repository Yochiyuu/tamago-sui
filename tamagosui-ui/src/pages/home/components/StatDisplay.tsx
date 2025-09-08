import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import type { ReactNode } from "react";

// Helper component for individual stat display
type StatDisplayProps = {
  icon: ReactNode;
  label: string;
  value: number;
  max: number; // ✅ tambahin max supaya bisa dipakai di PetComponent
  className?: string; // ✅ opsional kalau mau kirim className
};

export function StatDisplay({ icon, label, value, max, className }: StatDisplayProps) {
  const percentage = (value / max) * 100;

  return (
    <Tooltip>
      <TooltipTrigger className={`w-full ${className || ""}`}>
        <div className="flex items-center gap-3 w-full">
          <div className="w-6 h-6">{icon}</div>
          <Progress value={percentage} className="w-full" />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>
          {label}: {value} / {max}
        </p>
      </TooltipContent>
    </Tooltip>
  );
}
