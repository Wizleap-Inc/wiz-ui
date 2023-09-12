export interface SnackbarOption {
  message: string;
  options?: SnackbarOptionType;
  created: string;
  delete: () => void;
}

export type SnackbarOptionType = {
  expand?: boolean;
};
