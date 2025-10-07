import React, { useState } from "react";
import { Button, Dropdown, message, Form } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  MailFilled,
  CheckCircleOutlined,
  UnlockOutlined,
  BlockOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { EmailModal, BanModal, DeleteModal, VerifyModal, UnbanModal } from ".";

interface UserActionsProps {
  user: User;
}

export type ModalType =
  | "edit"
  | "email"
  | "verify"
  | "ban"
  | "unban"
  | "delete";

// Main Component
const UserActions: React.FC<UserActionsProps> = ({ user }) => {
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);
  const [editForm] = Form.useForm();
  const router = useRouter();

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
        key: "view",
        label: "View Profile",
        icon: <EyeOutlined className="!text-blue-500" />,
        onClick: () => router.push("./"),
      },
      {
        key: "edit",
        label: "Edit User",
        icon: <EditOutlined className="!text-green-500" />,
        onClick: () => router.push("./"),
      },
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

  return (
    <>
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

export default UserActions;
