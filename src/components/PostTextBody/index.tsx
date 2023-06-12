import { type PostView } from "lemmy-js-client";
import { type ITextProps, Text } from "native-base";

type PostTextBodyProps = Pick<ITextProps, "padding" | "numberOfLines"> &
  PostView;

export const PostTextBody = ({
  post,
  padding,
  numberOfLines,
}: PostTextBodyProps): JSX.Element | null => {
  if (!post.body) {
    return null;
  }

  return (
    <Text padding={padding} numberOfLines={numberOfLines}>
      {post.body}
    </Text>
  );
};
