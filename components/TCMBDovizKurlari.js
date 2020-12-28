import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

export default class DovizKurlari extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Kur: null,
    };
  }

  componentDidMount() {
    this.KurCek();
  }

  KurCek = async () => {
    try {
      var self = this;
      const parseString = await require("react-native-xml2js").parseString;
      const response = await fetch("https://www.tcmb.gov.tr/kurlar/today.xml");
      let responseXml = await response.text();
      await parseString(responseXml, function (err, result) {
        self.setState({ Kur: result });
      });
    } catch (error) {}
  };

  render() {
    return (
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#fff",
          paddingVertical: 10,
        }}
      >
        <View style={styles.DovizView}>
          <Text style={styles.DovizBaslik}>USD/TRY</Text>
          <Text style={styles.Doviz}>
            {this.state.Kur != null
              ? this.state.Kur.Tarih_Date.Currency.filter(
                  (x) => x.$.Kod == "USD"
                )[0].ForexBuying[0]
              : "veri yok"}
          </Text>
        </View>
        <View style={styles.DovizView}>
          <Text style={styles.DovizBaslik}>EURO/TRY</Text>
          <Text style={styles.Doviz}>
            {this.state.Kur != null
              ? this.state.Kur.Tarih_Date.Currency.filter(
                  (x) => x.$.Kod == "EUR"
                )[0].ForexBuying[0]
              : "veri yok"}
          </Text>
        </View>
        <View style={styles.DovizView}>
          <Text style={styles.DovizBaslik}>STERLİN/TRY</Text>
          <Text style={styles.Doviz}>
            {this.state.Kur != null
              ? this.state.Kur.Tarih_Date.Currency.filter(
                  (x) => x.$.Kod == "GBP"
                )[0].ForexBuying[0]
              : "veri yok"}
          </Text>
        </View>
        <View style={[styles.DovizView, { borderRightWidth: 0 }]}>
          <Text style={styles.DovizBaslik}>JPY/TRY</Text>
          <Text style={styles.Doviz}>
            {this.state.Kur != null
              ? this.state.Kur.Tarih_Date.Currency.filter(
                  (x) => x.$.Kod == "JPY"
                )[0].ForexBuying[0]
              : "veri yok"}
          </Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  DovizView: {
    flex: 1,
    borderRightWidth: 1,
    borderColor: "grey",
  },
  DovizBaslik: {
    fontSize: 10,
    textAlign: "center",
  },
  Doviz: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "bold",
  },
});
