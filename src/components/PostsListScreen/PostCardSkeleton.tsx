import { Box, Stack, Skeleton, Column, Row } from "native-base";

export const PostCardSkeleton = (): JSX.Element => (
  <Box>
    <Stack padding={2} space={8}>
      <Column space={2}>
        <Skeleton.Text startColor="gray.300" lines={1} />
        <Skeleton.Text lines={1} width="50%" />
      </Column>
      <Skeleton.Text startColor="gray.300" lines={5} />
      <Stack space={2}>
        <Row>
          <Skeleton.Text lines={1} width="40%" />
        </Row>
        <Row space={2}>
          <Skeleton.Text width="10%" lines={1} />
          <Skeleton.Text width="10%" lines={1} />
          <Skeleton.Text width="10%" lines={1} />
        </Row>
      </Stack>
    </Stack>
  </Box>
);
