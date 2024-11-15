import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ProductService } from '@/services/Public/product.service';
import { useUserStore } from '@/states/userStore.states';
import { useCartStore } from '@/states/cartStore.states';
import { productDetailsModel } from '@/models/product-details.models';
import { useState } from 'react';

const getAllProducts = async () => {
  try {
    const response = await ProductService.getAllProducts();
    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const ProductList = () => {
  const user = useUserStore.getState().user;
  const { addItem } = useCartStore.getState();
  const queryClient = useQueryClient();

  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  const addToCart = async (product_details_id: number) => {
    const quantity = quantities[product_details_id] || 1;
    addItem(
      {
        product_details_id: product_details_id,
        quantity: quantity
      },
      queryClient
    );
  };

  const handleQuantityChange = (product_details_id: number, value: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [product_details_id]: value
    }));
  };

  const productQuery = useQuery({
    queryKey: ['/shop/getAllProducts'],
    queryFn: getAllProducts
  });

  // if (productQuery.isLoading || (user && cartQuery.isLoading))
  //   return <div>Loading...</div>;
  if (productQuery.isError)
    return <div>Error: {productQuery.error.message}</div>;

  return (
    <>
      <div>Products List</div>
      {productQuery?.data?.map((productDetail: productDetailsModel) =>
        productDetail.product_details_id !== undefined ? (
          <div key={productDetail.product_details_id} className='p-2'>
            <p>Product Name: {productDetail.products?.product_name}</p>
            <p>Detail Name: {productDetail.detail_name}</p>
            <p>Price: {productDetail.price}</p>
            <input
              type='number'
              value={quantities[productDetail.product_details_id] || 1}
              onChange={(e) =>
                handleQuantityChange(
                  productDetail.product_details_id!,
                  Number(e.target.value)
                )
              }
              className='dark:text-black'
              min='1'
            />
            <button
              onClick={() => addToCart(productDetail.product_details_id!)}
            >
              Add to Cart
            </button>
          </div>
        ) : null
      )}
    </>
  );
};

export default ProductList;
