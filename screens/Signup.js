import React from "react";
import {
  Text,
  TextInput,
  View,
  Dimensions,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Icon } from "react-native-elements";
import Firebase from "../Firebase";
import prettyDate from "../utils/PrettyDate";
import { StackActions } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

export default class Login extends React.Component {
  state = {
    email: "",
    name: "",
    password: "",
    loading: false,
  };

  signUpApp = () => {
    this.setState({ loading: true });

    Firebase.auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((auth) => {
        let uid = auth.user.uid;
        this.createUser(uid);

        auth.user.updateProfile({
          displayName: this.state.name,
        });
      })
      .catch((err) => {
        this.setState({ loading: false });
        Alert.alert("Oops", "Kayıt Olunamadı. Lütfen tekrar deneyiniz.", [
          { text: "Tamam" },
        ]);
      });
  };

  createUser = (uid) => {
    Firebase.database()
      .ref("users")
      .child(uid)
      .set({
        email: this.state.email,
        uid: uid,
        name: this.state.name,
        token: "ExponentPushToken[nzTMf-IgzDsIhdx8P5OVFJ]",
        role: "user",
      })
      .then(() => {
        Firebase.database()
          .ref("hesaplar/" + uid + "/")
          .push({
            currency: "TL",
            createdAt: prettyDate(),
            desc: "Nakit Hesabı",
            name: "Nakit",
            total: 0,
          })
          .then((data) => {
            console.log("Hesap hareki eklendi");
            console.log("data ", data);
          })
          .catch((error) => {
            //error callback
            console.log("error ", error);
          });
      });
  };

  render() {
    if (this.state.loading) {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" color="purple" />
        </View>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View style={{ width: width, height: 15 }} />
          <View style={{ width: width, alignItems: "center" }}>
            <Icon
              name="wallet"
              size={50}
              type="material-community"
              color="#00aced"
            />
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 40,
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              Cüzdanım
            </Text>
          </View>
          <View style={{ width: width, paddingLeft: 20, marginTop: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>Kayıt Ol</Text>
            <TextInput
              placeholder="Ad Soyad"
              style={{
                width: width - 20,
                paddingVertical: 20,
                borderBottomWidth: 0.5,
                borderColor: "lightgray",
                color: "#00aced",
              }}
              underlineColorAndroid="transparent"
              onChangeText={(name) => this.setState({ name: name })}
              value={this.state.name}
              placeholderTextColor="gray"
            />
            <TextInput
              placeholder="E-posta"
              style={{
                width: width - 20,
                paddingVertical: 20,
                borderBottomWidth: 0.5,
                borderColor: "lightgray",
                color: "#00aced",
              }}
              underlineColorAndroid="transparent"
              onChangeText={(email) => this.setState({ email: email })}
              value={this.state.email}
              keyboardType="email-address"
              placeholderTextColor="gray"
            />
            <TextInput
              placeholder="Şifre"
              style={{
                width: width - 20,
                paddingVertical: 20,
                borderBottomWidth: 0.5,
                borderColor: "lightgray",
                color: "#00aced",
              }}
              underlineColorAndroid="transparent"
              onChangeText={(password) => this.setState({ password: password })}
              value={this.state.password}
              secureTextEntry
              placeholderTextColor="gray"
            />
          </View>
          <View style={{ width: width, alignItems: "center" }}>
            <TouchableOpacity onPress={() => this.signUpApp()}>
              <View
                style={{
                  alignItems: "center",
                  width: width - 20,
                  padding: 15,
                  borderRadius: 4,
                  backgroundColor: "#00aced",
                  marginVertical: 15,
                }}
              >
                <Text style={{ fontSize: 12, color: "#fff" }}>Kayıt Ol</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.dispatch(StackActions.pop(1))
              }
            >
              <Text style={{ fontSize: 12, color: "#000" }}>
                Hesabınız var mı?{" "}
                <Text
                  style={{ fontWeight: "bold", fontSize: 12, color: "#000" }}
                >
                  Giriş Yap
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}
