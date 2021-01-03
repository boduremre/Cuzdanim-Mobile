import React from "react";
import { StyleSheet, View, Switch, Platform } from "react-native";
import Firebase from "../Firebase";
import prettyDate from "../utils/PrettyDate";
import { Input, Text, Icon, Card, Button } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function AddTransactionScreen({ navigation, route }) {
  const { screenTitle, key, currency } = route.params;
  const [amount, setAmount] = React.useState();
  const [desc, setDesc] = React.useState();

  const [expoPushToken, setExpoPushToken] = React.useState("");
  const [tokenn, setToken] = React.useState("");
  const [notification, setNotification] = React.useState(false);
  const notificationListener = React.useRef();
  const responseListener = React.useRef();

  React.useEffect(() => {
    //kullanıcının expo push token bilgisi firebase databaseden alınıyor.
    Firebase.database()
      .ref("users/" + Firebase.auth().currentUser.uid + "/token")
      .once("value", (snapshot) => {
        var userToken = snapshot.val();
        setToken(userToken);
      });

    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        //console.log(response);
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: screenTitle + " (" + currency + ")",
    });
  }, []);

  //Switch
  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  //DateTimePicker
  const [date, setDate] = React.useState(new Date());
  const [mode, setMode] = React.useState("date");
  const [show, setShow] = React.useState(false);
  const [dateInput, setDateInput] = React.useState();
  const [category, setCategory] = React.useState();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    setDateInput(prettyDate(currentDate));
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  // kaydet metodu
  const save = () => {
    var userId = Firebase.auth().currentUser.uid;

    Firebase.database()
      .ref("hesapHareketleri/" + userId + "/" + key)
      .push({
        amount: amount,
        createdAt: prettyDate(date),
        category: category,
        desc: desc,
        type: isEnabled ? "gelir" : "gider",
      })
      .then(async () => {
        navigation.navigate("HesapDetaylari", {
          screenTitle: screenTitle,
          key: key,
          currency: currency,
        });

        // push notification
        console.log(tokenn);
        await sendPushNotification(tokenn, isEnabled);
      })
      .catch((error) => {
        console.log("error ", error);
      });
  };

  return (
    <View style={styles.container}>
      <Card>
        <Card.Title>Gelir - Gider Ekle</Card.Title>
        <Card.Divider />
        <View style={{ flexDirection: "row", width: "90%" }}>
          <Input
            editable={false}
            style={styles.inputStyle}
            placeholder="Tarih: şimdi"
            value={dateInput}
          />
          <Icon name="calendar" type="font-awesome" onPress={showDatepicker} />
        </View>
        <Input
          style={styles.inputStyle}
          placeholder="Açıklama"
          value={desc}
          onChangeText={setDesc}
          keyboardType="default"
        />
        <Input
          style={styles.inputStyle}
          placeholder="Tutar"
          value={amount}
          onChangeText={setAmount}
          keyboardType="decimal-pad"
        />
        <View
          style={{ borderBottomWidth: 1, borderColor: "#ccc", borderRadius: 3 }}
        >
          <Picker
            selectedValue={category}
            style={{ height: 50, width: "100%" }}
            onValueChange={(itemValue) => setCategory(itemValue)}
          >
            <Picker.Item label="Kategori Seçiniz..." value="cat" />
            <Picker.Item label="Aidat" value="Aidat" />
            <Picker.Item label="Alacak" value="Alacak" />
            <Picker.Item label="Birikim" value="Birikim" />
            <Picker.Item label="Borç" value="Borç" />
            <Picker.Item label="Diğer" value="Diğer" />
            <Picker.Item label="Ek Ders" value="Ek Ders" />
            <Picker.Item label="Elektrik" value="Elektrik" />
            <Picker.Item label="Fatura" value="Fatura" />
            <Picker.Item label="İnternet" value="İnternet" />
            <Picker.Item label="Su Faturası" value="Su Faturası" />
            <Picker.Item label="Kira" value="Kira" />
            <Picker.Item label="Kredi Kartı" value="Kredi Kartı" />
            <Picker.Item label="Maaş" value="Maaş" />
            <Picker.Item label="Mesai" value="Mesai" />
            <Picker.Item label="Telefon" value="Telefon" />
          </Picker>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            width: "95%",
            paddingTop: 20,
            paddingBottom: 10,
          }}
        >
          <Text style={{ paddingRight: 5, color: "red" }}>GİDER</Text>
          <Switch onValueChange={toggleSwitch} value={isEnabled} />
          <Text style={{ color: "green" }}>GELİR</Text>
        </View>

        <View style={styles.buttonContainerStyle}>
          <Button
            icon={<Icon name="save" size={24} color="white" />}
            title="Kaydet"
            onPress={save}
          />
        </View>

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </Card>
    </View>
  );
}

async function schedulePushNotification(isEnabled1) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Cüzdanım 📣",
      body: isEnabled1
        ? "Hesabınıza para girişi oldu!"
        : "Hesabınızdan para çıkışı oldu!",
      data: { data: "goes here" },
    },
    trigger: { seconds: 1 },
  });
}

async function sendPushNotification(expoPushToken, isEnabled1) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Cüzdanım 📣",
    body: isEnabled1
      ? "Hesabınıza para girişi oldu!"
      : "Hesabınızdan para çıkışı oldu!",
    data: { data: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );

    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      alert("Push bildirimi için push belirteci alınamadı!");
      return;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
    // console.log("Üretilen:" + token);
  } else {
    alert("Push Bildirimleri için fiziksel cihaz kullanılmalıdır!");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  inputStyle: {
    width: "70%",
    alignSelf: "center",
  },
  buttonContainerStyle: {
    padding: 10,
  },
});
