import { globalInject, globalKey } from "@/hooks/use-global-provider";

export const useSnackbar = () => {
  const { snack } = globalInject(globalKey);
  return snack;
};
