"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreVertical,
  User,
  Mail,
  Phone,
  Calendar,
  Eye,
  CheckCircle,
  XCircle,
} from "lucide-react";
import {
  getStatusVariant,
  getStatusIcon,
  formatDate,
} from "@/utils/verification-utils";
import Image from "next/image";
import { images } from "@/constants/images";
import { Card } from "@/components/ui/card";
import { ApproveVerificationModal, RejectVerificationModal } from ".";

interface VerificationRequestItemProps {
  request: VerificationRequest;
  documentStats: {
    verified: number;
    pending: number;
    rejected: number;
    total: number;
  };
  onUpdateStatus: (
    id: string,
    status: VerificationStatus,
    note?: string
  ) => void;
  onReview: (id: string) => void;
}

const VerificationRequestItem: React.FC<VerificationRequestItemProps> = ({
  request,
  documentStats,
  onUpdateStatus,
  onReview,
}) => {
  const StatusIcon = getStatusIcon(request.status);
  const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
  const [isApproveModalVisible, setIsApproveModalVisible] = useState(false);

  return (
    <>
      <Card>
        <div className="flex items-start justify-between p-6">
          {/* User Info */}
          <div className="flex-1">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-color1 text-white rounded-full">
                <Image
                  src={request.user.avatar || images.Unknown}
                  height={46}
                  width={46}
                  alt="user image"
                  className="rounded-full"
                />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    {request.user.name}
                  </h3>
                  <Badge
                    variant={getStatusVariant(request.status)}
                    className="flex items-center gap-1"
                  >
                    <StatusIcon className="w-4 h-4" />
                    {request.status.replace("_", " ")}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                  <div className="flex items-center gap-1 text-pri">
                    <Mail className="w-4 h-4 text-primary-color1" />
                    {request.user.email}
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="w-4 h-4 text-primary-color1" />
                    {request.user.phone}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-primary-color1" />
                    {formatDate(request.submittedAt)}
                  </div>
                </div>

                {/* Document Stats */}
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Documents: {documentStats.total}
                  </span>
                  {documentStats.verified > 0 && (
                    <span className="text-green-600 dark:text-green-400">
                      Verified: {documentStats.verified}
                    </span>
                  )}
                  {documentStats.pending > 0 && (
                    <span className="text-yellow-600 dark:text-yellow-400">
                      Pending: {documentStats.pending}
                    </span>
                  )}
                  {documentStats.rejected > 0 && (
                    <span className="text-red-600 dark:text-red-400">
                      Rejected: {documentStats.rejected}
                    </span>
                  )}
                </div>

                {/* Rejection Note */}
                {request.notes && (
                  <div className="mt-2 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-sm text-red-700 dark:text-red-300">
                    <strong>Rejection Reason:</strong> {request.notes}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              className="bg-primary-color1 text-white"
              onClick={() => onReview(request.id)}
            >
              <Eye className="w-4 h-4 mr-1" />
              Review
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => setIsApproveModalVisible(true)}
                  disabled={request.status === "approved"}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setIsRejectModalVisible(true)}
                  disabled={request.status === "rejected"}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onUpdateStatus(request.id, "under_review")}
                  disabled={request.status === "under_review"}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Mark Under Review
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </Card>

      {/* Reject Modal */}
      <RejectVerificationModal
        open={isRejectModalVisible}
        onCancel={() => setIsRejectModalVisible(false)}
        onConfirm={(rejectionNote) => {
          onUpdateStatus(request.id, "rejected", rejectionNote);
          setIsRejectModalVisible(false);
        }}
        userName={request.user.name}
      />

      {/* Approve Modal */}
      <ApproveVerificationModal
        open={isApproveModalVisible}
        onCancel={() => setIsApproveModalVisible(false)}
        onConfirm={() => {
          onUpdateStatus(request.id, "approved");
          setIsApproveModalVisible(false);
        }}
        userName={request.user.name}
      />
    </>
  );
};

export default VerificationRequestItem;
