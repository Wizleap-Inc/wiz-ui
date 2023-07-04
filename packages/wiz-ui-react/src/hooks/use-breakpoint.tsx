import {
  useState,
  useLayoutEffect,
  createContext,
  ReactNode,
  useContext,
} from "react";

const BREAKPOINTS = ["sm", "md", "lg"] as const;

/**
 * @see {@link useBreakpoint}
 * @example
 * BreakpointVariantは、次の値のいずれかを取ります。
 * - sm: max-width: 480px(30rem)
 * - md: max-width: 768px(48rem)
 * - lg: max-width: 1024px(64rem)
 *
 * この閾値は、BreakpointProviderを使用して、カスタマイズすることができます。
 */
export type BreakpointVariant = (typeof BREAKPOINTS)[number];

export type Breakpoint = Record<BreakpointVariant, number>;

const DEFAULT_BREAKPOINT: Breakpoint = {
  sm: 480,
  md: 768,
  lg: 1024,
};

const getBreakpoint = (breakpoint: Breakpoint) => {
  const viewportWidth = window.innerWidth;
  const keys = Object.keys(breakpoint) as BreakpointVariant[];
  const currentBreakpoint = keys.find((key) => {
    return viewportWidth <= breakpoint[key];
  });
  return currentBreakpoint ?? BREAKPOINTS[BREAKPOINTS.length - 1];
};

const BreakpointContext = createContext(DEFAULT_BREAKPOINT);

/**
 * @see {@link BreakpointVariant}
 * @example
 * # カスタマイズ
 * `useBreakpoint`フックを使用して、一番近いBreakpointProviderで設定された値を取得できます。もし設定されてない場合はDEFAULT_BREAKPOINTが返されます。
 * この戻り値は、`bp`という名前のPropsにそのまま渡すことができます。
 *
 * ```jsx
 * import { Timeline } from "wiz-ui-react";
 * import { useBreakpoint } from "wiz-ui-react/hooks/use-breakpoint";
 *
 *
 * const App = () => {
 *   const bp = useBreakpoint()
 *
 *   return (
 *     <Timeline bp={bp} />
 *   )
 * };
 */
export const useBreakpoint = () => {
  // Providerが設定されていない場合は、DEFAULT_BREAKPOINTを返す
  const bp = useContext(BreakpointContext) || DEFAULT_BREAKPOINT;
  const [currentBreakpoint, setCurrentBreakpoint] = useState<BreakpointVariant>(
    BREAKPOINTS[BREAKPOINTS.length - 1]
  );

  useLayoutEffect(() => {
    const observer = new ResizeObserver(() => {
      setCurrentBreakpoint(getBreakpoint(bp));
    });

    observer.observe(document.body);

    return () => {
      observer.disconnect();
    };
  }, [bp]);

  return currentBreakpoint;
};

export const BreakpointProvider = ({
  children,
  bp,
}: {
  children: ReactNode;
  bp: Breakpoint;
}) => (
  <BreakpointContext.Provider value={bp}>{children}</BreakpointContext.Provider>
);
