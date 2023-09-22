import { useEffect, useState } from "react";
import { protectedClient } from "../config/client";
import { useAppDispatch, useAppSelector } from "./useReducer";
import { setOrders } from "../store/reducers/orderSlice";
import { IOrderRequest } from "../types/IOrder";

export default function useOrder() {
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState();
  const { orders } = useAppSelector((state) => state.order);
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    setLoading(true);
    protectedClient
      .get("/api/orders")
      .then((response) => {
        if (response.status === 200) {
          dispatch(setOrders(response.data));
        }
      })
      .catch((err) => alert(err.response.data.message))
      .finally(() => setLoading(false));
  };

  const createOrder = (value: IOrderRequest[]) => {
    setLoading(true);
    protectedClient
      .post("/api/orders", { carts: value })
      .then((response) => {
        if (response.status === 201) {
          fetchOrders();
        }
      })
      .catch((err) => alert(err.response.data.message))
      .finally(() => setLoading(false));
  };

  return { loading, orders, fetchOrders, createOrder };
}
