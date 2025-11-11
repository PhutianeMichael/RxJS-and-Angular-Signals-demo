import { Component, Input } from '@angular/core';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CartItem } from '../cart';

@Component({
  selector: 'sw-cart-item',
  standalone: true,
  imports: [CurrencyPipe, FormsModule, NgFor, NgIf],
  templateUrl: './cart-item.component.html',
})
export class CartItemComponent {
  @Input({required: true}) cartItem!: CartItem;
  qtyArr = [...Array(8).keys()].map(x => x + 1);

  exPrice = this.cartItem?.quantity * this.cartItem?.product.price;

  onQuantitySelected(quantity: number): void {

  }

  removeFromCart(): void {

  }
}
