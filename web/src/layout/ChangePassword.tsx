import { Button, Form, Input } from 'antd'
import React from 'react'
import { AuthAPI } from '../api/user';

const ChangePassword = () => {
    const onChangPassword = async (values: any) => {
        const { password, newPassword, authenticationPassword } = values;
        if (newPassword !== authenticationPassword) {
          console.log("mật khẩu mới nhập lại sai");
        } else {
          const data = {
            password: password,
            newPassword: newPassword,
          };
          const authApi = new AuthAPI();
          try {
            const res = await authApi.UpdateInformation(data);
            if (res.success) {
                console.log("thanh cong")
            }
            console.log("Thay đổi mật khẩu thành công");
          } catch (error: any) {
            console.log(error)
          }
        }
    }
  return (
    <Form
          name="basic"
          labelCol={{ flex: '110px' }}
          labelAlign="left"
          labelWrap
          wrapperCol={{ flex: 1 }}
          colon={false}
          style={{ maxWidth: 700 }}
          onFinish={onChangPassword}
        >
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Mật khẩu mới"
            name="newPassword"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Nhập lại mật khẩu mới"
            name="authenticationPassword"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Thay đổi mật khẩu
            </Button>
          </Form.Item>
        </Form>
  )
}

export default ChangePassword