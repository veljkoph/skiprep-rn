// import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
// import React from "react";
// import useWeeks from "../../hooks/courses/useWeeks";
// import Week from "../../components/courses/Week";
// import { useTranslation } from "react-i18next";
// import Title from "../../components/courses/Title";
// import Loader from "../../components/global/Loader";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { color } from "../../variables/color";

// const Weeks = () => {
//   const { data: weeks, isLoading, refetch } = useWeeks(3);
//   const { t } = useTranslation();

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: color.white }}>
//       <FlatList
//         showsVerticalScrollIndicator={false}
//         showsHorizontalScrollIndicator={false}
//         keyExtractor={(item, index) => index.toString()}
//         ListEmptyComponent={
//           !isLoading ? (
//             <View />
//           ) : (
//             <View style={{ flex: 1 }}>
//               <Loader />
//             </View>
//           )
//         }
//         refreshControl={
//           <RefreshControl
//             colors={["#3a37c7", "#6247aa"]}
//             refreshing={false}
//             onRefresh={refetch}
//           />
//         }
//         ListHeaderComponent={<Title title={t("weeks")} />}
//         ListHeaderComponentStyle={{
//           paddingHorizontal: 0,
//         }}
//         contentContainerStyle={{
//           paddingBottom: 150,
//           paddingHorizontal: 20,
//           paddingTop: 20,
//           rowGap: 16,
//           flex: isLoading ? 1 : 0,
//         }}
//         onEndReachedThreshold={0}
//         data={weeks}
//         renderItem={({ item }) => <Week {...item} />}
//       />
//     </SafeAreaView>
//   );
// };

// export default Weeks;

// const styles = StyleSheet.create({});
import {
  Dimensions,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ViewProps,
} from "react-native";
import React, { useCallback, useState } from "react";
import useWeeks from "../../hooks/courses/useWeeks";
import Week from "../../components/courses/Week";
import { useTranslation } from "react-i18next";
import Title from "../../components/courses/Title";
import Loader from "../../components/global/Loader";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedGestureHandler,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDecay,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { color } from "../../variables/color";

const Weeks = () => {
  const { data: weeks, isLoading, refetch } = useWeeks(3);
  const { t } = useTranslation();
  const translationY = useSharedValue(0);
  const headerHeight = useSharedValue(70);
  const fontSize = useSharedValue(28);
  const isScrollingEnabled = useSharedValue(true);

  const headerStyle = useAnimatedStyle(() => {
    return {
      // height: headerHeight.value,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderBottomColor: color.secondary3,
      borderBottomWidth: 1,
    };
  });
  const fontStyle = useAnimatedStyle(() => {
    return {
      fontSize: fontSize.value,
    };
  });
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      if (scrollY.value > event.contentOffset.y) {
        if (headerHeight.value < 30) {
          headerHeight.value = withTiming(70, {
            duration: 300,
          });
          fontSize.value = withTiming(28, {
            duration: 300,
          });
        }
        //if it goes too much up
        //UP
        if (event.contentOffset.y - 0) {
          return;
        }
      }
      if (scrollY.value < event.contentOffset.y) {
        console.log(scrollY.value);
        if (headerHeight.value > 30) {
          headerHeight.value = withTiming(28, {
            duration: 300,
          });
          fontSize.value = withTiming(14, {
            duration: 300,
          });
        }
      }
      scrollY.value = event.contentOffset.y;
    },

    // onBeginDrag: (e) => {
    //   isScrolling.value = true;
    // },
    onEndDrag: (e) => {
      // headerHeight.value = withTiming(70);
    },
  });
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Animated.View style={headerStyle}>
        <Animated.Text style={[fontStyle, styles.title]}>
          {t("weeks")}
        </Animated.Text>
      </Animated.View>

      <Animated.ScrollView
        style={styles.container}
        onScroll={scrollHandler}
        scrollEventThrottle={0}
        scrollEnabled={isScrollingEnabled.value}
      >
        {weeks?.map((item) => (
          <Week {...item} key={item.id} />
        ))}
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default Weeks;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: "Lexend-SemiBold",
  },
});
