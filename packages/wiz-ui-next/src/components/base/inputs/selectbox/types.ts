export interface SelectBoxOption<T> {
  label: string;
  exLabel?: string;
  value: T;
  disabled?: boolean;
}
