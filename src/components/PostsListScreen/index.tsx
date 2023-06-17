import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { Divider, Row } from "native-base";
import { useRef, useEffect } from "react";
import { RefreshControl, ActivityIndicator, FlatList } from "react-native";

import { type FeedStackParamList, type ScreenType } from "../types";

import { useGetPostsQuery } from "./api";
import { PostCard } from "./PostCard";

export * from "./PostsListHeaderSortButton";

type PostsListScreenProps = NativeStackScreenProps<
  FeedStackParamList,
  ScreenType.Posts
>;

export const PostsListScreen = ({
  route,
}: PostsListScreenProps): JSX.Element => {
  const listRef = useRef<FlatList>(null);

  const {
    data,
    isInitialLoading,
    isFetching,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  } = useGetPostsQuery(route.params);

  useEffect(() => {
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, [route.params]);

  return (
    <FlatList
      ref={listRef}
      refreshControl={
        <RefreshControl
          refreshing={isFetching || isLoading || isFetchingNextPage}
          tintColor="white"
          onRefresh={() => {
            void refetch();
          }}
        />
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
