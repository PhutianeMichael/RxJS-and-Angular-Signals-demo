import { Component, inject, OnDestroy, OnInit } from '@angular/core';

import { NgClass, NgFor, NgIf } from '@angular/common';
import { Product } from '../product';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductService } from '../product.service';
import { ReplaySubject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, ProductDetailComponent],
})
export class ProductListComponent implements OnInit, OnDestroy {
  productsService = inject(ProductService);
  destroy$ = new ReplaySubject<void>();
  pageTitle = 'Products';
  products: Product[] = [];
  errorMessage = '';
  selectedProductId: number = 0;

  ngOnInit(): void {
    this.productsService.getProducts()
      .pipe(
        tap(products => this.products = products),
        takeUntil(this.destroy$))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSelected(productId: number): void {
    this.selectedProductId = productId;
    console.log(this.selectedProductId);
  }
}
