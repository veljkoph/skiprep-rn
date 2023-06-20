import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { RouteProp } from "@react-navigation/native";
import { CourseStackParamList } from "../../navigation/Stacks/CourseStack";

type ExerciseProp = RouteProp<CourseStackParamList, "Exercise">;

interface IExerciseProps {
  route: ExerciseProp;
}
const Exercise = (props: IExerciseProps) => {
  return (
    <View>
      <Text>Exercise</Text>
    </View>
  );
};

export default Exercise;

const styles = StyleSheet.create({});
