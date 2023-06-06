import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
//screens
import Weeks from "../../screens/course/Weeks";
import Trainings from "../../screens/course/Trainings";
import Exercises from "../../screens/course/Exercises";
import Header from "../Header/Header";

export type CourseStackParamList = {
  Weeks: undefined;
  Trainings: { weekId: number };
  Exercises: { trainingId: number };
};

const Stack = createStackNavigator<CourseStackParamList>();

const CourseStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Weeks"
        component={Weeks}
        options={{ headerShown: true, header: () => <Header /> }}
      />
      <Stack.Screen
        name="Trainings"
        component={Trainings}
        options={{ headerShown: true, header: () => <Header /> }}
      />
      <Stack.Screen name="Exercises" component={Exercises} />
    </Stack.Navigator>
  );
};

export default CourseStack;
