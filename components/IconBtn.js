import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function IconBtn({
  title,
  onPress,
  value,
  btnColor = "dark",
  color = "primary",
}) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[btnColor] }]}
      onPress={onPress}
    >
      <MaterialCommunityIcons name={title} color={colors[color]} size={27} />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    width: "18%",
    height: "65%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginVertical: 2,
    marginRight: 12,
    marginLeft: 12,
  },
});
export default IconBtn;
