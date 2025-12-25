"use client";
import { Dropdown, MenuProps, Table, Button, Card, Spin } from "antd";
import { Plus, Edit, Trash2 } from "lucide-react";
import { AddCityModal } from "./_components/AddCityModal";
import { EditCityModal } from "./_components/EditCityModal";
import useGetData from "@/hooks/useGetData";
import { Header } from "@/components/admin/shared";
import DeleteModal from "@/components/admin/shared/DeleteModal";
import { MoreHorizontal } from "lucide-react";
import { useCrudOperations } from "@/hooks/useCrudOperations";

const CitiesPage = () => {
  const {
    data: citiesData,
    loading: isFetchingCities,
    error: fetchError,
    createItem: handleAddCity,
    updateItem: handleEditCity,
    refetch: refetchCities,
    isCreating: isAddingCity,
    isUpdating: isUpdatingCity,
    isDeleting: isDeletingCity,

    // Modal states and functions
    isAddModalOpen,
    isEditModalOpen,
    isDeleteModalOpen,
    openAddModal,
    closeAddModal,
    openEditModal,
    closeEditModal,
    openDeleteModal,
    closeDeleteModal,
    handleDelete,

    // Selected item
    selectedItem: editingCity,
    selectedItemName,
  } = useCrudOperations<City>({
    endpoint: "/api/admin/cities",
    itemName: "City",
  });

  const { data: countriesData, loading: isFetchingCountries } = useGetData<
    Country[]
  >({
    url: "/api/admin/countries",
    enabled: true,
  });

  const getCountryName = (countryId: number) => {
    const country = countriesData?.find((c: Country) => c.id === countryId);
    return country ? `${country.name.en} ` : `Country ID: ${countryId}`;
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
            onClick: () => openEditModal(record),
          },
          {
            key: "delete",
            label: (
              <div className="flex items-center gap-2 px-1 py-1.5 text-red-600 hover:bg-red-50 rounded">
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </div>
            ),
            onClick: () => openDeleteModal(record),
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
          onClick={openAddModal}
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
        open={isAddModalOpen}
        onClose={closeAddModal}
        onAddCity={handleAddCity}
        isLoading={isAddingCity}
        countries={countriesData || []}
        isFetchingCountries={isFetchingCountries}
      />

      {/* Edit City Modal */}
      <EditCityModal
        open={isEditModalOpen}
        onClose={closeEditModal}
        onEditCity={handleEditCity}
        isLoading={isUpdatingCity}
        editingCity={editingCity}
        countries={countriesData || []}
        isFetchingCountries={isFetchingCountries}
      />

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        isLoading={isDeletingCity}
        itemName={selectedItemName}
        description="This will permanently remove the city and all associated data from the system."
      />
    </div>
  );
};

export default CitiesPage;
