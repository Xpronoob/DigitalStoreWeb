import { FormValues as CreateFormValues } from '@/components/Admin/Roles/CreateForm/createFormModel';
import { FormValues as EditFormValues } from '@/components/Admin/Roles/EditForm/editFormModel';
import { AxiosAdapter } from '@/lib/axios.adapter';

export class RoleService {
  static async create(data: CreateFormValues) {
    return await AxiosAdapter.postRequest('/admin/roles', data);
  }

  static async update(id: string, data: EditFormValues) {
    return await AxiosAdapter.patchRequest(`/admin/roles/${id}`, data);
  }

  static async delete(id: number) {
    return await AxiosAdapter.deleteRequest(`/admin/roles/${id}`);
  }

  static async getAll() {
    return await AxiosAdapter.getRequest('/admin/roles');
  }

  static async getById(id: string) {
    return await AxiosAdapter.getRequest(`/admin/roles/${id}`);
  }
}
