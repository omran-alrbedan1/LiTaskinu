// app/admin/en/cities/page.tsx
"use client";
import { useState } from "react";
import { Dropdown, MenuProps, Table, Button, Card, Space, Spin } from "antd";
import { Plus, Edit, Trash2 } from "lucide-react";
import { AddCityModal } from "./_components/AddCityModal";
import { EditCityModal } from "./_components/EditCityModal";
import usePostData from "@/hooks/usePostData";
import useGetData from "@/hooks/useGetData";
import usePutData from "@/hooks/usePutData";
import useDeleteData from "@/hooks/useDeleteData";
import { Header } from "@/components/admin/shared";
import DeleteModal from "@/components/admin/shared/DeleteModal";
import { MoreHorizontal } from "lucide-react";

const CitiesPage = () => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [editingCity, setEditingCity] = useState<City | null>(null);
  const [deletingCity, setDeletingCity] = useState<City | null>(null);

  // Fetch cities data
  const {
    data: citiesData,
    loading: isFetchingCities,
    error: fetchError,
    refetch: refetchCities,
  } = useGetData<City[]>({
    url: "/api/admin/cities",
    enabled: true,
  });

  const getCountryName = (countryId: number) => {
    const country = countriesData?.find((c: Country) => c.id === countryId);
    return country ? `${country.name.en} ` : `Country ID: ${countryId}`;
  };

  // Fetch countries for dropdowns
  const { data: countriesData, loading: isFetchingCountries } = useGetData<
    Country[]
  >({
    url: "/api/admin/countries",
    enabled: true,
  });

  // Add city
  const {
    postData,
    loading: isAddingCity,
    error: addError,
    success: addSuccess,
  } = usePostData("/api/admin/cities", {
    showNotifications: true,
    successMessage: "City added successfully!",
    errorMessage: "Failed to add city",
    onSuccess: () => {
      refetchCities();
      setIsAddModalVisible(false);
    },
  });

  // Update city
  const {
    putData,
    loading: isUpdatingCity,
    error: updateError,
    success: updateSuccess,
  } = usePutData("/api/admin/cities", {
    showNotifications: true,
    successMessage: "City updated successfully!",
    errorMessage: "Failed to update city",
    onSuccess: () => {
      refetchCities();
      setIsEditModalVisible(false);
    },
  });

  // Delete city
  const {
    deleteData,
    loading: isDeletingCity,
    error: deleteError,
    success: deleteSuccess,
  } = useDeleteData("/api/admin/cities", {
    showNotifications: true,
    successMessage: "City deleted successfully!",
    errorMessage: "Failed to delete city",
    onSuccess: () => {
      refetchCities();
      setIsDeleteModalVisible(false);
    },
  });

  const handleAddCity = async (formData: Omit<City, "id">) => {
    await postData(formData);
  };

  const handleEditCity = async (formData: Omit<City, "id">, id: number) => {
    await putData(formData, id);
  };

  const handleDeleteCity = async () => {
    if (deletingCity?.id) {
      await deleteData(deletingCity.id);
    }
  };

  // Open edit modal
  const handleEditClick = (city: City) => {
    setEditingCity(city);
    setIsEditModalVisible(true);
  };

  // Open delete modal
  const handleDeleteClick = (city: City) => {
    setDeletingCity(city);
    setIsDeleteModalVisible(true);
  };

  // Close edit modal
  const handleCloseEditModal = () => {
    setIsEditModalVisible(false);
    setEditingCity(null);
  };

  // Close delete modal
  const handleCloseDeleteModal = () => {
    setIsDeleteModalVisible(false);
    setDeletingCity(null);
  };

  // Columns configuration
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 60,
      render: (id: number) => (
        <span className="font-mono text-gray-500">#{id}</span>
      ),
    },
    {
      title: "City Name (English)",
      dataIndex: "name",
      key: "name",
      render: (name: City["name"]) => (
        <span className="font-medium">{name?.en}</span>
      ),
    },
    {
      title: "City Name (Arabic)",
      dataIndex: "name",
      key: "nameAr",
      render: (name: City["name"]) => (
        <span className="text-right font-arabic" dir="rtl">
          {name?.ar}
        </span>
      ),
    },
    {
      title: "City Name (French)",
      dataIndex: "name",
      key: "nameFr",
      render: (name: City["name"]) => (
        <span>
          {name?.fr ? name.fr : <span className="text-gray-400">Not set</span>}
        </span>
      ),
    },
    {
      title: "City Name (Spanish)",
      dataIndex: "name",
      key: "nameEs",
      render: (name: City["name"]) => (
        <span>
          {name?.es ? name.es : <span className="text-gray-400">Not set</span>}
        </span>
      ),
    },
    {
      title: "City Name (Russian)",
      dataIndex: "name",
      key: "nameRu",
      render: (name: City["name"]) => (
        <span className="font-cyrillic">
          {name?.ru ? name.ru : <span className="text-gray-400">Not set</span>}
        </span>
      ),
    },
    {
      title: "Country",
      dataIndex: "country_id",
      key: "country",
      render: (countryId: number) => (
        <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium">
          {getCountryName(countryId)}
        </span>
      ),
    },

    {
      title: "Actions",
      key: "actions",
      width: 100,
      render: (_: any, record: City) => {
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
          title="Cities Management"
          description="Add, edit and delete cities in the system"
        />
        <Button
          type="primary"
          icon={<Plus className="w-4 h-4" />}
          size="large"
          onClick={() => setIsAddModalVisible(true)}
        >
          Add City
        </Button>
      </div>

      {/* Cities Table */}
      <Card>
        {isFetchingCities ? (
          <div className="flex justify-center items-center p-8">
            <Spin size="large" />
          </div>
        ) : fetchError ? (
          <div className="flex justify-center items-center p-8">
            <div className="text-red-500 text-center">
              <p>Failed to load cities</p>
              <Button type="link" onClick={refetchCities} className="mt-2">
                Try Again
              </Button>
            </div>
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={citiesData || []}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total, range) =>
                `Showing ${range[0]}-${range[1]} of ${total} cities`,
            }}
            size="middle"
            scroll={{ x: 1000 }}
          />
        )}
      </Card>

      {/* Add City Modal */}
      <AddCityModal
        open={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        onAddCity={handleAddCity}
        isLoading={isAddingCity}
        countries={countriesData || []}
        isFetchingCountries={isFetchingCountries}
      />

      {/* Edit City Modal */}
      <EditCityModal
        open={isEditModalVisible}
        onClose={handleCloseEditModal}
        onEditCity={handleEditCity}
        isLoading={isUpdatingCity}
        editingCity={editingCity}
        countries={countriesData || []}
        isFetchingCountries={isFetchingCountries}
      />

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={isDeleteModalVisible}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteCity}
        isLoading={isDeletingCity}
        itemName={deletingCity?.name?.en || "this city"}
        description="This will permanently remove the city and all associated data from the system."
      />
    </div>
  );
};

export default CitiesPage;
