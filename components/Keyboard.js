import React from "react";
import { View, StyleSheet } from "react-native";
import CalcBtn from "./CalcBtn";
import IconBtn from "./IconBtn";

function Keyboard({ handlePress }) {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <CalcBtn
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
        <CalcBtn title="7" onPress={() => handlePress("number", "7")} />
        <CalcBtn title="8" onPress={() => handlePress("number", "8")} />
        <CalcBtn title="9" onPress={() => handlePress("number", "9")} />
        <CalcBtn
          title="×"
          color="primary"
          btnColor="secondary"
          onPress={() => handlePress("operator", "×")}
        />
      </View>
      <View style={styles.subContainer}>
        <CalcBtn title="4" onPress={() => handlePress("number", "4")} />
        <CalcBtn title="5" onPress={() => handlePress("number", "5")} />
        <CalcBtn title="6" onPress={() => handlePress("number", "6")} />
        <IconBtn
          title="minus"
          btnColor="secondary"
          onPress={() => handlePress("operator", "−")}
        />
      </View>
      <View style={styles.subContainer}>
        <CalcBtn title="1" onPress={() => handlePress("number", "1")} />
        <CalcBtn title="2" onPress={() => handlePress("number", "2")} />
        <CalcBtn title="3" onPress={() => handlePress("number", "3")} />
        <IconBtn
          title="plus"
          btnColor="secondary"
          onPress={() => handlePress("operator", "+")}
        />
      </View>
      <View style={styles.subContainer}>
        <IconBtn title="calculator" onPress={() => handlePress("calculator")} />
        <CalcBtn title="0" onPress={() => handlePress("number", "0")} />
        <CalcBtn title="." onPress={() => handlePress("number", ".")} />
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
