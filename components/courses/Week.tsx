import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { color } from "../../variables/color";
import Ionicons from "react-native-vector-icons/Ionicons";
import Level from "./LevelColor";
import LevelName from "./LevelName";

interface IWeekProps {
  name: string;
  active: number;
  level: string;
}

const Week = (props: IWeekProps) => {
  const { name, active, level } = props;

  return (
    <TouchableOpacity
      disabled={!active}
      style={[
        styles.container,
        { backgroundColor: active ? "#fff" : color.disabled },
      ]}
    >
      <Level level={parseInt(level)} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{name}</Text>
        <LevelName level={parseInt(level)} />
      </View>

      <View style={styles.icon}>
        {!active ? (
          <Ionicons
            color={color.black}
            name={"lock-closed-outline"}
            size={22}
          />
        ) : (
          <Ionicons
            color={color.secondary1}
            name={"play-circle-outline"}
            size={24}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Week;

const styles = StyleSheet.create({
  container: {
    borderColor: color.primary,
    borderRadius: 5,
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    shadowColor: color.secondary3,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.23,
    shadowRadius: 1.2,
    elevation: 1,
    marginTop: 10,
  },
  infoContainer: {
    paddingHorizontal: 10,
    rowGap: 15,
    paddingVertical: 16,
  },
  title: {
    fontSize: 15,
    fontFamily: "Lexend-Regular",
    textTransform: "capitalize",
  },
  icon: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
    flex: 1,

    paddingRight: 10,
  },
});
