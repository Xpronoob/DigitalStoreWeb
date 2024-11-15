export interface productDetailsModel {
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
  productOptions: {
    product_options_id?: number;
    product_options_name?: string;
    active: boolean;
    color: boolean;
    size: boolean;
    storage: boolean;
    devices: boolean;
  };
}

// {
//   products.product_details?.map((productDetails: productDetailsModel) => (
//     <div>
//       <div key={productDetails.product_details_id} className='p-1'>
//         <p>Detail Name: {productDetails.detail_name}</p>
//         <p>Detail Price: {productDetails.price}</p>
//         <input
//           type='number'
//           value={quantity}
//           onChange={(e) => setQuantity(Number(e.target.value))}
//           className='dark:text-black'
//           min='1'
//         />

//         <button
//           onClick={() =>
//             addToCart(productDetails.product_details_id!, quantity)
//           }
//         >
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   ));
// }
