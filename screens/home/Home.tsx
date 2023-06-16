import { Text, FlatList, RefreshControl } from "react-native";
import React from "react";
import useWall from "../../hooks/wall/useWall";
import { color } from "../../variables/color";
import Post from "../../components/wall/Post";

const Home = () => {
  const {
    data: wall,
    isLoading,
    refetch,
    hasNextPage,
    fetchNextPage,
  } = useWall();
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          colors={[color.primary, color.primaryLight]}
          refreshing={false}
          onRefresh={refetch}
        />
      }
      keyExtractor={(item, index) => index.toString()}
      onEndReached={() => hasNextPage && fetchNextPage()}
      // ListEmptyComponent={!isLoading ? NoData : <CardWithImageLoader />}
      // ListFooterComponent={isFetchingNextPage && renderLoader}
      ListHeaderComponentStyle={{
        paddingHorizontal: 0,
      }}
      contentContainerStyle={{
        paddingBottom: 150,
        //  paddingHorizontal: 20,
      }}
      onEndReachedThreshold={0}
      data={wall?.pages?.map((page) => page.data).flat()}
      renderItem={({ item }) => <Post {...item} />}
    />
  );
};

export default Home;
