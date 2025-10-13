import { initialRequiredDocuments } from "@/constants/temporary";
import { useState, useCallback } from "react";

export const useRequiredDocuments = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [documents, setDocuments] = useState<RequiredDocument[]>(
    initialRequiredDocuments
  );

  const addNewDocument = useCallback(() => {
    const newDocument: RequiredDocument = {
      id: Date.now().toString(),
      title: "New Document Requirement",
      description: "Description of the document requirement",
      fileTypes: ["pdf", "jpg"],
      isRequired: false,
      forUserType: "all",
      instructions: "Instructions for uploading this document...",
    };
    setDocuments((prev) => [...prev, newDocument]);
  }, [documents.length]);

  const removeDocument = useCallback((id: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
  }, []);

  const updateDocument = useCallback(
    (id: string, field: keyof RequiredDocument, value: unknown) => {
      setDocuments((prev) =>
        prev.map((doc) => (doc.id === id ? { ...doc, [field]: value } : doc))
      );
    },
    []
  );

  const addFileType = useCallback((id: string, fileType: string) => {
    if (!fileType.trim()) return;
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === id
          ? {
              ...doc,
              fileTypes: [...doc.fileTypes, fileType.trim().toLowerCase()],
            }
          : doc
      )
    );
  }, []);

  const removeFileType = useCallback((id: string, fileType: string) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === id
          ? {
              ...doc,
              fileTypes: doc.fileTypes.filter((type) => type !== fileType),
            }
          : doc
      )
    );
  }, []);

  const saveDocuments = async () => {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
    setIsEditing(false);
  };

  const cancelEditing = () => {
    setIsEditing(false);
  };

  return {
    isEditing,
    saving,
    documents: documents,
    actions: {
      setIsEditing,
      addNewDocument,
      removeDocument,
      updateDocument,
      addFileType,
      removeFileType,
      saveDocuments,
      cancelEditing,
    },
  };
};
