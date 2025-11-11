import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, of, shareReplay, switchMap, throwError } from 'rxjs';
import { Product } from './product';
import { HttpErrorService } from '../utilities/http-error.service';
import { ReviewService } from '../reviews/review.service';
import { Review } from '../reviews/review';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl = 'api/products';
  private http = inject(HttpClient);
  private httpErrorService = inject(HttpErrorService);
  private reviewService = inject(ReviewService);
  readonly products$ = this.http.get<Product[]>(this.productsUrl)
    .pipe(
      shareReplay(1),
      catchError((err) => this.handleError(err)));
  readonly product$ = (id: number) => this.http.get<Product>(`${this.productsUrl}/${id}`)
    .pipe(
      switchMap((product) => this.getProductWithReviews(product)),
      catchError((err) => this.handleError(err)));

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
