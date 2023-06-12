import { Box, AspectRatio } from "native-base";
import { type PropsWithChildren } from "react";

type PostThumbnailWrapperProps = PropsWithChildren<Record<string, unknown>>;

export const PostThumbnailWrapper = ({
  children,
}: PostThumbnailWrapperProps): JSX.Element => (
  <Box
    borderTopWidth={1}
    borderTopColor="rgba(0, 0, 0, 0.1)"
    borderBottomWidth={1}
    borderBottomColor="rgba(0, 0, 0, 0.1)"
    backgroundColor="rgba(0, 0, 0, 0.1)"
  >
    <AspectRatio w="100%" ratio={4 / 3}>
      {children}
    </AspectRatio>
  </Box>
);
