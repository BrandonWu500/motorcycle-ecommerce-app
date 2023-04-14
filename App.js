import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ProductsScreen from "./src/screens/ProductsScreen";
import ProductDetailsScreen from "./src/screens/ProductDetailsScreen";
import CartScreen from "./src/screens/CartScreen";
import Navigation from "./src/Navigation";
import { Provider } from "react-redux";
import { store } from "./src/store";
import { StripeProvider } from "@stripe/stripe-react-native";

const STRIPE_PUBLIC_KEY =
  "pk_test_51MILO5Gw1TbTweETpArzklQ8n2rMBvofPoCeVVp9HxCBFONuoT2qwdTEG6WsxZGswYLOQ4MwPNpmJCCxwCVhc4Pa003LPoMH89";

export default function App() {
  return (
    <Provider store={store}>
      <StripeProvider publishableKey={STRIPE_PUBLIC_KEY}>
        <Navigation />
      </StripeProvider>
    </Provider>
  );
}
