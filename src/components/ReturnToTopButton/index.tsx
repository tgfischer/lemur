import Ionicons from "@expo/vector-icons/Ionicons";
import { Fab, useTheme } from "native-base";

type ReturnToTopButtonProps = {
  onPress: () => void;
};

export const ReturnToTopButton = ({
  onPress,
}: ReturnToTopButtonProps): JSX.Element => {
  const { colors } = useTheme();
  return (
    <Fab
      colorScheme="dark"
      bgColor="darkBlue"
      icon={<Ionicons name="ios-chevron-up" size={20} color={colors.white} />}
      onPress={onPress}
      placement="bottom-left"
    />
  );
};
