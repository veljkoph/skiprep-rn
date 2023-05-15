import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import React from "react";
import useWeeks from "../../hooks/courses/useWeeks";
import Week from "../../components/courses/Week";
import { useTranslation } from "react-i18next";
import Title from "../../components/courses/Title";

const Weeks = () => {
  const { data: weeks, isLoading, refetch } = useWeeks(3);
  const { t } = useTranslation();
  return (
    <View>
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        // ListEmptyComponent={!isLoading ? NoData : <OfferLoader />}
        refreshControl={
          <RefreshControl
            colors={["#3a37c7", "#6247aa"]}
            refreshing={false}
            onRefresh={refetch}
          />
        }
        ListHeaderComponent={<Title title={t("weeks")} />}
        ListHeaderComponentStyle={{
          paddingHorizontal: 0,
        }}
        contentContainerStyle={{
          paddingBottom: 150,
          paddingHorizontal: 20,
          paddingTop: 20,
          rowGap: 16,
        }}
        onEndReachedThreshold={0}
        data={weeks}
        renderItem={({ item }) => <Week {...item} />}
      />
    </View>
  );
};

export default Weeks;

const styles = StyleSheet.create({});
