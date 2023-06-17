import { Divider, Row, Stack, Box } from "native-base";
import { type ColorType } from "native-base/lib/typescript/components/types";
import { memo, useState } from "react";
import { TouchableHighlight } from "react-native";

import { type Tree } from "../../../types";
import { timeAgo } from "../../../utilities";
import { IconText } from "../../IconText";
import { Username } from "../../Username";
import { type CommentViewData } from "../api";

import { CommentContent } from "./CommentContent";

type CommentProps = {
  tree: Tree<CommentViewData>;
  level: number;
};

const getLeftBorderColor = (level: number): ColorType => {
  switch (level) {
    case 1:
      return "red.600";
    case 2:
      return "orange.600";
    case 3:
      return "yellow.400";
    case 4:
      return "green.500";
    case 5:
      return "blue.500";
    default:
      return "purple.500";
  }
};

const CommentInner = ({ tree, level }: CommentProps): JSX.Element => {
  const [isExpanded, setExpanded] = useState(true);

  return (
    <Stack>
      <TouchableHighlight
        onPress={() => {
          setExpanded((isExpanded) => !isExpanded);
        }}
      >
        <Box paddingLeft={2 * level}>
          <Box
            borderLeftWidth={level > 0 ? 4 : 0}
            borderColor={getLeftBorderColor(level)}
            padding={2.5}
          >
            <Row alignItems="center" justifyContent="space-between">
              <Username creator={tree.value.creator} />
              <Row alignItems="center" space={2.5}>
                <IconText icon="ios-arrow-up">
                  {tree.value.counts.score}
                </IconText>
                <IconText icon="ios-time-outline">
                  {timeAgo(tree.value.comment.published)}
                </IconText>
              </Row>
            </Row>
            {isExpanded && <CommentContent comment={tree.value.comment} />}
          </Box>
          <Divider _dark={{ backgroundColor: "dark.200" }} />
        </Box>
      </TouchableHighlight>
      {isExpanded &&
        tree.children.map((tree) => (
          <Comment
            key={tree.value.comment.ap_id}
            tree={tree}
            level={level + 1}
          />
        ))}
    </Stack>
  );
};

export const Comment = memo(CommentInner);
