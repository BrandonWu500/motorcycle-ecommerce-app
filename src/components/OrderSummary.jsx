import { StyleSheet, Text, View } from "react-native";
const OrderSummary = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.text}>Subtotal</Text>
        <Text style={styles.text}>$400.00</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Shipping</Text>
        <Text style={styles.text}>$400.00</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.textBold}>Total</Text>
        <Text style={styles.textBold}>$400.00</Text>
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
