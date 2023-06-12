import { type Person } from "lemmy-js-client";
import { Text, Avatar, Column, type ITextProps } from "native-base";

type UsernameWithAvatarProps = ITextProps & {
  avatar?: string;
};

const UsernameWithAvatar = ({
  avatar,
  children,
  ...props
}: UsernameWithAvatarProps): JSX.Element => (
  <Column flexDirection="row" alignItems="center">
    {avatar && <Avatar source={{ uri: avatar }} size={3} marginRight={1} />}
    <Text {...props}>{children}</Text>
  </Column>
);

type UsernameProps = {
  creator: Person;
};

export const Username = ({ creator }: UsernameProps): JSX.Element => {
  if (creator.admin) {
    return (
      <UsernameWithAvatar
        avatar={creator.avatar}
        color="red.600"
        fontWeight="semibold"
      >
        {creator.name}
      </UsernameWithAvatar>
    );
  }

  if (creator.bot_account) {
    return (
      <UsernameWithAvatar
        avatar={creator.avatar}
        color="blue.600"
        fontWeight="semibold"
      >
        {creator.name}
      </UsernameWithAvatar>
    );
  }

  return (
    <UsernameWithAvatar avatar={creator.avatar}>
      {creator.name}
    </UsernameWithAvatar>
  );
};
