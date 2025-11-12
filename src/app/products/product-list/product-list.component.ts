import { Component, inject } from '@angular/core';

import { NgClass, NgFor, NgIf } from '@angular/common';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, ProductDetailComponent],
})
export class ProductListComponent {
  pageTitle = 'Products';
  private productsService = inject(ProductService);
  selectedProductId = this.productsService.selectedProductId;

  products = this.productsService.products;
  errorMessage = this.productsService.productsError;

  trackByProductId(productId: number) {
    return productId
  }

  onSelected(productId: number): void {
    this.productsService.productSelected(productId);
  }
}
