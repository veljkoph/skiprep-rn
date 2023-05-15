import { StyleSheet, Text, View } from "react-native";
import React from "react";

interface ITitle {
  title: string;
}

const Title = ({ title }: ITitle) => {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default Title;

const styles = StyleSheet.create({
  title: {
    fontSize: 34,
    fontFamily: "Lexend-SemiBold",
  },
});
