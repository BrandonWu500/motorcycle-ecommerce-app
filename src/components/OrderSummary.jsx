import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import {
  selectShippingCost,
  selectSubtotal,
  selectTotal,
} from "../store/cartSlice";
import formatCurrency from "../utils/formatCurrency";
const OrderSummary = () => {
  const subtotal = useSelector(selectSubtotal);
  const shippingCost = useSelector(selectShippingCost);
  const total = useSelector(selectTotal);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.text}>Subtotal</Text>
        <Text style={styles.text}>{formatCurrency(subtotal)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Shipping</Text>
        <Text style={styles.text}>{formatCurrency(shippingCost)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.textBold}>Total</Text>
        <Text style={styles.textBold}>{formatCurrency(total)}</Text>
      </View>
    </View>
  );
};
export default OrderSummary;
const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderTopColor: "lightgray",
    borderTopWidth: 1,
    gap: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    color: "gray",
    fontSize: 18,
  },
  textBold: {
    fontSize: 18,
    fontWeight: 500,
  },
});
