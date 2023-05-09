import { View, Text } from "react-native";
import React, { useState } from "react";
import useUserStore from "../store/useUserStore";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import BottomTabs from "./BottomTabs/BottomTabs";
import Drawer from "./DrawerScreen/Drawer";
import Header from "./Header/Header";
import useDrawerStore from "../store/useDrawerStore";
import GuestStack from "./GuestNavigation/GuestStack";
import { SafeAreaProvider } from "react-native-safe-area-context";

const RootNavigation = () => {
  const { user } = useUserStore();

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        {user ? (
          <>
            <Drawer />
            <Header />
            <BottomTabs />
          </>
        ) : (
          <GuestStack />
        )}
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default RootNavigation;
