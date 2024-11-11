import { FormValues as CreateFormValues } from '@/components/Admin/ProductDetails/CreateForm/createFormModel';
import { FormValues as EditFormValues } from '@/components/Admin/ProductDetails/EditForm/editFormModel';
import { AxiosAdapter } from '@/lib/axios.adapter';

export class ProductDetailsService {
  static async create(data: CreateFormValues) {
    return await AxiosAdapter.postRequest('/admin/productDetails', data);
  }

  static async update(id: string, data: EditFormValues) {
    return await AxiosAdapter.patchRequest(`/admin/productDetails/${id}`, data);
  }

  static async delete(id: number) {
    return await AxiosAdapter.deleteRequest(`/admin/productDetails/${id}`);
  }

  static async getAll() {
    return await AxiosAdapter.getRequest('/admin/productDetails');
  }

  static async getById(id: string) {
    return await AxiosAdapter.getRequest(`/admin/productDetails/${id}`);
  }
}
