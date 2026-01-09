"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import { PsychiatristForm } from "./PsychiatristForm";

interface EditPsychiatristModalProps {
  open: boolean;
  onClose: () => void;
  onEditPsychiatrist: (data: any, id: number) => Promise<void>;
  isLoading?: boolean;
  editingPsychiatrist?: any;
}

export function EditPsychiatristModal({
  open,
  onClose,
  onEditPsychiatrist,
  isLoading = false,
  editingPsychiatrist,
}: EditPsychiatristModalProps) {
  const handleSubmit = async (data: any) => {
    if (editingPsychiatrist?.id) {
      await onEditPsychiatrist(data, editingPsychiatrist.id);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto sidebar-scrollbar">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
              <Edit className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <DialogTitle className="text-xl">Edit Psychiatrist</DialogTitle>
              <DialogDescription>
                Update psychiatrist information and account details
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <div className="mt-2">
          <PsychiatristForm
            onSubmit={handleSubmit}
            onCancel={onClose}
            isLoading={isLoading}
            initialData={editingPsychiatrist}
            isEdit
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}