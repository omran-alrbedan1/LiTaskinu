"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Add New Sheikh</DialogTitle>
          <DialogDescription>
            Add a new Islamic scholar with consultation capabilities
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-2">
          <SheikhForm
            onSubmit={onAddSheikh}
            onCancel={onClose}
            isLoading={isLoading}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}