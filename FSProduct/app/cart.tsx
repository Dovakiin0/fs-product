import { StatusBar } from "expo-status-bar";
import { Platform, ScrollView, StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import useCart from "../hooks/useCart";
import CartCard from "../components/CartCard";
import { Button } from "react-native-paper";
import useOrder from "../hooks/useOrder";

export default function CartScreen() {
  const { cart, totalPrice, increaseQuantity, decreaseQuantity, clearItems } =
    useCart();
  const { createOrder } = useOrder();

  const handleCreateOrder = () => {
    let orderItem = cart.map((cartItem) => ({
      productId: cartItem.product.id,
      quantity: cartItem.quantity,
      total: cartItem.quantity * cartItem.total,
    }));

    clearItems();

    createOrder(orderItem);
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.totalText}>Total Price: {totalPrice}</Text>

        <Button mode="contained" onPress={handleCreateOrder}>
          Checkout
        </Button>
      </View>
      <ScrollView style={styles.container}>
        {cart.map((cartItem, i) => (
          <CartCard
            cart={cartItem}
            key={i}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
          />
        ))}
      </ScrollView>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 5,
  },
  totalText: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20,
    lineHeight: 24,
    textAlign: "center",
  },
});
