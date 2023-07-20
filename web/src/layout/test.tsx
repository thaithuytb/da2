import React from 'react';
import { Form, Input, Button } from 'antd';
import 'antd/dist/antd.css'; // Import CSS của Ant Design (tuỳ chọn)

interface FormValues {
  name: string;
  email: string;
}

const MyForm: React.FC = () => {
  const onFinish = (values: FormValues) => {
    console.log('Form submitted:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Form submission failed:', errorInfo);
  };

  return (
    <Form<FormValues>
      name="myForm"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Tên"
        name="name"
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập tên!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập email!',
          },
          {
            type: 'email',
            message: 'Email không hợp lệ!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default MyForm;
