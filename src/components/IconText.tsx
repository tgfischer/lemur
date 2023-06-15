import Ionicons from "@expo/vector-icons/Ionicons";
import { Row, Text } from "native-base";
import { type PropsWithChildren } from "react";

type IconTextProps = PropsWithChildren<{
  icon: "arrow-up" | "arrow-down" | "chatbox-outline" | "time-outline";
}>;

export const IconText = ({ icon, children }: IconTextProps): JSX.Element => (
  <Row space={0.5}>
    <Text _light={{ color: "muted.600" }} _dark={{ color: "muted.400" }}>
      <Ionicons name={`ios-${icon}`} size={15} />
    </Text>
    <Text _light={{ color: "muted.600" }} _dark={{ color: "muted.400" }}>
      {children}
    </Text>
  </Row>
);
