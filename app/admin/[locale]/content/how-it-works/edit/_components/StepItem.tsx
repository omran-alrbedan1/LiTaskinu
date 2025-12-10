"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, ChevronUp, ChevronDown } from "lucide-react";

interface StepItemProps {
  step: Step;
  index: number;
  totalSteps: number;
  onEdit: (step: Step) => void;
  onDelete: (id: string) => void;
}

const StepItem: React.FC<StepItemProps> = ({
  step,
  index,
  totalSteps,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex items-start gap-4 p-4 border rounded-lg  hover:shadow-md transition-shadow">
      {/* Step number and order controls */}
      <div className="flex flex-col items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
          {step.order}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
        <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(step)}
          className="h-8 w-8 p-0"
        >
          <Edit className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDelete(step.id)}
          className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
};

export default StepItem;
