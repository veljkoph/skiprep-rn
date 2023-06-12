import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import TabItem from "./TabItem";
import { color } from "../../variables/color";
import { useTranslation } from "react-i18next";

export default function BottomTabs() {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const [activeRoute, setActiveRoute] = useState(
    //@ts-ignore
    "Home"
  );

  const tabItems = [
    {
      to: "Home",
      name: t("Home"),
      id: 1,
      icon: "home-outline",
      color: color.primary,
      bgColor: color.primaryLight,
    },
    {
      to: "Courses",
      name: t("Workout"),
      id: 2,
      icon: "barbell-outline",
      color: color.secondary,
      bgColor: color.secondaryLight,
    },
    {
      to: "Profile",
      name: t("Profile"),
      id: 3,
      icon: "person-circle-outline",
      color: "#188368",
      bgColor: color.secondary1Light,
    },
    {
      to: "Messages",
      name: t("Messages"),
      id: 4,
      icon: "mail-outline",
      bgColor: color.secondary2Light,
      color: "#a08e0f",
    },
  ];

  return (
    <BlurView
      intensity={1}
      style={[
        styles.container,
        {
          height: insets.bottom + 50,
          alignItems: insets.bottom > 0 ? "flex-start" : "center",
          paddingTop: insets.bottom > 0 ? 10 : 0,
        },
      ]}
      tint="dark"
    >
      {tabItems.map((item) => (
        <TabItem
          {...item}
          key={item.id}
          setActiveRoute={setActiveRoute}
          activeRoute={activeRoute}
        />
      ))}
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(255, 255, 255, 1)",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    zIndex: 0,
  },
});
