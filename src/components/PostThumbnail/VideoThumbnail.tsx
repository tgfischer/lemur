import { Video, ResizeMode } from "expo-av";
import { Box, AspectRatio, Flex } from "native-base";
import { useRef } from "react";
import { StyleSheet } from "react-native";

import { type PostThumbnailProps } from "./types";

/**
 * @todo Youtube videos do not work with the expo-av player :bigsad:
 */
export const VideoThumbnail = ({
  post,
}: PostThumbnailProps): JSX.Element | null => {
  const videoRef = useRef<Video | null>(null);

  if (!post.embed_video_url) {
    return null;
  }

  return (
    <Box
      borderTopWidth={1}
      borderTopColor="rgba(0, 0, 0, 0.1)"
      borderBottomWidth={1}
      borderBottomColor="rgba(0, 0, 0, 0.1)"
      backgroundColor="rgba(0, 0, 0, 0.1)"
    >
      <AspectRatio w="100%" ratio={4 / 3}>
        <Flex alignItems="center">
          <Video
            ref={videoRef}
            source={{ uri: post.embed_video_url }}
            style={styles.video}
            resizeMode={ResizeMode.CONTAIN}
            useNativeControls
            isLooping
            isMuted
            shouldPlay
            usePoster
          />
        </Flex>
      </AspectRatio>
    </Box>
  );
};

const styles = StyleSheet.create({
  video: {
    width: "100%",
    height: "100%",
  },
});
