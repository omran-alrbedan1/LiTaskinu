"use client";

import { Modal } from "antd";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomFormField, {
  FormFieldType,
} from "@/components/shared/CustomInput";
import SubmitButton from "@/components/Buttons/SubmitButton";
import usePostData from "@/hooks/usePostData";
import { images } from "@/constants/images";
import { ICONS } from "@/constants/icons";
import { ChangePasswordSchema } from "@/validation/profile-schema";



interface ChangePasswordModalProps {
  open: boolean;
  onClose: () => void;
}

const ChangePasswordModal = ({ open, onClose }: ChangePasswordModalProps) => {
  const form = useForm<z.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      current_password: "",
      password: "",
      password_confirmation: "",
    },
  });

  const {
    postData,
    loading,
    reset: resetPost,
  } = usePostData("/api/website/profile/change-password", {
    showNotifications: true,
    successMessage: "Password changed successfully!",
    onSuccess: () => {
      resetPost();
      form.reset();
      onClose();
    },
  });

  const onSubmit = async (values: z.infer<typeof ChangePasswordSchema>) => {
    await postData(values);
  };

  const handleCancel = () => {
    form.reset();
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      footer={null}
      width={800}
      centered
      destroyOnClose
    >
      <div className="flex flex-col md:flex-row">
        <div className="hidden md:block md:w-1/2 p-4 bg-gradient-to-b from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-800 rounded-l-lg">
          <div className="h-full flex flex-col justify-center items-center">
            <Image
              src={images.changePassword}
              height={300}
              width={300}
              alt="Reset password"
              className="mb-6"
            />
            <h3 className="text-xl font-semibold text-center text-gray-800 dark:text-gray-200">
              Secure Your Account
            </h3>
            <p className="text-gray-500 text-center mt-2">
              Update your password to keep your account safe and protected.
            </p>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-6">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-2"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Change Password
            </h2>

            <CustomFormField
              fieldType={FormFieldType.PASSWORD}
              control={form.control}
              name="current_password"
              label="Current Password"
              iconSrc={ICONS.lock}
              placeholder="Enter current password"
            />

            <CustomFormField
              fieldType={FormFieldType.PASSWORD}
              control={form.control}
              name="password"
              label="New Password"
              iconSrc={ICONS.lock}
              placeholder="Enter new password"
            />

            <CustomFormField
              fieldType={FormFieldType.PASSWORD}
              control={form.control}
              name="password_confirmation"
              label="Confirm Password"
              iconSrc={ICONS.lock}
              placeholder="Re-enter new password"
            />

            <SubmitButton
              isLoading={loading}
              loadingText="Changing Password..."
              className="w-full mt-3"
              type="submit"
            >
              Change Password
            </SubmitButton>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default ChangePasswordModal;
