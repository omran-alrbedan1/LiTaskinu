"use client";

import React, { useState } from "react";
import {
  FaGraduationCap,
  FaBriefcase,
  FaUserTie,
  FaWeight,
  FaRulerVertical,
  FaBirthdayCake,
  FaMapMarkerAlt,
  FaChurch,
  FaHeart,
  FaEye,
  FaEnvelope,
  FaComments,
  FaClock,
  FaUser,
  FaHeartbeat,
  FaCommentDots,
  FaSlidersH,
  FaUserShield,
  FaUsers,
  FaExclamationTriangle,
  FaFileAlt,
  FaDollarSign,
  FaHandHoldingHeart,
} from "react-icons/fa";
import { IoChatbubbles } from "react-icons/io5";
import { mockPhotos, userData } from "@/constants/temporary";
import { DetailItem } from "@/components/shared";
import { BanModal, Header } from "@/components/admin/shared";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  UserProfileCard,
  StatsGrid,
  MarriageRequestsSection,
  ChatsSection,
  PreferencesSection,
  GuardianSection,
  RelationshipsSection,
  ComplaintsSection,
  DocumentsSection,
  FinancialSection,
  PersonalInfo,
} from "./_components";
import { images } from "@/constants/images";
import { RiUserSearchFill } from "react-icons/ri";

// Import Ant Design components for the dropdown
import { Button, Dropdown, message } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
  MailFilled,
  CheckCircleOutlined,
  UnlockOutlined,
  BlockOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import {
  EmailModal,
  DeleteModal,
  VerifyModal,
  UnbanModal,
} from "../_components";

type ModalType = "email" | "verify" | "ban" | "unban" | "delete";

