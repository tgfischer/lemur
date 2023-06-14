import { useQueryClient } from "@tanstack/react-query";
import { Divider, Row, View } from "native-base";
import { useRef } from "react";
import { RefreshControl, ActivityIndicator, FlatList } from "react-native";

import { ReturnToTopButton } from "../ReturnToTopButton";

import { queryKeys, useGetPostsQuery } from "./api";
import { PostCard } from "./PostCard";
import { PostCardSkeleton } from "./PostCardSkeleton";

export const PostsListScreen = (): JSX.Element => {
  const flatListRef = useRef<FlatList>(null);
  const queryClient = useQueryClient();

  const {
    data,
    isInitialLoading,
    refetch,
    isRefetching,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetPostsQuery({
    instanceUrl: "https://lemmy.ca",
    type: "All",
    sort: "Hot",
  });

  if (isInitialLoading) {
    return (
      <View>
        <PostCardSkeleton />
        <Divider height={1.5} />
        <PostCardSkeleton />
        <Divider height={1.5} />
        <PostCardSkeleton />
        <Divider height={1.5} />
        <PostCardSkeleton />
      </View>
    );
  }

  return (
    <View>
      <FlatList
        ref={flatListRef}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={() => {
              void queryClient
                .resetQueries(
                  queryKeys.getPosts({
                    instanceUrl: "https://lemmy.ca",
                    type: "All",
                    sort: "Hot",
                  }),
                )
                .then(async () => await refetch());
            }}
          />
        }
        data={data.flattened}
        keyExtractor={(item) => item.post.ap_id}
        renderItem={({ item, index }) => (
          <>
            <PostCard key={item.post.ap_id} view={item} />
            {index < data.flattened.length - 1 && <Divider height={1.5} />}
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
          isFetchingNextPage ? (
            <Row p={2} justifyContent="center">
              <ActivityIndicator />
            </Row>
          ) : undefined
        }
      />
      <ReturnToTopButton
        onPress={() =>
          flatListRef.current?.scrollToOffset({ animated: true, offset: 0 })
        }
      />
    </View>
  );
};
