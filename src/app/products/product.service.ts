import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, EMPTY, Observable, tap, throwError } from 'rxjs';
import { Product } from './product';
import { HttpErrorService } from '../utilities/http-error.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl = 'api/products';
  private http = inject(HttpClient);
  private httpErrorService = inject(HttpErrorService);

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl)
      .pipe(
        tap(() => console.log('In http.get pipeline')),
        catchError((err) => this.handleError(err)),
        );
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.productsUrl}/${id}`)
      .pipe(
        tap(() => console.log('In http.get by id pipeline')),
        catchError((err) => this.handleError(err)));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    const formatedMessage = this.httpErrorService.formatError(error);
    return throwError(() => formatedMessage);
  }

}
