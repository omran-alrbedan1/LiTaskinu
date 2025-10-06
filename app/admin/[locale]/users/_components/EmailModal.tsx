import React from "react";
import { Button, Modal, Form, Input } from "antd";
import { Textarea } from "@/components/ui/textarea";

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
      title="Send Email to User"
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
        <Form.Item label="To">
          <Input value={user.email} disabled />
        </Form.Item>
        <Form.Item label="Subject" name="subject" rules={[{ required: true }]}>
          <Input placeholder="Enter email subject" />
        </Form.Item>
        <Form.Item label="Message" name="message" rules={[{ required: true }]}>
          <Textarea rows={6} placeholder="Enter your message..." />
        </Form.Item>
        <div className="flex justify-end gap-2">
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="primary" htmlType="submit">
            Send Email
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default EmailModal;
