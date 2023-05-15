import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
//screens
import Weeks from "../../screens/course/Weeks";
import Days from "../../screens/course/Days";
import Day from "../../screens/course/Day";

export type AuthStackParamList = {
  Weeks: undefined;
  Days: undefined;
  Day: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

const CourseStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Weeks" component={Weeks} />
      <Stack.Screen name="Days" component={Days} />
      <Stack.Screen name="Day" component={Day} />
    </Stack.Navigator>
  );
};

export default CourseStack;
