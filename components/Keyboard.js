import React from "react";
import { View, StyleSheet } from "react-native";
import AppBtn from "./AppBtn";
import IconBtn from "./IconBtn";

function Keyboard({ handlePress }) {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <AppBtn
          title="c"
          color="primary"
          onPress={() => handlePress("allClear")}
        />
        <IconBtn title="backspace" onPress={() => handlePress("backSpace")} />
        <IconBtn title="percent" onPress={() => handlePress("percentage")} />
        <IconBtn
          title="division"
          btnColor="secondary"
          onPress={() => handlePress("operator", "÷")}
        />
      </View>
      <View style={styles.subContainer}>
        <AppBtn title="7" onPress={() => handlePress("number", "7")} />
        <AppBtn title="8" onPress={() => handlePress("number", "8")} />
        <AppBtn title="9" onPress={() => handlePress("number", "9")} />
        <AppBtn
          title="×"
          color="primary"
          btnColor="secondary"
          onPress={() => handlePress("operator", "×")}
        />
      </View>
      <View style={styles.subContainer}>
        <AppBtn title="4" onPress={() => handlePress("number", "4")} />
        <AppBtn title="5" onPress={() => handlePress("number", "5")} />
        <AppBtn title="6" onPress={() => handlePress("number", "6")} />
        <IconBtn
          title="minus"
          btnColor="secondary"
          onPress={() => handlePress("operator", "−")}
        />
      </View>
      <View style={styles.subContainer}>
        <AppBtn title="1" onPress={() => handlePress("number", "1")} />
        <AppBtn title="2" onPress={() => handlePress("number", "2")} />
        <AppBtn title="3" onPress={() => handlePress("number", "3")} />
        <IconBtn
          title="plus"
          btnColor="secondary"
          onPress={() => handlePress("operator", "+")}
        />
      </View>
      <View style={styles.subContainer}>
        <IconBtn title="calculator" onPress={() => handlePress("calculator")} />
        <AppBtn title="0" onPress={() => handlePress("number", "0")} />
        <AppBtn title="." onPress={() => handlePress("number", ".")} />
        <IconBtn
          title="equal"
          btnColor="warning"
          onPress={() => handlePress("equal")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    height: "50%",
    marginVertical: 15,
  },
  subContainer: {
    flexDirection: "row",
    marginVertical: -12,
    marginLeft: 12,
  },
});

export default Keyboard;
