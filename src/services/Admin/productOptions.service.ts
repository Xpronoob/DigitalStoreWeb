import { FormValues as CreateFormValues } from '@/components/Admin/ProductOptions/CreateForm/createFormModel';
import { FormValues as EditFormValues } from '@/components/Admin/ProductOptions/EditForm/editFormModel';
import { AxiosAdapter } from '@/lib/axios.adapter';

export class ProductOptionService {
  static async create(data: CreateFormValues) {
    return await AxiosAdapter.postRequest('/admin/productOptions', data);
  }

  static async update(id: string, data: EditFormValues) {
    return await AxiosAdapter.patchRequest(`/admin/productOptions/${id}`, data);
  }

  static async delete(id: number) {
    return await AxiosAdapter.deleteRequest(`/admin/productOptions/${id}`);
  }

  static async getAll() {
    return await AxiosAdapter.getRequest('/admin/productOptions');
  }

  static async getById(id: string) {
    return await AxiosAdapter.getRequest(`/admin/productOptions/${id}`);
  }
}
