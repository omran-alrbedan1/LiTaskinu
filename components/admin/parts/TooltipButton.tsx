import { Button, ButtonProps } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReactNode } from "react";

interface TooltipButtonProps extends ButtonProps {
  tooltipContent: ReactNode;
  children: ReactNode;
}

export default function TooltipButton({
  tooltipContent,
  children,
  ...buttonProps
}: TooltipButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button {...buttonProps}>{children}</Button>
      </TooltipTrigger>
      <TooltipContent>{tooltipContent}</TooltipContent>
    </Tooltip>
  );
}
