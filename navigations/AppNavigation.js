import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import Firebase from "../Firebase";
import SignIn from "../screens/Login";
import CreateAccount from "../screens/Signup";
import SplashScreen from "../screens/Splash";
import NewsScreen from "../screens/News";
import Profile from "../screens/Profile";
import Home from "../screens/Home";
import CategoriesScreen from "../screens/Categories";
import TransactionsScreen from "../screens/Transactions";
import AddTransactionScreen from "../screens/AddTransaction";
import CalculatorScreen from "../screens/Calculator";

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="SignIn"
      component={SignIn}
      options={{ title: "Giriş", headerShown: false }}
    />
    <AuthStack.Screen
      name="CreateAccount"
      component={CreateAccount}
      options={{ title: "Kayıt Ol", headerShown: false }}
    />
  </AuthStack.Navigator>
);

const Tabs = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const SearchStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Anasayfa" component={Home} />
    <HomeStack.Screen name="HesapDetaylari" component={TransactionsScreen} />
    <HomeStack.Screen
      name="HesapHareketiEkle"
      component={AddTransactionScreen}
    />
  </HomeStack.Navigator>
);

const CategoriesStack = createStackNavigator();
const CategoriesStackScreen = () => (
  <CategoriesStack.Navigator>
    <CategoriesStack.Screen name="Kategoriler" component={CategoriesScreen} />
  </CategoriesStack.Navigator>
);

const ProfileStack = createStackNavigator();
const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Profile" component={Profile} />
  </ProfileStack.Navigator>
);

const NewsStack = createStackNavigator();
const NewsStackScreen = () => (
  <NewsStack.Navigator>
    <NewsStack.Screen name="Haberler" component={NewsScreen} />
  </NewsStack.Navigator>
);

const TabsScreen = () => (
  <Tabs.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === "Anasayfa") {
          iconName = focused ? "md-home" : "md-home-outline";
        } else if (route.name === "Haberler") {
          iconName = focused ? "md-newspaper" : "md-newspaper-outline";
        } else if (route.name === "Search") {
          iconName = focused ? "ios-search" : "ios-search";
        } else if (route.name === "Profil") {
          iconName = focused ? "md-person" : "md-person-outline";
        } else if (route.name === "Favorilerim") {
          iconName = focused ? "ios-heart" : "ios-heart";
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: "black",
      inactiveTintColor: "gray",
    }}
  >
    <Tabs.Screen name="Anasayfa" component={HomeStackScreen} />
    <Tabs.Screen name="Haberler" component={NewsStackScreen} />
    <Tabs.Screen name="Profil" component={ProfileStackScreen} />
  </Tabs.Navigator>
);

const Drawer = createDrawerNavigator();
const DrawerScreen = () => (
  <Drawer.Navigator initialRouteName="Anasayfa">
    <Drawer.Screen
      name="Anasayfa"
      component={TabsScreen}
      options={{
        drawerIcon: () => (
          <Ionicons name="md-home-outline" size={24} color="black" />
        ),
      }}
    />
    <Drawer.Screen
      name="Kategoriler"
      component={CategoriesStackScreen}
      options={{
        drawerIcon: () => (
          <Ionicons name="md-pricetags-outline" size={24} color="black" />
        ),
      }}
    />
    <Drawer.Screen
      name="Hesap Makinesi"
      component={CalculatorScreen}
      options={{
        drawerIcon: () => (
          <Ionicons name="md-calculator-outline" size={24} color="black" />
        ),
      }}
    />
    <Drawer.Screen
      name="Profil"
      component={ProfileStackScreen}
      options={{
        drawerIcon: () => (
          <Ionicons name="md-person-outline" size={24} color="black" />
        ),
      }}
    />
    <Drawer.Screen
      name="Çıkış"
      component={ProfileStackScreen}
      options={{
        drawerIcon: () => (
          <Ionicons name="md-log-out-outline" size={24} color="black" />
        ),
      }}
    />
  </Drawer.Navigator>
);

const RootStack = createStackNavigator();
const RootStackScreen = ({ userToken }) => (
  <RootStack.Navigator headerMode="none">
    {userToken ? (
      <RootStack.Screen
        name="App"
        component={DrawerScreen}
        options={{
          animationEnabled: false,
        }}
      />
    ) : (
      <RootStack.Screen
        name="Auth"
        component={AuthStackScreen}
        options={{
          animationEnabled: false,
        }}
      />
    )}
  </RootStack.Navigator>
);

export default function AppNavigation() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);

  React.useEffect(() => {
    setTimeout(() => {
      Firebase.auth().onAuthStateChanged((user) => {
        setUserToken(user ? true : false);
        setIsLoading(false);
      });
    }, 1000);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <RootStackScreen userToken={userToken} />
    </NavigationContainer>
  );
}
