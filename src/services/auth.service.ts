import { FormValues } from '@/components/Public/LoginForm/loginFormModel';
import { FormValues as RegisterFormValues } from '@/components/Public/RegisterForm/registerFormModel';
import { AxiosAdapter } from '@/lib/axios.adapter';

export class AuthService {
  static async postLogin(data: FormValues) {
    return await AxiosAdapter.postRequest('/auth/login', data);
  }

  static async postRegister(data: RegisterFormValues) {
    return await AxiosAdapter.postRequest('/auth/register', data);
  }

  static async getLogout() {
    return await AxiosAdapter.getLogout('/auth/logout');
  }
}
