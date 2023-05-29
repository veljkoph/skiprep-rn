import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { color } from "../../variables/color";
import useDrawerStore from "../../store/useDrawerStore";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import useHeaderStore from "../../store/useHeaderStore";

const Header = () => {
  const headerHeight = useSharedValue(60);
  const opacity = useSharedValue(1);
  const { setDrawer, drawer } = useDrawerStore();
  const { header } = useHeaderStore();

  useEffect(() => {
    if (!header) {
      headerHeight.value = withTiming(1, {
        duration: 550,
      });
      opacity.value = withTiming(0, {
        duration: 550,
      });
    }
    if (header) {
      headerHeight.value = withTiming(60, {
        duration: 550,
      });
      opacity.value = withTiming(1, {
        duration: 1100,
      });
    }
  }, [header]);

  const headerStyle = useAnimatedStyle(() => {
    return {
      height: headerHeight.value,
      opacity: opacity.value,
    };
  });

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Animated.View style={[styles.container, headerStyle]}>
        <TouchableOpacity onPress={() => ""}>
          <Ionicons color="black" name={"mail-outline"} size={28} />
        </TouchableOpacity>
        <Animated.Text style={styles.text}>SKIPREP</Animated.Text>
        <TouchableOpacity onPress={() => setDrawer(!drawer)}>
          <Ionicons color="black" name={"menu"} size={32} />
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  safeContainer: {
    backgroundColor: "#FFF",
    borderBottomColor: color.secondary3,
    borderBottomWidth: 0,
    shadowColor: color.secondary3,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.43,
    shadowRadius: 1.2,
    elevation: 1,
  },
  container: {
    backgroundColor: "#FFF",
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontFamily: "Lexend-Medium",
    textTransform: "uppercase",
  },
});
