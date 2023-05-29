import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { color } from "../../variables/color";
import useDrawerStore from "../../store/useDrawerStore";

interface IDrawerItem {
  title: string;
  id: number;

  link: string;
}

const DrawerItem = (props: IDrawerItem) => {
  const navigation = useNavigation();
  const [activeRoute, setActiveRoute] = useState(
    //@ts-ignore
    navigation?.getCurrentRoute().name
  );
  const { title, link } = props;
  const { drawer, setDrawer } = useDrawerStore();

  const ctaHandler = () => {
    setDrawer(!drawer);
    //@ts-ignore
    navigation.navigate(link);
  };

  return (
    <TouchableOpacity style={styles.btn} onPress={() => ctaHandler()}>
      <Text
        style={[
          styles.text,
          {
            textDecorationLine: activeRoute === title ? "line-through" : "none",
          },
        ]}
      >
        &nbsp;&nbsp;{title}&nbsp;&nbsp;
      </Text>
    </TouchableOpacity>
  );
};

export default DrawerItem;

const styles = StyleSheet.create({
  btn: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    margin: 5,
    backgroundColor: color.primary,
    alignItems: "center",
    borderRadius: 3,
    zIndex: 20,
  },
  text: {
    fontWeight: "300",
    fontSize: 34,
    color: "white",
  },
});
