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
    {avatar && <Avatar source={{ uri: avatar }} size={4} marginRight={1} />}
    <Text {...props}>{children}</Text>
  </Column>
);

type UsernameProps = {
  creator: Person;
  op?: boolean;
};

export const Username = ({ creator, op }: UsernameProps): JSX.Element => {
  if (op) {
    return (
      <UsernameWithAvatar
        avatar={creator.avatar}
        color="blue.500"
        fontWeight="semibold"
      >
        {creator.name}
      </UsernameWithAvatar>
    );
  }

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
        color="purple.500"
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
