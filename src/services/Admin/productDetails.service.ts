import { FormValues as CreateFormValues } from '@/components/Admin/ProductDetails/CreateForm/createFormModel';
import { FormValues as EditFormValues } from '@/components/Admin/ProductDetails/EditForm/editFormModel';
import { AxiosAdapter } from '@/lib/axios.adapter';

export class ProductDetailsService {
  static async create(data: CreateFormValues) {
    const formData = new FormData();

    formData.append('product_id', data.product_id.toString());
    formData.append('details_name', data.details_name);
    formData.append('description', data.description || '');
    formData.append('price', data.price.toString());
    formData.append('quantity', data?.quantity?.toString() || '');
    formData.append('active', data.active.toString());
    formData.append('color', data.color || '');
    formData.append('size', data.size || '');
    formData.append('storage', data.storage || '');
    formData.append('devices', data.devices || '');

    if (data.image) {
      formData.append('image', data.image);
    }

    return await AxiosAdapter.postRequest('/admin/productDetails', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  static async update(id: string, data: EditFormValues) {
    const formData = new FormData();

    formData.append('product_id', data?.product_id?.toString() || '');
    formData.append('details_name', data?.details_name || '');
    formData.append('description', data.description || '');
    formData.append('price', data?.price?.toString() || '');
    formData.append('quantity', data?.quantity?.toString() || '');
    formData.append('active', data?.active?.toString() || '');
    formData.append('color', data.color || '');
    formData.append('size', data.size || '');
    formData.append('storage', data.storage || '');
    formData.append('devices', data.devices || '');

    if (data.image) {
      formData.append('image', data.image);
    }

    return await AxiosAdapter.patchRequest(
      `/admin/productDetails/${id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
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
