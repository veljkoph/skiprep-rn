import { StyleSheet, Text, View } from "react-native";
import React from "react";

interface IProps {
  level: number;
}
interface ColorMap {
  [key: number]: string;
}
const Level = (props: IProps) => {
  const { level } = props;

  console.log(level);

  const colors: ColorMap = {
    1: "#22B690",
    2: "#EBD325",
    3: "#B62248",
    4: "#B62248",
    5: "#B62248",
  };

  const color: string = colors[level];

  return (
    <View style={[{ width: 3, height: "100%", backgroundColor: color }]}></View>
  );
};

export default Level;
