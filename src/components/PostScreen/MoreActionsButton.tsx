import Ionicons from "@expo/vector-icons/Ionicons";
import * as Haptics from "expo-haptics";
import { IconButton, useTheme } from "native-base";

export const MoreActionsButton = (): JSX.Element => {
  const { colors } = useTheme();
  return (
    <IconButton
      colorScheme="gray"
      icon={
        <Ionicons
          name="ios-ellipsis-vertical"
          size={20}
          color={colors.gray[100]}
        />
      }
      onPressIn={() => {
        void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }}
    />
  );
};
