import { ProductService } from '@/services/Public/product.service';
import { useUserStore } from '@/states/userStore.states';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
  const cartStore = useCartStore();
  const { items, setItems, incrementQuantity, decrementQuantity, removeItem } =
    cartStore;

  const queryClient = useQueryClient();

  const getCart = async () => {
    try {
      if (user?.accessToken) {
        const response = await ProductService.getCart();
        const apiCart = response.cartItems;
        setItems(apiCart);
        return apiCart;
      } else {
        return items;
      }
    } catch (err) {
      console.error('Error fetching cart:', err);
      throw err;
    }
  };

  const cartQuery = useQuery({
    queryKey: ['/cart/getCart'],
    queryFn: getCart,
    enabled: !!user // Fetch only if the user is logged in
  });

  const mutationRemove = useMutation({
    mutationFn: async ({
      cart_items_id,
      product_details_id
    }: {
      cart_items_id: number;
      product_details_id: number;
    }) => {
      await removeItem(cart_items_id, product_details_id);
    },
    onSuccess: () => {
      // queryClient.invalidateQueries(['/cart/getCart']);
      queryClient.invalidateQueries({ queryKey: ['/cart/getCart'] });
    }
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
      <div>
        {items.length > 0
          ? items.map((item: CartItemsModel) => (
              <div key={item.product_details_id} className='p-2'>
                <p>Name: {item.product_details?.details_name}</p>
                <p>Price: ${item.product_details?.price}</p>
                <p>Quantity: {item.quantity}</p>
                <button
                  onClick={() =>
                    incrementQuantity(
                      item.cart_items_id!,
                      item.product_details_id
                    )
                  }
                >
                  ➕
                </button>
                <button
                  onClick={() =>
                    decrementQuantity(
                      item.cart_items_id!,
                      item.product_details_id
                    )
                  }
                >
                  ➖
                </button>
                <button
                  onClick={() =>
                    mutationRemove.mutate({
                      cart_items_id: item.cart_items_id!,
                      product_details_id: item.product_details_id
                    })
                  }
                >
                  🗑️
                </button>
              </div>
            ))
          : 'No items in the cart'}
      </div>
    </div>
  );
};

export default ShoppingCart;
