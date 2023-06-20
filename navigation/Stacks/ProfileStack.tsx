import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
//screens
import Weeks from "../../screens/course/Weeks";
import Trainings from "../../screens/course/Trainings";
import Exercises from "../../screens/course/Exercises";
import Header from "../Header/Header";
import Exercise from "../../screens/course/Exercise";
import Profile from "../../screens/profile/Profile";
import Post, { IPost } from "../../screens/profile/Post";

export type ProfileStackParamList = {
  ProfileInfo: undefined;
  Post: {
    caption?: string;
    created_at?: Date;
    id?: number;
    image?: string;
    updated_at?: Date;
    user_id?: number;
    location?: string;
  };
  CreatePost: undefined;
};

const Stack = createStackNavigator<ProfileStackParamList>();

const ProfileStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileInfo" component={Profile} />
      <Stack.Screen name="Post" component={Post} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
