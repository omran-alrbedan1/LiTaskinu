"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Tag, message } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import { BanModal, Header } from "@/components/admin/shared";
import { mockComplaints } from "@/constants/temporary";
import {
  ComplaintsTable,
  DeleteComplaintModal,
  SearchFilters,
  SendWarningModal,
  StatisticsCards,
} from "./_components";

const ComplaintsPage = () => {
  const router = useRouter();
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(
    null
  );
  const [banModalVisible, setBanModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [warningModalVisible, setWarningModalVisible] = useState(false);

  const actionHandlers = {
    onView: (complaint: Complaint) => {
      router.push(`./complaints/${complaint.id}`);
    },
    onBan: (complaint: Complaint) => {
      setSelectedComplaint(complaint);
      setBanModalVisible(true);
    },
    onWarn: (complaint: Complaint) => {
      setSelectedComplaint(complaint);
      setWarningModalVisible(true);
    },
    onDelete: (complaint: Complaint) => {
      setSelectedComplaint(complaint);
      setDeleteModalVisible(true);
    },
  };

  const handleBanConfirm = (banData: any) => {
    message.success(
      `User ${selectedComplaint?.reportedUser} has been banned successfully`
    );
    setBanModalVisible(false);
    setSelectedComplaint(null);
    // API call to ban user
    console.log("Ban data:", banData);
  };

  const handleDeleteConfirm = (reason: string) => {
    message.success("Complaint deleted successfully");
    setDeleteModalVisible(false);
    setSelectedComplaint(null);
    // API call to delete complaint
    console.log("Delete reason:", reason);
  };

  const handleWarningConfirm = (warningData: any) => {
    message.success(`Warning sent to ${selectedComplaint?.reportedUser}`);
    setWarningModalVisible(false);
    setSelectedComplaint(null);
    // API call to send warning
    console.log("Warning data:", warningData);
  };

  const handleCloseModal = (): void => {
    setBanModalVisible(false);
    setDeleteModalVisible(false);
    setWarningModalVisible(false);
    setSelectedComplaint(null);
  };

  return (
    <div className="mx-auto pb-24 p-6  max-h-screen sidebar-scrollbar overflow-auto">
      {/* Header */}
      <div className="mb-6">
        <Header
          title="Complaints Management"
          description="Manage and review user complaints and reports"
        />
      </div>

      <StatisticsCards />

      <SearchFilters />

      <Card
        title={
          <div className="flex items-center">
            <FileTextOutlined className="mr-2" />
            Complaints List
            <Tag className="ml-2">{mockComplaints.length} total</Tag>
          </div>
        }
      >
        <ComplaintsTable
          data={mockComplaints}
          actionHandlers={actionHandlers}
        />
      </Card>

      {/* Modals */}
      {selectedComplaint && (
        <>
          <BanModal
            open={banModalVisible}
            onCancel={handleCloseModal}
            user={{
              id: Number(selectedComplaint.id),
              name: selectedComplaint.reporter.name,
              email: selectedComplaint.reporter.email,
            }}
            onSuccess={() =>
              handleBanConfirm({ userName: selectedComplaint.reportedUser })
            }
          />

          <DeleteComplaintModal
            visible={deleteModalVisible}
            onCancel={handleCloseModal}
            onConfirm={handleDeleteConfirm}
            complaint={selectedComplaint}
          />

          <SendWarningModal
            visible={warningModalVisible}
            onCancel={handleCloseModal}
            onConfirm={handleWarningConfirm}
            user={selectedComplaint}
          />
        </>
      )}
    </div>
  );
};

export default ComplaintsPage;
