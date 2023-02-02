export interface SearchInputOption {
  label: string;
  value: number;
  parent?: boolean;
  children: SearchInputOption[];
}
