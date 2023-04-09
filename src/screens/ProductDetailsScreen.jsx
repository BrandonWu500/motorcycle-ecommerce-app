import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import products from "../data/products";
import formatCurrency from "../utils/formatCurrency";
import { useSelector } from "react-redux";
import { selectCurProduct } from "../store/productsSlice";
import { useState } from "react";
const ProductDetailsScreen = () => {
  const product = useSelector(selectCurProduct);
  const { width } = useWindowDimensions();
  const [isLoading, setIsLoading] = useState(true);
  return (
    <View>
      <ScrollView style={{ height: "100%" }}>
        {/* Image Carousel */}
        <FlatList
          data={product.images}
          renderItem={({ item }) => (
            <>
              <Image
                source={{ uri: item }}
                style={{
                  width,
                  aspectRatio: 1.5,
                  resizeMode: "contain",
                }}
              />
            </>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          style={styles.carousel}
        />

        <View style={styles.textContainer}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>{formatCurrency(product.price)}</Text>
          <Text style={styles.desc}>{product.desc}</Text>
        </View>
      </ScrollView>

      <Pressable style={styles.btn}>
        <Text style={styles.btnText}>Add to Cart</Text>
      </Pressable>
    </View>
  );
};
export default ProductDetailsScreen;
const styles = StyleSheet.create({
  carousel: {
    backgroundColor: "lightgray",
  },
  textContainer: {
    padding: 20,
    gap: 15,
  },
  name: {
    fontSize: 32,
    fontWeight: 700,
  },
  price: {
    fontSize: 24,
    fontWeight: 500,
    letterSpacing: 1.5,
  },
  desc: {
    lineHeight: 30,
    fontSize: 18,
    fontWeight: 300,
  },
  btn: {
    position: "absolute",
    bottom: 10,
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
