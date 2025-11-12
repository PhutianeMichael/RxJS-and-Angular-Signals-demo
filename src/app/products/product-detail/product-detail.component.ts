import { Component, inject } from '@angular/core';

import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { catchError, EMPTY } from 'rxjs';
import { CartService } from '../../cart/cart.service';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  standalone: true,
  imports: [NgIf, NgFor, CurrencyPipe, AsyncPipe],
})
export class ProductDetailComponent {
  errorMessage = '';
  productsService = inject(ProductService);
  cartService = inject(CartService);
  product$ = this.productsService.product$.pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    }));

  pageTitle = 'Product Details'
  subTotal = this.cartService.subtotal;
  deliverFee = this.cartService.deliveryFee;
  tax = this.cartService.tax;
  totalPrice = this.cartService.totalPrice;

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
