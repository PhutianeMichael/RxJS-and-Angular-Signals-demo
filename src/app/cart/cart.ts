import { Product } from "../products/product";

export interface CartItem {
  product: Product;
  quantity: number;
}
export type CartOptions = {
  persistenceType: string,
  persistenceKey: string,
}
