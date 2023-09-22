import { StyleSheet, ScrollView } from "react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import useOrder from "../../hooks/useOrder";
import OrderCard from "../../components/OrderCart";

export default function TabTwoScreen() {
  const { orders } = useOrder();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        {orders.map((order, i) => (
          <OrderCard order={order} key={i} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 5,
  },
});
