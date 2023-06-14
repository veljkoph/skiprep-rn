import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { color } from "../../variables/color";
import { useTranslation } from "react-i18next";

const LoadEarlier = (props: any) => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>{t("loadEarlierMessages")}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoadEarlier;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  btn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: color.secondary3Light,
    borderRadius: 20,
  },
  btnText: {
    color: color.black,
    fontSize: 12,
    fontFamily: "Lexend-Regular",
  },
});
