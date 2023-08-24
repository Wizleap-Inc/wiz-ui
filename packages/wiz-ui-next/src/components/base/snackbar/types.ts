export interface SnackbarOption {
  message: string;
  expand: boolean;
  created: string;
  delete: () => void;
}
