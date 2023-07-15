import axiosClient from "./api";

export interface ApiResponse {
  success: boolean;
  data: any;
  message?: string;
  statusCode?: number;
}

export class CoordinateAPI {
  // api/v1/coordinates?name=device_1_test_1
  getCoordinates(dto: { name: string }) {
    const url = `coordinates?name=${dto.name}`;
    // validation
    return axiosClient.get(url) as unknown as ApiResponse;
  }
}