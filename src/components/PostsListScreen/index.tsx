import { useQueryClient } from "@tanstack/react-query";
import { FlatList, Divider, Row, View } from "native-base";
import { useMemo } from "react";
import { RefreshControl, ActivityIndicator } from "react-native";

import { queryKeys, useGetPostsQuery } from "./api";
import { PostCard } from "./PostCard";
import { PostCardSkeleton } from "./PostCardSkeleton";

export const PostsListScreen = (): JSX.Element => {
  const queryClient = useQueryClient();

  const { data, refetch, isRefetching, fetchNextPage, isFetchingNextPage } =
    useGetPostsQuery();

  const posts = useMemo(() => {
    const posts = data?.pages.flatMap(({ posts }) => posts) ?? [];
    return posts.filter(
      ({ post: post1 }, i) =>
        posts.findIndex(({ post: post2 }) => post1.ap_id === post2.ap_id) === i,
    );
  }, [data?.pages]);

  if (!data) {
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
    <FlatList
      refreshControl={
        <RefreshControl
          refreshing={isRefetching}
          onRefresh={() => {
            void refetch().then(async () => {
              await queryClient.resetQueries(queryKeys.getPosts());
            });
          }}
        />
      }
      data={posts}
      keyExtractor={(item) => item.post.ap_id}
      renderItem={({ item, index }) => (
        <>
          <PostCard key={item.post.ap_id} view={item} />
          {index < posts.length - 1 && <Divider height={1.5} />}
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
  );
};
