import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Home from "../../screens/home/Home";
import Profile from "../../screens/profile/Profile";
import Faq from "../../screens/faq/Faq";
import Forum from "../../screens/forum/Forum";
import { color } from "../../variables/color";
import CourseStack from "../CourseStack/CourseStack";
import Header from "../Header/Header";

const TabNavigator = createBottomTabNavigator();
const ICON_SIZE = 29;

const BottomTabs = () => {
  return (
    <TabNavigator.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: color.white,
        tabBarInactiveTintColor: color.secondary3,
        tabBarShowLabel: false,
        headerStyle: {
          backgroundColor: "#fdfdfd",
        },

        tabBarStyle: {
          // height: 70,
          //  position: "absolute",
          backgroundColor: color.primary,
          shadowColor: "transparent",
        },
      }}
    >
      <TabNavigator.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          title: "Home",
          header: () => <Header />,
          headerShown: true,
          tabBarIcon: ({ focused, color, size }) => (
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
      <TabNavigator.Screen
        name="Profile"
        component={Profile}
        options={({ navigation }) => ({
          title: "Profile",
          header: () => <Header />,
          headerShown: true,
          tabBarIcon: ({ focused, color, size }) => (
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
      <TabNavigator.Screen
        name="Courses"
        component={CourseStack}
        options={({ navigation }) => ({
          header: () => <Header />,
          headerShown: false,
          title: "Courses",
          tabBarIcon: ({ focused, color, size }) => (
            <TouchableOpacity onPress={() => navigation.navigate("Courses")}>
              <Ionicons
                color={color}
                name={focused ? "barbell" : "barbell-outline"}
                size={ICON_SIZE}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <TabNavigator.Screen
        name="Forum"
        component={Forum}
        options={({ navigation }) => ({
          title: "Forum",

          tabBarButton: () => null,
        })}
      />
      <TabNavigator.Screen
        name="Faq"
        component={Faq}
        options={({ navigation }) => ({
          title: "Faq",

          tabBarButton: () => null,

          tabBarIcon: ({ focused, color, size }) => (
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
    </TabNavigator.Navigator>
  );
};
export default BottomTabs;
