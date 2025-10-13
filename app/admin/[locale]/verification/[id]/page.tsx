"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/admin/shared";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  ZoomIn,
  MoreVertical,
  Eye,
  Shield,
  AlertCircle,
  BarChart3,
} from "lucide-react";
import Image from "next/image";
import { images } from "@/constants/images";
import {
  getStatusVariant,
  getStatusIcon,
  formatDate,
} from "@/utils/verification-utils";
import {
  ApproveVerificationModal,
  RejectVerificationModal,
} from "../_components";
import { DropdownMenu, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { cn } from "@/lib/utils";

// Types
interface Document {
  id: string;
  type: string;
  name: string;
  url: string;
  status: "pending" | "verified" | "rejected";
  uploadedAt: string;
  previewUrl: string;
  notes: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  address: string;
  dateOfBirth: string;
}

interface VerificationRequest {
  id: string;
  user: User;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
  notes: string;
  documents: Document[];
}

// Mock data
const mockVerificationRequest: VerificationRequest = {
  id: "1",
  user: {
    id: "user_1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    avatar: images.Unknown,
    address: "123 Main St, New York, NY 10001",
    dateOfBirth: "1990-05-15",
  },
  status: "pending",
  submittedAt: "2024-01-15T10:30:00Z",
  notes: "",
  documents: [
    {
      id: "doc_1",
      type: "passport",
      name: "Passport.pdf",
      url: "/documents/passport.pdf",
      status: "pending",
      uploadedAt: "2024-01-15T10:30:00Z",
      previewUrl: images.emptyDocument,
      notes: "",
    },
    {
      id: "doc_2",
      type: "driver_license",
      name: "Driver License.jpg",
      url: "/documents/license.jpg",
      status: "pending",
      uploadedAt: "2024-01-15T10:30:00Z",
      previewUrl: images.emptyDocument,
      notes: "",
    },
    {
      id: "doc_3",
      type: "utility_bill",
      name: "Utility Bill.pdf",
      url: "/documents/bill.pdf",
      status: "pending",
      uploadedAt: "2024-01-15T10:30:00Z",
      previewUrl: images.emptyDocument,
      notes: "",
    },
  ],
};

// Document Rejection Modal Component
const DocumentRejectModal: React.FC<{
  open: boolean;
  onCancel: () => void;
  onConfirm: (rejectionNote: string) => void;
  documentName: string;
}> = ({ open, onCancel, onConfirm, documentName }) => {
  const [rejectionNote, setRejectionNote] = useState("");

  const handleConfirm = () => {
    if (rejectionNote.trim()) {
      onConfirm(rejectionNote);
      setRejectionNote("");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 animate-in zoom-in-95">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
            <XCircle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Reject Document
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Provide a reason for rejection
            </p>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
          Why are you rejecting{" "}
          <strong className="text-gray-900 dark:text-white">
            {documentName}
          </strong>
          ? This feedback will help the user resubmit correctly.
        </p>

        <textarea
          value={rejectionNote}
          onChange={(e) => setRejectionNote(e.target.value)}
          placeholder="Please specify what needs to be corrected..."
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white mb-4 resize-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
          rows={4}
        />

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onCancel} className="px-4">
            Cancel
          </Button>
          <Button
            className="bg-red-600 hover:bg-red-700 text-white px-4"
            onClick={handleConfirm}
            disabled={!rejectionNote.trim()}
          >
            <XCircle className="w-4 h-4 mr-2" />
            Reject Document
          </Button>
        </div>
      </div>
    </div>
  );
};

// Document Card Component
const DocumentCard: React.FC<{
  document: Document;
  onView: (document: Document) => void;
  onDownload: (document: Document) => void;
  onApprove: (documentId: string) => void;
  onReject: (documentId: string, note: string) => void;
}> = ({ document, onView, onDownload, onApprove, onReject }) => {
  const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);

  const getDocumentTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      passport: "Passport",
      driver_license: "Driver's License",
      utility_bill: "Utility Bill",
      id_card: "National ID Card",
      proof_of_address: "Proof of Address",
    };
    return labels[type] || type;
  };

  const getStatusConfig = (status: string) => {
    const config = {
      pending: {
        variant: "secondary" as const,
        icon: Clock,
        color: "text-yellow-600",
      },
      verified: {
        variant: "default" as const,
        icon: CheckCircle,
        color: "text-green-600",
      },
      rejected: {
        variant: "destructive" as const,
        icon: XCircle,
        color: "text-red-600",
      },
    };
    return config[status as keyof typeof config] || config.pending;
  };

  const statusConfig = getStatusConfig(document.status);
  const StatusIcon = statusConfig.icon;

  return (
    <>
      <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-transparent hover:border-l-primary-color1 group">
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            {/* Document Preview */}
            <div className="relative group/preview">
              <div className="relative overflow-hidden rounded-xl border-2 border-gray-200 dark:border-gray-700 transition-all group-hover/preview:border-blue-500">
                <Image
                  src={document.previewUrl}
                  alt={document.name}
                  width={96}
                  height={96}
                  className="object-cover transition-transform group-hover/preview:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:text-white hover:bg-white/20 backdrop-blur-sm"
                    onClick={() => onView(document)}
                  >
                    <ZoomIn className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Document Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-3">
                <div className="min-w-0">
                  <h4 className="font-semibold text-gray-900 dark:text-white truncate">
                    {getDocumentTypeLabel(document.type)}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate mt-1">
                    {document.name}
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                  <Badge variant={statusConfig.variant} className="gap-1.5">
                    <StatusIcon className="w-3 h-3" />
                    {document.status.charAt(0).toUpperCase() +
                      document.status.slice(1)}
                  </Badge>

                  {/* Document Actions */}
                  {document.status === "pending" && (
                    <div className="flex items-center gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-9 w-9 p-0 text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                        onClick={() => onApprove(document.id)}
                        title="Approve Document"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-9 w-9 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        onClick={() => setIsRejectModalVisible(true)}
                        title="Reject Document"
                      >
                        <XCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-3">
                <Calendar className="w-3 h-3" />
                Uploaded {formatDate(document.uploadedAt)}
              </div>

              {/* Rejection Note */}
              {document.notes && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-700 dark:text-red-300">
                  <strong>Rejection Reason:</strong> {document.notes}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onView(document)}
                  className="gap-1.5 rounded-lg"
                >
                  <ZoomIn className="w-4 h-4" />
                  View
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onDownload(document)}
                  className="gap-1.5 rounded-lg"
                >
                  <Download className="w-4 h-4" />
                  Download
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <DocumentRejectModal
        open={isRejectModalVisible}
        onCancel={() => setIsRejectModalVisible(false)}
        onConfirm={(rejectionNote) => {
          onReject(document.id, rejectionNote);
          setIsRejectModalVisible(false);
        }}
        documentName={document.name}
      />
    </>
  );
};

