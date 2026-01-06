"use client";
import { Modal } from "antd";
import { Plus } from "lucide-react";
import { CountryForm } from "./countryForm";

interface AddCountryModalProps {
  open: boolean;
  onClose: () => void;
  onAddCountry: (data: Country) => Promise<void>;
  isLoading?: boolean;
}

export function AddCountryModal({
  open,
  onClose,
  onAddCountry,
  isLoading = false,
}: AddCountryModalProps) {
  const handleSubmit = async (data: Country) => {
    await onAddCountry(data);
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 bg-primary-light2 rounded-lg">
            <Plus className="w-5 h-5 text-primary-color1" />
          </div>
          <div>
            <span className="text-xl font-bold text-gray-900">
              Add New Country
            </span>
            <p className="text-sm text-gray-500 mt-1">
              Add a new country with multilingual support
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
          />
        </div>
      </div>
    </Modal>
  );
}
