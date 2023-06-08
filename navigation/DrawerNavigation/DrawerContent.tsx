import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
//styles
import { Colors } from "react-native/Libraries/NewAppScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import UserInfo from "./UserInfo";

const DrawerContent = (props: any) => {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <UserInfo />
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View
        style={{
          paddingBottom: insets.bottom + 50,
          alignItems: "flex-start",
          justifyContent: "flex-end",
          paddingHorizontal: 20,
        }}
      >
        <TouchableOpacity style={{ paddingVertical: 4 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Ionicons name="exit-outline" size={25} color="black" />
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Lexend-Medium",
                marginLeft: 5,
                alignItems: "center",
                paddingVertical: 3,
              }}
            >
              {t("logout")}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DrawerContent;
