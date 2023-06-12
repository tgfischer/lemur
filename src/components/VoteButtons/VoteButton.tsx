import Ionicons from "@expo/vector-icons/Ionicons";
import * as Haptics from "expo-haptics";
import { IconButton, useTheme } from "native-base";

type VoteButtonProps = {
  arrow: "up" | "down";
  color: "orange" | "blue";
};

export const VoteButton = ({ arrow, color }: VoteButtonProps): JSX.Element => {
  const { colors } = useTheme();
  return (
    <IconButton
      colorScheme={color}
      icon={
        <Ionicons
          name={`ios-arrow-${arrow}`}
          size={20}
          color={colors.gray[600]}
        />
      }
      onPressIn={() => {
        void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }}
    />
  );
};
