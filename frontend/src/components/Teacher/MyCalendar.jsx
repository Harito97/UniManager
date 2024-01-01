import React, { useState } from 'react';
import { Form, Input, Button, Typography } from 'antd';

const { Paragraph } = Typography;

const EditableForm = () => {
  const [form] = Form.useForm();
  const [editing, setEditing] = useState(false);

  const handleEditClick = () => {
    setEditing(!editing);
  };

  const onFinish = (values) => {
    console.log('Received values:', values);
    // Gửi giá trị form đi hoặc thực hiện các thao tác cần thiết
    setEditing(false); // Chuyển về chế độ xem sau khi hoàn thành form
  };

  const renderContent = () => {
    if (editing) {
      return (
        <Form form={form} onFinish={onFinish}>
          <Form.Item name="content" initialValue="Nội dung mẫu">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
          </Form.Item>
        </Form>
      );
    } else {
      return (
        <Paragraph>
          Nội dung hiển thị trong chế độ xem.{' '}
          <Button type="link" onClick={handleEditClick}>
            Chỉnh sửa
          </Button>
        </Paragraph>
      );
    }
  };

  return (
    <div>
      {renderContent()}
    </div>
  );
};

export default EditableForm;
