import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { color } from "../../variables/color";
import Ionicons from "react-native-vector-icons/Ionicons";

interface IWeekProps {
  name: string;
  active: number;
}

const Week = (props: IWeekProps) => {
  const { name, active } = props;
  return (
    <TouchableOpacity
      disabled={!active}
      style={[
        styles.container,
        { backgroundColor: active ? color.white : color.secondary3 },
      ]}
    >
      <Text style={styles.title}>{name}</Text>
      {!active ? (
        <Ionicons color={color.white} name={"lock-closed-outline"} size={28} />
      ) : (
        <Ionicons
          color={color.secondary1}
          name={"play-circle-outline"}
          size={32}
        />
      )}
    </TouchableOpacity>
  );
};

export default Week;

const styles = StyleSheet.create({
  container: {
    //  borderWidth: 1,
    borderColor: color.primary,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 20,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: color.white,
  },
  title: {
    fontSize: 16,
    fontFamily: "Lexend-Regular",
  },
});
