import { View, Text } from "react-native";
import React, { useState } from "react";
import useUserStore from "../store/useUserStore";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import BottomTabs from "./BottomTabs/BottomTabs";
import Drawer from "./DrawerScreen/Drawer";
import Header from "./Header/Header";
import useDrawerStore from "../store/useDrawerStore";

const RootNavigation = () => {
  const { user } = useUserStore();

  return (
    <NavigationContainer>
      <Drawer />
      <Header />
      <BottomTabs />
    </NavigationContainer>
  );
};

export default RootNavigation;
