import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText } from "lucide-react";
import { DocumentItem } from "./DocumentItem";

interface DocumentsListProps {
  documents: RequiredDocument[];
  isEditing: boolean;
  onAddDocument: () => void;
  onUpdateDocument: (
    id: string,
    field: keyof RequiredDocument,
    value: unknown
  ) => void;
  onRemoveDocument: (id: string) => void;
  onAddFileType: (id: string, fileType: string) => void;
  onRemoveFileType: (id: string, fileType: string) => void;
}

export const DocumentsList: React.FC<DocumentsListProps> = ({
  documents,
  isEditing,
  onAddDocument,
  onUpdateDocument,
  onRemoveDocument,

  onAddFileType,
  onRemoveFileType,
}) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <FileText className="w-5 h-5 text-primary-color1" />
        Required Documents for Verification
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          ({documents.length} documents)
        </span>
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-6">
      {documents.map((doc, index) => (
        <DocumentItem
          key={doc.id}
          document={doc}
          index={index}
          isEditing={isEditing}
          totalDocuments={documents.length}
          onUpdate={onUpdateDocument}
          onRemove={onRemoveDocument}
          onAddFileType={onAddFileType}
          onRemoveFileType={onRemoveFileType}
        />
      ))}

      {isEditing && (
        <div className="flex justify-center pt-4">
          <Button
            onClick={onAddDocument}
            className="flex items-center gap-2"
            variant="outline"
          >
            <Plus className="w-4 h-4" />
            Add New Document Requirement
          </Button>
        </div>
      )}
    </CardContent>
  </Card>
);
