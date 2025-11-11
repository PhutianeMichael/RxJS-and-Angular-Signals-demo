import { Component, inject } from '@angular/core';

import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { catchError, EMPTY } from 'rxjs';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  standalone: true,
  imports: [NgIf, NgFor, CurrencyPipe, AsyncPipe],
})
export class ProductDetailComponent {
  errorMessage = '';
  productsService = inject(ProductService);
  product$ = this.productsService.product$.pipe(
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    }));

  // pageTitle = this.product ? `Product Detail for: ${this.product.productName}` : 'Product Detail';
  pageTitle = 'Product Details'

  addToCart(product: Product) {
  }
}
