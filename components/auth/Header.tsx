import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { color } from "../../variables/color";
const { height } = Dimensions.get("screen");

interface IHeader {
  title: string;
  subtitle: string;
}

const Header = (props: IHeader) => {
  const { title, subtitle } = props;
  return (
    <View style={styles.container}>
      <View style={styles.textWrapper}>
        <Text style={styles.text}>{title}</Text>
        <Text style={styles.textS}>{subtitle}</Text>
      </View>
      <Image
        style={styles.cover}
        source={require("../../assets/circles.png")}
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    height: height < 700 ? height / 4.1 : height / 3.7,
  },
  cover: {
    width: "100%",
    height: height / 3.5,
    position: "absolute",
  },
  textWrapper: {
    marginLeft: 20,
    marginBottom: 25,
    zIndex: 10,
    rowGap: 16,
  },
  text: {
    fontSize: height < 700 ? 28 : 42,
    color: color.white,
    fontWeight: "500",
  },
  textS: {
    zIndex: 10,
    fontSize: height < 700 ? 12 : 14,
    color: color.white,
    fontWeight: "300",
  },
});
