import { AspectRatio, Box, Image } from "native-base";

import { type PostThumbnailProps } from "./types";

export const ImageThumbnail = ({
  post,
}: PostThumbnailProps): JSX.Element | null => {
  return (
    <Box
      borderTopWidth={1}
      borderTopColor="rgba(0, 0, 0, 0.1)"
      borderBottomWidth={1}
      borderBottomColor="rgba(0, 0, 0, 0.1)"
      backgroundColor="rgba(0, 0, 0, 0.1)"
    >
      <AspectRatio w="100%" ratio={4 / 3}>
        <Image
          source={{ uri: post.thumbnail_url }}
          alt={post.embed_title ?? post.name}
          resizeMode="contain"
        />
      </AspectRatio>
    </Box>
  );
};
