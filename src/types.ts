import { type Person } from "lemmy-js-client";

export type Overwrite<T, R> = Omit<T, keyof R> & R;

export type SetRequired<T, TProps extends keyof T> = Omit<T, TProps> &
  Required<Pick<T, TProps>>;

export type Tree<TValue> = {
  value: TValue;
  children: Array<Tree<TValue>>;
};

export type AccountData = {
  jwt: string;
  user: Person;
};
