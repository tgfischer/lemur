import { Box, Stack, Text, Image, AspectRatio } from "native-base";

import { PostCardFooter } from "./PostCardFooter";
import { PostCardHeader } from "./PostCardHeader";
import { type PostCardProps } from "./types";

export const PostCard = ({ item }: PostCardProps): JSX.Element => {
  return (
    <Box>
      <Stack>
        <PostCardHeader {...item} />
        {item.post.thumbnail_url && (
          <Box
            borderTopWidth={1}
            borderTopColor="rgba(0, 0, 0, 0.1)"
            borderBottomWidth={1}
            borderBottomColor="rgba(0, 0, 0, 0.1)"
            backgroundColor="rgba(0, 0, 0, 0.1)"
          >
            <AspectRatio w="100%" ratio={4 / 3}>
              <Image
                source={{ uri: item.post.thumbnail_url }}
                alt={item.post.embed_title ?? item.post.name}
                resizeMode="contain"
              />
            </AspectRatio>
          </Box>
        )}
        {item.post.body && (
          <Text padding={2} numberOfLines={10}>
            {item.post.body}
          </Text>
        )}
        <PostCardFooter {...item} />
      </Stack>
    </Box>
  );
};
