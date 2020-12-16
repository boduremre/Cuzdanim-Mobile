import React, { useState, useEffect } from "react";
import { View, SafeAreaView, Text, FlatList } from "react-native";
import prettyTime from "../utils/PrettyTime";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ListItem, Avatar } from "react-native-elements";

const Headlines = ({ navigation }) => {
  const [headlines, setHeadlines] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const category = "general"; //"technology";
  const country = "tr";
  const API_KEY = "f908c420f7ca4dcd9a1ae41e750bfcf3";
  const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${API_KEY}`;

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    (await fetch(url)).json().then((res) => setHeadlines(res));
  }

  function removeSource(title) {
    if (title == null || title.indexOf(" - ") < 0) return title;
    var parts = title.split(" - ");
    parts.pop();
    return parts.join(" - ");
  }

  function renderItem({ item }) {
    return (
      <ListItem
        key={item}
        bottomDivider
        onPress={() => {
          navigation.navigate("NewsWebView", {
            url: item.url,
            title: item.title,
          });
        }}
      >
        <Avatar size="large" source={{ uri: item.urlToImage }} />
        <ListItem.Content>
          <ListItem.Title>{removeSource(item.title)}</ListItem.Title>
          <View style={{ marginTop: 15 }} />
          <ListItem.Subtitle>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="newspaper" size={15} style={{ paddingRight: 5 }} />
              <Text>{item.source.name}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
              <Icon
                name="clock-outline"
                size={15}
                style={{ paddingRight: 5 }}
              />
              <Text>{prettyTime(item.publishedAt)}</Text>
            </View>
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    );
  }

  return (
    <SafeAreaView>
      <FlatList
        data={headlines.articles}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
        onRefresh={() => {
          setRefreshing(true).then(() => {
            this.fetchData();
          });
        }}
        refreshing={refreshing}
      />
    </SafeAreaView>
  );
};

export default Headlines;