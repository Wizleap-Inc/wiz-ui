export type Tag = {
  label: string;
};

export type SearchInputOption = {
  label: string;
  value: number;
  children?: SearchInputOption[];
  tag?: Tag;
};
