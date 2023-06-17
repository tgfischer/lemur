import { Ionicons } from "@expo/vector-icons";
import { Row, Text } from "native-base";
import { type PropsWithChildren } from "react";

import { type IconType } from "./types";

type IconTextProps = PropsWithChildren<{
  icon: IconType;
}>;

export const IconText = ({ icon, children }: IconTextProps): JSX.Element => (
  <Row space={0.5}>
    <Text _light={{ color: "muted.600" }} _dark={{ color: "muted.400" }}>
      <Ionicons name={icon} size={15} />
    </Text>
    <Text _light={{ color: "muted.600" }} _dark={{ color: "muted.400" }}>
      {children}
    </Text>
  </Row>
);
