import axiosClient from "./api";

export interface ApiResponse {
    success: boolean;
    data: any;
    message?: string;
    statusCode?: number;
}

export class HistoryAPI {
    // http://localhost:7000/api/v1/histories
    getHistories() {
        const url = `histories`;
        // validation
        return axiosClient.get(url) as unknown as ApiResponse;
    }
}