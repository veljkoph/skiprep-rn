import { View, Text } from "react-native";
import React, { useState } from "react";
import useUserStore from "../store/useUserStore";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import BottomTabs from "./BottomTabs/BottomTabs";
import Drawer from "./DrawerScreen/Drawer";
import Header from "./Header/Header";
import GuestStack from "./GuestNavigation/GuestStack";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const RootNavigation = () => {
  const { user } = useUserStore();
  const { top } = useSafeAreaInsets();
  return (
    <NavigationContainer>
      {!user ? (
        <>
          {/* <Header /> */}
          <BottomTabs />
          <Drawer />
        </>
      ) : (
        <GuestStack />
      )}
      <Toast topOffset={top < 1 ? 20 : top} visibilityTime={2000} />
    </NavigationContainer>
  );
};

export default RootNavigation;
