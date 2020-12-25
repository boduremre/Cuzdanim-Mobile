import React from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Yükleniyor...</Text>
      <ActivityIndicator
        style={{ paddingTop: 15 }}
        size="large"
        color="steelblue"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default SplashScreen;