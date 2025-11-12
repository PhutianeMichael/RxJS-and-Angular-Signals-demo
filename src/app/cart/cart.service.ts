import { computed, Injectable, signal } from "@angular/core";
import { CartItem } from './cart';
import { Product } from '../products/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems = signal<CartItem[]>([]);
  cartCount = computed(() => this.cartItems().reduce((accQty, item) => accQty + item.quantity, 0));
  subtotal = computed(() => this.cartItems().reduce((accum, item) => accum + (item.quantity * item.product.price), 0));
  deliveryFee = computed<number>(() => this.subtotal() < 50 ? 5.99 : 0);
  tax = computed(() => Math.round((this.subtotal() * 10.75) / 100));
  totalPrice = computed(() => this.subtotal() + this.deliveryFee() + this.tax());

  addToCart(product: Product) {
    const existingIndex = this.cartItems().findIndex(item => item.product.id === product.id);
    if (existingIndex === -1) {
      this.cartItems.update(items => [...items, {product, quantity: 1}]);
      return;
    }

    this.cartItems.update(items =>
      items.map(item =>
        item.product.id === product.id ? {...item, quantity: item.quantity + 1} : item,
      ),
    );
  }

  updateQuantity(cartItem: CartItem, quantity: number) {
    this.cartItems.update(items =>
      items.map(item =>
        item.product.id === cartItem?.product.id ?
          {...item, quantity} : item,
      ),
    );
  }

  removeFromCart(cartItem: CartItem) {
    this.cartItems.update(items =>
      items.filter(item => item.product.id !== cartItem?.product.id))
  }

}
