export type Tag = {
  label: string;
};

export type SearchInputOption = {
  label: string;
  value: number;
  tag?: Tag;
  children: SearchInputOption[];
};
