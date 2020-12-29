// Detaylı Bilgi: https://www.npmjs.com/package/react-native-chart-kit
import React from "react";
import { View } from "react-native";
import { BarChart } from "react-native-chart-kit";

const Chart = (props) => {
  // props
  const {
    data,
    width,
    symbol,
    fromZero,
    showBarTops,
    showValuesOnTopOfBars,
    withVerticalLabels,
    withHorizontalLabels,
  } = props;

  // çubuk grafiği ayarları
  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    barPercentage: 2.5,
    fillShadowGradient: "black",
    fillShadowGradientOpacity: 0.4,
  };

  return (
    <View>
      <BarChart
        withVerticalLabels={withVerticalLabels}
        withHorizontalLabels={withHorizontalLabels}
        fromZero={fromZero}
        showBarTops={showBarTops}
        showValuesOnTopOfBars={showValuesOnTopOfBars}
        data={data}
        yAxisLabel={symbol}
        width={width}
        height={220}
        chartConfig={chartConfig}
        style={{ alignItems: "center", justifyContent: "center" }}
      />
    </View>
  );
};

export default Chart;
