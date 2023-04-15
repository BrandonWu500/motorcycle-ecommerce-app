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
import {
  useCreateOrderMutation,
  useStartPaymentMutation,
} from "../store/apiSlice";
import { useEffect } from "react";
import { useStripe } from "@stripe/stripe-react-native";

const OrderSummary = ({ cartItems }) => {
  const dispatch = useDispatch();
  const subtotal = useSelector(selectSubtotal);
  const shippingCost = useSelector(selectShippingCost);
  const total = useSelector(selectTotal);

  const [createOrder, { data, isLoading, isSuccess, error }] =
    useCreateOrderMutation();
  const [startPayment] = useStartPaymentMutation();

  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  useEffect(() => {
    if (isSuccess) {
      Alert.alert("Order Created", `Your Order ID is ${data?.ref}`);
      dispatch(clearCart());
    }
    if (error) {
      Alert.alert("Something went wrong");
    }
  }, [isSuccess, error]);

  const handleCheckout = async () => {
    // 1. Create payment intent
    const { data: payData, error: payError } = await startPayment({
      amount: Math.floor(total * 100), // to get in cents
    });
    if (payError) {
      console.log(payError);
      Alert.alert("Something went wrong");
      return;
    }

    // 2. Initialize payment sheet
    const { error: initPayError } = await initPaymentSheet({
      merchantDisplayName: "Motorcycle E-Commerce",
      paymentIntentClientSecret: payData.paymentIntent,
    });
    if (initPayError) {
      console.log(initPayError);
      Alert.alert("Something went wrong");
      return;
    }

    // 3. Present payment sheet and process payment
    const { error: presentPayError } = await presentPaymentSheet();
    if (presentPayError) {
      return;
    }

    // 4. Create order if payment successful
    handleCreateOrder();
  };

  const handleCreateOrder = () => {
    createOrder({
      // to only get the properties we need
      items: cartItems.reduce(
        (items, item) => [
          ...items,
          { product: item.product._id, quantity: item.quantity },
        ],
        []
      ),
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
      <Pressable style={styles.btn} onPress={handleCheckout}>
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
