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
import { Plus, Edit, Trash2, MoreHorizontal, User, Phone, Star } from "lucide-react";
import { Header } from "@/components/admin/shared";
import DeleteModal from "@/components/admin/shared/DeleteModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EmptyState } from "@/components/shared";
import { MOCK_PSYCHIATRISTS } from "@/constants/temporary";
import Image from "next/image";
import { images } from "@/constants/images";
import Loader from "@/components/shared/Loader";
import { MdEmail, MdWork } from "react-icons/md";
import { AddPsychiatristModal } from "./_components/AddPsychiatristModal";
import { EditPsychiatristModal } from "./_components/EditPsychiatristModal";


const PsychiatristsPage = () => {
  // State management
  const [editingPsychiatrist, setEditingPsychiatrist] = useState<Psychiatrist | null>(null);
  const [deletingPsychiatrist, setDeletingPsychiatrist] = useState<Psychiatrist | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  const [psychiatristsData, setPsychiatristsData] = useState<Psychiatrist[]>(MOCK_PSYCHIATRISTS);
  const [isFetchingPsychiatrists, setIsFetchingPsychiatrists] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Simulate fetching data with delay
  useEffect(() => {
    setIsFetchingPsychiatrists(true);
    const timer = setTimeout(() => {
      setPsychiatristsData(MOCK_PSYCHIATRISTS);
      setIsFetchingPsychiatrists(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Mock add function
  const handleAddPsychiatrist = async (data: Psychiatrist) => {
    setIsFetchingPsychiatrists(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newPsychiatrist = {
      ...data,
      id: Math.max(...psychiatristsData.map(p => p.id)) + 1,
      created_at: new Date().toISOString(),
      is_available: true,
    };
    
    setPsychiatristsData(prev => [...prev, newPsychiatrist]);
    setIsFetchingPsychiatrists(false);
    closeAddModal();
  };

  // Mock update function
  const handleEditPsychiatrist = async (data: Psychiatrist, id: number) => {
    setIsFetchingPsychiatrists(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setPsychiatristsData(prev => 
      prev.map(psychiatrist => 
        psychiatrist.id === id ? { ...data, id, updated_at: new Date().toISOString() } : psychiatrist
      )
    );
    setIsFetchingPsychiatrists(false);
    closeEditModal();
  };

  // Mock delete function
  const handleDeletePsychiatrist = async (id: number) => {
    setIsFetchingPsychiatrists(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setPsychiatristsData(prev => prev.filter(psychiatrist => psychiatrist.id !== id));
    setIsFetchingPsychiatrists(false);
    closeDeleteModal();
  };

  // Modal handlers
  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);

  const openEditModal = (psychiatrist: Psychiatrist) => {
    setEditingPsychiatrist(psychiatrist);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingPsychiatrist(null);
  };

  const openDeleteModal = (psychiatrist: Psychiatrist) => {
    setDeletingPsychiatrist(psychiatrist);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeletingPsychiatrist(null);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <Header
          title="Psychiatrists Management"
          description="Manage mental health professionals and consultants"
        />
        <Button onClick={openAddModal} className="gap-2 ">
          <Plus className="w-4 h-4" />
          Add Psychiatrist
        </Button>
      </div>

  

      {/* Psychiatrists Table */}
      <Card>
        <CardContent className="p-0">
          {isFetchingPsychiatrists ? (
            <Loader />
          ) : fetchError ? (
            <Alert variant="destructive" className="m-6">
              <AlertDescription className="flex flex-col items-center gap-2">
                <span>Failed to load psychiatrists</span>
                <Button variant="outline" onClick={() => window.location.reload()}>
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
                  <TableHead>Rate</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {psychiatristsData?.map((psychiatrist) => (
                  <TableRow key={psychiatrist.id}>
                    {/* Image */}
                    <TableCell>
                      <Avatar className="h-12 w-12">
                        <AvatarImage 
                          src={psychiatrist.image} 
                          alt={psychiatrist.name} 
                          className="object-cover"
                        />
                        <AvatarFallback>
                          <Image 
                            src={images.Unknown} 
                            alt="unknown" 
                            className="object-cover"
                          />
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>

                    {/* Name & Contact */}
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-gray-900 dark:text-gray-100">{psychiatrist.name}</p>
                      
                        </div>
                        <div className="flex items-center gap-1">
                          <MdEmail className="text-primary-color1" />
                          <p className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-[150px]">
                            {psychiatrist.email}
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
                            @{psychiatrist.username}
                          </p>
                        </div>
                        {psychiatrist.phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="text-primary-color1 text-sm size-3" />
                            <p className="text-sm text-gray-600 dark:text-gray-400">{psychiatrist.phone}</p>
                          </div>
                        )}
                      </div>
                    </TableCell>

                    {/* Experience */}
                    <TableCell>
                      <div className="max-w-[180px]">
                        <div className="flex items-start gap-1">
                          <MdWork className="w-3 h-3 text-gray-500 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                            {psychiatrist.experience}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    {/* Specialization */}
                    <TableCell>
                      <div className="flex flex-wrap gap-1 max-w-[150px]">
                        {psychiatrist.specialization.map((spec, index) => (
                          <Badge 
                            key={index} 
                            variant="secondary" 
                            className=" px-2 py-0.5 bg-primary-light/20 text-primary-color1"
                          >
                            {spec}
                          </Badge>
                        ))}
                  
                      </div>
                    </TableCell>

                  

                    {/* Languages */}
                    <TableCell>
                      <div className="flex flex-wrap gap-1 max-w-[120px]">
                        {psychiatrist.languages.map((lang, index) => (
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


                           <TableCell>
                          {psychiatrist.rating ? (
                            <div className="flex items-center ml-2">
                              <Star className="w-3 h-3 text-yellow-500 fill-current" />
                              <span className="text-xs text-gray-600 ml-1">{psychiatrist.rating.toFixed(1)}</span>
                            </div>
                          )
                       : (
                        <span className="text-sm text-gray-500">Not set</span>
                      )}
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
                            onClick={() => openEditModal(psychiatrist)}
                            className="text-sm cursor-pointer"
                          >
                            <Edit className="mr-2 h-4 w-4 text-blue-500" />
                            Edit Information
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => openDeleteModal(psychiatrist)}
                            className="text-sm text-red-600 dark:text-red-500 cursor-pointer"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Psychiatrist
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
      {psychiatristsData?.length === 0 && (
        <EmptyState
          title="No Psychiatrists Found"
          description="Add your first mental health professional to start offering consultations"
          image={images.emptyPsychiatrists}
          action={
            <Button onClick={openAddModal} className="gap-2 bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4" />
              Add First Psychiatrist
            </Button>
          }
        />
      )}

      {/* Modals */}
      <AddPsychiatristModal
        open={isAddModalOpen}
        onClose={closeAddModal}
        onAddPsychiatrist={handleAddPsychiatrist}
        isLoading={isFetchingPsychiatrists}
      />

      {editingPsychiatrist && (
        <EditPsychiatristModal
          open={isEditModalOpen}
          onClose={closeEditModal}
          onEditPsychiatrist={(data) => handleEditPsychiatrist(data, editingPsychiatrist.id)}
          isLoading={isFetchingPsychiatrists}
          editingPsychiatrist={editingPsychiatrist}
        />
      )}

      {deletingPsychiatrist && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onConfirm={() => handleDeletePsychiatrist(deletingPsychiatrist.id)}
          isLoading={isFetchingPsychiatrists}
          itemName={deletingPsychiatrist.name}
          description="This will permanently remove the psychiatrist and all associated consultations from the system."
        />
      )}
    </div>
  );
};

export default PsychiatristsPage;