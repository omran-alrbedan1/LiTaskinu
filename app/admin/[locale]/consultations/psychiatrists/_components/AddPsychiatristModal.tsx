"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { PsychiatristForm } from "./PsychiatristForm";

interface AddPsychiatristModalProps {
  open: boolean;
  onClose: () => void;
  onAddPsychiatrist: (data: any) => Promise<void>;
  isLoading?: boolean;
}

export function AddPsychiatristModal({
  open,
  onClose,
  onAddPsychiatrist,
  isLoading = false,
}: AddPsychiatristModalProps) {
  const handleSubmit = async (data: any) => {
    await onAddPsychiatrist(data);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto sidebar-scrollbar">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg">
              <Plus className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <DialogTitle className="text-xl">Add New Psychiatrist</DialogTitle>
              <DialogDescription>
                Add a new mental health professional with consultation capabilities
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <div className="mt-2">
          <PsychiatristForm
            onSubmit={handleSubmit}
            onCancel={onClose}
            isLoading={isLoading}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}