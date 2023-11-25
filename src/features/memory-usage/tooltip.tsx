import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MemoryUsageContent } from "./content";

type Props = {
  trigger: React.ReactNode;
  side?: "left" | "top" | "right" | "bottom";
};

export function MemoryUsageTooltip({ trigger, side }: Props) {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>{trigger}</TooltipTrigger>
        <TooltipContent side={side}>
          <MemoryUsageContent />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
