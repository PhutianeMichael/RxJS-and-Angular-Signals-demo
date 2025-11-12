import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './utilities/page-not-found.component';
import { PRODUCTS_ROUTES_TOKENS } from './products.constants';

export const routes: Routes = [
  {path: PRODUCTS_ROUTES_TOKENS.WELCOME, component: HomeComponent},
  {
    path: PRODUCTS_ROUTES_TOKENS.PRODUCT,
    loadComponent: () => import('./products/product-list/product-list.component').then(c => c.ProductListComponent),
  },
  {
    path: PRODUCTS_ROUTES_TOKENS.CART,
    loadComponent: () => import('./cart/cart-shell/cart-shell.component').then(c => c.CartShellComponent),
  },
  {path: '', redirectTo: PRODUCTS_ROUTES_TOKENS.WELCOME, pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}];
