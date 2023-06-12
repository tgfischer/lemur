export const deduplicateBy = () => {
  const comments =
    commentsQuery.data?.pages.flatMap(({ comments }) => comments) ?? [];
  return comments.filter(
    ({ comment: comment1 }, i) =>
      comments.findIndex(
        ({ comment: comment2 }) => comment1.ap_id === comment2.ap_id,
      ) === i,
  );
};
