import React from "react";
import Firebase from "../Firebase";
import { Text, Avatar, Card } from "react-native-elements";
import * as WebBrowser from "expo-web-browser";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  StyleSheet,
  Share,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  TextInput,
  Button,
  Dimensions,
} from "react-native";

export default function Profile({ navigation }) {
  const [loading, setLoading] = React.useState(true);
  const [userRole, setUserRole] = React.useState(false);
  const [currentPassword, setCurrentPassword] = React.useState();
  const [newPassword, setNewPassword] = React.useState();

  React.useEffect(() => {
    Firebase.database()
      .ref("users/" + Firebase.auth().currentUser.uid)
      .on("value", (snapshot) => {
        if (snapshot.child("role").val() == "admin") {
          setUserRole(true);
        }
      });

    setLoading(false);
  }, []);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "Cüzdanım uygulaması süper bir uygulama kesinlikle denemelisin! 😎\n\nhttps://boduremre.github.io/cuzdanim/",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="steelblue" />
      </View>
    );
  }

  function changePassword() {
    if (currentPassword == "" || newPassword == "") {
      alert("Gerekli alanları doldurunuz!");
    } else {
      Firebase.auth()
        .currentUser.updatePassword(newPassword)
        .then(function () {
          currentPassword = "";
          newPassword = "";
          alert("Şifreniz değiştirildi! Yeniden giriş yapınız.");
        })
        .catch(function (error) {
          alert("Şifreniz değiştirilemedi! " + error);
        });
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.userInfoSection}>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Avatar
            title={Firebase.auth().currentUser.displayName.substring(0, 2)}
            size={80}
            containerStyle={{ backgroundColor: "gray" }}
          />
          <View style={{ marginLeft: 20 }}>
            <Text style={styles.title}>
              {Firebase.auth().currentUser.displayName}
            </Text>
            <Text style={styles.caption}>
              {Firebase.auth().currentUser.email}
            </Text>
            <Text style={styles.caption1}>
              {Firebase.auth().currentUser.uid}
            </Text>
          </View>
        </View>
      </Card>

      <Card>
        <Card.Title>Şifre Değiştir</Card.Title>
        <TextInput
          placeholder="Eski Şifre"
          style={styles.textInputStyle}
          errorStyle={{ color: "red" }}
          underlineColorAndroid="transparent"
          onChangeText={setCurrentPassword}
          value={currentPassword}
          placeholderTextColor="gray"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Yeni Şifre"
          style={styles.textInputStyle}
          errorStyle={{ color: "red" }}
          underlineColorAndroid="transparent"
          onChangeText={setNewPassword}
          value={newPassword}
          placeholderTextColor="gray"
          autoCapitalize="none"
        />
        <View
          style={{
            width: Dimensions.get("window").width - 75,
            height: 45,
            marginTop: 5,
          }}
        >
          <Button onPress={changePassword} title="Şifre Değiştir" />
        </View>
      </Card>
      <Card>
        <Card.Title>Menü</Card.Title>
        <TouchableOpacity onPress={onShare}>
          <View style={styles.menuItem}>
            <Icon name="share-variant" color="steelblue" size={25} />
            <Text style={styles.menuItemText}>Tavsiye Et</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            await WebBrowser.openBrowserAsync(
              "https://boduremre.github.io/cuzdanim/"
            );
          }}
        >
          <View style={styles.menuItem}>
            <Icon name="information-outline" color="steelblue" size={25} />
            <Text style={styles.menuItemText}>Hakkında</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => signOut()}>
          <View style={styles.menuItem}>
            <Icon name="logout" color="steelblue" size={25} />
            <Text style={styles.menuItemText}>Çıkış</Text>
          </View>
        </TouchableOpacity>
      </Card>
    </ScrollView>
  );
}

// stil tanımlamarı
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginTop: 15,
    marginBottom: 5,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "500",
  },
  caption1: {
    fontSize: 12,
    lineHeight: 28,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
  textInputStyle: {
    width: Dimensions.get("window").width - 75,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: "lightgray",
    color: "#00aced",
  },
});
