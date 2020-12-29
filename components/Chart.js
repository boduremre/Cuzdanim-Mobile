// Detaylı Bilgi: https://www.npmjs.com/package/react-native-chart-kit
import React from "react";
import { View } from "react-native";
import { BarChart } from "react-native-chart-kit";

const Chart = (props) => {
  // props
  const {
    list,
    width,
    symbol,
    fromZero,
    showBarTops,
    showValuesOnTopOfBars,
    withVerticalLabels,
    withHorizontalLabels,
  } = props;

  var chartLabels = [];
  var chartData = [];

  // gelen veriler chart datasına dönüştürülüyor.
  list.forEach(function (number) {
    chartLabels.push(number.name);
    number.name == "Dolar"
      ? chartData.push(number.total * 7.4063)
      : chartData.push(number.total);
  });

  // Chart verisi
  const data = {
    labels: chartLabels,
    datasets: [
      {
        data: chartData,
      },
    ],
  };

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
