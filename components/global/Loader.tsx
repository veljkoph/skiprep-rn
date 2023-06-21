import React, { useEffect } from "react";

import { Text, View, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  cancelAnimation,
  Easing,
} from "react-native-reanimated";
import { color } from "../../variables/color";

interface IProps {
  loaderColor?: string;
}
const Loader = (props: IProps) => {
  const { loaderColor } = props;
  const rotation = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateZ: `${rotation.value}deg`,
        },
      ],
    };
  }, [rotation.value]);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1000,
        easing: Easing.linear,
      }),
      200
    );
    return () => cancelAnimation(rotation);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.spinner,
          animatedStyles,
          { borderLeftColor: loaderColor },
        ]}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  spinner: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 7,
    borderTopColor: "#fff",
    borderRightColor: "#fff",
    borderBottomColor: "#fff",
    borderLeftColor: color.secondary,
  },
});
export default Loader;
