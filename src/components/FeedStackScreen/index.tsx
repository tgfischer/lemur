import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { PostScreen } from "../PostScreen";
import { PostsListScreen } from "../PostsListScreen";
import { ScreenType, type FeedStackParamList } from "../types";

const FeedStack = createNativeStackNavigator<FeedStackParamList>();

export const FeedStackScreen = (): JSX.Element => {
  return (
    <FeedStack.Navigator
      screenOptions={{
        headerBackTitle: "Back",
      }}
    >
      <FeedStack.Screen name={ScreenType.Posts} component={PostsListScreen} />
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
