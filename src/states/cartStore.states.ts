import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { useUserStore } from './userStore.states';
import { ProductService } from '@/services/Public/product.service';
import { useQueryClient } from '@tanstack/react-query';

interface CartItem {
  cart_item_id?: number;
  user_id?: number;
  product_details_id: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem, queryClient: any) => void;
  updateItem: (product_details_id: number, quantity: number) => void;
  removeItem: (product_details_id: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set) => ({
        items: [],

        addItem: async (item, queryClient?: any) => {
          const user = useUserStore.getState().user;
          if (user) {
            await ProductService.addProductToCart(item);
            if (queryClient) {
              await queryClient.invalidateQueries({
                queryKey: ['/cart/getCart']
              });
            }
          } else {
            set((state) => ({
              items: [...state.items, item]
            }));
          }
        },

        updateItem: async (product_details_id, quantity) => {
          const user = useUserStore.getState().user;
          if (user) {
            await ProductService.updateProductInCart(
              product_details_id,
              quantity
            );
          } else {
            set((state) => ({
              items: state.items.map((item) =>
                item.product_details_id === product_details_id
                  ? { ...item, quantity }
                  : item
              )
            }));
          }
        },

        removeItem: async (product_details_id) => {
          const user = useUserStore.getState().user;
          if (user) {
            await ProductService.removeProductFromCart(product_details_id);
          } else {
            set((state) => ({
              items: state.items.filter(
                (item) => item.user_id !== product_details_id
              )
            }));
          }
        },

        clearCart: () => set({ items: [] })
      }),
      {
        name: 'cart-items' // localStorage key name
      }
    ),
    { name: 'CartStore' }
  )
);
