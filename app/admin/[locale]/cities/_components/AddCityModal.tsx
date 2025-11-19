// app/admin/en/cities/_components/AddCityModal.tsx
"use client";
import { Modal } from "antd";
import { Plus } from "lucide-react";
import { CityForm } from "./cityForm";

interface AddCityModalProps {
  open: boolean;
  onClose: () => void;
  onAddCity: (data: City) => Promise<void>;
  isLoading?: boolean;
  countries: Country[];
  isFetchingCountries?: boolean;
}

export function AddCityModal({
  open,
  onClose,
  onAddCity,
  isLoading = false,
  countries = [],
  isFetchingCountries = false,
}: AddCityModalProps) {
  const handleSubmit = async (data: City) => {
    await onAddCity(data);
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
              Add New City
            </span>
            <p className="text-sm text-gray-500 mt-1">
              Add a new city with multilingual support
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
          <CityForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={isLoading}
            countries={countries}
            isFetchingCountries={isFetchingCountries}
          />
        </div>
      </div>
    </Modal>
  );
}
