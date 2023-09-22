import { Card, Button } from "react-native-paper";
import { Text } from "./Themed";
import { StyleSheet } from "react-native";
import { IProduct } from "../types/IProduct";
import { ICart } from "../types/ICart";
import { AntDesign } from "@expo/vector-icons";

type Props = {
  cart: ICart;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
};
function CartCard({ cart, increaseQuantity, decreaseQuantity }: Props) {
  return (
    <Card style={styles.container}>
      <Card.Cover source={{ uri: cart.product.image }} />
      <Card.Title title={cart.product.title} />
      <Card.Content>
        <Text>Price: {cart.product.price * cart.quantity}</Text>
      </Card.Content>
      <Card.Actions>
        <Button
          mode="outlined"
          icon={"plus"}
          onPress={() => increaseQuantity(cart.product.id)}
        >
          Add
        </Button>
        <Text>{cart.quantity}</Text>
        <Button
          mode="outlined"
          icon="minus"
          onPress={() => decreaseQuantity(cart.product.id)}
        >
          Remove
        </Button>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
});

export default CartCard;
