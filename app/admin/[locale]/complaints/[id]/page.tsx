"use client";
import { useState, useEffect } from "react";
import { FileText, Users, Download, Calendar } from "lucide-react";
import { Header, SendWarningModal } from "@/components/admin/shared";
import { message } from "antd";
import { BanModal } from "@/components/admin/shared";
import { DeleteComplaintModal } from "../_components";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button as ShadButton } from "@/components/ui/button";
import { ActionMenu, ResponseSection, UserCard } from "./_components";

interface ModalState {
  ban: boolean;
  delete: boolean;
  warning: boolean;
}

const MOCK_COMPLAINT: Complaint = {
  id: "101",
  reporter: {
    id: 1,
    name: "Ahmed Mohamed",
    email: "ahmed@example.com",
    phone: "+966500000001",
  },
  reportedUser: {
    id: 2,
    name: "Sarah Khaled",
    email: "sara@example.com",
    phone: "+966500000002",
  },
  type: "harassment",
  date: "2024-10-01 10:30",
  status: "pending",
  description:
    "The user sent repeated inappropriate messages despite my requests to stop. The behavior started two weeks ago and has escalated over time.",
  attachments: ["screenshot1.jpg", "chat_log.pdf"],
  wasBanned: false,
};

const ComplaintDetailsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [modals, setModals] = useState<ModalState>({
    ban: false,
    delete: false,
    warning: false,
  });

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const openModal = (modal: keyof ModalState) =>
    setModals((prev) => ({ ...prev, [modal]: true }));

  const closeModals = () =>
    setModals({ ban: false, delete: false, warning: false });

  const handleSuccess = (action: string, userName?: string) => {
    const messages = {
      ban: `User ${userName} has been banned successfully`,
      delete: "Complaint deleted successfully",
      warning: `Warning sent to ${userName}`,
    };
    message.success(messages[action as keyof typeof messages]);
  };

  const handleAction = (action: string) => {
    const actionMap: Record<string, keyof ModalState> = {
      warn: "warning",
      ban: "ban",
      delete: "delete",
    };

    const modalKey = actionMap[action];
    if (modalKey) {
      openModal(modalKey);
    }
  };

  const handleBanConfirm = (banData: any) => {
    handleSuccess("ban", MOCK_COMPLAINT.reportedUser.name);
    closeModals();
  };

  const handleDeleteConfirm = (reason: string) => {
    handleSuccess("delete");
    closeModals();
  };

  const handleWarningConfirm = (warningData: any) => {
    handleSuccess("warning", MOCK_COMPLAINT.reportedUser.name);
    closeModals();
  };

  const handleCloseModal = (): void => {
    closeModals();
  };

  if (isLoading) {
    return (
      <div className="mx-auto pb-24 p-6 max-h-screen sidebar-scrollbar overflow-auto">
        <div className="mb-6">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 animate-pulse mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse"></div>
        </div>
        <div className="flex justify-end mb-6">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
        </div>
        {/* Loading skeleton for content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-6">
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
          <div className="space-y-6">
            <div className="h-80 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  const AttachmentsSection = ({ attachments }: { attachments: string[] }) => (
    <div>
      <label className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-2 mb-3">
        <Download className="w-4 h-4" />
        Attachments
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {attachments.map((attachment, index) => (
          <ShadButton
            key={index}
            variant="outline"
            className="w-full h-full flex justify-between py-3 px-4 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500"
          >
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {attachment}
              </span>
            </div>
            <Download className="w-4 h-4 text-gray-400 dark:text-gray-500" />
          </ShadButton>
        ))}
      </div>
    </div>
  );

  return (
    <div className="mx-auto pb-24 p-6 max-h-[90vh] sidebar-scrollbar overflow-auto">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <Header
          title={`Complaint #${MOCK_COMPLAINT.id}`}
          description="Review complaint details and take appropriate action"
        />
        <ActionMenu onAction={handleAction} />
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column - Complaint Details */}
        <div className="xl:col-span-2 space-y-6">
          {/* Complaint Overview Card */}
          <Card className="shadow-sm border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary-color1" />
                  <CardTitle className="text-xl text-gray-900 dark:text-white">
                    Complaint Overview
                  </CardTitle>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Type:
                  </span>
                  <Badge
                    variant="outline"
                    className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                  >
                    {MOCK_COMPLAINT.type}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-2">
                      Date & Time
                    </label>
                    <div className="flex items-center gap-2 text-gray-900 dark:text-gray-100 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                      <Calendar className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                      {MOCK_COMPLAINT.date}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-2">
                      Complaint ID
                    </label>
                    <div className="flex items-center gap-2 text-gray-900 dark:text-gray-100 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                      <Calendar className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                      {`#${MOCK_COMPLAINT.id}`}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-2">
                    Description
                  </label>
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 min-h-[120px]">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                      {MOCK_COMPLAINT.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Attachments Section */}
              <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <AttachmentsSection attachments={MOCK_COMPLAINT.attachments} />
              </div>
            </CardContent>
          </Card>

          <ResponseSection />
        </div>

        {/* Right Column - Parties Only */}
        <div className="space-y-6">
          <Card className="shadow-sm border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary-color1" />
                <CardTitle className="text-xl text-gray-900 dark:text-white">
                  Involved Parties
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <UserCard
                user={MOCK_COMPLAINT.reporter}
                title="Reporter"
                description="Filed the complaint"
                variant="reporter"
              />
              <UserCard
                user={MOCK_COMPLAINT.reportedUser}
                title="Reported User"
                description="Subject of complaint"
                variant="reported"
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modals */}
      <BanModal
        open={modals.ban}
        onCancel={handleCloseModal}
        user={{
          id: MOCK_COMPLAINT.reportedUser.id,
          name: MOCK_COMPLAINT.reportedUser.name,
          email: MOCK_COMPLAINT.reportedUser.email,
        }}
        onSuccess={handleBanConfirm}
      />

      <DeleteComplaintModal
        visible={modals.delete}
        onCancel={handleCloseModal}
        onConfirm={handleDeleteConfirm}
        complaint={MOCK_COMPLAINT}
      />

      <SendWarningModal
        visible={modals.warning}
        onCancel={handleCloseModal}
        onConfirm={handleWarningConfirm}
        user={MOCK_COMPLAINT}
      />
    </div>
  );
};

export default ComplaintDetailsPage;
