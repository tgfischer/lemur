import Ionicons from "@expo/vector-icons/Ionicons";
import {
  type RouteProp,
  useRoute,
  useNavigation,
  type NavigationProp,
} from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import { type SortType } from "lemmy-js-client";
import {
  IconButton,
  useTheme,
  Actionsheet,
  useDisclose,
  ScrollView,
} from "native-base";

import {
  type IconType,
  type FeedStackParamList,
  type ScreenType,
} from "../types";

const sortToIcon: Record<SortType, IconType> = {
  Active: "ios-newspaper-outline",
  Hot: "ios-flame-outline",
  MostComments: "ios-trophy-outline",
  New: "ios-time-outline",
  NewComments: "ios-time-outline",
  Old: "ios-calendar-outline",
  TopAll: "ios-calendar-outline",
  TopYear: "ios-calendar-outline",
  TopMonth: "ios-calendar-outline",
  TopWeek: "ios-calendar-outline",
  TopDay: "ios-calendar-outline",
};

export const PostsListHeaderSortButton = (): JSX.Element => {
  const theme = useTheme();

  const { params } =
    useRoute<RouteProp<FeedStackParamList, ScreenType.Posts>>();

  const navigation =
    useNavigation<NavigationProp<FeedStackParamList, ScreenType.Posts>>();

  const { isOpen, onOpen, onClose } = useDisclose();

  return (
    <>
      <IconButton
        icon={
          <Ionicons
            name={sortToIcon[params.sort]}
            size={20}
            color={theme.colors.gray[100]}
          />
        }
        onPress={onOpen}
        onPressIn={() => {
          void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }}
      />
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <ScrollView width="100%">
            {Object.keys(sortToIcon).map((sort: SortType) => (
              <Actionsheet.Item
                key={sort}
                onPress={() => {
                  navigation.setParams({ ...params, sort });
                  onClose();
                }}
              >
                {sort}
              </Actionsheet.Item>
            ))}
          </ScrollView>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
};
