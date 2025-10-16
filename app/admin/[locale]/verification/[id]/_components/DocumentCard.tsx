import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  CheckCircle,
  XCircle,
  Download,
  ZoomIn,
  File,
  Clock,
} from "lucide-react";
import Image from "next/image";
import { formatDate } from "@/utils/verification-utils";
import DocumentRejectModal from "./DocumentRejectModal";

const DocumentCard: React.FC<{
  document: any;
  onView: (document: any) => void;
  onDownload: (document: any) => void;
  onApprove: (documentId: string) => void;
  onReject: (documentId: string, note: string) => void;
}> = ({ document, onView, onDownload, onApprove, onReject }) => {
  const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);

  const STATUS_CONFIG = {
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
  const statusConfig = STATUS_CONFIG[document.status];
  const StatusIcon = statusConfig.icon;

  return (
    <>
      <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-transparent hover:border-l-primary-color1 group">
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <div className="relative overflow-hidden rounded-xl border-2 border-gray-200 dark:border-gray-700 transition-all group-hover/preview:border-blue-500 w-24 h-24 flex items-center justify-center">
              {document.fileType == "image" ? (
                <>
                  <Image
                    src={document.previewUrl}
                    alt={document.name}
                    width={96}
                    height={96}
                    className="object-cover transition-transform group-hover/preview:scale-105 w-full h-full"
                  />
                </>
              ) : (
                // PDF Preview
                <>
                  <div className="flex flex-col items-center justify-center p-2 text-center">
                    <File className="w-8 h-8 text-red-500 mb-1" />
                    <span className="text-xs text-gray-600 dark:text-gray-400 truncate w-full">
                      PDF
                    </span>
                  </div>
                </>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-3">
                <div className="min-w-0">
                  <h4 className="font-semibold text-gray-900 dark:text-white truncate">
                    {document.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {document.fileType.toUpperCase()}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                  <Badge variant={statusConfig.variant} className="gap-1.5">
                    <StatusIcon className="w-3 h-3" />
                    {document.status.charAt(0).toUpperCase() +
                      document.status.slice(1)}
                  </Badge>

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

              {document.notes && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-700 dark:text-red-300">
                  <strong>Rejection Reason:</strong> {document.notes}
                </div>
              )}

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onView(document)}
                  className="gap-1.5 rounded-lg"
                >
                  <ZoomIn className="w-4 h-4" />
                  {document.fileType === "pdf" ? "Open PDF" : "View"}
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
export default DocumentCard;
