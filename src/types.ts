export type Overwrite<T, R> = Omit<T, keyof R> & R;

export type Tree<TValue> = {
  value: TValue;
  children: Array<Tree<TValue>>;
};
