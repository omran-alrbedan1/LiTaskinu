"use client";
import { Modal } from "antd";
import { Edit } from "lucide-react";
import { CountryForm } from "./countryForm";

interface EditCountryModalProps {
  open: boolean;
  onClose: () => void;
  onEditCountry: (data: Country, id: number) => Promise<void>;
  isLoading?: boolean;
  editingCountry?: Country | null;
}

export function EditCountryModal({
  open,
  onClose,
  onEditCountry,
  isLoading = false,
  editingCountry,
}: EditCountryModalProps) {
  const handleSubmit = async (data: Country) => {
    if (editingCountry?.id) {
      await onEditCountry(data, editingCountry.id);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
            <Edit className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <span className="text-xl font-bold text-gray-900">
              Edit Country
            </span>
            <p className="text-sm text-gray-500 mt-1">
              Update country information with multilingual support
            </p>
          </div>
        </div>
      }
      open={open}
      onCancel={handleCancel}
      footer={null}
      width={800}
      centered
      destroyOnClose
      styles={{
        body: { padding: 0 },
        content: { borderRadius: "12px", overflow: "hidden" },
      }}
      className="[&_.ant-modal-content]:shadow-xl [&_.ant-modal-content]:border-0"
    >
      <div className="px-6 pb-6">
        <div className="mt-6">
          <CountryForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={isLoading}
            initialData={editingCountry}
            isEdit
          />
        </div>
      </div>
    </Modal>
  );
}
