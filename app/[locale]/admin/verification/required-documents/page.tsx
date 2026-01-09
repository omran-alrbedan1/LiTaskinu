"use client";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/admin/shared";
import { Save, Edit3 } from "lucide-react";
import { useRequiredDocuments } from "@/hooks/useRequiredDocuments";
import { DocumentsList } from "./_components/DocumentList";

// Header Component
const HeaderSection = ({
  isEditing,
  saving,
  onEdit,
  onSave,
  onCancel,
}: {
  isEditing: boolean;
  saving: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}) => (
  <div className="mb-6 flex items-center justify-between">
    <Header
      title="Manage Required Documents"
      description="Configure the documents required for user verification and profile completion"
    />
    <div className="flex items-center gap-2">
      {isEditing ? (
        <>
          <Button variant="outline" onClick={onCancel} disabled={saving}>
            Cancel
          </Button>
          <Button
            onClick={onSave}
            disabled={saving}
            className="flex items-center gap-2 bg-primary-color1 text-white"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </>
      ) : (
        <Button
          onClick={onEdit}
          className="flex items-center gap-2 bg-primary-color1 text-white"
        >
          <Edit3 className="w-4 h-4" />
          Edit Documents
        </Button>
      )}
    </div>
  </div>
);

// Main Component
const RequiredDocumentsPage = () => {
  const {
    isEditing,
    saving,
    documents,
    actions: {
      setIsEditing,
      addNewDocument,
      removeDocument,
      updateDocument,
      saveDocuments,
      cancelEditing,
    },
  } = useRequiredDocuments();

  return (
    <div className="mx-auto pb-32 p-6 max-h-[90vh] sidebar-scrollbar overflow-auto">
      <HeaderSection
        isEditing={isEditing}
        saving={saving}
        onEdit={() => setIsEditing(true)}
        onSave={saveDocuments}
        onCancel={cancelEditing}
      />

      <div className="space-y-6">
        <DocumentsList
          documents={documents}
          isEditing={isEditing}
          onAddDocument={addNewDocument}
          onUpdateDocument={updateDocument}
          onRemoveDocument={removeDocument}
        />
      </div>
    </div>
  );
};

export default RequiredDocumentsPage;
