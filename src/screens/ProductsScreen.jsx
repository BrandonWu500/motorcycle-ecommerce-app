import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import products from "../data/products";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setCurProduct } from "../store/productsSlice";
import { useGetAllProductsQuery } from "../store/apiSlice";
const ProductsScreen = () => {
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const navigation = useNavigation();

  const { data: products, isLoading, error } = useGetAllProductsQuery();

  const handlePress = (id) => {
    dispatch(setCurProduct(id));
    navigation.navigate("Product Details");
  };

  if (isLoading) return <ActivityIndicator size="large" />;

  if (error) return <Text>{error?.data?.message}</Text>;

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => (
        <Pressable style={{ padding: 1 }} onPress={() => handlePress(item.id)}>
          <Image
            source={{
              uri: item.image,
            }}
            style={{
              width: width / 2,
              aspectRatio: 1.5,
              resizeMode: "cover",
              backgroundColor: "lightgray",
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
