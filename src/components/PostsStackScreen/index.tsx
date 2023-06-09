import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { PostScreen } from "../PostScreen";
import { PostsListScreen } from "../PostsListScreen";

const PostsStack = createNativeStackNavigator();

export const PostsStackScreen = (): JSX.Element => (
  <PostsStack.Navigator>
    <PostsStack.Screen name="Posts" component={PostsListScreen} />
    <PostsStack.Screen name="Post" component={PostScreen} />
  </PostsStack.Navigator>
);
