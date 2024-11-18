export interface productDetailsModel {
  product_details_id?: number;
  product_id?: number;
  details_name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  color?: string;
  size?: string;
  storage?: string;
  devices?: string;
  active?: boolean;
  products?: {
    product_id?: number;
    product_name?: string;
    description?: string;
    active: boolean;
    categories: {
      category_id?: number;
      category_name?: string;
    };
  };
  productOptions?: {
    product_options_id?: number;
    product_options_name?: string;
    active: boolean;
    color: boolean;
    size: boolean;
    storage: boolean;
    devices: boolean;
  };
}
