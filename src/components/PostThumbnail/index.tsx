import { type PostView } from "lemmy-js-client";
import { Image } from "native-base";

import { PostThumbnailWrapper } from "./PostThumbnailWrapper";

export * from "./PostThumbnailWrapper";

type PostThumbnailProps = PostView;

export const PostThumbnail = ({
  post,
}: PostThumbnailProps): JSX.Element | null => {
  if (!post.thumbnail_url) {
    return null;
  }

  return (
    <PostThumbnailWrapper>
      <Image
        source={{ uri: post.thumbnail_url }}
        alt={post.embed_title ?? post.name}
        resizeMode="contain"
      />
    </PostThumbnailWrapper>
  );
};
