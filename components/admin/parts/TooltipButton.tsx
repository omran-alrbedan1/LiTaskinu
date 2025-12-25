import { Button, ButtonProps } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReactNode } from "react";

interface TooltipButtonProps extends ButtonProps {
  tooltipContent: ReactNode;
  onClick?: () => void; 
  children: ReactNode;
}

export default function TooltipButton({
  tooltipContent,
  onClick,
  children,
  ...buttonProps
}: TooltipButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          {...buttonProps}
          onClick={onClick}
          className="rounded-full h-10 relative w-10"
          asChild={false} 
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{tooltipContent}</TooltipContent>
    </Tooltip>
  );
}