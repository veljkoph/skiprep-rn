import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
//screens
import Header from "../Header/Header";
import Profile from "../../screens/profile/Profile";
import Post, { IPost } from "../../screens/profile/Post";
import HeaderWithBack from "../Header/HeaderWithBack";
import CreatePost from "../../screens/create/CreatePost";
import SurveyWinter from "../../screens/profile/SurveyWinter";
import EditProfile from "../../screens/profile/EditProfile";

export type ProfileStackParamList = {
  ProfileInfo: undefined;
  Post: IPost;
  CreatePost: undefined;
  SurveyWinter: undefined;
  EditProfile: undefined;
};

const Stack = createStackNavigator<ProfileStackParamList>();

const ProfileStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ProfileInfo"
        component={Profile}
        options={() => ({
          title: "",
          drawerItemStyle: { display: "none" },
          header: () => (
            <Header url={require("../../assets/logo/textLogoGreen.png")} />
          ),
          headerShown: true,
        })}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={() => ({
          title: "",
          drawerItemStyle: { display: "none" },
          header: () => (
            <HeaderWithBack
              url={require("../../assets/logo/textLogoGreen.png")}
            />
          ),
          headerShown: true,
        })}
      />
      <Stack.Screen
        name="SurveyWinter"
        component={SurveyWinter}
        options={() => ({
          title: "",
          drawerItemStyle: { display: "none" },
          header: () => (
            <HeaderWithBack
              url={require("../../assets/logo/textLogoGreen.png")}
            />
          ),
          headerShown: true,
        })}
      />
      <Stack.Screen
        name="Post"
        component={Post}
        options={() => ({
          title: "",
          drawerItemStyle: { display: "none" },
          header: () => (
            <HeaderWithBack
              url={require("../../assets/logo/textLogoGreen.png")}
            />
          ),
          headerShown: true,
        })}
      />
      <Stack.Screen
        name="CreatePost"
        component={CreatePost}
        options={() => ({
          title: "",
          drawerItemStyle: { display: "none" },
          header: () => (
            <HeaderWithBack
              url={require("../../assets/logo/textLogoGreen.png")}
            />
          ),
          headerShown: true,
        })}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
