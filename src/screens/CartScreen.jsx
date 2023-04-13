import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import cart from "../data/cart";
import CartItem from "../components/CartItem";
import OrderSummary from "../components/OrderSummary";
import { useSelector } from "react-redux";
import { selectAllCartItems, selectNumCartItems } from "../store/cartSlice";
import { useNavigation } from "@react-navigation/native";
const CartScreen = () => {
  const cartItems = useSelector(selectAllCartItems);
  const numCartItems = useSelector(selectNumCartItems);
  const navigation = useNavigation();

  let content;
  if (numCartItems === 0) {
    content = (
      <View style={styles.container}>
        <Text style={styles.text}>Your cart is empty</Text>
        <Pressable
          onPress={() => navigation.navigate("Products")}
          style={styles.btn}
        >
          <Text style={styles.btnText}>Start Shopping</Text>
        </Pressable>
      </View>
    );
  } else {
    content = (
      <View style={styles.container}>
        <FlatList
          data={cartItems}
          renderItem={({ item }) => <CartItem cartItem={item} />}
          ListFooterComponent={() => (
            <View style={{ paddingBottom: 40 }}></View>
          )}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={styles.cartItems}
        />
        <OrderSummary cartItems={cartItems} />
      </View>
    );
  }

  return content;
};
export default CartScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: 500,
    textTransform: "capitalize",
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
