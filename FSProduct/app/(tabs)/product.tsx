import { StyleSheet, ScrollView } from "react-native";

import { View } from "../../components/Themed";
import ProductCard from "../../components/ProductCard";
import useProduct from "../../hooks/useProduct";
import useCart from "../../hooks/useCart";

export default function ProductScreen() {
  const { products } = useProduct();
  const { addCartItem } = useCart();
  return (
    <ScrollView style={styles.container}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          addCartItem={addCartItem}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 5,
  },
});
