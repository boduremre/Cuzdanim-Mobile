import React, { Component } from "react";
import { FlatList, SafeAreaView } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import firebase from "../Firebase";

export default class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    firebase
      .database()
      .ref("kategoriler")
      .on("value", (snapshot) => {
        var li = [];
        snapshot.forEach((child) => {
          li.push({
            cat: child.val(),
          });
        });
        this.setState({ list: li });
      });
  }

  renderItem({ item }) {
    return (
      <ListItem key={item} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{item.cat}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    );
  }

  render() {
    return (
      <SafeAreaView>
        <FlatList
          style={{ width: "100%" }}
          data={this.state.list}
          keyExtractor={(item) => item.cat}
          renderItem={this.renderItem}
        />
      </SafeAreaView>
    );
  }
}
