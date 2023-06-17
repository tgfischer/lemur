import * as WebBrowser from "expo-web-browser";
import { type PropsWithChildren } from "react";
import { TouchableHighlight } from "react-native";

type WebsiteLinkProps = PropsWithChildren<{ url: string }>;

export const WebsiteLink = ({
  url,
  children,
}: WebsiteLinkProps): JSX.Element => {
  return (
    <TouchableHighlight
      onPress={() => {
        void WebBrowser.openBrowserAsync(url);
      }}
    >
      {children}
    </TouchableHighlight>
  );
};
