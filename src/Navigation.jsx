import { Pressable, StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import ProductsScreen from "./screens/ProductsScreen";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import ProductDetailsScreen from "./screens/ProductDetailsScreen";
import CartScreen from "./screens/CartScreen";
import { useSelector } from "react-redux";
import { selectNumCartItems } from "./store/cartSlice";
import TrackOrderScreen from "./screens/TrackOrderScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const numCartItems = useSelector(selectNumCartItems);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Products"
          component={ProductsScreen}
          options={({ navigation }) => ({
            headerLeft: () => (
              <Pressable
                style={styles.cartBtn}
                onPress={() => navigation.navigate("Track Order")}
              >
                <MaterialCommunityIcons name="truck" size={24} color="black" />
                <Text style={styles.btnText}>Orders</Text>
              </Pressable>
            ),
            headerRight: () => (
              <Pressable
                style={styles.cartBtn}
                onPress={() => navigation.navigate("Cart")}
              >
                <FontAwesome5 name="shopping-cart" size={24} color="black" />
                <Text style={styles.btnText}>{numCartItems}</Text>
              </Pressable>
            ),
          })}
        />
        <Stack.Screen
          name="Product Details"
          component={ProductDetailsScreen}
          options={{ presentation: "modal" }}
        />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Track Order" component={TrackOrderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
const styles = StyleSheet.create({
  cartBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  btnText: {
    fontSize: 18,
  },
});
