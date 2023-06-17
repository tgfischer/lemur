import { type PostView } from "lemmy-js-client";

import { LoadableThumbnail } from "./LoadableThumbnail";
import { type UrlPost } from "./types";

type PostThumbnailProps = PostView;

export const PostThumbnail = (
  props: PostThumbnailProps,
): JSX.Element | null => {
  if (!props.post.url) {
    return null;
  }

  /**
   * @todo Really shouldn't need to do this, type should be narrows above, but isn't for some reason.
   */
  const post = props.post as UrlPost;

  return <LoadableThumbnail {...props} post={post} />;
};
