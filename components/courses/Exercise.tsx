import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { color } from "../../variables/color";
import Ionicons from "react-native-vector-icons/Ionicons";
import Level from "./LevelColor";
import LevelName from "./LevelName";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { CourseStackParamList } from "../../navigation/Stacks/CourseStack";

interface IExerciseProps {
  created_at: string;
  description: string;
  id: number;
  lang?: string;
  level: string;
  name: string;
  pivot: {
    exercise_id: number;
    id: number;
    order: number;
    text: string;
    training_id: number;
  };
  updated_at?: any;
  video: string;
}

const Exercise = (props: IExerciseProps) => {
  const { name, level } = props;
  const navigation = useNavigation<NavigationProp<CourseStackParamList>>();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Exercise", { ...props })}
      style={[styles.container]}
    >
      <Level level={parseInt(level)} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{name}</Text>
        <LevelName level={parseInt(level)} />
      </View>

      <View style={styles.icon}>
        <Ionicons
          color={color.secondary1}
          name={"play-circle-outline"}
          size={24}
        />
      </View>
    </TouchableOpacity>
  );
};

export default Exercise;

const styles = StyleSheet.create({
  container: {
    borderColor: color.primary,
    backgroundColor: "#fff",
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
    flex: 1,
    margin: 5,
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
