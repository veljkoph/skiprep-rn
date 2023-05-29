import React, { useRef, useState } from "react";
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import useWeeks from "../../hooks/courses/useWeeks";
import Week from "../../components/courses/Week";
import { useTranslation } from "react-i18next";
import Title from "../../components/courses/Title";
import Loader from "../../components/global/Loader";
import { SafeAreaView } from "react-native-safe-area-context";
import { color } from "../../variables/color";
import useHeaderStore from "../../store/useHeaderStore";

const Weeks = () => {
  const { data: weeks, isLoading, refetch } = useWeeks(3);
  const { t } = useTranslation();
  const flatListRef = useRef<FlatList>(null);
  const prevOffsetYRef = useRef<number>(0);
  const [hasTriggeredAction, setHasTriggeredAction] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const { header, setHeader } = useHeaderStore();

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset?.y || 0;
    const prevOffsetY = prevOffsetYRef.current;
    const direction = offsetY > prevOffsetY ? "down" : "up";

    if (offsetY > 10 && !hasTriggeredAction) {
      console.log("Action triggered!");
      if (direction === "down") {
        setHeader(false);
      }
      if (direction === "up") {
        setHeader(true);
      }
      console.log("Scroll direction:", direction);
      setHasTriggeredAction(true);
    }
    prevOffsetYRef.current = offsetY;
  };

  return (
    <View style={styles.container}>
      {/* <Title title={t("weeks")} /> */}
      <FlatList
        ref={flatListRef}
        data={weeks}
        renderItem={({ item }) => <Week {...item} />}
        keyExtractor={(item) => item.id.toString()}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        bounces={false}
        onScrollEndDrag={() => setHasTriggeredAction(false)}
      />
    </View>
  );
};

export default Weeks;

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.white,
    paddingHorizontal: 10,
  },
  listContainer: {
    backgroundColor: color.white,
    paddingBottom: 20,
  },
});
