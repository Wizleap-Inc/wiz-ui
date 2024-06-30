import { getSpacingCss } from "@wizleap-inc/wiz-ui-constants";
import { snackbarControllerStyle } from "@wizleap-inc/wiz-ui-styles/bases/snackbar.css";
import { FC, ReactNode, useEffect, useRef, useState } from "react";

import { WizSnackbar } from "./snackbar";
import { SnackbarContext } from "./snackbar-context";

type SnackbarOptionsType = {
  expand?: boolean;
};

type SnackbarDataItem = {
  id: string;
  message: string;
  options?: SnackbarOptionsType;
};

const marginPx = (() => {
  if (!window) return 0;
  const mdRem = getSpacingCss("md");
  if (!mdRem || mdRem === "auto") return 0;
  if (mdRem === "9999px") return 9999;
  return (
    parseFloat(mdRem) *
    parseFloat(window.getComputedStyle(document.documentElement).fontSize)
  );
})();

const SnackbarProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [snackbarData, setSnackbarData] = useState<SnackbarDataItem[]>([]);
  const containersRef = useRef<Array<HTMLDivElement | null>>([]);
  const countRef = useRef(0);

  useEffect(() => {
    containersRef.current = containersRef.current.slice(0, snackbarData.length);
  }, [snackbarData.length]);

  const getSnackbarBottom = (index: number) => {
    return containersRef.current
      .slice(0, index)
      .reduce((totalOffset, container) => {
        const rect = container?.getBoundingClientRect();
        return totalOffset + (rect?.height ?? 0) + marginPx;
      }, marginPx);
  };

  const showSnackbar = (message: string, options?: SnackbarOptionsType) => {
    setSnackbarData((current) => [
      ...current,
      {
        message,
        options,
        id: `${new Date().toISOString()}-${countRef.current++}`,
      },
    ]);
  };

  return (
    <SnackbarContext.Provider
      value={{
        showSnackbar,
      }}
    >
      {children}
      {snackbarData.map((item, i) => (
        <div
          key={item.id}
          className={snackbarControllerStyle}
          ref={(ref) => (containersRef.current[i] = ref)}
          style={{
            transitionDuration: "0.2s",
            bottom: getSnackbarBottom(i),
          }}
        >
          <WizSnackbar
            message={item.message}
            expand={item.options?.expand}
            onClose={() => {
              setSnackbarData((current) =>
                current.filter((_item) => _item.id !== item.id)
              );
            }}
            enableAnimation
            autoClose
          />
        </div>
      ))}
    </SnackbarContext.Provider>
  );
};

export const WizSnackbarProvider = SnackbarProvider;
