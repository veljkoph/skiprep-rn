import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import useLogout from "../../hooks/auth/useLogout";
import { color } from "../../variables/color";
import { useTranslation } from "react-i18next";

const Logout = () => {
  const { mutate: logout } = useLogout();
  const { t } = useTranslation();
  const loginAlert = () =>
    Alert.alert(`${t("logout")}`, `${t("uSure")}`, [
      {
        text: `${t("no")}`,
        style: "cancel",
      },
      { text: `${t("yes")}`, onPress: () => logout() },
    ]);

  return (
    <TouchableOpacity style={styles.container} onPress={() => loginAlert()}>
      <Ionicons color={color.white} name={"exit-outline"} size={42} />
    </TouchableOpacity>
  );
};

export default Logout;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 20,
    bottom: 50,
    //backgroundColor: color.white,
    borderRadius: 50,
    // padding: 10,
    // paddingLeft: 15,
  },
});
