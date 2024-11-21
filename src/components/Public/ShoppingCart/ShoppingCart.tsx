import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
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
  // const user = useUserStore.getState().user;
  const cartStore = useCartStore();
  const { items, incrementQuantity, decrementQuantity, removeItem } = cartStore;

  const queryClient = useQueryClient();

  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  const getCart = async () => {
    try {
      await cartStore.syncUserCart();
      return items;
    } catch (err) {
      console.error('Error fetching cart:', err);
      throw err;
    }
  };

  const cartQuery = useQuery({
    queryKey: ['/cart/getCart'],
    queryFn: getCart
    // enabled: !!user // Fetch only if the user is logged in
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

  const handleQuantityChange = (product_details_id: number, value: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [product_details_id]: value
    }));
  };

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
                <p>ID Detail: {item.product_details_id}</p>
                <p>ID Cart: {item.cart_items_id}</p>
                <p>Name: {item.product_details?.details_name}</p>
                <p>Price: ${item.product_details?.price}</p>
                <p>Quantity: {item.quantity}</p>
                <button
                  onClick={() =>
                    incrementQuantity(
                      item.cart_items_id!,
                      item.product_details_id,
                      quantities[item.product_details_id] || 1,
                      queryClient
                    )
                  }
                >
                  ➕
                </button>
                <input
                  type='number'
                  value={quantities[item.product_details_id] || 1}
                  onChange={(e) =>
                    handleQuantityChange(
                      item.product_details_id!,
                      Number(e.target.value)
                    )
                  }
                  className='dark:text-black'
                  min='1'
                />
                <button
                  onClick={() =>
                    decrementQuantity(
                      item.cart_items_id!,
                      item.product_details_id,
                      quantities[item.product_details_id] || 1,
                      queryClient
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
