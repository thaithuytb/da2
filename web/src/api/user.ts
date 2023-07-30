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

  UpdateInformation(dto:{
      password?: string,
      newPassword?: string,
      fullName?:string,
      phoneNumber?: string,
      address?:string
  }) {
    const url = `user/update-information`;
    return axiosClient.patch(url, {dto:{...dto}}) as unknown as ApiResponse;
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
