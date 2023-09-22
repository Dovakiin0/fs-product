import { useEffect, useState } from "react";
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

  const fetchProducts = () => {
    setLoading(true);
    client
      .get("/api/products")
      .then((response) => {
        if (response.status === 200) {
          dispatch(setProducts(response.data));
        }
      })
      .catch((err) => alert(err.response.data.message))
      .finally(() => setLoading(false));
  };

  return { loading, products, fetchProducts };
}
