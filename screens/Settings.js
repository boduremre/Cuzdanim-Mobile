import React from "react";
import { StyleSheet, View, Button, Text, ToastAndroid } from "react-native";

export default function Settings({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 10 }}>Ayarlar</Text>
      <Button
        style={styles.buttonStyle}
        title="Selamla"
        onPress={() => ToastAndroid.show("Merhaba Dünya!", ToastAndroid.SHORT)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  buttonStyle: {
    marginTop: 100,
  },
});
