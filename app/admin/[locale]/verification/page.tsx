"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header, StatsCard } from "@/components/admin/shared";
import { Input } from "@/components/ui/input";
import { Search, FileText, Clock, CheckCircle, XCircle } from "lucide-react";
import { useVerificationRequests } from "@/hooks/useVerificationRequests";
import { EmptyState } from "@/components/shared";
import { images } from "@/constants/images";
import VerificationRequestItem from "./_components/VerificationRequestItem";

const SearchAndFilters: React.FC<{
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
}> = ({ searchTerm, onSearchChange, statusFilter, onStatusFilterChange }) => (
  <Card className="mb-6">
    <CardContent className="p-4">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by name, email, or user ID..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Status Filter */}
        <div className="w-full lg:w-48">
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="under_review">Under Review</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>
    </CardContent>
  </Card>
);

const VerificationPage = () => {
  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    requests,
    filteredRequests,
    updateRequestStatus,
    getDocumentStats,
  } = useVerificationRequests();

  const handleReview = (requestId: string) => {
    window.location.href = `/admin/en/verification/${requestId}`;
  };

  const hasActiveFilters = searchTerm || statusFilter !== "all";

  return (
    <div className="mx-auto pb-32 p-6 max-h-screen sidebar-scrollbar overflow-auto">
      {/* Header */}
      <Header
        title="Document Verification Requests"
        description="Review and manage user document verification requests"
      />

      {/* Stats Overview */}
      <div className="grid grid-cols-1 mt-8 md:grid-cols-4 gap-4 mb-6">
        <StatsCard
          title="Total Requests"
          value={requests.length}
          icon={FileText}
          iconBgColor="from-blue-500 to-blue-600"
        />
        <StatsCard
          title="Pending"
          value={requests.filter((r) => r.status === "pending").length}
          icon={Clock}
          iconBgColor="from-yellow-500 to-yellow-600"
        />
        <StatsCard
          title="Approved"
          value={requests.filter((r) => r.status === "approved").length}
          icon={CheckCircle}
          iconBgColor="from-green-500 to-green-600"
        />
        <StatsCard
          title="Rejected"
          value={requests.filter((r) => r.status === "rejected").length}
          icon={XCircle}
          iconBgColor="from-red-500 to-red-600"
        />
      </div>

      {/* Search and Filters */}
      <SearchAndFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      {/* Verification Requests List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Verification Requests</span>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              {filteredRequests.length} requests found
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className=" space-y-8">
            {filteredRequests.map((request) => (
              <VerificationRequestItem
                key={request.id}
                request={request}
                documentStats={getDocumentStats(request.documents)}
                onUpdateStatus={updateRequestStatus}
                onReview={handleReview}
              />
            ))}

            {filteredRequests.length === 0 && (
              <EmptyState
                title="No verification requests found"
                description={
                  hasActiveFilters
                    ? "Try adjusting your search or filter criteria"
                    : "No verification requests have been submitted yet"
                }
                image={images.emptyDocument}
                imageClassName="size-64"
                hasFilters={hasActiveFilters}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerificationPage;
