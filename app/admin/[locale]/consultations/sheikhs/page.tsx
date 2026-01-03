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
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Plus, Edit, Trash2, Eye, MoreHorizontal, User, Phone } from "lucide-react";
import { AddSheikhModal } from "./_components/AddSheikhModal";
import { EditSheikhModal } from "./_components/EditSheikhModal";
import { Header, StatsCard } from "@/components/admin/shared";
import DeleteModal from "@/components/admin/shared/DeleteModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useGetData from "@/hooks/useGetData";
import usePostData from "@/hooks/usePostData";
import usePutData from "@/hooks/usePutData";
import useDeleteData from "@/hooks/useDeleteData";
import { EmptyState } from "@/components/shared";
import { MOCK_SHEIKHS } from "@/constants/temporary";
import Image from "next/image";
import { images } from "@/constants/images";
import Loader from "@/components/shared/Loader";
import { MdEmail } from "react-icons/md";


const SheikhsPage = () => {
  // State management
  const [editingSheikh, setEditingSheikh] = useState<Sheikh | null>(null);
  const [deletingSheikh, setDeletingSheikh] = useState<Sheikh | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  const API_ENDPOINT = "/api/admin/consultants/sheikhs";
  
  // Use mock data for testing - تعليق هذا السطر واستخدام useGetData لاحقًا
  const [sheikhsData, setSheikhsData] = useState<Sheikh[]>(MOCK_SHEIKHS);
  const [isFetchingSheikhs, setIsFetchingSheikhs] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // ==================== API HOOKS - COMMENTED FOR MOCK DATA ====================
  /*
  // Fetch sheikhs data
  const {
    data: sheikhsResponse,
    loading: isFetchingSheikhs,
    error: fetchError,
    refetch: refetchSheikhs,
  } = useGetData<{ data: Sheikh[] }>({
    url: API_ENDPOINT,
    enabled: true,
  });

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
  } = usePutData<Sheikh>(API_ENDPOINT, {
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
  } = useDeleteData<Sheikh>(API_ENDPOINT, {
    showNotifications: true,
    successMessage: "Sheikh deleted successfully",
    errorMessage: "Failed to delete sheikh",
    onDeleteSuccess: () => {
      refetchSheikhs();
      closeDeleteModal();
    },
  });

  // Extract data from response
  const sheikhsData = sheikhsResponse?.data || [];
  */

  // ==================== MOCK DATA FUNCTIONS ====================
  // Simulate fetching data with delay
  useEffect(() => {
    setIsFetchingSheikhs(true);
    const timer = setTimeout(() => {
      setSheikhsData(MOCK_SHEIKHS);
      setIsFetchingSheikhs(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Mock add function
  const handleAddSheikh = async (data: Sheikh) => {
    setIsFetchingSheikhs(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newSheikh = {
      ...data,
      id: Math.max(...sheikhsData.map(s => s.id)) + 1,
      created_at: new Date().toISOString(),
    };
    
    setSheikhsData(prev => [...prev, newSheikh]);
    setIsFetchingSheikhs(false);
    closeAddModal();
  };

  // Mock update function
  const handleEditSheikh = async (data: Sheikh, id: number) => {
    setIsFetchingSheikhs(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setSheikhsData(prev => 
      prev.map(sheikh => 
        sheikh.id === id ? { ...data, id, updated_at: new Date().toISOString() } : sheikh
      )
    );
    setIsFetchingSheikhs(false);
    closeEditModal();
  };

  // Mock delete function
  const handleDeleteSheikh = async (id: number) => {
    setIsFetchingSheikhs(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setSheikhsData(prev => prev.filter(sheikh => sheikh.id !== id));
    setIsFetchingSheikhs(false);
    closeDeleteModal();
  };

  // Mock refetch function
  const refetchSheikhs = () => {
    setIsFetchingSheikhs(true);
    const timer = setTimeout(() => {
      setSheikhsData(MOCK_SHEIKHS);
      setIsFetchingSheikhs(false);
    }, 500);
    return () => clearTimeout(timer);
  };

  // ==================== MODAL HANDLERS ====================
  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);

  const openEditModal = (sheikh: Sheikh) => {
    setEditingSheikh(sheikh);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingSheikh(null);
  };

  const openDeleteModal = (sheikh: Sheikh) => {
    setDeletingSheikh(sheikh);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeletingSheikh(null);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <Header
          title="Sheikhs Management"
          description="Manage Islamic scholars and religious consultants"
        />
        <Button onClick={openAddModal} className="gap-2 bg-primary-color1 hover:bg-primary-color1/90">
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
                <Button variant="outline" onClick={refetchSheikhs}>
                  Try Again
                </Button>
              </AlertDescription>
            </Alert>
          ) : (
     <Table>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Image</TableHead>
      <TableHead>Name & Contact</TableHead>
      <TableHead>Username & Phone</TableHead>
      <TableHead>Experience</TableHead>
      <TableHead>Specialization</TableHead>
      <TableHead>Languages</TableHead>

      <TableHead className="text-right">Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {sheikhsData?.map((sheikh) => (
      <TableRow key={sheikh.id}>
        {/* Image */}
        <TableCell>
          <Avatar className="h-12 w-12">
            <AvatarImage 
              src={sheikh.image} 
              alt={sheikh.name} 
              className="object-cover"
            />
            <AvatarFallback>
      <Image 
              src={images.Unknown} 
              alt={'unknown'} 
              className="object-cover"
            />
            </AvatarFallback>
          </Avatar>
        </TableCell>

        {/* Name & Contact */}
        <TableCell>
          <div className="space-y-1">
            <p className="font-semibold text-gray-900 dark:text-gray-100">{sheikh.name}</p>
            <div className="flex items-center gap-1">
            <MdEmail className=" text-primary-color1"/>
              <p className=" text-gray-600 dark:text-gray-400 truncate max-w-[150px]">
                {sheikh.email}
              </p>
            </div>
          </div>
        </TableCell>

        {/* Username & Phone */}
        <TableCell>
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <User className="w-3 h-3 text-primary-color1" />
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                @{sheikh.username}
              </p>
            </div>
            {sheikh.phone && (
              <div className="flex items-center gap-1">
                <Phone className="text-primary-color1 text-sm size-3"/>
                <p className=" text-gray-600 dark:text-gray-400">{sheikh.phone}</p>
              </div>
            )}
          </div>
        </TableCell>

        {/* Experience */}
        <TableCell>
          <div className="max-w-[180px]">
            <div className="flex items-start gap-1">
              <svg className="w-3 h-3 text-gray-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <p className=" text-gray-700 dark:text-gray-300 line-clamp-2">
                {sheikh.experience}
              </p>
            </div>
          </div>
        </TableCell>

        {/* Specialization */}
        <TableCell>
          <div className="flex flex-wrap gap-1 max-w-[200px]">
            {sheikh.specialization.map((spec, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className=" px-2 py-0.5"
              >
                {spec}
              </Badge>
            ))}
      
          </div>
        </TableCell>

        {/* Languages */}
        <TableCell>
          <div className="flex flex-wrap gap-1 max-w-[120px]">
            {sheikh.languages.map((lang, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className=" px-2 py-0.5"
              >
                {lang}
              </Badge>
            ))}
      
          </div>
        </TableCell>

    

        {/* Actions */}
        <TableCell className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
  
              <DropdownMenuItem 
                onClick={() => openEditModal(sheikh)}
                className="text-sm cursor-pointer"
              >
                <Edit className="mr-2 h-4 w-4 text-blue-500" />
                Edit Information
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => openDeleteModal(sheikh)}
                className="text-sm text-red-600 dark:text-red-500 cursor-pointer"
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
          )}
        </CardContent>
      </Card>

      {/* Empty State */}
      { sheikhsData?.length === 0 && (
            <EmptyState
              title="No Sheikhs Found"
              description="Add your first Islamic scholar to start offering consultations"
              image={images.emptySheikhs}
              action={
                <Button onClick={openAddModal} className="gap-2 bg-primary-color1 hover:bg-primary-color1/90">
                  <Plus className="w-4 h-4" />
                  Add First Sheikh
                </Button>
              }
            />
      )}

      {/* Modals */}
      <AddSheikhModal
        open={isAddModalOpen}
        onClose={closeAddModal}
        onAddSheikh={handleAddSheikh}
        isLoading={isFetchingSheikhs}
      />

      {editingSheikh && (
        <EditSheikhModal
          open={isEditModalOpen}
          onClose={closeEditModal}
          onEditSheikh={(data) => handleEditSheikh(data, editingSheikh.id)}
          isLoading={isFetchingSheikhs}
          editingSheikh={editingSheikh}
        />
      )}

      {deletingSheikh && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onConfirm={() => handleDeleteSheikh(deletingSheikh.id)}
          isLoading={isFetchingSheikhs}
          itemName={deletingSheikh.name}
          description="This will permanently remove the sheikh and all associated consultations from the system."
        />
      )}
    </div>
  );
};

export default SheikhsPage;