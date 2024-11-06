import { FormValues as CreateFormValues } from '@/components/Admin/Users/CreateForm/createFormModel';
import { FormValues as EditFormValues } from '@/components/Admin/Users/EditForm/editFormModel';
import { AxiosAdapter } from '@/lib/axios.adapter';

export class UserService {
  static async create(data: CreateFormValues) {
    return await AxiosAdapter.postRequest('/admin/users', data);
  }

  static async update(id: string, data: EditFormValues) {
    return await AxiosAdapter.patchRequest(`/admin/users/${id}`, data);
  }

  static async delete(id: number) {
    return await AxiosAdapter.deleteRequest(`/admin/users/${id}`);
  }

  static async getAll() {
    return await AxiosAdapter.getRequest('/admin/users');
  }

  static async getById(id: string) {
    return await AxiosAdapter.getRequest(`/admin/users/${id}`);
  }
}
