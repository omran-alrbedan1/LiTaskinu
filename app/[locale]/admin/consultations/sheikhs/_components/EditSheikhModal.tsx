"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SheikhForm } from "./SheikhForm";

interface EditSheikhModalProps {
  open: boolean;
  onClose: () => void;
  onEditSheikh: (data: any) => Promise<void>;
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
  
  console.log("EditSheikhModal - editingSheikh:", editingSheikh);
  console.log("EditSheikhModal - onEditSheikh function:", onEditSheikh);
  
  // Create a wrapper function to ensure the callback is called
  const handleFormSubmit = async (data: any) => {
    console.log("EditSheikhModal - Form submit received!");
    console.log("EditSheikhModal - Data received from form:", data);
    console.log("EditSheikhModal - Calling onEditSheikh...");
    
    try {
      await onEditSheikh(data);
      console.log("EditSheikhModal - onEditSheikh completed!");
    } catch (error) {
      console.error("EditSheikhModal - Error in onEditSheikh:", error);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Edit Sheikh</DialogTitle>
          <DialogDescription>
            Update sheikh information and account details
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-2">
          <SheikhForm
            onSubmit={handleFormSubmit}
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