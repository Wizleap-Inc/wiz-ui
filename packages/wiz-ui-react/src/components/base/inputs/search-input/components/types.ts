export type Tag = {
  label: string;
};

export type SearchInputOption = {
  label: string;
  value: number;
  selectedItemLabel?: string;
  children?: SearchInputOption[];
  tag?: Tag;
};
