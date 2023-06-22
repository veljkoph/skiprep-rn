import { Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { color } from "../../variables/color";
import useDrawerStore from "../../store/useDrawerStore";
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import useHeaderStore from "../../store/useHeaderStore";
import { DrawerStackParamList } from "../DrawerNavigation/DrawerItems";
import { DrawerActions } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface IHeaderProps {
  url: any;
}

const HeaderWithBack = ({ url }: IHeaderProps) => {
  const headerHeight = useSharedValue(45);
  const opacity = useSharedValue(1);
  const navigation = useNavigation<NavigationProp<DrawerStackParamList>>();
  const { setDrawer, drawer } = useDrawerStore();
  const { header } = useHeaderStore();

  const insets = useSafeAreaInsets();
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
      headerHeight.value = withTiming(45, {
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
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={[
        styles.container,
        {
          height: insets.top + (insets.top < 25 ? 45 : 35),
          alignItems: "flex-end",
        },
      ]}
    >
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          style={styles.icon}
          source={require("../../assets/icons/back.png")}
        />
      </TouchableOpacity>
      <Image source={url} style={styles.logo} />
      <TouchableOpacity onPress={() => setDrawer(!drawer)}>
        <Image
          style={styles.iconBell}
          source={require("../../assets/icons/bell.png")}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default HeaderWithBack;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    shadowColor: color.secondary3,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.43,
    shadowRadius: 1.2,
    elevation: 1,
  },
  text: {
    fontSize: 18,
    fontFamily: "Lexend-Medium",
    textTransform: "uppercase",
  },
  icon: {
    height: 28,
    aspectRatio: 1,
  },
  iconBell: {
    height: 26,
    aspectRatio: 1,
  },
  logo: {
    width: 120,
    height: 25,
    resizeMode: "contain",
  },
});
