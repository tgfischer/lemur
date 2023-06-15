import { useLinkProps } from "@react-navigation/native";
import { type PostView } from "lemmy-js-client";
import { type PropsWithChildren } from "react";
import { TouchableHighlight } from "react-native";

import { ScreenType } from "../../types";

type PostCardLinkProps = PropsWithChildren<{ view: PostView }>;

export const PostCardLink = ({
  view,
  children,
}: PostCardLinkProps): JSX.Element => {
  const { onPress, ...props } = useLinkProps({
    to: { screen: ScreenType.Post, params: { view } },
  });

  return (
    <TouchableHighlight {...props} onPress={onPress} delayPressIn={100}>
      {children}
    </TouchableHighlight>
  );
};
