import { useEffect, useState } from "react";
import { IProduct } from "../types/IProduct";
import { client } from "../config/client";
import { useAppDispatch, useAppSelector } from "./useReducer";
import { setProducts } from "../store/reducers/productSlice";

export default function useProduct() {
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState();
  const { products } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await client.get("/api/products");
      if (response.status === 200) {
        dispatch(setProducts(response.data));
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return { loading, products, fetchProducts };
}
