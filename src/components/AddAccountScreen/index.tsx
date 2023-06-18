import { Button, FormControl, Input, ScrollView, Stack } from "native-base";
import { useState } from "react";

import { useAddAccountMutation } from "./api";

type AddAccountFormData = {
  instanceUrl: string;
  username: string;
  password: string;
};

export const AddAccountScreen = (): JSX.Element => {
  const [formData, setFormData] = useState<AddAccountFormData>({
    instanceUrl: "",
    username: "",
    password: "",
  });

  const { mutate, isLoading } = useAddAccountMutation();

  return (
    <ScrollView>
      <Stack space={3} padding={3}>
        <FormControl isRequired>
          <FormControl.Label>Instance URL</FormControl.Label>
          <Input
            placeholder="https://lemmy.ca"
            size="md"
            onChangeText={(instanceUrl) => {
              setFormData((state) => ({ ...state, instanceUrl }));
            }}
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="off"
          />
        </FormControl>
        <FormControl isRequired>
          <FormControl.Label>Username</FormControl.Label>
          <Input
            size="md"
            onChangeText={(username) => {
              setFormData((state) => ({ ...state, username }));
            }}
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="off"
          />
        </FormControl>
        <FormControl isRequired>
          <FormControl.Label>Password</FormControl.Label>
          <Input
            type="password"
            size="md"
            onChangeText={(password) => {
              setFormData((state) => ({ ...state, password }));
            }}
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="off"
          />
        </FormControl>
        <Button
          marginTop={3}
          onPress={() => {
            mutate(formData);
          }}
          disabled={isLoading}
        >
          Add account
        </Button>
      </Stack>
    </ScrollView>
  );
};
