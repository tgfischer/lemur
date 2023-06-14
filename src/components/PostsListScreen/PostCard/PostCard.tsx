import { Stack } from "native-base";

import { PostThumbnail } from "../../PostThumbnail";

import { PostCardBody } from "./PostCardBody";
import { PostCardFooter } from "./PostCardFooter";
import { PostCardHeader } from "./PostCardHeader";
import { PostCardLink } from "./PostCardLink";
import { type PostCardProps } from "./types";

export const PostCard = ({ view }: PostCardProps): JSX.Element => {
  return (
    <PostCardLink view={view}>
      <Stack>
        <PostCardHeader {...view} />
        <PostThumbnail {...view} />
        <PostCardBody view={view} />
        <PostCardFooter {...view} />
      </Stack>
    </PostCardLink>
  );
};
