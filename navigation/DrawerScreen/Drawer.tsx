import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import { color } from "../../variables/color";
import useDrawerStore from "../../store/useDrawerStore";
import Ionicons from "react-native-vector-icons/Ionicons";
import DrawerItem from "./DrawerItem";

import Animated, {
  SlideOutLeft,
  ZoomInLeft,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const list = [
  { id: 0, link: "Forum", title: "Forum" },
  { id: 1, link: "Faq", title: "Faq" },
  { id: 2, link: "Home", title: "Home" },
];

const Drawer = () => {
  const { drawer, setDrawer } = useDrawerStore();

  const fadeIn = useAnimatedStyle(() => {
    return {
      opacity: drawer ? withTiming(1, { duration: 700 }) : 0,
    };
  });

  if (!drawer) return null;
  return (
    <Animated.View
      entering={ZoomInLeft.duration(700)}
      exiting={SlideOutLeft.duration(750)}
      style={[styles.container, fadeIn]}
    >
      <View style={styles.menu}>
        {list.map((el) => (
          <DrawerItem key={el.id} {...el} />
        ))}
      </View>
      <StatusBar hidden />
      <TouchableOpacity
        style={{
          alignSelf: "flex-start",
        }}
        onPress={() => setDrawer(false)}
      >
        <Ionicons color="white" name={"close"} size={45} />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Drawer;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: color.primary,
    position: "absolute",
    right: 0,
    top: 0,
    flex: 1,
    zIndex: 10,
    height: "100%",
    padding: 20,
    paddingTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 20,
  },
  menu: {
    flexDirection: "column",
    justifyContent: "flex-end",
    paddingBottom: "50%",
  },
});
