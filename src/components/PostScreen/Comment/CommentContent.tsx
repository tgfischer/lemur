import { type Comment } from "lemmy-js-client";
import { Text } from "native-base";

type CommentContentProps = {
  comment: Comment;
};

export const CommentContent = ({
  comment,
}: CommentContentProps): JSX.Element => {
  if (comment.deleted) {
    return (
      <Text color="muted.600" italic>
        This comment was deleted by the user.
      </Text>
    );
  }

  if (comment.removed) {
    return (
      <Text color="muted.600" italic>
        This comment was deleted by a moderator or administrator.
      </Text>
    );
  }

  return <Text>{comment.content}</Text>;
};
