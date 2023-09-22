import { Card, Button } from "react-native-paper";
import { Text } from "./Themed";
import { StyleSheet } from "react-native";
import { IProduct } from "../types/IProduct";
import { IOrder } from "../types/IOrder";

type Props = {
  order: IOrder;
};
function OrderCard({ order }: Props) {
  return (
    <Card style={styles.container}>
      <Card.Cover source={{ uri: order.Product.image }} />
      <Card.Title title={order.Product.title} />
      <Card.Content>
        <Text numberOfLines={3} ellipsizeMode="tail">
          {order.Product.description}
        </Text>
      </Card.Content>
      <Card.Actions>
        <Button>Status: Delivering</Button>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
});

export default OrderCard;
