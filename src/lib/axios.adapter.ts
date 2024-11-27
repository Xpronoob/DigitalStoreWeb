import axios from 'axios';

axios.defaults.withCredentials = true;

const apiUrl = 'http://localhost:3030/api';
const axiosInstance = axios.create({
  baseURL: apiUrl
});

export class AxiosAdapter {
  static async getRequest(url: string) {
    const response = await axiosInstance.get(url);
    return response.data;
  }

  static async postRequest(url: string, body: any, config?: object) {
    const response = await axiosInstance.post(url, body, config);
    return response.data;
  }

  static async patchRequest(url: string, body: any, config?: object) {
    const response = await axiosInstance.patch(url, body, config);
    return response.data;
  }

  static async deleteRequest(url: string) {
    const response = await axiosInstance.delete(url);
    return response.data;
  }

  static async genericRequest(url: string, method: string, body: any = null) {
    const config = { method, url, data: body };
    const response = await axiosInstance.request(config);
    return response.data;
  }
}
