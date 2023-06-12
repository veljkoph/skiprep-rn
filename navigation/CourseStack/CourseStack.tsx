import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
//screens
import Weeks from "../../screens/course/Weeks";
import Trainings from "../../screens/course/Trainings";
import Exercises from "../../screens/course/Exercises";
import Header from "../Header/Header";
import Exercise from "../../screens/course/Exercise";

export type CourseStackParamList = {
  Weeks: undefined;
  Trainings: { weekId: number };
  Exercises: { trainingId: number };
  Exercise: {
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
  };
};

const Stack = createStackNavigator<CourseStackParamList>();

const CourseStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Weeks"
        component={Weeks}
        options={{
          headerShown: true,
          header: () => (
            <Header url={require("../../assets/logo/textLogoRed.png")} />
          ),
        }}
      />
      <Stack.Screen
        name="Trainings"
        component={Trainings}
        options={{
          headerShown: true,
          header: () => (
            <Header url={require("../../assets/logo/textLogoRed.png")} />
          ),
        }}
      />
      <Stack.Screen
        name="Exercises"
        component={Exercises}
        options={{
          headerShown: true,
          header: () => (
            <Header url={require("../../assets/logo/textLogoRed.png")} />
          ),
        }}
      />
      <Stack.Screen
        name="Exercise"
        component={Exercise}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default CourseStack;
