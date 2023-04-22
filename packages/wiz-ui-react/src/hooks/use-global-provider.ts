import { createContext, useContext } from "react";

type TGlobalContext = {
  state: undefined;
};

export const GlobalContext = createContext<TGlobalContext | null>(null);

export const useGlobalProvider = () => {
  return {};
};

export const useGlobal = () => {
  const ctx = useContext(GlobalContext);
  if (!ctx) {
    throw new Error(
      `Global Providerは必ずApp.tsx等のreactエントリーポイントファイルでprovideされている必要があります。`
    );
  }
  return ctx;
};
