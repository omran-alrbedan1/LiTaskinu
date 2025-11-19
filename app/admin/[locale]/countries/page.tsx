"use client";
import { useState } from "react";
import { Dropdown, MenuProps, Table, Button, Card, Space, Spin } from "antd";
import { Plus, Edit, Trash2 } from "lucide-react";
import { AddCountryModal } from "./_components/AddCountryModal";
import { EditCountryModal } from "./_components/EditCountryModal";
import usePostData from "@/hooks/usePostData";
import useGetData from "@/hooks/useGetData";
import usePutData from "@/hooks/usePutData";
import useDeleteData from "@/hooks/useDeleteData";
import { Header } from "@/components/admin/shared";
import DeleteModal from "@/components/admin/shared/DeleteModal";
import { MoreHorizontal, Settings } from "lucide-react";

const CountriesPage = () => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [editingCountry, setEditingCountry] = useState<Country | null>(null);
  const [deletingCountry, setDeletingCountry] = useState<Country | null>(null);

  const {
    data: countriesData,
    loading: isFetchingCountries,
    error: fetchError,
    refetch: refetchCountries,
  } = useGetData<Country[]>({
    url: "/api/admin/countries",
    enabled: true,
  });

  const {
    postData,
    loading: isAddingCountry,
    error: addError,
    success: addSuccess,
  } = usePostData("/api/admin/countries", {
    showNotifications: true,
    successMessage: "Country added successfully!",
    errorMessage: "Failed to add country",
    onSuccess: () => {
      refetchCountries();
      setIsAddModalVisible(false);
    },
  });

  const {
    putData,
    loading: isUpdatingCountry,
    error: updateError,
    success: updateSuccess,
  } = usePutData("/api/admin/countries", {
    showNotifications: true,
    successMessage: "Country updated successfully!",
    errorMessage: "Failed to update country",
    onSuccess: () => {
      refetchCountries();
      setIsEditModalVisible(false);
    },
  });

  const {
    deleteData,
    loading: isDeletingCountry,
    error: deleteError,
    success: deleteSuccess,
  } = useDeleteData("/api/admin/countries", {
    showNotifications: true,
    successMessage: "Country deleted successfully!",
    errorMessage: "Failed to delete country",
    onSuccess: () => {
      refetchCountries();
      setIsDeleteModalVisible(false);
    },
  });

  const handleAddCountry = async (formData: Country) => {
    await postData(formData);
  };

  const handleEditCountry = async (formData: Country, id: number) => {
    await putData(formData, id);
  };

  const handleDeleteCountry = async () => {
    if (deletingCountry?.id) {
      await deleteData(deletingCountry.id);
    }
  };

  // Open edit modal
  const handleEditClick = (country: Country) => {
    setEditingCountry(country);
    setIsEditModalVisible(true);
  };

  // Open delete modal
  const handleDeleteClick = (country: Country) => {
    setDeletingCountry(country);
    setIsDeleteModalVisible(true);
  };

  // Close edit modal
  const handleCloseEditModal = () => {
    setIsEditModalVisible(false);
    setEditingCountry(null);
  };

  // Close delete modal
  const handleCloseDeleteModal = () => {
    setIsDeleteModalVisible(false);
    setDeletingCountry(null);
  };

  // Columns configuration

  const columns = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      width: 80,
      render: (code: string, record: Country) => (
        <span className="font-bold text-blue-600">
          {code ?? <span className="text-gray-300">Not set</span>}
        </span>
      ),
    },
    {
      title: "Country Name (English)",
      dataIndex: "name",
      key: "name",
      render: (name: Country["name"]) => <span>{name?.en}</span>,
    },
    {
      title: "Country Name (Arabic)",
      dataIndex: "name",
      key: "nameAr",
      render: (name: Country["name"]) => (
        <span className="text-right font-arabic" dir="rtl">
          {name?.ar}
        </span>
      ),
    },
    {
      title: "Country Name (French)",
      dataIndex: "name",
      key: "nameFr",
      render: (name: Country["name"]) => (
        <span>
          {name?.fr ? name.fr : <span className="text-gray-400">Not set</span>}
        </span>
      ),
    },
    {
      title: "Country Name (Spanish)",
      dataIndex: "name",
      key: "nameEs",
      render: (name: Country["name"]) => (
        <span>
          {name?.es ? name.es : <span className="text-gray-400">Not set</span>}
        </span>
      ),
    },
    {
      title: "Country Name (Russian)",
      dataIndex: "name",
      key: "nameRu",
      render: (name: Country["name"]) => (
        <span className="font-cyrillic">
          {name?.ru ? name.ru : <span className="text-gray-400">Not set</span>}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 100,
      render: (_: any, record: Country) => {
        const menuItems: MenuProps["items"] = [
          {
            key: "edit",
            label: (
              <div className="flex items-center gap-2 px-1 py-1.5">
                <Edit className="w-4 h-4 text-blue-600" />
                <span className="text-blue-600">Edit</span>
              </div>
            ),
            onClick: () => handleEditClick(record),
          },

          {
            key: "delete",
            label: (
              <div className="flex items-center gap-2 px-1 py-1.5 text-red-600 hover:bg-red-50 rounded">
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </div>
            ),
            onClick: () => handleDeleteClick(record),
          },
        ];

        return (
          <Dropdown
            menu={{ items: menuItems }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <Button
              type="text"
              icon={<MoreHorizontal className="w-4 h-4" />}
              className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              title="Actions"
            />
          </Dropdown>
        );
      },
    },
  ];

  return (
    <div className="p-6 max-h-[90vh] overflow-y-auto space-y-6 pb-24 sidebar-scrollbar">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <Header
          title="Countries Management"
          description="Add, edit and delete countries in the system"
        />
        <Button
          type="primary"
          icon={<Plus className="w-4 h-4" />}
          size="large"
          onClick={() => setIsAddModalVisible(true)}
        >
          Add Country
        </Button>
      </div>

      {/* Countries Table */}
      <Card>
        {isFetchingCountries ? (
          <div className="flex justify-center items-center p-8">
            <Spin size="large" />
          </div>
        ) : fetchError ? (
          <div className="flex justify-center items-center p-8">
            <div className="text-red-500 text-center">
              <p>Failed to load countries</p>
              <Button type="link" onClick={refetchCountries} className="mt-2">
                Try Again
              </Button>
            </div>
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={countriesData || []}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total, range) =>
                `Showing ${range[0]}-${range[1]} of ${total} countries`,
            }}
            size="middle"
            scroll={{ x: 1000 }}
          />
        )}
      </Card>

      {/* Add Country Modal */}
      <AddCountryModal
        open={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        onAddCountry={handleAddCountry}
        isLoading={isAddingCountry}
      />

      {/* Edit Country Modal */}
      <EditCountryModal
        open={isEditModalVisible}
        onClose={handleCloseEditModal}
        onEditCountry={handleEditCountry}
        isLoading={isUpdatingCountry}
        editingCountry={editingCountry}
      />

      <DeleteModal
        isOpen={isDeleteModalVisible}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteCountry}
        isLoading={isDeletingCountry}
        itemName={deletingCountry?.name?.en || "this country"}
        description="This will permanently remove the country and all associated data from the system."
      />
    </div>
  );
};

export default CountriesPage;
