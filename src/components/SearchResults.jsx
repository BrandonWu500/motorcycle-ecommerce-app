import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useGetOrderQuery } from "../store/apiSlice";
const SearchResults = ({ searchTerm }) => {
  const [filteredSearchTerm, setFilteredSearchTerm] = useState(searchTerm);
  const { data, isLoading, isSuccess, error } =
    useGetOrderQuery(filteredSearchTerm);

  useEffect(() => {
    if (searchTerm.length >= 5) {
      setFilteredSearchTerm(searchTerm);
    }
  }, [searchTerm]);

  return (
    <View>
      {isLoading && <ActivityIndicator size="large" />}
      {error && <Text>{error?.data?.message}</Text>}
      {isSuccess && <Text>{JSON.stringify(data, null, 2)}</Text>}
    </View>
  );
};
export default SearchResults;
const styles = StyleSheet.create({});
