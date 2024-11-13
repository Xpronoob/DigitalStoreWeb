import { AxiosAdapter } from '@/lib/axios.adapter';

export class ProductService {
  static async getAllProducts() {
    const response = await AxiosAdapter.getRequest('/shop/getAllProducts');
    // console.log(response);
    return response;
  }

  static async getProductById(id: string) {
    const response = await AxiosAdapter.getRequest(
      `/shop/getProductById/${id}`
    );
    return response;
  }
}
