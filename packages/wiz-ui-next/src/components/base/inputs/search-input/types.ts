export type CheckboxOption = string | number | string[]; // WizCheckBoxNew

export type Tag = {
  label: string;
};

export type SearchInputOption<T extends CheckboxOption> = {
  label: string;
  value: T;
  children?: SearchInputOption<T>[];
  tag?: Tag;
};