const PersonDetailPage = () => {
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);

  const user: User = {
    id: 1,
    name: userData.name,
    email: userData.email || "user@example.com",
    phone: userData.phone || "+966500000000",
    // @ts-ignore
    avatar: images.Unknown,
    status: "active",
    verification: "verified",
    registrationDate: new Date().toISOString(),
  };

  // Modal handlers
  const openModal = (modalType: ModalType) => setActiveModal(modalType);
  const closeModal = () => setActiveModal(null);

  const handleSuccess = (action: string) => {
    message.success(`User ${action} successfully`);
    closeModal();
  };

  // Menu items configuration
  const getActionMenuItems = (): MenuProps["items"] => {
    const baseItems: MenuProps["items"] = [
      {
        key: "send-email",
        label: "Send Email",
        icon: <MailFilled className="!text-purple-500" />,
        onClick: () => openModal("email"),
      },
      { type: "divider" },
    ];

    const statusItems: MenuProps["items"] = [];

    if (user.verification !== "verified") {
      statusItems.push({
        key: "verify",
        label: "Verify User",
        icon: <CheckCircleOutlined className="text-green-500" />,
        onClick: () => openModal("verify"),
      });
    }

    if (user.status === "banned") {
      statusItems.push({
        key: "unban",
        label: "Unban User",
        icon: <UnlockOutlined className="text-blue-500" />,
        onClick: () => openModal("unban"),
      });
    } else {
      statusItems.push({
        key: "ban",
        label: "Ban User",
        icon: <BlockOutlined className="text-orange-500" />,
        onClick: () => openModal("ban"),
      });
    }

    const dangerItems: MenuProps["items"] = [
      { type: "divider" },
      {
        key: "delete",
        label: "Delete User",
        icon: <DeleteOutlined className="!text-red-500" />,
        onClick: () => openModal("delete"),
      },
    ];

    return [...baseItems, ...statusItems, ...dangerItems];
  };

  // Mock data
  const userStats = [
    {
      label: "Views",
      value: "125",
      icon: FaEye,
      color: "blue",
    },
    {
      label: "Sent Requests",
      value: "15",
      icon: FaHeart,
      color: "red",
    },
    {
      label: "Received Requests",
      value: "8",
      icon: FaEnvelope,
      color: "green",
    },
    {
      label: "Active Chats",
      value: "6",
      icon: FaComments,
      color: "purple",
    },
    {
      label: "Active Days",
      value: "67",
      icon: FaClock,
      color: "orange",
    },
  ];

  // Updated marriageRequests data with user info
  const marriageRequests = {
    sent: [
      {
        to: {
          id: 2,
          name: "Fatima Ahmed",
          email: "fatima.ahmed@example.com",
          phone: "+966500000001",
          avatar: "/images/userTest.jpg",
        },
        date: "2024-01-15",
        status: "Pending",
      },
      {
        to: {
          id: 3,
          name: "Sarah Khalid",
          email: "sarah.khalid@example.com",
          phone: "+966500000002",
          avatar: "/images/userTest.jpg",
        },
        date: "2024-01-10",
        status: "Accepted",
      },
      {
        to: {
          id: 2,
          name: "Maryam Ali",
          email: "maryam.ali@example.com",
          phone: "+966500000003",
        },
        date: "2024-01-08",
        status: "Rejected",
      },
    ],
    received: [
      {
        from: {
          id: 2,
          name: "Ahmed Mohammed",
          email: "ahmed.mohammed@example.com",
          phone: "+966500000004",
          avatar: "/images/userTest.jpg",
        },
        date: "2024-01-14",
        status: "Under Review",
      },
      {
        from: {
          id: 2,
          name: "Mohammed Ali",
          email: "mohammed.ali@example.com",
          phone: "+966500000005",
        },
        date: "2024-01-12",
        status: "Rejected",
      },
      {
        from: {
          id: 1,
          name: "Khalid Hassan",
          email: "khalid.hassan@example.com",
          phone: "+966500000006",
          avatar: "/images/userTest.jpg",
        },
        date: "2024-01-10",
        status: "Accepted",
      },
    ],
  };

  const activeChats = [
    {
      id: 1,
      name: "Ahmed Mohammed",
      email: "ahmed.mohammed@example.com",
      phone: "+966500000001",
      avatar: "/images/userTest.jpg",
    },
    {
      id: 2,
      name: "Fatima Ahmed",
      email: "fatima.ahmed@example.com",
      phone: "+966500000002",
      avatar: "/images/userTest.jpg",
    },
    {
      id: 3,
      name: "Sarah Khalid",
      email: "sarah.khalid@example.com",
      phone: "+966500000003",
    },
  ];

  const partnerPreferences = {
    ageRange: "25-35",
    education: "University",
    religion: "Muslim",
    location: "Same City",
    maritalStatus: "Single",
    height: "160-180 cm",
    weight: "50-80 kg",
  };

  const verificationDocuments = [
    {
      type: "National ID",
      date: "2024-01-15",
      description: "Government issued identification",
      files: [
        "/documents/user1/national-id-front.jpg",
        "/documents/user1/national-id-back.jpg",
      ],
      notes: "ID verified and matches profile information",
    },
    {
      type: "Education Certificate",
      date: "2024-01-10",
      description: "Highest education degree",
      files: [
        "/documents/user1/bachelor-degree.jpg",
        "/documents/user1/transcript.pdf",
      ],
    },
    {
      type: "Income Proof",
      date: "",
      description: "Salary certificate or business proof",
      files: [],
    },
    {
      type: "Proof of Residence",
      status: "Verified",
      date: "2024-01-12",
      description: "Utility bill or rental agreement",
      required: true,
      files: ["/documents/user1/electricity-bill.jpg"],
      notes: "Address confirmed",
    },
    {
      type: "Marital Status Certificate",
      status: "Under Review",
      date: "2024-01-08",
      description: "Proof of current marital status",
      required: true,
      files: ["/documents/user1/marital-status-certificate.jpg"],
    },
  ];

  const guardianInfo = {
    name: "Mohammed Ahmed",
    relationship: "Father",
    phone: "+966500000000",
    email: "guardian@example.com",
    avatar: "/images/userTest.jpg",
    status: "Active",
  };

  const favoriteUsers = [
    { name: "Fatima Ahmed", addedDate: "2024-01-15", mutual: true },
    { name: "Sarah Khalid", addedDate: "2024-01-10", mutual: false },
    { name: "Ahmed Mohammed", addedDate: "2024-01-08", mutual: true },
  ];

  const blockedUsers = [
    {
      name: "Mohammed Ali",
      blockDate: "2024-01-12",
      reason: "Inappropriate behavior",
    },
    {
      name: "Khalid Hassan",
      blockDate: "2024-01-05",
      reason: "Spamming messages",
    },
  ];

  const complaints = {
    received: [
      {
        from: "Mohammed Ali",
        date: "2024-01-14",
        type: "Inappropriate behavior",
        status: "Under Review",
      },
      {
        from: "Fatima Ahmed",
        date: "2024-01-10",
        type: "Terms violation",
        status: "Resolved",
      },
    ],
    sent: [
      {
        to: "Sarah Khalid",
        date: "2024-01-08",
        type: "Fraud",
        status: "Under Review",
      },
      {
        to: "Ahmed Mohammed",
        date: "2024-01-05",
        type: "Abuse",
        status: "Rejected",
      },
    ],
  };

  const subscriptionInfo = {
    plan: "Premium",
    startDate: "2024-01-01",
    endDate: "2024-02-01",
    status: "Active",
    paymentHistory: [
      { amount: "100 SAR", date: "2024-01-01", method: "Credit Card" },
    ],
  };

  const personalDetails = [
    {
      icon: <FaGraduationCap />,
      label: "Education",
      value: userData.details.education,
    },
    {
      icon: <FaBriefcase />,
      label: "Occupation",
      value: userData.details.occupation,
    },
    {
      icon: <FaUserTie />,
      label: "Job Title",
      value: userData.details.jobTitle,
    },
    { icon: <FaWeight />, label: "Weight", value: userData.details.weight },
    {
      icon: <FaRulerVertical />,
      label: "Height",
      value: userData.details.height,
    },
    { icon: <FaBirthdayCake />, label: "Age", value: userData.details.age },
    {
      icon: <FaMapMarkerAlt />,
      label: "Location",
      value: userData.details.place,
    },
    { icon: <FaChurch />, label: "Religion", value: userData.details.religion },
    {
      icon: <FaHeart />,
      label: "Marital Status",
      value: userData.details.maritalStatus,
    },
  ];

  return (
    <>
      <div className="p-6 space-y-6 max-h-[90vh] overflow-y-auto pb-32 hide-scrollbar">
        <div className="flex justify-between items-center mb-8">
          <Header
            title={`${userData.name}'s Profile`}
            description="View all user information and activity"
          />

          {/* Three dots dropdown menu */}
          <div className="flex justify-center">
            <Dropdown
              menu={{ items: getActionMenuItems() }}
              trigger={["click"]}
              placement="bottomRight"
              arrow
            >
              <Button
                icon={<MoreOutlined />}
                size="small"
                className="flex items-center justify-center border-gray-300 dark:border-gray-600"
                style={{ width: 32, height: 32 }}
              />
            </Dropdown>
          </div>
        </div>

        {/* User Profile Card */}
        <UserProfileCard userData={userData} photos={mockPhotos} />

        {/* Statistics */}
        <StatsGrid stats={userStats} />

        {/* Main Tabs */}
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-9 h-auto">
            <TabsTrigger value="personal" className="flex items-center gap-2">
              <FaUser className="w-4 h-4" />
              <span className="hidden lg:inline">Personal Info</span>
            </TabsTrigger>
            <TabsTrigger value="marriage" className="flex items-center gap-2">
              <FaHandHoldingHeart className="w-4 h-4" />
              <span className="hidden lg:inline">Requests</span>
            </TabsTrigger>
            <TabsTrigger value="chats" className="flex items-center gap-2">
              <IoChatbubbles className="w-4 h-4" />
              <span className="hidden lg:inline">Chats</span>
            </TabsTrigger>
            <TabsTrigger
              value="preferences"
              className="flex items-center gap-2"
            >
              <RiUserSearchFill className="w-4 h-4" />
              <span className="hidden lg:inline">Preferences</span>
            </TabsTrigger>
            <TabsTrigger value="guardian" className="flex items-center gap-2">
              <FaUserShield className="w-4 h-4" />
              <span className="hidden lg:inline">Guardian</span>
            </TabsTrigger>
            <TabsTrigger
              value="relationships"
              className="flex items-center gap-2"
            >
              <FaUsers className="w-4 h-4" />
              <span className="hidden lg:inline">Relationships</span>
            </TabsTrigger>
            <TabsTrigger value="complaints" className="flex items-center gap-2">
              <FaExclamationTriangle className="w-4 h-4" />
              <span className="hidden lg:inline">Complaints</span>
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <FaFileAlt className="w-4 h-4" />
              <span className="hidden lg:inline">Documents</span>
            </TabsTrigger>
            <TabsTrigger value="financial" className="flex items-center gap-2">
              <FaDollarSign className="w-4 h-4" />
              <span className="hidden lg:inline">Financial</span>
            </TabsTrigger>
          </TabsList>

          {/* Tab Contents */}
          <TabsContent value="personal">
            <PersonalInfo personalDetails={personalDetails} />
          </TabsContent>

          <TabsContent value="marriage">
            <MarriageRequestsSection requests={marriageRequests} />
          </TabsContent>

          <TabsContent value="chats">
            <ChatsSection users={activeChats} />
          </TabsContent>

          <TabsContent value="preferences">
            <PreferencesSection preferences={partnerPreferences} />
          </TabsContent>

          <TabsContent value="guardian">
            <GuardianSection guardianInfo={guardianInfo} />
          </TabsContent>

          <TabsContent value="relationships">
            <RelationshipsSection
              favoriteUsers={favoriteUsers}
              blockedUsers={blockedUsers}
            />
          </TabsContent>

          <TabsContent value="complaints">
            <ComplaintsSection complaints={complaints} />
          </TabsContent>

          <TabsContent value="documents">
            <DocumentsSection documents={verificationDocuments} />
          </TabsContent>

          <TabsContent value="financial">
            <FinancialSection subscriptionInfo={subscriptionInfo} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Render Modals */}
      <EmailModal
        open={activeModal === "email"}
        onCancel={closeModal}
        user={user}
        onSuccess={handleSuccess}
      />

      <BanModal
        open={activeModal === "ban"}
        onCancel={closeModal}
        user={user}
        onSuccess={handleSuccess}
      />

      <DeleteModal
        open={activeModal === "delete"}
        onCancel={closeModal}
        onConfirm={() => handleSuccess("deleted")}
        userName={user.name}
      />

      <VerifyModal
        open={activeModal === "verify"}
        onCancel={closeModal}
        onConfirm={() => handleSuccess("verified")}
        userName={user.name}
      />

      <UnbanModal
        open={activeModal === "unban"}
        onCancel={closeModal}
        onConfirm={() => handleSuccess("unbanned")}
        userName={user.name}
        confirmButtonColor="primary"
      />
    </>
  );
};

export default PersonDetailPage;
