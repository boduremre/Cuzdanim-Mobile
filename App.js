import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  return (
    <View style={styles.container}>
	  <Ionicons name="md-wallet-sharp" size={48} color="black" />
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
