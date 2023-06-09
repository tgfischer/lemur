import Ionicons from "@expo/vector-icons/Ionicons";
import { Row, Text } from "native-base";
import { type PropsWithChildren } from "react";

type IconTextProps = PropsWithChildren<{
  icon: "arrow-up" | "arrow-down" | "chatbox-outline";
}>;

export const IconText = ({ icon, children }: IconTextProps): JSX.Element => (
  <Row space={0.5}>
    <Text color="muted.600">
      <Ionicons name={`ios-${icon}`} size={15} />
    </Text>
    <Text color="muted.600">{children}</Text>
  </Row>
);
