import { type Person } from "lemmy-js-client";
import { Text } from "native-base";

type UsernameProps = {
  creator: Person;
};

export const Username = ({ creator }: UsernameProps): JSX.Element => {
  if (creator.admin) {
    return (
      <Text color="green.600" fontWeight="semibold">
        {creator.name}
      </Text>
    );
  }

  return <Text>{creator.name}</Text>;
};
