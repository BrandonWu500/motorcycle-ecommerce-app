import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import cart from "../data/cart";
import CartItem from "../components/CartItem";
import OrderSummary from "../components/OrderSummary";
const CartScreen = () => {
  return (
    <>
      <FlatList
        data={cart}
        renderItem={({ item }) => <CartItem cartItem={item} />}
        ListFooterComponent={<OrderSummary />}
      />
      <Pressable style={styles.btn}>
        <Text style={styles.btnText}>Checkout</Text>
      </Pressable>
    </>
  );
};
export default CartScreen;
const styles = StyleSheet.create({
  btn: {
    position: "absolute",
    bottom: 30,
    width: "80%",
    backgroundColor: "black",
    borderRadius: 100,
    padding: 20,
    alignSelf: "center",
  },
  btnText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
  },
});
