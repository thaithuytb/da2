import { useContext } from "react";
import '../css/map.css'
import { AuthContext } from "../contexts/AuthContext";
import { Button, DatePicker, Form, Input } from "antd";
import dayjs from "dayjs";


const Information = () => {
    const authContext = useContext(AuthContext); 
    const user = authContext?.user
    console.log(user)

    const initialValues = {
    email: user.email,
    fullName: user.fullName,
    phoneNumber: user.phoneNumber,
    address: user.address,
    id: user.id,
    gender: user.gender,
    dateCreateAccount: dayjs(user.createdAt).format("DD-MM-YYYY"),
    dateOfBrith: user.dateOfBrith ? dayjs(user.dateOfBrith, "DD-MM-YYYY") : null
  };

  return (
    <div>
      THONG TIN CA NHAN
      <Form
          name="personall_form"
          labelCol={{ flex: '110px' }}
          labelAlign="left"
          labelWrap
          wrapperCol={{ flex: 1 }}
          colon={false}
          style={{ maxWidth: 700 }}
          // onFinish={updateInformation}
          initialValues={initialValues}
        >
          <Form.Item label="Tên đầy đủ" name="fullName">
            <Input />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>

          <Form.Item label="Số điện thoại" name="phoneNumber">
            <Input />
          </Form.Item>

          <Form.Item label="Địa chỉ" name="address">
            <Input />
          </Form.Item>

          <Form.Item label="Ngày sinh" name="dateOfBrith">
            <DatePicker
              // defaultValue={dayjs(currentDate, dateFormat)}
              inputReadOnly={true}
              format={"DD-MM-YYYY"}
            />
          </Form.Item>

          <Form.Item label="Ngày tạo tài khoản" name="dateCreateAccount">
            <Input disabled />
          </Form.Item>

          {/* <Form.Item name="gender" label="Giới tính">
            <Radio.Group value={user.gender}>
              <Radio value="MALE">Nam</Radio>
              <Radio value="FEMALE">Nữ</Radio>
            </Radio.Group>
          </Form.Item> */}

          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Thay đổi thông tin
            </Button>
            <span style={{ padding: '0 1rem' }} />
          </Form.Item>
        </Form>
    </div>
  )
}

export default Information