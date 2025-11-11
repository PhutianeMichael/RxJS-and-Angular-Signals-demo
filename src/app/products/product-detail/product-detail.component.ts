import { Component, inject, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';

import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { catchError, EMPTY, ReplaySubject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  standalone: true,
  imports: [NgIf, NgFor, CurrencyPipe],
})
export class ProductDetailComponent implements OnChanges, OnDestroy {
  @Input() productId: number = 0;
  errorMessage = '';
  product: Product | null = null;
  productsService = inject(ProductService);
  destroy$ = new ReplaySubject<void>();
  pageTitle = this.product ? `Product Detail for: ${this.product.productName}` : 'Product Detail';

  ngOnChanges(changes: SimpleChanges): void {
    const id = changes['productId'].currentValue;
    if (id) {
      this.productsService.getProduct(this.productId)
        .pipe(
          tap(products => this.product = products),
          takeUntil(this.destroy$),
          catchError(err => {
            this.errorMessage = err;
            return EMPTY;
          }))
        .subscribe();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addToCart(product: Product) {
  }
}
