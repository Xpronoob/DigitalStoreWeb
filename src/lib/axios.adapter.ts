import axios from 'axios';

axios.defaults.withCredentials = true;

const apiUrl = 'http://localhost:3030/api';
const axiosInstance = axios.create({
  baseURL: apiUrl
});

export class AxiosAdapter {
  static async getRequest(url: string) {
    const response = await axiosInstance.get(apiUrl + url);
    return response.data;
  }

  static async postRequest(url: string, body: any) {
    const response = await axiosInstance.post(apiUrl + url, body);
    return response.data;
  }

  static async getLogout(url: string) {
    const response = await axiosInstance.get(apiUrl + url);
    return response.data;
  }
}
