//@ts-nocheck
"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/admin/shared";
import {
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  MoreVertical,
  AlertCircle,
  BarChart3,
} from "lucide-react";
import {
  ApproveVerificationModal,
  RejectVerificationModal,
} from "../_components";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import StatsCard from "./_components/StatsCard";
import UserInfoCard from "./_components/UserInfoCard";
import { DocumentCard, DocumentViewerModal } from "./_components";

// Mock data with mixed file types
const MOCK_VERIFICATION_REQUEST = {
  user: {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "/images/userTest.jpg",
    address: "123 Main St, New York, NY 10001",
    dateOfBirth: "1990-05-15",
  },
  status: "pending",
  submittedAt: "2024-01-15T10:30:00Z",
  notes: "",
  documents: [
    {
      id: 1,
      type: "passport",
      name: "Passport",
      url: "/documents/bill.pdf",
      status: "pending",
      uploadedAt: "2024-01-15T10:30:00Z",
      previewUrl: "/images/pdf-placeholder.png",
      notes: "",
      fileType: "pdf",
    },
    {
      id: 2,
      type: "driver_license",
      name: "Driver License.jpg",
      url: "/documents/license.jpg",
      status: "pending",
      uploadedAt: "2024-01-15T10:30:00Z",
      previewUrl: "/images/EmptyDocument.png",
      notes: "",
      fileType: "image",
    },
    {
      id: 3,
      type: "utility_bill",
      name: "Utility Bill.pdf",
      url: "/documents/bill.pdf",
      status: "pending",
      uploadedAt: "2024-01-15T10:30:00Z",
      previewUrl: "/images/pdf-placeholder.png",
      notes: "",
      fileType: "pdf",
    },
  ],
};

const VerificationDetailsPage = () => {
  const [request, setRequest] = useState(MOCK_VERIFICATION_REQUEST);
  const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
  const [isApproveModalVisible, setIsApproveModalVisible] = useState(false);
  const [selectedDocument, setSelectedDocument] =
    useState<VerificationDocument | null>(null);
  const [isDocumentModalVisible, setIsDocumentModalVisible] = useState(false);

  const handleUpdateStatus = (status: VerificationStatus, note?: string) => {
    const updatedRequest = {
      ...request,
      status,
      notes: note || request.notes,
    };
    setRequest(updatedRequest);
  };

  const handleApproveDocument = (documentId: string) => {
    const updatedDocuments = request.documents.map((doc) =>
      doc.id === documentId
        ? { ...doc, status: "verified" as DocumentStatus, notes: "" }
        : doc
    );

    const updatedRequest = {
      ...request,
      documents: updatedDocuments,
    };

    setRequest(updatedRequest);

    // Auto-show approve modal when all documents are approved
    const totalDocuments = request.documents.length;
    const newApprovedCount = updatedDocuments.filter(
      (doc) => doc.status === "verified"
    ).length;

    if (newApprovedCount === totalDocuments) {
      setTimeout(() => setIsApproveModalVisible(true), 500);
    }
  };

  const handleRejectDocument = (documentId: number, note: string) => {
    const updatedDocuments = request.documents.map((doc) =>
      doc.id === documentId
        ? { ...doc, status: "rejected" as DocumentStatus, notes: note }
        : doc
    );

    setRequest({
      ...request,
      documents: updatedDocuments,
    });
  };

  const handleViewDocument = (document: VerificationDocument) => {
    if (document.fileType === "pdf") {
      // For PDFs, open directly in browser
      window.open(document.url, "_blank", "noopener,noreferrer");
    } else {
      // For images, open in modal
      setSelectedDocument(document);
      setIsDocumentModalVisible(true);
    }
  };

  const handleDownloadDocument = (document: VerificationDocument) => {};

  const getDocumentStats = () => ({
    total: request.documents.length,
    verified: request.documents.filter((doc: any) => doc.status === "verified")
      .length,
    pending: request.documents.filter((doc: any) => doc.status === "pending")
      .length,
    rejected: request.documents.filter((doc: any) => doc.status === "rejected")
      .length,
  });

  const documentStats = getDocumentStats();

  return (
    <div className="max-h-[90vh] overflow-auto sidebar-scrollbar bg-gray-50/30 dark:bg-gray-900/30 pb-32 p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <Header
          title="Verification Request Details"
          description="Review user documents and make verification decisions"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2 rounded-lg">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 rounded-xl p-3">
            <DropdownMenuItem
              onClick={() => setIsApproveModalVisible(true)}
              disabled={request.status === "approved"}
              className="gap-2 p-2 cursor-pointer"
            >
              <CheckCircle className="w-4 h-4 text-green-600" />
              Approve Verification
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setIsRejectModalVisible(true)}
              disabled={request.status === "rejected"}
              className="gap-2 p-2 cursor-pointer"
            >
              <XCircle className="w-4 h-4 text-red-600" />
              Reject Verification
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Statistics Summary Card */}
      <Card className="mb-8 border-0 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-lg">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <BarChart3 className="w-5 h-5 text-blue-600" />
            </div>
            Verification Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard
              title="Total Documents"
              value={documentStats.total}
              color="bg-blue-500"
              icon={FileText}
            />
            <StatsCard
              title="Verified"
              value={documentStats.verified}
              color="bg-green-500"
              icon={CheckCircle}
            />
            <StatsCard
              title="Pending"
              value={documentStats.pending}
              color="bg-yellow-500"
              icon={Clock}
            />
            <StatsCard
              title="Rejected"
              value={documentStats.rejected}
              color="bg-red-500"
              icon={XCircle}
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-6">
          <UserInfoCard user={request.user} status={request.status} />
        </div>

        {/* Right Column - Documents */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-lg">
                <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <FileText className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </div>
                Submitted Documents
                <span className="text-sm font-normal text-gray-500 ml-2">
                  {request.documents.length} documents
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {request.documents.map((document) => (
                  <DocumentCard
                    key={document.id}
                    document={document}
                    onView={handleViewDocument}
                    onDownload={handleDownloadDocument}
                    onApprove={handleApproveDocument}
                    onReject={handleRejectDocument}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Rejection Notes */}
          {request.notes && (
            <Card className="mt-6 border-l-4 border-l-red-500 bg-red-50 dark:bg-red-900/20 border-0">
              <CardHeader>
                <CardTitle className="text-red-700 dark:text-red-300 flex items-center gap-3">
                  <AlertCircle className="w-5 h-5" />
                  Rejection Reason
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-700 dark:text-red-300 leading-relaxed">
                  {request.notes}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Modals */}
      <RejectVerificationModal
        open={isRejectModalVisible}
        onCancel={() => setIsRejectModalVisible(false)}
        onConfirm={(rejectionNote) => {
          handleUpdateStatus("rejected", rejectionNote);
          setIsRejectModalVisible(false);
        }}
        userName={request.user.name}
      />

      <ApproveVerificationModal
        open={isApproveModalVisible}
        onCancel={() => setIsApproveModalVisible(false)}
        onConfirm={() => {
          handleUpdateStatus("approved");
          setIsApproveModalVisible(false);
        }}
        userName={request.user.name}
      />

      <DocumentViewerModal
        document={selectedDocument}
        isOpen={isDocumentModalVisible}
        onClose={() => setIsDocumentModalVisible(false)}
        onDownload={handleDownloadDocument}
      />
    </div>
  );
};

export default VerificationDetailsPage;
