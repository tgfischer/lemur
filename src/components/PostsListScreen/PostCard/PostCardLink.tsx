import {
  type RouteProp,
  useLinkProps,
  useRoute,
} from "@react-navigation/native";
import { type PostView } from "lemmy-js-client";
import { type PropsWithChildren } from "react";
import { TouchableHighlight } from "react-native";

import { ScreenType, type StackNavigatorParamList } from "../../types";

type PostCardLinkProps = PropsWithChildren<{ view: PostView }>;

export const PostCardLink = ({
  view,
  children,
}: PostCardLinkProps): JSX.Element => {
  const { params } =
    useRoute<RouteProp<StackNavigatorParamList, ScreenType.Posts>>();

  const { onPress, ...props } = useLinkProps<StackNavigatorParamList>({
    to: { screen: ScreenType.Post, params: { ...params, view } },
  });

  return (
    <TouchableHighlight {...props} onPress={onPress} delayPressIn={100}>
      {children}
    </TouchableHighlight>
  );
};
