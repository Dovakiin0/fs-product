import { IProduct } from "./IProduct";

export interface IOrder {
  id: number;
  quantity: number;
  totalPrice: number;
  Product: IProduct;
}

export interface IOrderRequest {
  productId: number;
  quantity: number;
  total: number;
}
