export interface CartItemsModel {
  cart_item_id?: number;
  user_id?: number;
  product_details_id?: number;
  quantity?: number;
  product_details?: {
    product_details_id?: number;
    product_id?: number;
    detail_name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    color?: string;
    size?: string;
    storage?: string;
    devices?: string;
    active?: boolean;
  };
}
