import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { PostScreen } from "../PostScreen";
import { PostsListScreen, PostsListHeaderSortButton } from "../PostsListScreen";
import { ScreenType, type FeedStackParamList } from "../types";

const FeedStack = createNativeStackNavigator<FeedStackParamList>();

export const FeedStackScreen = (): JSX.Element => {
  return (
    <FeedStack.Navigator>
      <FeedStack.Screen
        name={ScreenType.Posts}
        component={PostsListScreen}
        initialParams={{
          instanceUrl: "https://lemmy.ca",
          listingType: "All",
          sort: "Active",
        }}
        options={({ route }) => ({
          headerRight: PostsListHeaderSortButton,
          title: route.params.listingType,
        })}
      />
      <FeedStack.Screen
        name={ScreenType.Post}
        component={PostScreen}
        options={({ route }) => ({
          title: `${route.params.view.counts.comments} Comments`,
        })}
      />
    </FeedStack.Navigator>
  );
};
