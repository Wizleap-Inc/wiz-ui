export type Tag = {
  label: string;
};
export type CheckboxOption = string | number | string[]; // WizCheckBoxNew
export type SearchInputOption<T> = {
  label: string;
  value: T;
  children?: SearchInputOption<T>[];
  tag?: Tag;
};
