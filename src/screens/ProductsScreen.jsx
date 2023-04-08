import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import products from "../data/products";
const ProductsScreen = () => {
  const { width } = useWindowDimensions();
  return (
    <FlatList
      data={products}
      renderItem={({ item }) => (
        <Pressable style={{ padding: 1 }}>
          <Image
            source={{
              uri: item.image,
            }}
            style={{
              width: width / 2,
              aspectRatio: 1,
              resizeMode: "cover",
            }}
          />
        </Pressable>
      )}
      numColumns={2}
    />
  );
};
export default ProductsScreen;
const styles = StyleSheet.create({});
