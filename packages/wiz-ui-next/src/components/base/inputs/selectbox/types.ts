export interface SelectBoxOption<T = number> {
  label: string;
  exLabel?: string;
  value: T;
  disabled?: boolean;
}
