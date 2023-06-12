import { Box, Stack } from "native-base";

import { PostThumbnail } from "../../PostThumbnail";

import { PostCardBody } from "./PostCardBody";
import { PostCardFooter } from "./PostCardFooter";
import { PostCardHeader } from "./PostCardHeader";
import { PostCardLink } from "./PostCardLink";
import { type PostCardProps } from "./types";

export const PostCard = ({ view }: PostCardProps): JSX.Element => {
  return (
    <Box>
      <Stack>
        <PostCardLink view={view}>
          <PostCardHeader {...view} />
        </PostCardLink>
        <PostThumbnail {...view} />
        <PostCardBody view={view} />
        <PostCardFooter {...view} />
      </Stack>
    </Box>
  );
};
