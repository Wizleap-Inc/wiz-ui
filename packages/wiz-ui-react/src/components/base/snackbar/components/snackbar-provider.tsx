import { getSpacingCss } from "@wizleap-inc/wiz-ui-constants";
import { snackbarControllerStyle } from "@wizleap-inc/wiz-ui-styles/bases/snackbar.css";
import { FC, ReactNode, useEffect, useId, useRef, useState } from "react";

import { WizSnackbar } from "./snackbar";
import { SnackbarContext } from "./snackbar-context";

type SnackbarDataItem = {
  id: string;
  message: string;
};

const marginPx = (() => {
  const mdRem = getSpacingCss("md");
  if (!mdRem || mdRem === "auto") return 0;
  if (mdRem === "9999px") return 9999;
  return (
    parseFloat(mdRem) *
    parseFloat(getComputedStyle(document.documentElement).fontSize)
  );
})();

const SnackbarProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [snackbarData, setSnackbarData] = useState<SnackbarDataItem[]>([]);
  const containersRef = useRef<Array<HTMLDivElement | null>>([]);
  const idPrefix = useId();
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

  const showSnackbar = (message: string) => {
    setSnackbarData((current) => [
      ...current,
      { message, id: `${idPrefix}-${countRef.current++}` },
    ]);
  };

  return (
    <SnackbarContext.Provider
      value={{
        showSnackbar,
      }}
    >
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
      {children}
    </SnackbarContext.Provider>
  );
};

export const WizSnackbarProvider = SnackbarProvider;
