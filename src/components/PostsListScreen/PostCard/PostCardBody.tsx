import { type PostView } from "lemmy-js-client";
import { Box } from "native-base";

import { PostTextBody } from "../../PostTextBody";

import { PostCardLink } from "./PostCardLink";

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
    <PostCardLink view={view}>
      <Box padding={2}>
        <PostTextBody {...view} numberOfLines={10} />
      </Box>
    </PostCardLink>
  );
};
