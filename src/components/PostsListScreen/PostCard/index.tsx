import { memo } from "react";

import { PostCard as Card } from "./PostCard";
import { type PostCardProps } from "./types";

const PostCardInner = (props: PostCardProps): JSX.Element => {
  return <Card {...props} />;
};

export const PostCard = memo(PostCardInner);
