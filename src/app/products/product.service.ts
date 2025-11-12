import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, filter, map, Observable, of, shareReplay, switchMap, throwError } from 'rxjs';
import { Product, Result } from './product';
import { HttpErrorService } from '../utilities/http-error.service';
import { ReviewService } from '../reviews/review.service';
import { Review } from '../reviews/review';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl = 'api/products';
  private http = inject(HttpClient);
  private httpErrorService = inject(HttpErrorService);
  private reviewService = inject(ReviewService);
  selectedProductId = signal<number | undefined>(undefined);
  private productResults$ = this.http.get<Product[]>(this.productsUrl)
    .pipe(
      map(p => ({data: p, error: undefined} as Result<Product[]>)),
      shareReplay(1),
      catchError((err) => of({
        data: [],
        error: this.httpErrorService.formatError(err)
      } as Result<Product[]>)));
  private productsResult = toSignal(this.productResults$,
    { initialValue: ({data: [] } as Result<Product[]>)})
  products = computed(() => this.productsResult().data);
  productsError = computed(() => this.productsResult().error);

  private productResult$ = toObservable(this.selectedProductId)
    .pipe(
      filter(Boolean),
      switchMap(id => {
        const productUrl = this.productsUrl + '/' + id;
        return this.http.get<Product>(productUrl)
          .pipe(
            switchMap(product => this.getProductWithReviews(product)),
            catchError(err => of({
              data: undefined,
              error: this.httpErrorService.formatError(err)
            } as Result<Product>)),
          );
      }),
      map(p => ({data: p} as Result<Product>))
    );

  private productResult = toSignal(this.productResult$);
  product = computed(() => this.productResult()?.data);
  productError = computed(() => this.productResult()?.error);

  productLoaded = computed(() => {
    let id = this.selectedProductId();
    let products = this.products();

    if (id && (products && products.length > 0)) {
      return products.find(p => p.id === id);
    }
    return undefined;
  })

  // private product$ = combineLatest([
  //   this.productSelected$,
  //   this.products$,
  // ]).pipe(
  //   map(([selectedProductId, products]) =>
  //     products.find(product => product.id === selectedProductId)),
  //   filter(Boolean),
  //   switchMap(product => this.getProductWithReviews(product)),
  //   catchError((err) => this.handleError(err)),
  // )



  // product = toSignal(this.product$, {initialValue: undefined})

  productSelected(selectedProductId: number) {
    this.selectedProductId.set(selectedProductId);
  }

  private getProductWithReviews(product: Product): Observable<Product> {
    if (product.hasReviews) {
      return this.http.get<Review[]>(this.reviewService.getReviewUrl(product.id))
        .pipe(
          map((reviews: Review[]) => ({...product, reviews} as Product)),
        )
    }
    return of(product);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    const formatedMessage = this.httpErrorService.formatError(error);
    return throwError(() => formatedMessage);
  }

}
