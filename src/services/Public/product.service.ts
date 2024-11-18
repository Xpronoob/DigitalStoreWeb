import { AxiosAdapter } from '@/lib/axios.adapter';
import { CartItemsModel } from '@/models/cart-items.model';

export class ProductService {
  static async getAllProducts() {
    const response = await AxiosAdapter.getRequest('/shop/getAllProducts');
    return response;
  }

  static async getProductById(id: number) {
    const response = await AxiosAdapter.getRequest(
      `/shop/getProductById/${id}`
    );
    return response;
  }

  // Shopping Cart

  static async addProductToCart(cartItems: CartItemsModel) {
    const response = await AxiosAdapter.postRequest(
      `/client/cartItems`,
      cartItems
    );
    return response;
  }

  static async updateProductInCart(idCartItems: number, quantity: number) {
    console.log('UpdateCart', idCartItems, quantity);
    const response = await AxiosAdapter.patchRequest(
      `/client/cartItems/${idCartItems}`,
      { quantity }
    );
    return response;
  }

  static async removeProductFromCart(id: number) {
    const response = await AxiosAdapter.deleteRequest(
      `/client/cartItems/${id}`
    );
    return response;
  }

  static async getCart() {
    const response = await AxiosAdapter.getRequest('/client/cartitems');
    return response;
  }
}
