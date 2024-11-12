export interface SelectBoxOption<T = number> {
  label: string;
  value: T;
  exLabel?: string;
  disabled?: boolean;
}
