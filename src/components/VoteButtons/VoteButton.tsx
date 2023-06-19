import Ionicons from "@expo/vector-icons/Ionicons";
import * as Haptics from "expo-haptics";
import { IconButton, useTheme } from "native-base";

type VoteButtonProps = {
  arrow: "up" | "down";
  color: "orange" | "blue";
  onPress: () => void;
  highlighted: boolean;
};

export const VoteButton = ({
  arrow,
  color,
  onPress,
  highlighted,
}: VoteButtonProps): JSX.Element => {
  const { colors } = useTheme();
  return (
    <IconButton
      colorScheme={color}
      icon={
        <Ionicons
          name={`ios-arrow-${arrow}`}
          size={20}
          color={colors.gray[100]}
        />
      }
      variant={highlighted ? "solid" : undefined}
      onPress={onPress}
      onPressIn={() => {
        void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }}
    />
  );
};
