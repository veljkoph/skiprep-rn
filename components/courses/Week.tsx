import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { color } from "../../variables/color";
import Ionicons from "react-native-vector-icons/Ionicons";
import Level from "./Level";

interface IWeekProps {
  name: string;
  active: number;
  level: string;
}

const Week = (props: IWeekProps) => {
  const { name, active, level } = props;
  console.log(props);
  return (
    <TouchableOpacity
      disabled={!active}
      style={[
        styles.container,
        { backgroundColor: active ? color.white : color.secondary3 },
      ]}
    >
      <Level level={parseInt(level)} />
      <Text style={styles.title}>{name}</Text>

      <View style={styles.icon}>
        {!active ? (
          <Ionicons
            color={color.white}
            name={"lock-closed-outline"}
            size={28}
          />
        ) : (
          <Ionicons
            color={color.secondary1}
            name={"play-circle-outline"}
            size={32}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Week;

const styles = StyleSheet.create({
  container: {
    //  borderWidth: 1,
    borderColor: color.primary,
    borderRadius: 5,

    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: color.white,
  },
  title: {
    fontSize: 16,
    fontFamily: "Lexend-Regular",
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  icon: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
    flex: 1,
    backgroundColor: "red",
    paddingRight: 10,
  },
});
