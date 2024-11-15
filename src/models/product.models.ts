export interface productModel {
  product_id?: number;
  category_id?: number;
  product_options_id?: number;
  product_name?: string;
  description?: string;
  price?: number;
  stock?: number;
  img?: string;
  active?: boolean;
  categories?: { category_id: number; category_name?: string };
  product_details?: [
    {
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
    }
  ];
}
