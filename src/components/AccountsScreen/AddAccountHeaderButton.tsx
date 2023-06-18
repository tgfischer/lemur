import { Ionicons } from "@expo/vector-icons";
import { useLinkProps } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import { IconButton, theme } from "native-base";

import { ScreenType } from "../types";

export const AddAccountHeaderButton = (): JSX.Element => {
  const { onPress, ...props } = useLinkProps({
    to: { screen: ScreenType.AddAccount },
  });

  return (
    <IconButton
      {...props}
      icon={
        <Ionicons name="ios-add" size={22} color={theme.colors.gray[100]} />
      }
      onPress={onPress}
      onPressIn={() => {
        void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }}
    />
  );
};
