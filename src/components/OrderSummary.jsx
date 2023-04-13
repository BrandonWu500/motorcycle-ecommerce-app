import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  selectShippingCost,
  selectSubtotal,
  selectTotal,
} from "../store/cartSlice";
import formatCurrency from "../utils/formatCurrency";
import { useCreateOrderMutation } from "../store/apiSlice";
import { useEffect } from "react";
const OrderSummary = ({ cartItems }) => {
  const dispatch = useDispatch();
  const subtotal = useSelector(selectSubtotal);
  const shippingCost = useSelector(selectShippingCost);
  const total = useSelector(selectTotal);

  const [createOrder, { data, isLoading, isSuccess, error }] =
    useCreateOrderMutation();

  useEffect(() => {
    if (isSuccess) {
      Alert.alert("Order Created", `Your Order ID is ${data?.ref}`);
      dispatch(clearCart());
    }
    if (error) {
      Alert.alert("Something went wrong");
    }
  }, [isSuccess, error]);

  const handleCreateOrder = () => {
    createOrder({
      items: cartItems,
      subtotal,
      shipping: shippingCost,
      total,
      customer: {
        name: "John Doe",
        email: "john@g.com",
        address: "8665 Rockledge St. Camas, WA 98607",
      },
    });
  };

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
      <Pressable style={styles.btn} onPress={handleCreateOrder}>
        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <Text style={styles.btnText}>Checkout</Text>
        )}
      </Pressable>
    </View>
  );
};
export default OrderSummary;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
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
  btn: {
    width: "80%",
    backgroundColor: "black",
    borderRadius: 100,
    padding: 20,
    marginVertical: 20,
    alignSelf: "center",
  },
  btnText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
  },
});
