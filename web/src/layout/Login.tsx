import React, { useContext, useState } from "react";
import "../css/login.css";
import { Button, Form, Input } from "antd";
import { AuthAPI } from "../api/user";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const authContext = useContext(AuthContext);
  const setUser = authContext?.setUser;
  const setIslogin = authContext?.setIslogin;
  const [checkDisplay, setCheckDisplay] = useState<boolean>(true);
  const authAPI = new AuthAPI();
  const navigate = useNavigate();

  const login = async (value: any) => {
    const { loginEmail, loginPassword } = value;
    try {
      const dto = {
        email: loginEmail,
        password: loginPassword,
      };
      const res = await authAPI.login(dto);
      if (res.data && setUser && setIslogin) {
        const { user, token } = res.data;
        localStorage.setItem("token", token);
        setUser(user);
        setIslogin(true);
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const register = async (value: any) => {
    const { fullName, email, password, confirmPassword } = value;
    if (password !== confirmPassword) {
      console.log("check passs and confirmPassword");
    } else {
      try {
        const dto = {
          fullName,
          email,
          password,
          confirmPassword,
        };
        const res = await authAPI.register(dto);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="login">
      {checkDisplay ? (
        <div>
          <Form
            name="basic"
            // style={{ maxWidth: 600 }}
            onFinish={login}
          >
            <Form.Item
              label="Email"
              name="loginEmail"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="loginPassword"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
          <div style={{textAlign:'center'}}>
            Chưa có tài khoản ?{" "}
            <span style={{color:'blue'}} onClick={() => setCheckDisplay(!checkDisplay)}>Đăng ký</span>
          </div>
        </div>
      ) : (
        <div>
          <Form name="basic" style={{ maxWidth: 600 }} onFinish={register}>
            <Form.Item
              label="Họ và tên"
              name="fullName"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Xác nhận lại mật khẩu"
              name="confirmPassword"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Đăng ký
              </Button>
            </Form.Item>
          </Form>
          <div style={{textAlign:'center'}}>
            Đã có tài khoản ?{" "}
            <span style={{color:'blue'}} onClick={() => setCheckDisplay(!checkDisplay)}>
              Đăng nhập
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
