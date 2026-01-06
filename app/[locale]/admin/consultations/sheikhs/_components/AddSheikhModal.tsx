"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { SheikhForm } from "./SheikhForm";

interface AddSheikhModalProps {
  open: boolean;
  onClose: () => void;
  onAddSheikh: (data: any) => Promise<void>;
  isLoading?: boolean;
}

export function AddSheikhModal({
  open,
  onClose,
  onAddSheikh,
  isLoading = false,
}: AddSheikhModalProps) {
  const handleSubmit = async (data: any) => {
    await onAddSheikh(data);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto sidebar-scrollbar">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
              <Plus className="w-5 h-5 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl">Add New Sheikh</DialogTitle>
              <DialogDescription>
                Add a new Islamic scholar with consultation capabilities
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <div className="mt-2">
          <SheikhForm
            onSubmit={handleSubmit}
            onCancel={onClose}
            isLoading={isLoading}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}