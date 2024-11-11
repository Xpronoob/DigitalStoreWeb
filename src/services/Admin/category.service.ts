import { FormValues as CreateFormValues } from '@/components/Admin/Categories/CreateForm/createFormModel';
import { FormValues as EditFormValues } from '@/components/Admin/Categories/EditForm/editFormModel';
import { AxiosAdapter } from '@/lib/axios.adapter';

export class CategoryService {
  static async create(data: CreateFormValues) {
    return await AxiosAdapter.postRequest('/admin/categories', data);
  }

  static async update(id: string, data: EditFormValues) {
    return await AxiosAdapter.patchRequest(`/admin/categories/${id}`, data);
  }

  static async delete(id: number) {
    return await AxiosAdapter.deleteRequest(`/admin/categories/${id}`);
  }

  static async getAll() {
    return await AxiosAdapter.getRequest('/admin/categories');
  }

  static async getById(id: string) {
    return await AxiosAdapter.getRequest(`/admin/categories/${id}`);
  }
}
