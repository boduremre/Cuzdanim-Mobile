import React from "react";
import { StyleSheet } from "react-native";
import MyFlatList from "../components/MyFlatList";

export default function Transactions({ navigation, route }) {
  const { title } = route.params;

  React.useEffect(() => {
    navigation.setOptions({ title: title });
  }, []);

  return <MyFlatList />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