// Stats Card Component
const StatsCard: React.FC<{
  title: string;
  value: number;
  color: string;
  icon: React.ElementType;
  description?: string;
}> = ({ title, value, color, icon: Icon, description }) => (
  <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
    <div className={cn("p-3 rounded-xl", color)}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div>
      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
        {title}
      </p>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">
        {value}
      </p>
      {description && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {description}
        </p>
      )}
    </div>
  </div>
);

// Statistics Summary Component
const StatisticsSummary: React.FC<{
  documentStats: {
    total: number;
    verified: number;
    pending: number;
    rejected: number;
  };
  approvalProgress: number;
}> = ({ documentStats, approvalProgress }) => {
  const getCompletionColor = (progress: number) => {
    if (progress >= 80) return "text-green-600";
    if (progress >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getCompletionStatus = (progress: number) => {
    if (progress === 100) return "Complete";
    if (progress >= 80) return "Almost Complete";
    if (progress >= 50) return "In Progress";
    return "Needs Attention";
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        title="Total Documents"
        value={documentStats.total}
        color="bg-blue-500"
        icon={FileText}
        description="All submitted"
      />
      <StatsCard
        title="Verified"
        value={documentStats.verified}
        color="bg-green-500"
        icon={CheckCircle}
        description={`${Math.round(
          (documentStats.verified / documentStats.total) * 100
        )}% completed`}
      />
      <StatsCard
        title="Pending"
        value={documentStats.pending}
        color="bg-yellow-500"
        icon={Clock}
        description="Awaiting review"
      />
      <StatsCard
        title="Rejected"
        value={documentStats.rejected}
        color="bg-red-500"
        icon={XCircle}
        description="Need resubmission"
      />
    </div>
  );
};

// Main Component
const VerificationDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const [request, setRequest] = useState<VerificationRequest>(
    mockVerificationRequest
  );
  const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
  const [isApproveModalVisible, setIsApproveModalVisible] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null
  );
  const [isDocumentModalVisible, setIsDocumentModalVisible] = useState(false);

  const StatusIcon = getStatusIcon(request.status);

  // Calculate approval progress
  const totalDocuments = request.documents.length;
  const approvedDocuments = request.documents.filter(
    (doc) => doc.status === "verified"
  ).length;
  const approvalProgress =
    totalDocuments > 0 ? (approvedDocuments / totalDocuments) * 100 : 0;

  const handleUpdateStatus = (status: string, note?: string) => {
    const updatedRequest = {
      ...request,
      status,
      notes: note || request.notes,
    };
    setRequest(updatedRequest);
    // API call would go here
  };

  const handleApproveDocument = (documentId: string) => {
    const updatedDocuments = request.documents.map((doc) =>
      doc.id === documentId
        ? { ...doc, status: "verified" as const, notes: "" }
        : doc
    );

    const updatedRequest = {
      ...request,
      documents: updatedDocuments,
    };

    setRequest(updatedRequest);

    // Auto-show approve modal when all documents are approved
    const newApprovedCount = updatedDocuments.filter(
      (doc) => doc.status === "verified"
    ).length;
    if (newApprovedCount === totalDocuments) {
      setTimeout(() => setIsApproveModalVisible(true), 500);
    }
  };

  const handleRejectDocument = (documentId: string, note: string) => {
    const updatedDocuments = request.documents.map((doc) =>
      doc.id === documentId
        ? { ...doc, status: "rejected" as const, notes: note }
        : doc
    );

    setRequest({
      ...request,
      documents: updatedDocuments,
    });
  };

  const handleViewDocument = (document: Document) => {
    setSelectedDocument(document);
    setIsDocumentModalVisible(true);
  };

  const handleDownloadDocument = (document: Document) => {
    console.log("Downloading document:", document);
    // window.open(document.url, '_blank');
  };

  const getDocumentStats = () => ({
    total: request.documents.length,
    verified: request.documents.filter((doc) => doc.status === "verified")
      .length,
    pending: request.documents.filter((doc) => doc.status === "pending").length,
    rejected: request.documents.filter((doc) => doc.status === "rejected")
      .length,
  });

  const documentStats = getDocumentStats();

  return (
    <div className="max-h-screen overflow-auto bg-gray-50/30 dark:bg-gray-900/30 pb-32 p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Header
            title="Verification Request Details"
            description="Review user documents and make verification decisions"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2 rounded-lg">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 rounded-xl">
            <DropdownMenuItem
              onClick={() => setIsApproveModalVisible(true)}
              disabled={request.status === "approved"}
              className="gap-2 cursor-pointer"
            >
              <CheckCircle className="w-4 h-4 text-green-600" />
              Approve Verification
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setIsRejectModalVisible(true)}
              disabled={request.status === "rejected"}
              className="gap-2 cursor-pointer"
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
          <StatisticsSummary
            documentStats={documentStats}
            approvalProgress={approvalProgress}
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-6">
          {/* User Info Card */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-lg">
                <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <User className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </div>
                User Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Image
                  src={request.user.avatar}
                  alt={request.user.name}
                  width={72}
                  height={72}
                  className="rounded-2xl border-4 border-white shadow-sm"
                />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                    {request.user.name}
                  </h3>
                  <Badge
                    variant={getStatusVariant(request.status)}
                    className="gap-1.5 mt-2 px-3 py-1"
                  >
                    <StatusIcon className="w-3 h-3" />
                    {request.status.replace("_", " ")}
                  </Badge>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <Mail className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {request.user.email}
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {request.user.phone}
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {request.user.address}
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <Calendar className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Born {formatDate(request.user.dateOfBirth)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
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

      {/* Document Viewer Modal */}
      {isDocumentModalVisible && selectedDocument && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-6xl max-h-[90vh] w-full animate-in zoom-in-95">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                  {selectedDocument.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {formatDate(selectedDocument.uploadedAt)}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsDocumentModalVisible(false)}
                className="rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                ✕
              </Button>
            </div>

            <div className="p-6 max-h-[60vh] overflow-auto flex items-center justify-center">
              <Image
                src={selectedDocument.previewUrl}
                alt={selectedDocument.name}
                width={800}
                height={600}
                className="max-w-full h-auto rounded-xl shadow-lg"
              />
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="outline"
                onClick={() => handleDownloadDocument(selectedDocument)}
                className="gap-2 rounded-lg"
              >
                <Download className="w-4 h-4" />
                Download
              </Button>
              <Button
                onClick={() => setIsDocumentModalVisible(false)}
                className="rounded-lg"
              >
                Close Viewer
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerificationDetailsPage;
