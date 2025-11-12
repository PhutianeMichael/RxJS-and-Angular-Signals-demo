import { Component, computed, inject } from '@angular/core';

import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { CartService } from '../../cart/cart.service';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  standalone: true,
  imports: [NgIf, NgFor, CurrencyPipe],
})
export class ProductDetailComponent {
  productsService = inject(ProductService);
  cartService = inject(CartService);

  product = this.productsService.product;
  errorMessage = this.productsService.productError;

  pageTitle = computed(() =>
    this.product()
      ? `Product Details for: ${this.product()?.productName}`
      : 'Product Details',
  )

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
