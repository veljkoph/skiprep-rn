import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import useUserStore from "../store/useUserStore";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import Drawer from "./DrawerNavigation/DrawerItems";

import Header from "./Header/Header";
import GuestStack from "./GuestNavigation/GuestStack";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BottomTabs from "./CustomBottom/BottomTabs";
import { navigationRef } from "../helpers/navigationRef";

const RootNavigation = () => {
  const { user } = useUserStore();
  const { top } = useSafeAreaInsets();

  return (
    <NavigationContainer ref={navigationRef}>
      {!user ? (
        <>
          <Drawer />
          <BottomTabs />
        </>
      ) : (
        <GuestStack />
      )}
      <Toast topOffset={top < 1 ? 20 : top} visibilityTime={2000} />
    </NavigationContainer>
  );
};

export default RootNavigation;
