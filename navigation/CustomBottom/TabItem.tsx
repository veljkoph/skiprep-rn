import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { DrawerStackParamList } from "../DrawerNavigation/Drawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import Animated, {
  FadeIn,
  SlideInRight,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { color } from "../../variables/color";

interface ITabItem {
  to: any;
  name: string;
  id: number;
  icon: any;
  setActiveRoute: React.Dispatch<React.SetStateAction<string>>;
  activeRoute: string;
  bgColor: string;
  color: string;
}

const TabItem = (props: ITabItem) => {
  const { to, name, icon, setActiveRoute, activeRoute, bgColor, color } = props;
  const navigation = useNavigation<NavigationProp<DrawerStackParamList>>();

  const navHandler = () => {
    navigation.navigate(to);
    setActiveRoute(to);
  };

  const animtedContainerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: activeRoute === to ? bgColor : "transparent",
    };
  });
  const textAnimatedStyle = useAnimatedStyle(() => {
    return {
      color: color,
      flexWrap: "nowrap",
      textAlign: "center",
      width: activeRoute === to ? withSpring(name.length * 10) : withSpring(0),
    };
  });

  return (
    <TouchableOpacity onPress={() => navHandler()} style={{ padding: 2 }}>
      <Animated.View style={[styles.container, animtedContainerStyle]}>
        <Ionicons
          color={activeRoute === to ? color : "black"}
          name={icon}
          size={25}
        />
        {activeRoute === to && (
          <Animated.Text
            numberOfLines={1}
            entering={FadeIn.duration(300)}
            style={[textAnimatedStyle, styles.text]}
          >
            {name}
          </Animated.Text>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

export default TabItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: 10,
    borderRadius: 25,
    backgroundColor: "#fd4444",
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  text: {
    fontSize: 12,
    fontFamily: "Lexend-Bold",
    textTransform: "capitalize",
  },
});
