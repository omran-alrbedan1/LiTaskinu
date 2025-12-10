"use client";
import { Dropdown, MenuProps, Table, Button, Card, Spin } from "antd";
import { Plus, Edit, Trash2 } from "lucide-react";
import { AddCountryModal } from "./_components/AddCountryModal";
import { EditCountryModal } from "./_components/EditCountryModal";
import { Header } from "@/components/admin/shared";
import DeleteModal from "@/components/admin/shared/DeleteModal";
import { MoreHorizontal } from "lucide-react";
import { useCrudOperations } from "@/hooks/useCrudOperations";

const CountriesPage = () => {
  const {
    data: countriesData,
    loading: isFetchingCountries,
    error: fetchError,
    createItem: handleAddCountry,
    updateItem: handleEditCountry,
    refetch: refetchCountries,
    isCreating: isAddingCountry,
    isUpdating: isUpdatingCountry,
    isDeleting: isDeletingCountry,

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
    selectedItem: editingCountry,
    selectedItemName,
  } = useCrudOperations<Country>({
    endpoint: "/api/admin/countries",
    itemName: "Country",
  });

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
          title="Countries Management"
          description="Add, edit and delete countries in the system"
        />
        <Button
          type="primary"
          icon={<Plus className="w-4 h-4" />}
          size="large"
          onClick={openAddModal}
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
        open={isAddModalOpen}
        onClose={closeAddModal}
        onAddCountry={handleAddCountry}
        isLoading={isAddingCountry}
      />

      {/* Edit Country Modal */}
      <EditCountryModal
        open={isEditModalOpen}
        onClose={closeEditModal}
        onEditCountry={handleEditCountry}
        isLoading={isUpdatingCountry}
        editingCountry={editingCountry}
      />

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        isLoading={isDeletingCountry}
        itemName={selectedItemName}
        description="This will permanently remove the country and all associated data from the system."
      />
    </div>
  );
};

export default CountriesPage;
