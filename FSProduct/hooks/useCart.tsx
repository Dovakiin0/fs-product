import { useState } from "react";
import { useAppDispatch, useAppSelector } from "./useReducer";
import {
  createCartItem,
  increase,
  decrease,
} from "../store/reducers/cartSlice";
import { ICart } from "../types/ICart";

export default function useProduct() {
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState();
  const { cart, totalPrice } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const addCartItem = (value: ICart) => {
    try {
      setLoading(true);
      dispatch(createCartItem(value));
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const increaseQuantity = (productId: number) => {
    try {
      setLoading(true);
      dispatch(increase(productId));
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const decreaseQuantity = (productId: number) => {
    try {
      setLoading(true);
      dispatch(decrease(productId));
    } catch (error) {
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
  };
}
