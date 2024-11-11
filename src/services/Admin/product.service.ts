import { FormValues as CreateFormValues } from '@/components/Admin/Products/CreateForm/createFormModel';
import { FormValues as EditFormValues } from '@/components/Admin/Products/EditForm/editFormModel';
import { AxiosAdapter } from '@/lib/axios.adapter';

export class ProductService {
  static async create(data: CreateFormValues) {
    return await AxiosAdapter.postRequest('/admin/products', data);
  }

  static async update(id: string, data: EditFormValues) {
    return await AxiosAdapter.patchRequest(`/admin/products/${id}`, data);
  }

  static async delete(id: number) {
    return await AxiosAdapter.deleteRequest(`/admin/products/${id}`);
  }

  static async getAll() {
    return await AxiosAdapter.getRequest('/admin/products');
  }

  static async getById(id: string) {
    return await AxiosAdapter.getRequest(`/admin/products/${id}`);
  }
}
