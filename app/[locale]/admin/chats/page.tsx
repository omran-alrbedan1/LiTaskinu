"use client";

import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, ShieldAlert, Ban, Search } from "lucide-react";
import {
  BanModal,
  Header,
  SendWarningModal,
  StatsCard,
} from "@/components/admin/shared";
import {
  SearchFilters,
  ActiveChatsTable,
  ReportedChatsTable,
  BlockedChatsTable,
} from "./_components";

// Main Component
export default function ChatManagementPage() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedUser, setSelectedUser] = React.useState<any>(null);
  const [isWarningModalVisible, setIsWarningModalVisible] =
    React.useState(false);
  const [isBanModalVisible, setIsBanModalVisible] = React.useState(false);

  const handleDeleteChat = (chatId: string) => {
    console.log(`Deleting chat ${chatId}`);
    alert("Chat deleted successfully");
  };

  // Warning modal handlers
  const handleOpenWarningModal = (report: any) => {
    setSelectedUser({
      reportedUser: {
        name: report.reported,
        email: `${report.reported.toLowerCase().replace(" ", ".")}@example.com`,
      },
      id: report.id,
    });
    setIsWarningModalVisible(true);
  };

  const handleCloseWarningModal = () => {
    setIsWarningModalVisible(false);
    setSelectedUser(null);
  };

  const handleConfirmWarning = (warningData: any) => {
    console.log("Warning data:", warningData);
    console.log("User:", selectedUser);
    alert(`Warning sent to ${selectedUser?.reportedUser?.name} successfully`);
    handleCloseWarningModal();
  };

  // Ban modal handlers
  const handleOpenBanModal = (report: any) => {
    setSelectedUser({
      name: report.reported,
      id: report.reportedUserId,
    });
    setIsBanModalVisible(true);
  };

  const handleCloseBanModal = () => {
    setIsBanModalVisible(false);
    setSelectedUser(null);
  };

  const handleBanSuccess = (action: string) => {
    console.log(`User ${selectedUser?.name} ${action}`);
    alert(`User ${selectedUser?.name} has been ${action} successfully`);
    handleCloseBanModal();
  };

  return (
    <div className="space-y-6 max-h-[90vh] p-8  pb-12 sidebar-scrollbar overflow-auto">
      <Header
        title="Chat Management"
        description="Monitor and manage chats on the platform"
      />

      <div className="grid gap-4 md:grid-cols-3">
        <StatsCard
          icon={MessageSquare}
          title="Active Chats"
          value="1,234"
          iconBgColor="from-blue-500 to-blue-600"
          description="Currently active chats"
        />

        <StatsCard
          icon={ShieldAlert}
          title="Reported Chats"
          value="2"
          iconBgColor="from-orange-500 to-orange-600"
          description="Chats under review"
        />

        <StatsCard
          icon={Ban}
          title="Blocked Chats"
          value="2"
          iconBgColor="from-red-500 to-red-600"
          description="Blocked chats"
        />
      </div>

      <SearchFilters searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList className="grid w-fit grid-cols-3">
          <TabsTrigger value="active" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Active
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" />
            Reported
          </TabsTrigger>
          <TabsTrigger value="blocked" className="flex items-center gap-2">
            <Ban className="w-4 h-4" />
            Blocked
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <ActiveChatsTable />
        </TabsContent>

        <TabsContent value="reports">
          <ReportedChatsTable
            onOpenWarningModal={handleOpenWarningModal}
            onOpenBanModal={handleOpenBanModal}
            onDeleteChat={handleDeleteChat}
          />
        </TabsContent>

        <TabsContent value="blocked">
          <BlockedChatsTable onDeleteChat={handleDeleteChat} />
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <SendWarningModal
        visible={isWarningModalVisible}
        onCancel={handleCloseWarningModal}
        onConfirm={handleConfirmWarning}
        user={selectedUser}
      />

      <BanModal
        open={isBanModalVisible}
        onCancel={handleCloseBanModal}
        user={selectedUser || { name: "", id: "" }}
        onSuccess={handleBanSuccess}
      />
    </div>
  );
}
