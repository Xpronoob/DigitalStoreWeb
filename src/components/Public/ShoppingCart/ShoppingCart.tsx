import { ProductService } from '@/services/Public/product.service';
import { useUserStore } from '@/states/userStore.states';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { CartItemsModel } from '../../../models/cart-items.model';
import { useCartStore } from '@/states/cartStore.states';

interface ShoppingCartProps {
  isCartOpen: boolean;
  toggleCart: () => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({
  isCartOpen,
  toggleCart
}) => {
  const user = useUserStore.getState().user;
  const cart = useCartStore((state) => state.items);

  const getCart = async () => {
    try {
      if (user?.accessToken) {
        const response = await ProductService.getCart();
        return response.cartItems;
      } else {
        return cart;
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const cartQuery = useQuery({
    queryKey: ['/cart/getCart'],
    queryFn: getCart,
    enabled: !!user // Only fetch if the user is logged in
  });

  if (cartQuery.isLoading) return <div>Loading...</div>;
  if (cartQuery.isError) return <div>Error: {cartQuery.error.message}</div>;

  return (
    <div
      className={`fixed top-0 right-0 w-80 h-full bg-gray-400 dark:bg-slate-800 text-white z-50 transform transition-transform duration-300 ${
        isCartOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <button className='absolute top-4 right-4' onClick={toggleCart}>
        &times;
      </button>
      <h2 className='p-4 text-lg font-semibold'>Your Cart</h2>
      <div>Cart Items</div>
      {cartQuery?.data?.map((cartItems: CartItemsModel) =>
        cartItems.cart_item_id !== undefined ? (
          <div key={cartItems.cart_item_id} className='p-2'>
            <p>Name: {cartItems.product_details?.detail_name}</p>
            <p>Price: ${cartItems.product_details?.price}</p>
            <p>Quantity: {cartItems.quantity}</p>
          </div>
        ) : null
      )}
    </div>
  );
};

export default ShoppingCart;
