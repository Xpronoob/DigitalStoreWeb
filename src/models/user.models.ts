export interface userModel {
  user_id?: string;
  email?: string;
  password?: string;
  active?: boolean;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  img?: string;
  roles?: string[];
  accessToken?: string;
  refreshToken?: string;
}
