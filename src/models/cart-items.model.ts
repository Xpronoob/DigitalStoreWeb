export interface CartItemsModel {
  cart_items_id?: number;
  user_id?: number;
  product_details_id: number;
  quantity: number;
  active?: boolean;
  product_details?: {
    product_details_id?: number;
    product_id?: number;
    details_name?: string;
    description?: string;
    img?: string;
    active?: boolean;
    price?: number;
    quantity?: number;
    color?: string;
    size?: string;
    storage?: string;
    devices?: string;
    products?: {
      product_id?: number;
      product_name?: string;
      description?: string;
      active: boolean;
      categories?: {
        category_id?: number;
        category_name?: string;
      };
      productOptions?: {
        product_options_id?: number;
        product_options_name?: string;
        active?: boolean;
        color?: boolean;
        size?: boolean;
        storage?: boolean;
        devices?: boolean;
      };
    };
  };
}
