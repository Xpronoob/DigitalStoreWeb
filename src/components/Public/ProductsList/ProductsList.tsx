import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ProductService } from '@/services/Public/product.service';
import { useCartStore } from '@/states/cartStore.states';
import { productDetailsModel } from '@/models/product-details.models';
import { useEffect, useState } from 'react';
import { CartItemsModel } from '@/models/cart-items.model';

const getAllProducts = async () => {
  try {
    const response = await ProductService.getAllProducts();
    // console.log(response);
    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const ProductList = () => {
  const { addItem, items } = useCartStore.getState();
  const cart = useCartStore((state) => state.items);
  const queryClient = useQueryClient();

  const [quantityTotalToAdd, setQuantityTotalToAdd] = useState(0);

  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  useEffect(() => {}, [cart, quantityTotalToAdd]);

  const addToCart = async (
    product_details_id: number,
    product_name: string,
    price: number,
    img: string,
    stock: number
  ) => {
    const quantityToAdd = quantities[product_details_id] || 1;

    const item: CartItemsModel = {
      product_details_id: product_details_id,
      quantity: quantityToAdd,
      product_details: {
        product_details_id: product_details_id,
        details_name: product_name,
        price: price,
        img: img
      }
    };

    const existCartItem = items.find(
      (item) => item.product_details_id === product_details_id
    );

    const quantityTotal =
      existCartItem?.quantity! + quantityToAdd || quantityToAdd;

    setQuantityTotalToAdd(quantityTotal);

    if (quantityTotal <= stock) {
      await addItem(item, stock);
      await queryClient.invalidateQueries({
        queryKey: ['/cart/getCart']
      });
    } else {
      alert('Stock is not enough');
    }

    // console.log('To add: ', quantityToAdd);
    // console.log('ExistCartItem Quant: ', existCartItem?.quantity);
    // console.log('Total to add: ', quantityTotal);
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

  if (productQuery.isError)
    return <div>Error: {productQuery.error.message}</div>;

  return (
    <>
      <div>Products List</div>
      {productQuery?.data?.map((productDetail: productDetailsModel) =>
        productDetail.product_details_id !== undefined ? (
          <div key={productDetail.product_details_id} className='p-2'>
            <p>Product Name: {productDetail.products?.product_name}</p>
            <img className='max-w-44' src={productDetail.img}></img>
            <p>Detail Name: {productDetail.details_name}</p>
            <p>Price: {productDetail.price}</p>
            <p>Stock: {productDetail.quantity}</p>
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
              onClick={() =>
                addToCart(
                  productDetail.product_details_id!,
                  productDetail.details_name!,
                  productDetail.price!,
                  productDetail.img!,
                  productDetail.quantity!
                )
              }
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
