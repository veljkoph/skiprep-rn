import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { RouteProp } from "@react-navigation/native";
import { CourseStackParamList } from "../../navigation/CourseStack/CourseStack";

type ExerciseProp = RouteProp<CourseStackParamList, "Exercise">;

interface IExerciseProps {
  route: ExerciseProp;
}
const Exercise = (props: IExerciseProps) => {
  console.log(props);
  return (
    <View>
      <Text>Exercise</Text>
    </View>
  );
};

export default Exercise;

const styles = StyleSheet.create({});
