// app/admin/en/cities/_components/EditCityModal.tsx
"use client";
import { Modal } from "antd";
import { Edit } from "lucide-react";
import { CityForm } from "./cityForm";

interface EditCityModalProps {
  open: boolean;
  onClose: () => void;
  onEditCity: (data: City, id: number) => Promise<void>;
  isLoading?: boolean;
  editingCity?: City | null;
  countries: Country[];
  isFetchingCountries?: boolean;
}

export function EditCityModal({
  open,
  onClose,
  onEditCity,
  isLoading = false,
  editingCity,
  countries = [],
  isFetchingCountries = false,
}: EditCityModalProps) {
  const handleSubmit = async (data: City) => {
    if (editingCity?.id) {
      await onEditCity(data, editingCity.id);
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
            <span className="text-xl font-bold text-gray-900">Edit City</span>
            <p className="text-sm text-gray-500 mt-1">
              Update city information with multilingual support
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
            initialData={editingCity}
            countries={countries}
            isFetchingCountries={isFetchingCountries}
            isEdit
          />
        </div>
      </div>
    </Modal>
  );
}
