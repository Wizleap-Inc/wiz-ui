export type Tag = {
  label: string;
};

export type SearchInputOption<T> = {
  label: string;
  value: number;
  children?: SearchInputOption<T>[];
  tag?: Tag;
};
