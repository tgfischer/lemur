import { Divider, Row } from "native-base";
import { RefreshControl, ActivityIndicator, FlatList } from "react-native";

import { useGetPostsQuery } from "./api";
import { PostCard } from "./PostCard";

export const PostsListScreen = (): JSX.Element => {
  const {
    data,
    isInitialLoading,
    isRefetching,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetPostsQuery({
    instanceUrl: "https://lemmy.ca",
    type: "All",
    sort: "Hot",
  });

  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={isRefetching} tintColor="white" />
      }
      data={data.flattened}
      keyExtractor={(item) => item.post.ap_id}
      renderItem={({ item, index }) => (
        <>
          <PostCard key={item.post.ap_id} view={item} />
          {index < data.flattened.length - 1 && (
            <Divider _dark={{ backgroundColor: "dark.100" }} height={1.5} />
          )}
        </>
      )}
      onEndReached={() => {
        if (!data) {
          return;
        }

        void fetchNextPage({ pageParam: data.pages.length + 1 });
      }}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        isInitialLoading || isFetchingNextPage ? (
          <Row p={2} justifyContent="center">
            <ActivityIndicator />
          </Row>
        ) : undefined
      }
    />
  );
};
