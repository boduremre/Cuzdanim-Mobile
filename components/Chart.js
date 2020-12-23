import React from "react";
import { View, Dimensions } from "react-native";
import { StackedBarChart } from "react-native-chart-kit";

const Chart = (props) => {
  return (
    <View>
      <StackedBarChart
        data={{
          labels: ["Gelir", "Gider"],
          data: [[11282.47], [10124.46]],
          barColors: ["#dfe4ea", "#dfe4ea", "#dfe4ea"],
        }}
        showLegend="false"
        width={Dimensions.get("window").width - 100}
        height={220}
        chartConfig={{
          backgroundColor: "fff",
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {},
        }}
        style={{ alignItems: "center", justifyContent: "center" }}
      />
    </View>
  );
};

export default Chart;
