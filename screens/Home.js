import React from "react";
import { FlatList, SafeAreaView, StyleSheet, Text } from "react-native";
import { ListItem, Avatar, Card } from "react-native-elements";
import firebase from "../Firebase";
import Chart from "../components/Chart";

export default function Home({ navigation }) {
  const [list, setList] = React.useState([]);

  React.useEffect(() => {
    let userId = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref("hesaplar/" + userId)
      .on("value", (snapshot) => {
        var li = [];
        snapshot.forEach((child) => {
          li.push({
            key: child.key,
            createdAt: child.val().createdAt,
            currency: child.val().currency,
            desc: child.val().desc,
            name: child.val().name,
            total: child.val().total,
          });
        });
        setList(li);
      });
  }, []);

  function renderItem({ item }) {
    return (
      <ListItem
        key={item}
        bottomDivider
        onPress={() => {
          navigation.navigate("HesapDetaylari", {
            screenTitle: item.name,
            key: item.key,
            currency: item.currency,
          });
        }}
      >
        <Avatar
          size="small"
          title={item.currency}
          containerStyle={{
            backgroundColor: "gray",
          }}
        />
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
          <ListItem.Subtitle>
            <Text>{item.desc}</Text>
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  }

  return (
    <SafeAreaView>
      <Card>
        <Card.Title></Card.Title>
        <Chart />
      </Card>
      <Card>
        <Card.Title>Hesaplarım</Card.Title>
        <FlatList
          style={{ width: "100%" }}
          data={list}
          keyExtractor={(item) => item.name}
          renderItem={renderItem}
        />
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: { fontSize: 40, fontWeight: "bold", marginBottom: 50 },
});
