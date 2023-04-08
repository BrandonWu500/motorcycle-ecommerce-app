import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import formatCurrency from "../utils/formatCurrency";
const CartItem = ({ cartItem }) => {
  const { product, quantity } = cartItem;
  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <View style={styles.row}>
          <Text style={styles.name}>{product.name}</Text>
        </View>
        <View style={styles.row}>
          <Pressable>
            <Feather name="minus-circle" size={24} color="gray" />
          </Pressable>
          <Text style={styles.quantity}>{quantity}</Text>
          <Pressable>
            <Feather name="plus-circle" size={24} color="gray" />
          </Pressable>
        </View>
        <Text style={styles.price}>{formatCurrency(product.price)}</Text>
      </View>
    </View>
  );
};
export default CartItem;
const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  image: {
    width: "50%",
    aspectRatio: 1.5,
    backgroundColor: "lightgray",
  },
  textContainer: {
    flexBasis: "50%",
    gap: 20,
    paddingRight: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: 500,
  },
  price: {
    fontWeight: 400,
    fontSize: 16,
  },
  quantity: {
    color: "gray",
    fontWeight: 600,
  },
});
