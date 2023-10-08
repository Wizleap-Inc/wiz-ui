export type SnackbarOptionType = {
  expand?: boolean;
};

export interface SnackbarOption {
  message: string;
  options?: SnackbarOptionType;
  created: string;
  delete: () => void;
}
