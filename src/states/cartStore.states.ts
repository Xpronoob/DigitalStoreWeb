import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { useUserStore } from './userStore.states';
import { ProductService } from '@/services/Public/product.service';
import { CartItemsModel } from '@/models/cart-items.model';

interface CartState {
  items: CartItemsModel[];
  addItem: (item: CartItemsModel, quantity: number) => void;
  setItems: (items: CartItemsModel[]) => void;
  incrementQuantity: (
    cart_items_id: number,
    product_details_id: number,
    quantity: number,
    queryClient: any
  ) => void;
  decrementQuantity: (
    cart_items_id: number,
    product_details_id: number,
    quantity: number,
    queryClient: any
  ) => void;
  removeItem: (
    cart_items_id: number,
    product_details_id: number
  ) => Promise<void>;
  clearCart: () => void;
  syncUserCartInAuthentication: (queryClient: any) => void;
  syncUserCart: () => void;
}

export const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set) => ({
        items: [],

        addItem: async (item) => {
          const user = useUserStore.getState().user;

          if (user) {
            await ProductService.addProductToCart(item);
          }

          set((state) => {
            const existingItem = state.items.find(
              (existingItem) =>
                existingItem.product_details_id === item.product_details_id
            );

            if (existingItem) {
              return {
                items: state.items.map((existingItem) =>
                  existingItem.product_details_id === item.product_details_id
                    ? {
                        ...existingItem,
                        quantity: existingItem.quantity + item.quantity
                      }
                    : existingItem
                )
              };
            }

            return {
              items: [...state.items, item]
            };
          });
        },

        setItems: (items) => {
          set({ items });
        },

        incrementQuantity: async (
          cart_items_id,
          product_details_id,
          quantity,
          queryClient
        ) => {
          const user = useUserStore.getState().user;
          if (user?.accessToken) {
            await ProductService.updateProductInCart(cart_items_id, quantity);
          }
          set((state) => ({
            items: state.items.map((item) =>
              item.product_details_id === product_details_id && item.quantity
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          }));
          await queryClient.invalidateQueries({ queryKey: ['/cart/getCart'] });
        },

        decrementQuantity: async (
          cart_items_id,
          product_details_id,
          quantity,
          queryClient
        ) => {
          const user = useUserStore.getState().user;
          if (user?.accessToken) {
            await ProductService.updateProductInCart(cart_items_id, -quantity);
          }
          set((state) => ({
            items: state.items.map((item) =>
              item.product_details_id === product_details_id &&
              item.quantity > 1
                ? { ...item, quantity: item.quantity - quantity }
                : item
            )
          }));
          await queryClient.invalidateQueries({ queryKey: ['/cart/getCart'] });
        },

        removeItem: async (cart_items_id, product_details_id) => {
          const user = useUserStore.getState().user;
          if (user?.accessToken) {
            await ProductService.removeProductFromCart(cart_items_id);
          }
          set((state) => ({
            items: state.items.filter(
              (item) => item.product_details_id !== product_details_id
            )
          }));
        },

        clearCart: () => {
          set({ items: [] });
        },

        syncUserCartInAuthentication: async (queryClient) => {
          const user = useUserStore.getState().user;
          if (user?.accessToken) {
            const cart = await ProductService.getCart();
            if (cart.cartItems.length > 0) {
              set({ items: cart.cartItems });
            } else {
              const currentItems = useCartStore.getState().items;
              await Promise.all(
                currentItems.map(async (item: CartItemsModel) => {
                  try {
                    await ProductService.addProductToCart(item);
                    // console.log(`Producto agregado:`, item);
                  } catch (error) {
                    console.error(`Error al agregar producto:`, item, error);
                  }
                })
              );
            }
          }
          queryClient.invalidateQueries({ queryKey: ['/cart/getCart'] });
        },

        syncUserCart: async () => {
          const user = useUserStore.getState().user;
          if (user?.accessToken) {
            const cart = await ProductService.getCart();
            if (cart.cartItems.length > 0) {
              set({ items: cart.cartItems });
            } else {
              set({ items: [] });
            }
          }
        }
      }),
      { name: 'cart-items' } // Key in localStorage
    ),
    { name: 'CartStore' }
  )
);
