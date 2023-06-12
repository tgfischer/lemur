import { type NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQueryClient } from "@tanstack/react-query";
import { FlatList, Row } from "native-base";
import { useMemo } from "react";
import { ActivityIndicator, RefreshControl } from "react-native";

import { type ScreenType, type FeedStackParamList } from "../types";

import { queryKeys, useGetCommentsQuery, useGetPostQuery } from "./api";
import { Comment } from "./Comment";
import { PostMasthead } from "./PostMasthead";

type PostScreenProps = NativeStackScreenProps<
  FeedStackParamList,
  ScreenType.Post
>;

export const PostScreen = ({ route }: PostScreenProps): JSX.Element | null => {
  const queryClient = useQueryClient();

  const postId = route.params.view.post.id;

  const postQuery = useGetPostQuery({ post: route.params.view });
  const commentsQuery = useGetCommentsQuery({ postId });

  const comments = useMemo(() => {
    return commentsQuery.data?.pages.flatMap((comments) => comments) ?? [];
  }, [commentsQuery.data?.pages]);

  if (!postQuery.data) {
    return null;
  }

  return (
    <FlatList
      refreshControl={
        <RefreshControl
          refreshing={postQuery.isRefetching || commentsQuery.isRefetching}
          onRefresh={() => {
            void Promise.all([
              postQuery.refetch(),
              commentsQuery.refetch(),
            ]).then(async () => {
              await queryClient.resetQueries(queryKeys.getPost(postId));
              await queryClient.resetQueries(queryKeys.getComments(postId));
            });
          }}
        />
      }
      data={comments}
      keyExtractor={(tree) => tree.value.comment.ap_id}
      renderItem={({ item: tree }) => (
        <Comment key={tree.value.comment.ap_id} tree={tree} level={0} />
      )}
      onEndReached={() => {
        if (!commentsQuery.data) {
          return;
        }

        const lastPage = commentsQuery.data?.pages.at(-1);

        if (!lastPage || lastPage.length < 10) {
          return;
        }

        void commentsQuery.fetchNextPage({
          pageParam: commentsQuery.data.pages.length + 1,
        });
      }}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={<PostMasthead view={postQuery.data} />}
      ListFooterComponent={
        commentsQuery.isInitialLoading || commentsQuery.isFetchingNextPage ? (
          <Row p={2} justifyContent="center">
            <ActivityIndicator />
          </Row>
        ) : undefined
      }
    />
  );
};
