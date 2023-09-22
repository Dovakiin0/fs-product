import { useState } from "react";
import { useAppDispatch, useAppSelector } from "./useReducer";
import {
  createCartItem,
  increase,
  decrease,
  clearCart,
} from "../store/reducers/cartSlice";
import { IProduct } from "../types/IProduct";

export default function useCart() {
  const [loading, setLoading] = useState<boolean>(false);
  const { cart, totalPrice } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const addCartItem = (value: IProduct) => {
    try {
      setLoading(true);
      dispatch(createCartItem(value));
    } catch (err: any) {
      alert(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const increaseQuantity = (productId: number) => {
    try {
      setLoading(true);
      dispatch(increase(productId));
    } catch (err: any) {
      alert(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const decreaseQuantity = (productId: number) => {
    try {
      setLoading(true);
      dispatch(decrease(productId));
    } catch (err: any) {
      alert(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const clearItems = () => {
    try {
      setLoading(true);
      dispatch(clearCart());
    } catch (err: any) {
      alert(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    cart,
    totalPrice,
    addCartItem,
    decreaseQuantity,
    increaseQuantity,
    clearItems,
  };
}
