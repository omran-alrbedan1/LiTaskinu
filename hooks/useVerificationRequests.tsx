import { initialVerificationRequests } from "@/constants/temporary";
import { useState, useCallback } from "react";

export const useVerificationRequests = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [requests, setRequests] = useState<VerificationRequest[]>(
    initialVerificationRequests
  );

  // Filter requests based on search and filters
  // In your useVerificationRequests hook
  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.user.email!.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || request.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Update request status
  const updateRequestStatus = useCallback(
    (id: string, status: VerificationRequest["status"]) => {
      setRequests((prev) =>
        prev.map((request) =>
          request.id === id ? { ...request, status } : request
        )
      );
    },
    []
  );

  // Get document count by status
  const getDocumentStats = (documents: VerificationRequest["documents"]) => {
    const verified = documents.filter(
      (doc) => doc.status === "verified"
    ).length;
    const pending = documents.filter((doc) => doc.status === "pending").length;
    const rejected = documents.filter(
      (doc) => doc.status === "rejected"
    ).length;

    return { verified, pending, rejected, total: documents.length };
  };

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    requests,
    filteredRequests,
    updateRequestStatus,
    getDocumentStats,
  };
};
