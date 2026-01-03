"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import { SheikhForm } from "./SheikhForm";

interface EditSheikhModalProps {
  open: boolean;
  onClose: () => void;
  onEditSheikh: (data: any, id: number) => Promise<void>;
  isLoading?: boolean;
  editingSheikh?: Sheikh | null;
}

export function EditSheikhModal({
  open,
  onClose,
  onEditSheikh,
  isLoading = false,
  editingSheikh,
}: EditSheikhModalProps) {
  const handleSubmit = async (data: any) => {
    if (editingSheikh?.id) {
      await onEditSheikh(data, editingSheikh.id);
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
              <DialogTitle className="text-xl">Edit Sheikh</DialogTitle>
              <DialogDescription>
                Update sheikh information and account details
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <div className="mt-2">
          <SheikhForm
            onSubmit={handleSubmit}
            onCancel={onClose}
            isLoading={isLoading}
            initialData={editingSheikh}
            isEdit
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}