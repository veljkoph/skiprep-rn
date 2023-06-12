import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Home from "../../screens/home/Home";
import Profile from "../../screens/profile/Profile";
import Faq from "../../screens/faq/Faq";
import Forum from "../../screens/forum/Forum";
import { color } from "../../variables/color";
import CourseStack, { CourseStackParamList } from "../CourseStack/CourseStack";
import Header from "../Header/Header";
import Messages from "../../screens/messages/Messages";
import DrawerContent from "./DrawerContent";

export type DrawerStackParamList = {
  Home: undefined;
  Profile: undefined;
  Courses: CourseStackParamList;
  Forum: undefined;
  Faq: undefined;
  Messages: undefined;
};
const Drawer = createDrawerNavigator<DrawerStackParamList>();
const ICON_SIZE = 29;

const DrawerItems = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        drawerActiveTintColor: color.secondary,
        drawerInactiveTintColor: color.black,
        drawerStyle: {
          zIndex: 10,
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          title: "Home",
          header: () => (
            <Header url={require("../../assets/logo/textLogoBlue.png")} />
          ),
          headerShown: true,
          drawerItemStyle: { display: "none" },
          drawerIcon: ({ focused, color, size }) => (
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              <Ionicons
                color={color}
                name={focused ? "home" : "home-outline"}
                size={ICON_SIZE}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={({ navigation }) => ({
          title: "Profile",
          drawerItemStyle: { display: "none" },
          header: () => (
            <Header url={require("../../assets/logo/textLogoGreen.png")} />
          ),
          headerShown: true,
          drawerIcon: ({ focused, color, size }) => (
            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
              <Ionicons
                color={color}
                name={focused ? "person-circle" : "person-circle-outline"}
                size={ICON_SIZE}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Drawer.Screen
        name="Courses"
        component={CourseStack}
        options={({ navigation }) => ({
          title: "",
          drawerItemStyle: { display: "none" },
          header: () => (
            <Header url={require("../../assets/logo/textLogoRed.png")} />
          ),
          headerShown: false,
        })}
      />
      <Drawer.Screen
        name="Forum"
        component={Forum}
        options={({ navigation }) => ({
          title: "Forum",
          drawerIcon: ({ focused, color, size }) => (
            <TouchableOpacity onPress={() => navigation.navigate("Forum")}>
              <Ionicons
                color={color}
                name={focused ? "chatbox" : "chatbox-outline"}
                size={ICON_SIZE}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Drawer.Screen
        name="Faq"
        component={Faq}
        options={({ navigation }) => ({
          title: "Faq",
          drawerIcon: ({ focused, color, size }) => (
            <TouchableOpacity onPress={() => navigation.navigate("Faq")}>
              <Ionicons
                color={color}
                name={focused ? "alert-circle" : "alert-circle-outline"}
                size={ICON_SIZE}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Drawer.Screen
        name="Messages"
        component={Messages}
        options={({ navigation }) => ({
          title: "Messages",
          drawerItemStyle: { display: "none" },
          header: () => (
            <Header url={require("../../assets/logo/textLogoYellow.png")} />
          ),
          drawerIcon: ({ focused, color, size }) => (
            <TouchableOpacity onPress={() => navigation.navigate("Faq")}>
              <Ionicons
                color={color}
                name={focused ? "alert-circle" : "alert-circle-outline"}
                size={ICON_SIZE}
              />
            </TouchableOpacity>
          ),
        })}
      />
    </Drawer.Navigator>
  );
};
export default DrawerItems;
