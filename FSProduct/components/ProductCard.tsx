import { Card, Button } from "react-native-paper";
import { Text } from "./Themed";
import { StyleSheet } from "react-native";
import { IProduct } from "../types/IProduct";

type Props = {
  product: IProduct;
  addCartItem: (product: IProduct) => void;
};
function ProductCard({ product, addCartItem }: Props) {
  return (
    <Card style={styles.container}>
      <Card.Cover source={{ uri: product.image }} />
      <Card.Title title={product.title} />
      <Card.Content>
        <Text numberOfLines={3} ellipsizeMode="tail">
          {product.description}
        </Text>
      </Card.Content>
      <Card.Actions>
        <Button mode="outlined" onPress={() => addCartItem(product)}>
          Add to Cart
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

export default ProductCard;
