import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import useDebounce from "../hooks/useDebounce";
import SearchResults from "../components/SearchResults";
const TrackOrderScreen = () => {
  const [orderRef, setOrderRef] = useState("");
  const debouncedOrderRef = useDebounce(orderRef, 1000);
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={orderRef}
        onChangeText={setOrderRef}
        placeholder="Enter Your Order ID"
        placeholderTextColor="gray"
      />
      <SearchResults searchTerm={debouncedOrderRef} />
    </View>
  );
};
export default TrackOrderScreen;
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 30,
  },
});
