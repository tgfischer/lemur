import { AspectRatio } from "native-base";
import { ActivityIndicator } from "react-native";

import { useImageCheckQuery } from "./api";
import { ImageThumbnail } from "./ImageThumbnail";
import { type PostThumbnailProps } from "./types";
import { WebsiteThumbnail } from "./WebsiteThumbnail";

export const LoadableThumbnail = (
  props: PostThumbnailProps,
): JSX.Element | null => {
  const { data: isImage, isInitialLoading } = useImageCheckQuery({
    url: props.post.url,
  });

  if (isInitialLoading) {
    return (
      <AspectRatio w="100%" ratio={4 / 3}>
        <ActivityIndicator />
      </AspectRatio>
    );
  }

  // if (props.post.embed_title) {
  //   return <VideoThumbnail {...props} />;
  // }

  if (isImage) {
    return <ImageThumbnail {...props} />;
  }

  return <WebsiteThumbnail {...props} />;
};
