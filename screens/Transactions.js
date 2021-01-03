import React from "react";
import {
  ToastAndroid,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  Alert,
} from "react-native";
import { ListItem, Icon } from "react-native-elements";
import firebase from "../Firebase";

export default function Transactions({ navigation, route }) {
  const { screenTitle, key, currency } = route.params;
  const [list, setList] = React.useState([]);
  const [total, setTotal] = React.useState([]);

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: screenTitle + " (" + currency + ") Hesap Hareketleri",
      headerRight: () => (
        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("HesapHareketiEkle", {
                screenTitle: screenTitle,
                key: key,
                currency: currency,
              });
            }}
          >
            <Icon
              type="ionicon"
              name={
                Platform.OS === "ios"
                  ? "ios-add-circle-outline"
                  : "md-add-circle-outline"
              }
            />
          </TouchableOpacity>
        </View>
      ),
    });

    // hesap hareketleri getiriliyor.
    var userId = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("hesapHareketleri/" + userId + "/" + key)
      .on("value", (snapshot) => {
        var li = [];
        var sum = 0;
        snapshot.forEach((child) => {
          li.push({
            key: child.key,
            amount: child.val().amount,
            createdAt: child.val().createdAt,
            category: child.val().category,
            desc: child.val().desc,
            type: child.val().type,
            color: child.val().type == "gelir" ? "green" : "red",
          });

          child.val().type == "gelir"
            ? (sum = sum + parseFloat(child.val().amount))
            : (sum = sum - parseFloat(child.val().amount));
        });

        setList(li);
        setTotal(sum);

        // hesap bakiyesi güncelleniyor
        firebase
          .database()
          .ref("hesaplar/" + userId + "/" + key)
          .update({ total: sum });
      });
  }, []);

  // toast mesajı göster
  const showToast = (text) => {
    ToastAndroid.showWithGravity(text, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
  };

  function listFooterComponent({ item }) {
    return (
      <ListItem key={item} bottomDivider>
        <ListItem.Content>
          <ListItem.Subtitle>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
              }}
            >
              <View>
                <Text style={{ fontSize: 20 }}>TOPLAM ({currency}) </Text>
              </View>
              <View
                style={{
                  flex: 3,
                  alignContent: "flex-end",
                }}
              >
                <Text
                  style={{
                    color: total > 0 ? "green" : "red",
                    fontSize: 24,
                    marginLeft: 165,
                  }}
                >
                  {total} {currency}
                </Text>
              </View>
            </View>
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  }

  function itemDelete(item) {
    Alert.alert(
      "Bildirim",
      "Hesap hareketini silmek istediğinize emin misiniz?",
      [
        {
          text: "Hayır",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Evet",
          onPress: () => {
            // console.log(
            //   "hesapHareketleri/" +
            //     firebase.auth().currentUser.uid +
            //     "/" +
            //     key +
            //     "/" +
            //     item.key
            // );

            firebase
              .database()
              .ref(
                "hesapHareketleri/" +
                  firebase.auth().currentUser.uid +
                  "/" +
                  key +
                  "/" +
                  item.key
              )
              .remove()
              .then(() => {
                // hesap bakiyesi güncelleniyor
                var total1;
                item.type == "gelir"
                  ? (total1 = total - item.amount)
                  : (total1 = total + item.amount);

                firebase
                  .database()
                  .ref(
                    "hesaplar/" + firebase.auth().currentUser.uid + "/" + key
                  )
                  .update({ total: total1 });
                showToast("Hesap hareketi başarıyla silindi!");
              });
          },
        },
      ],
      { cancelafble: false }
    );
  }

  function renderItem({ item }) {
    return (
      <ListItem
        key={item}
        bottomDivider
        onLongPress={() => {
          itemDelete(item);
        }}
      >
        <ListItem.Content>
          <ListItem.Subtitle>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
              }}
            >
              <View>
                <Text>{item.createdAt}</Text>
                <Text>{item.category}</Text>
                <Text>{item.desc}</Text>
              </View>
              <View
                style={{
                  flex: 3,
                  alignContent: "flex-end",
                }}
              >
                <Text
                  style={{
                    color: item.color,
                    fontSize: 24,
                    marginLeft: 185,
                  }}
                >
                  {item.amount} {currency}
                </Text>
              </View>
            </View>
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  }

  return list.length > 0 ? (
    <SafeAreaView>
      <FlatList
        style={styles.flatListStyle}
        data={list}
        keyExtractor={(item) => item.desc}
        renderItem={renderItem}
        ListFooterComponent={listFooterComponent}
      />
    </SafeAreaView>
  ) : (
    <View style={styles.container}>
      <Text style={{ fontWeight: "bold" }}>Hesap hareketi bulunamadı.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  flatListStyle: { width: "100%" },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: 75,
  },
});
