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

  const colors: ColorMap = {
    1: "#4b974b",
    2: "#e29b40",
    3: "#750000",
    4: "#ff0000",
    5: "#f5cd30",
  };

  const color: string = colors[level];

  return (
    <View
      style={[
        {
          width: 4,
          height: "100%",
          backgroundColor: color,
          borderTopLeftRadius: 5,
          borderBottomLeftRadius: 5,
        },
      ]}
    ></View>
  );
};

export default Level;
