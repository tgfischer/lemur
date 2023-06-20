import { AspectRatio, Box, View } from "native-base";
import { useState } from "react";
import { ActivityIndicator, ImageBackground, StyleSheet } from "react-native";

import { type PostThumbnailProps } from "./types";
import { WebsiteLink } from "./WebsiteLink";

export const ImageThumbnail = ({ post }: PostThumbnailProps): JSX.Element => {
  const [isLoaded, setLoaded] = useState(false);
  return (
    <WebsiteLink url={post.url}>
      <Box
        borderTopWidth={1}
        borderTopColor="rgba(0, 0, 0, 0.1)"
        borderBottomWidth={1}
        borderBottomColor="rgba(0, 0, 0, 0.1)"
        backgroundColor="rgba(0, 0, 0, 0.1)"
      >
        <AspectRatio w="100%" ratio={4 / 3}>
          <View flex={1}>
            <ImageBackground
              source={{ uri: post.url, cache: "force-cache" }}
              alt={post.name}
              onLoad={() => {
                setLoaded(true);
              }}
              blurRadius={post.nsfw ? 25 : undefined}
              style={styles.image}
              resizeMode="contain"
            >
              {!isLoaded && (
                <ActivityIndicator style={{ alignSelf: "center" }} />
              )}
            </ImageBackground>
          </View>
        </AspectRatio>
      </Box>
    </WebsiteLink>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
});
