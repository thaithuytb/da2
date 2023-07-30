import axiosClient from "./api";

export interface ApiResponse {
  success: boolean;
  data: any;
  message?: string;
  statusCode?: number;
}

export class AuthAPI {
  login(dto: { email: string; password: string }) {
    const url = `user/login`;
    return axiosClient.post(url, { dto: { ...dto } }) as unknown as ApiResponse;
  }

  autoLogin() {
    const url = `user/verify-token`;
    return axiosClient.get(url) as unknown as ApiResponse;
  }

  changePassword(dto:{
      password: string,
      newPassword: string,
  }) {
    const url = `user/change-password`;
    return axiosClient.post(url) as unknown as ApiResponse;
  }

  register(dto: {
    email: string;
    password: string;
    confirmPassword: string;
    fullName: string;
  }) {
    const url = `user/register`;
    return axiosClient.post(url, { dto: { ...dto } }) as unknown as ApiResponse;
  }
}
