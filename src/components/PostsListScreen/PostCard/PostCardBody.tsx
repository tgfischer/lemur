import { type PostView } from "lemmy-js-client";
import { Box } from "native-base";

import { PostTextBody } from "../../PostTextBody";

type PostCardBodyProps = {
  view: PostView;
};

export const PostCardBody = ({
  view,
}: PostCardBodyProps): JSX.Element | null => {
  if (!view.post.body) {
    return null;
  }

  return (
    <Box padding={2}>
      <PostTextBody {...view} numberOfLines={10} />
    </Box>
  );
};
