"use client";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Plus, Edit, Trash2, MoreHorizontal, Phone, Mail } from "lucide-react";
import { AddSheikhModal } from "./_components/AddSheikhModal";
import { EditSheikhModal } from "./_components/EditSheikhModal";
import { Header } from "@/components/admin/shared";
import DeleteModal from "@/components/admin/shared/DeleteModal";
import { EmptyState } from "@/components/shared";
import { images } from "@/constants/images";
import Loader from "@/components/shared/Loader";
import useGetData from "@/hooks/useGetData";
import usePostData from "@/hooks/usePostData";
import usePutData from "@/hooks/usePutData";
import useDeleteData from "@/hooks/useDeleteData";


const SheikhsPage = () => {
  // State management
  const [editingSheikh, setEditingSheikh] = useState<Sheikh | null>(null);
  const [deletingSheikh, setDeletingSheikh] = useState<Sheikh | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  const API_ENDPOINT = "/api/admin/sheikhs";

  // Fetch sheikhs data
  const {
    data: sheikhsResponse,
    loading: isFetchingSheikhs,
    error: fetchError,
    refetch: refetchSheikhs,
  } = useGetData<SheikhResponse>({
    url: API_ENDPOINT,
    enabled: true,
  });
  
  // Extract sheikhs data from nested response
  const sheikhsData = sheikhsResponse?.data?.data || [];

  console.log(sheikhsData);
  // Add new sheikh
  const {
    postData: addSheikh,
    loading: isAddingSheikh,
    error: addError,
    validationErrors: addValidationErrors,
    reset: resetAdd,
  } = usePostData<Sheikh>(API_ENDPOINT, {
    showNotifications: true,
    successMessage: "Sheikh added successfully",
    errorMessage: "Failed to add sheikh",
    onSuccess: () => {
      refetchSheikhs();
      closeAddModal();
      resetAdd();
    },
  });

  // Update existing sheikh
  const {
    putData: updateSheikh,
    loading: isUpdatingSheikh,
    error: updateError,
    validationErrors: updateValidationErrors,
    reset: resetUpdate,
  } = usePutData<Sheikh>(`${API_ENDPOINT}/${editingSheikh?.sheikh?.id}`, {
    showNotifications: true,
    successMessage: "Sheikh updated successfully",
    errorMessage: "Failed to update sheikh",
    onSuccess: () => {
      refetchSheikhs();
      closeEditModal();
      resetUpdate();
    },
  });

  // Delete sheikh
  const {
    deleteData,
    loading: isDeletingSheikh,
    error: deleteError,
    reset: resetDelete,
  } = useDeleteData<Sheikh>(`${API_ENDPOINT}/${deletingSheikh?.sheikh?.id}`, {
    showNotifications: true,
    successMessage: "Sheikh deleted successfully",
    errorMessage: "Failed to delete sheikh",
    onDeleteSuccess: () => {
      refetchSheikhs();
      closeDeleteModal();
      resetDelete();
    },
  });

  const handleAddSheikh = async (data: Sheikh) => {
    try {
      await addSheikh(data);
    } catch (error) {
      console.error("Error adding sheikh:", error);
    }
  };

  const handleEditSheikh = async (data: Sheikh) => {
    try {
      await updateSheikh(data);
    } catch (error) {
      console.error("Error updating sheikh:", error);
    }
  };

  const handleDeleteSheikh = async () => {
    if (!deletingSheikh?.id) return;
    
    try {
      await deleteData();
    } catch (error) {
      console.error("Error deleting sheikh:", error);
    }
  };

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => {
    setIsAddModalOpen(false);
    resetAdd();
  };

  const openEditModal = (sheikh: Sheikh) => {
    setEditingSheikh(sheikh);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingSheikh(null);
    resetUpdate();
  };

  const openDeleteModal = (sheikh: Sheikh) => {
    setDeletingSheikh(sheikh);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeletingSheikh(null);
    resetDelete();
  };

  const handleRetry = () => {
    refetchSheikhs();
  };

  const getSpecializations = (sheikh: Sheikh): string[] => {
    if (!sheikh.sheikh) return [];
    
    if (Array.isArray(sheikh.sheikh.specialization)) {
      return sheikh.sheikh.specialization;
    } else if (typeof sheikh.sheikh.specialization === 'string') {
      return sheikh.sheikh.specialization.split(',').map(s => s.trim());
    }
    return [];
  };

  const getLanguages = (sheikh: Sheikh): string[] => {
    if (!sheikh.sheikh) return [];
    return Array.isArray(sheikh.sheikh.languages) ? sheikh.sheikh.languages : [];
  };

  const getExperience = (sheikh: Sheikh): string => {
    return sheikh.sheikh?.experience || "Not specified";
  };

  // Format gender display
  const formatGender = (gender: string) => {
    return gender.charAt(0).toUpperCase() + gender.slice(1);
  };

  return (
    <div className="p-6 space-y-6 max-h-[90vh] overflow-auto sidebar-scrollbar">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <Header
          title="Sheikhs Management"
          description="Manage Islamic scholars and religious consultants"
        />
        <Button 
          onClick={openAddModal} 
          className="gap-2 bg-primary-color1 hover:bg-primary-color1/90"
          disabled={isAddingSheikh}
        >
          <Plus className="w-4 h-4" />
          Add Sheikh
        </Button>
      </div>

      {/* Sheikhs Table */}
      <Card>
        <CardContent className="p-0">
          {isFetchingSheikhs ? (
            <Loader/>
          ) : fetchError ? (
            // Error state
            <Alert variant="destructive" className="m-6">
              <AlertDescription className="flex flex-col items-center gap-2">
                <span>Failed to load sheikhs</span>
                <Button variant="outline" onClick={handleRetry}>
                  Try Again
                </Button>
              </AlertDescription>
            </Alert>
          ) : sheikhsData.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact Info</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Specialization</TableHead>
                  <TableHead>Languages</TableHead>
               
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sheikhsData.map((sheikh: Sheikh) => (
                  <TableRow key={sheikh.id}>
                    {/* ID */}
                    <TableCell className="font-medium">
                      #{sheikh.id}
                    </TableCell>

                    {/* Name */}
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-semibold text-gray-900">
                          {sheikh.first_name} {sheikh.last_name}
                        </p>
                      </div>
                    </TableCell>

                    {/* Contact Info */}
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Mail className="w-3 h-3 text-primary-color1" />
                          <p className="text-sm truncate max-w-[180px]">
                            {sheikh.email}
                          </p>
                        </div>
                        {sheikh.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="w-3 h-3 text-primary-color1" />
                            <p className="text-sm">{sheikh.phone}</p>
                          </div>
                        )}
                      </div>
                    </TableCell>

                    {/* Gender */}
                    <TableCell>
                      {formatGender(sheikh.gender)}
                    </TableCell>

                    {/* Experience */}
                    <TableCell>
                      <div className="max-w-[150px]">
                        <p className="text-gray-700 line-clamp-2">
                          {getExperience(sheikh)}
                        </p>
                      </div>
                    </TableCell>

                    {/* Specialization */}
                    <TableCell>
                      <div className="max-w-[180px]">
                        {sheikh.sheikh ? (
                          <div className="flex flex-wrap gap-1">
                            {getSpecializations(sheikh).map((spec, index) => (
                              <Badge 
                                key={index} 
                                variant="secondary" 
                                className="px-2 py-0.5 text-xs"
                              >
                                {spec}
                              </Badge>
                            ))}
                          </div>
                        ) : (
                          <span className="text-gray-400">Not set</span>
                        )}
                      </div>
                    </TableCell>

                    {/* Languages */}
                    <TableCell>
                      <div className="max-w-[120px]">
                        {sheikh.sheikh ? (
                          <div className="flex flex-wrap gap-1">
                            {getLanguages(sheikh).map((lang, index) => (
                              <Badge 
                                key={index} 
                                variant="outline" 
                                className="px-2 py-0.5 text-xs"
                              >
                                {lang}
                              </Badge>
                            ))}
                          </div>
                        ) : (
                          <span className="text-gray-400">Not set</span>
                        )}
                      </div>
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            className="h-8 w-8 p-0 hover:bg-gray-100"
                            disabled={isUpdatingSheikh || isDeletingSheikh}
                          >
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem 
                            onClick={() => openEditModal(sheikh)}
                            className="text-sm cursor-pointer"
                            disabled={isUpdatingSheikh}
                          >
                            <Edit className="mr-2 h-4 w-4 text-blue-500" />
                            Edit Information
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => openDeleteModal(sheikh)}
                            className="text-sm text-red-600 cursor-pointer"
                            disabled={isDeletingSheikh}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Sheikh
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            // Empty state inside the table
            <div className="py-8">
              <EmptyState
                title="No Sheikhs Found"
                description="Add your first Islamic scholar to start offering consultations"
                image={images.emptySheikhs}
                action={
                  <Button 
                    onClick={openAddModal} 
                    className="gap-2 bg-primary-color1 hover:bg-primary-color1/90"
                    disabled={isAddingSheikh}
                  >
                    <Plus className="w-4 h-4" />
                    Add First Sheikh
                  </Button>
                }
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modals */}
      <AddSheikhModal
        open={isAddModalOpen}
        onClose={closeAddModal}
        onAddSheikh={handleAddSheikh}
        isLoading={isAddingSheikh}
      />

      {editingSheikh && (
        <EditSheikhModal
          open={isEditModalOpen}
          onClose={closeEditModal}
          onEditSheikh={handleEditSheikh}
          isLoading={isUpdatingSheikh}
          editingSheikh={editingSheikh}
        />
      )}

      {deletingSheikh && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onConfirm={handleDeleteSheikh}
          isLoading={isDeletingSheikh}
          itemName={deletingSheikh.first_name}
          description="This will permanently remove the sheikh and all associated consultations from the system."
        />
      )}
    </div>
  );
};

export default SheikhsPage;