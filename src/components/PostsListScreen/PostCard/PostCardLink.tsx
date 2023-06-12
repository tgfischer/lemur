import { PlatformPressable } from "@react-navigation/elements";
import { useLinkProps } from "@react-navigation/native";
import { type PostView } from "lemmy-js-client";
import { type PropsWithChildren } from "react";

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
    <PlatformPressable {...props} onPress={onPress}>
      {children}
    </PlatformPressable>
  );
};
