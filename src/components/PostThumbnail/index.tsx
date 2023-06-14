import { ImageThumbnail } from "./ImageThumbnail";
import { type PostThumbnailProps } from "./types";
import { VideoThumbnail } from "./VideoThumbnail";
import { WebsiteThumbnail } from "./WebsiteThumbnail";

export const PostThumbnail = (
  props: PostThumbnailProps,
): JSX.Element | null => {
  if (props.post.thumbnail_url) {
    return <ImageThumbnail {...props} />;
  }

  if (props.post.embed_title) {
    return props.post.embed_video_url ? (
      <VideoThumbnail {...props} />
    ) : (
      <WebsiteThumbnail {...props} />
    );
  }

  return null;
};
