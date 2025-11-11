import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';

import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { catchError, EMPTY, Observable, ReplaySubject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  standalone: true,
  imports: [NgIf, NgFor, CurrencyPipe, AsyncPipe],
})
export class ProductDetailComponent implements OnChanges {
  @Input() productId: number = 0;
  errorMessage = '';
  product: Product | null = null;
  product$!: Observable<Product>;
  productsService = inject(ProductService);
  destroy$ = new ReplaySubject<void>();
  pageTitle = this.product ? `Product Detail for: ${this.product.productName}` : 'Product Detail';

  ngOnChanges(changes: SimpleChanges): void {
    const id = changes['productId'].currentValue;
    if (id) {
      this.product$ = this.productsService.product$(this.productId)
        .pipe(
          tap(products => this.product = products),
          takeUntil(this.destroy$),
          catchError(err => {
            this.errorMessage = err;
            return EMPTY;
          }));
    }
  }

  addToCart(product: Product) {
  }
}
