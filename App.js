import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
		<Text style={styles.textStyle}>Cüzdanım</Text>
      <Text>Cüzdanım mobil uygulaması ile Gelir-Gider takibi yapabilirsiniz.</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }, textStyle: {
    fontSize: 40,
  },
});
