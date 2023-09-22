import { useEffect, useState } from "react";
import { client } from "../config/client";
import { useAppDispatch, useAppSelector } from "./useReducer";
import { setOrders } from "../store/reducers/orderSlice";
import { IOrderRequest } from "../types/IOrder";

export default function useProduct() {
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState();
  const { orders } = useAppSelector((state) => state.order);
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await client.get("/api/orders");
      if (response.status === 200) {
        dispatch(setOrders(response.data));
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (value: IOrderRequest) => {
    try {
      setLoading(true);
      const response = await client.post("/api/orders", value);
      if (response.status === 201) {
        fetchOrders();
      }
    } catch (error) {
    } finally {
    }
  };

  return { loading, orders, fetchOrders, createOrder };
}
