import React from "react";
import { Button, Modal, Form, Input } from "antd";
import { Textarea } from "@/components/ui/textarea";
import { MdEmail } from "react-icons/md";

const EmailModal: React.FC<{
  open: boolean;
  onCancel: () => void;
  user: User;
  onSuccess: (action: string) => void;
}> = ({ open, onCancel, user, onSuccess }) => {
  const [emailForm] = Form.useForm();

  const handleSubmit = (values: any) => {
    console.log("Send email:", values);
    onSuccess("email sent to");
    emailForm.resetFields();
  };

  return (
    <Modal
      title={
        <div>
          <MdEmail className="inline-block mb-2 m-1 size-5 text-primary-color1" />
          Send Email to User
        </div>
      }
      open={open}
      onCancel={onCancel}
      footer={null}
      width={500}
    >
      <Form
        form={emailForm}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ subject: "", message: "" }}
      >
        <Form.Item
          label="To"
          className="[&_.ant-form-item-label]:dark:text-white [&_.ant-form-item-label]:font-medium"
        >
          <Input
            value={user.email}
            disabled
            className="dark:[&.ant-input]:bg-[#1f1f1f] dark:[&.ant-input]:text-white dark:[&.ant-input]:border-[#434343] dark:[&.ant-input]:placeholder-gray-400"
          />
        </Form.Item>

        <Form.Item
          label="Subject"
          name="subject"
          rules={[{ required: true }]}
          className="[&_.ant-form-item-label]:dark:text-white [&_.ant-form-item-label]:font-medium"
        >
          <Input
            placeholder="Enter email subject"
            className="dark:[&.ant-input]:bg-[#1f1f1f] dark:[&.ant-input]:text-white dark:[&.ant-input]:border-[#434343] dark:[&.ant-input]:placeholder-gray-400"
          />
        </Form.Item>

        <Form.Item
          label="Message"
          name="message"
          rules={[{ required: true }]}
          className="[&_.ant-form-item-label]:dark:text-white [&_.ant-form-item-label]:font-medium"
        >
          <Textarea
            rows={6}
            placeholder="Enter your message..."
            className="dark:bg-[#1f1f1f] dark:text-white dark:border-[#434343] dark:placeholder-gray-400 resize-none"
          />
        </Form.Item>

        <div className="flex justify-end gap-2">
          <Button
            onClick={onCancel}
            className="dark:bg-[#1f1f1f] dark:text-white dark:border-[#434343] hover:dark:bg-[#2a2a2a]"
          >
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Send Email
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default EmailModal;
