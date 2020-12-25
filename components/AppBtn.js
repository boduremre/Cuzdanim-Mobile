import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import colors from "../config/colors";

const AppBtn = ({
  title,
  onPress,
  value,
  btnColor = "dark",
  color = "white",
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[btnColor] }]}
      onPress={onPress}
    >
      <Text style={[styles.text, { color: colors[color] }]}>{title}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    width: "18%",
    height: "65%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginVertical: 5,
    marginRight: 12,
    marginLeft: 12,
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
export default AppBtn;
