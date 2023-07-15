import axiosClient from "./api";

export interface ApiResponse {
    success: boolean;
    data: any;
    message?: string;
    statusCode?: number;
}


export class AuthAPI {
    login(dto: { email: string, password: string }) {
        const url = `user/login`;
        return axiosClient.post(url, { dto: { ...dto } }) as unknown as ApiResponse;
    }

    create(dto: { email: string, password: string, fullName: string}) {
        const url = `user/create`;
        return axiosClient.post(url, { dto: { ...dto } }) as unknown as ApiResponse;
    }
}