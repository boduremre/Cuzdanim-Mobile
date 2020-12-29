import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Keyboard from "../components/Keyboard";
import colors from "../styles/Colors";

function Calculator({ navigation }) {
  const [result, setResult] = useState("0");
  const [expression, setExpression] = useState(["0"]);
  const [isEqualTapped, setIsEqualTapped] = useState(false);
  const [isOperatorActive, setIsOperatorActive] = useState(false);

  const format = (num) => {
    try {
      let parts = num.split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    } catch (error) {
      return 0;
    }
  };
  const noformat = (num) => {
    try {
      return num.replace(/,/g, "");
    } catch (error) {
      console.log(error);
    }
  };
  const handleNumber = (value) => {
    let txt = [...expression];
    const displayType = txt.join("");
    if (isEqualTapped) {
      txt = handleActiveEqual(value);
    }
    // if (displayType.length < 15) {
    let current = txt[txt.length - 1];
    let isLastSign = /(\+|−|\×|\÷)/i;
    let isDecimal = /(\.)/i;
    if (value === ".") {
      txt.pop();
      if (current === "0") {
        current = "0.";
      } else if (!isDecimal.test(current)) {
        current += value;
      }
    } else if (current === "0") {
      txt.pop();
      current = value;
    } else if (txt.length <= 15) {
      isLastSign.test(current) ? null : txt.pop();
      !isOperatorActive ? (current += value) : (current = value);
    }
    current = format(noformat(current));
    txt.push(current);
    setExpression(txt);
    setIsEqualTapped(false);
    setIsOperatorActive(false);
    // }
  };

  const handleOperator = (value) => {
    if (isEqualTapped) {
      handleActiveEqual(value);
    } else {
      let txt = [...expression];
      if (isOperatorActive) {
        txt[txt.length - 1] = value;
      } else {
        txt.push(value);
      }
      setExpression(txt);
      setIsEqualTapped(false);
      setIsOperatorActive(true);
    }
  };

  const handlePercentage = () => {
    let exp = [...expression];
    let last = exp[exp.length - 1];
    if (!isOperatorActive) {
      last = Number(noformat(last)) / 100;
      exp.pop();
      exp.push(format(String(last)));
      setExpression(exp);
    }
  };

  const handleCalculator = () => {
    alert("Coming Soon");
  };

  const handleAllClear = () => {
    setExpression(["0"]);
    setResult("0");
    setIsEqualTapped(false);
    setIsOperatorActive(false);
  };

  const handleBackSpace = () => {
    if (isEqualTapped) {
      setIsEqualTapped(false);
    }
    const exp = [...expression];
    if (exp.length >= 1) {
      const last = exp[exp.length - 1];
      if (exp.length === 1 && last.length === 1) {
        setExpression(["0"]);
        setResult("0");
      } else if (last.length >= 1) {
        const newExp = [...exp];
        newExp.pop();
        newExp.push(last.slice(0, -1));
        if (last.slice(0, -1) === "") {
          newExp.pop();
          let currentEnd = newExp[newExp.length - 1];
          let isLastSign = /(\+|−|\×|\÷)/i;
          isLastSign.test(currentEnd)
            ? setIsOperatorActive(true)
            : setIsOperatorActive(false);
        } else setIsOperatorActive(false);
        setExpression(newExp);
      } else {
        const newExp = [...exp];
        setExpression(newExp);
      }
    }
  };

  const handleEqual = () => {
    let res = calculate();
    setResult(res);
    setIsEqualTapped(true);
  };

  const handleActiveEqual = (value) => {
    let isSign = /(\+|−|\×|\÷)/i;
    if (isSign.test(value)) {
      if (result === "∞") {
        let newExp = ["0", value];
        setExpression(newExp);
        setResult("0");
        setIsEqualTapped(false);
        setIsOperatorActive(true);
      } else {
        let res = result;
        res = res.includes("×10^") ? res.replace("×10^", "e+") : res;
        res = res.includes("×10^-") ? res.replace("×10^-", "e-") : res;
        res = format(String(Number(res)));
        let newExp = [res];
        newExp.push(value);
        setExpression(newExp);
        setIsEqualTapped(false);
        setIsOperatorActive(true);
      }
    } else {
      let newExp = ["0"];
      setExpression(newExp);
      setResult("0");
      setIsEqualTapped(false);
      return newExp;
    }
  };

  const calculate = () => {
    try {
      let exp = [...expression];
      let last = exp[exp.length - 1];
      let isLastSign = /(\+|−|\×|\÷)/i;
      if (isLastSign.test(last)) {
        exp.pop();
      }
      if (last === ".") {
        exp.pop();
        exp.push("0.");
      }
      let displayType = exp.join("");
      displayType = noformat(displayType);
      const evalutionType = changeToEvaluation(displayType);
      let res = String(eval(evalutionType));
      if (res === "Infinity" || result === "NaN") {
        res = "∞";
      } else {
        res = res.length > 10 ? parseFloat(res).toExponential(5) : res;
      }
      res.search("e+") >= 0 ? (res = res.replace("e+", "×10^")) : null;
      res.search("e-") >= 0 ? (res = res.replace("e-", "×10^-")) : null;
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const changeToEvaluation = (evalType) => {
    let exp = evalType;
    if (exp.search("÷") >= 0) {
      exp = exp.replace("÷", "/");
    }
    if (exp.search("×") >= 0) {
      exp = exp.replace("×", "*");
    }
    if (exp.search("−") >= 0) {
      exp = exp.replace("−", "-");
    }
    let newExp = /(\−|\×|\÷)/i;
    newExp.test(exp) ? (exp = changeToEvaluation(exp)) : null;
    return exp;
  };

  const handleClick = (type, value) => {
    switch (type) {
      case "number":
        handleNumber(value);
        break;
      case "operator":
        handleOperator(value);
        break;
      case "percentage":
        handlePercentage();
        break;
      case "calculator":
        handleCalculator();
        break;
      case "allClear":
        handleAllClear();
        break;
      case "backSpace":
        handleBackSpace();
        break;
      case "equal":
        handleEqual();
        break;
    }
  };

  useEffect(() => {
    try {
      let res = calculate();
      setResult(res);
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.display}>
        <View style={styles.history}>
          <TouchableOpacity
            style={[styles.button]}
            onPress={() => {
              navigation.toggleDrawer();
            }}
          >
            <MaterialCommunityIcons name="menu" color="white" size={27} />
          </TouchableOpacity>
        </View>
        <View style={styles.expression}>
          <Text style={styles.expressionText}>{expression}</Text>
        </View>

        <View style={styles.result}>
          <Text style={styles.resultText}>
            <Text style={{ color: colors.warning }}>= </Text>
            {format(result)}
          </Text>
        </View>
      </View>
      <View style={styles.keyboard}>
        <Keyboard handlePress={handleClick} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: colors.medium,
    marginTop: Constants.statusBarHeight,
  },
  display: {
    width: "98%",
    height: "48%",
    alignItems: "center",
    justifyContent: "center",
    top: 0,
    marginLeft: 5,
  },
  expression: {
    width: "100%",
    height: "25%",
    top: 0,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 20,
    borderBottomWidth: 2,
    borderBottomColor: colors.dark,
  },
  expressionText: {
    fontSize: 35,
    fontFamily: "Roboto",
    fontWeight: "600",
  },
  keyboard: {
    width: "100%",
    height: "52%",
    backgroundColor: colors.dark,
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  history: {
    width: "100%",
    height: "50%",
    alignItems: "flex-end",
    padding: 15,
  },
  result: {
    width: "100%",
    height: "25%",
    alignItems: "flex-end",
    justifyContent: "center",
    padding: 15,
    borderWidth: 8,
    borderColor: colors.medium,
    shadowOffset: { width: 10, height: 2 },
    backgroundColor: "#5b5757",
    borderRadius: 10,
    elevation: 50,
  },
  resultText: {
    fontSize: 40,
    fontFamily: "Roboto",
    fontWeight: "600",
    color: "#3700B3",
  },
});

export default Calculator;
