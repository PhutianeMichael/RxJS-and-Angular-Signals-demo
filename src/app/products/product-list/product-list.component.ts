import { Component, inject } from '@angular/core';

import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductService } from '../product.service';
import { catchError, EMPTY } from 'rxjs';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, ProductDetailComponent, AsyncPipe],
})
export class ProductListComponent {
  productsService = inject(ProductService);
  pageTitle = 'Products';
  errorMessage = '';
  readonly selectedProductId$ = this.productsService.productSelected$;

  readonly products$ = this.productsService.products$
    .pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      }));

  trackByProductId(productId: number) {
    return productId
  }

  onSelected(productId: number): void {
    this.productsService.productSelected(productId);
  }
}
