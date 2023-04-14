import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useGetOrderQuery } from "../store/apiSlice";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import formatCurrency from "../utils/formatCurrency";
const SearchResults = ({ searchTerm }) => {
  const [filteredSearchTerm, setFilteredSearchTerm] = useState(searchTerm);
  const { data, isLoading, isSuccess, error } =
    useGetOrderQuery(filteredSearchTerm);

  useEffect(() => {
    if (searchTerm.length >= 5) {
      setFilteredSearchTerm(searchTerm);
    }
  }, [searchTerm]);

  if (isLoading) return <ActivityIndicator size="large" />;

  if (error) return <Text>{error?.data?.message}</Text>;

  return (
    <View style={styles.container}>
      {Object.entries(data.customer).map(([key, val]) => (
        <View style={styles.row}>
          <Text style={styles.key}>{key}:</Text>
          <Text style={styles.val}>{val}</Text>
        </View>
      ))}
      <View style={styles.row}>
        <Text style={styles.key}>Total:</Text>
        <Text style={styles.val}>{formatCurrency(data.total)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.key}>Status:</Text>
      </View>
      <View style={styles.rowSpread}>
        <View style={styles.col}>
          <Text style={styles.valBold}>Preparing</Text>
          <MaterialCommunityIcons name="truck" size={24} color="black" />
        </View>
        <Text style={styles.val}>Shipped</Text>
        <Text style={styles.val}>Delivered</Text>
      </View>
    </View>
  );
};
export default SearchResults;
const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 10,
    flexWrap: "wrap",
  },
  rowSpread: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 10,
    flexWrap: "wrap",
  },
  key: {
    textTransform: "capitalize",
    fontSize: 18,
    fontWeight: 500,
  },
  val: {
    fontSize: 16,
  },
  valBold: {
    fontSize: 16,
    fontWeight: 500,
  },
  col: {
    alignItems: "center",
    gap: 10,
  },
});
