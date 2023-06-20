import { Ionicons } from "@expo/vector-icons";
import {
  Column,
  Row,
  Text,
  useTheme,
  Stack,
  Image,
  AspectRatio,
} from "native-base";

import { type PostThumbnailProps } from "./types";
import { WebsiteLink } from "./WebsiteLink";

export const WebsiteThumbnail = ({ post }: PostThumbnailProps): JSX.Element => {
  const theme = useTheme();
  return (
    <WebsiteLink url={post.url}>
      <Stack
        margin={2.5}
        borderRadius={5}
        _dark={{ backgroundColor: "dark.100" }}
      >
        {post.thumbnail_url && (
          <Row>
            <AspectRatio w="100%" ratio={16 / 9}>
              <Image
                source={{ uri: post.thumbnail_url, cache: "force-cache" }}
                blurRadius={post.nsfw ? 100 : undefined}
                resizeMode="cover"
                alt={post.embed_title ?? post.embed_description ?? post.name}
                borderTopRadius={5}
              />
            </AspectRatio>
          </Row>
        )}
        <Row padding={3} space={3} alignItems="center">
          <Ionicons
            name="ios-globe-outline"
            size={20}
            color={theme.colors.muted["400"]}
          />
          <Column flexShrink={1}>
            {post.embed_title && (
              <Text _dark={{ color: "muted.300" }}>{post.embed_title}</Text>
            )}
            <Text isTruncated _dark={{ color: "muted.500" }}>
              {post.url}
            </Text>
          </Column>
        </Row>
      </Stack>
    </WebsiteLink>
  );
};
