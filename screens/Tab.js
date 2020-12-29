import React from "react";
import HomeScreen from "./Home";
import SettingsScreen from "./Settings";
import NewsScreen from "./News";
import ProfileScreen from "./Profile";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

export default function Home({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Giriş") {
            iconName = focused ? "md-home" : "md-home-outline";
          } else if (route.name === "Ayarlar") {
            iconName = focused ? "ios-cog" : "ios-cog";
          } else if (route.name === "Haberler") {
            iconName = focused ? "md-newspaper" : "md-newspaper-outline";
          } else if (route.name === "Profil") {
            iconName = focused ? "ios-person" : "ios-person";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "black",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Giriş" component={HomeScreen} />
      <Tab.Screen name="Haberler" component={NewsScreen} />
      <Tab.Screen name="Profil" component={ProfileScreen} />
      <Tab.Screen name="Ayarlar" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
