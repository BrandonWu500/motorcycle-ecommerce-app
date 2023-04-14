import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { useGetProductQuery } from "../store/apiSlice";
import formatCurrency from "../utils/formatCurrency";
const OrderItem = ({ productId, quantity }) => {
  const { data: product, isLoading, error } = useGetProductQuery(productId);
  if (isLoading) return <ActivityIndicator size="large" />;
  if (error) return <Text>{error?.data?.message}</Text>;
  return (
    <View style={styles.container}>
      <View style={styles.col}>
        <Image source={{ uri: product.image }} style={styles.image} />
      </View>
      <View style={styles.col}>
        <View style={styles.row}>
          <Text style={styles.label}>Name:</Text>
          <Text>{product.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Quantity:</Text>
          <Text>{quantity}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Price:</Text>
          <Text>{formatCurrency(product.price * quantity)}</Text>
        </View>
      </View>
    </View>
  );
};
export default OrderItem;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 20,
  },
  image: {
    width: 100,
    aspectRatio: 1.5,
    resizeMode: "cover",
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  col: {
    gap: 10,
  },
  label: {
    fontWeight: 500,
  },
});
