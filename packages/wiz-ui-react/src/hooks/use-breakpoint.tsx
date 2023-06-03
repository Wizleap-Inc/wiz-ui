import {
  useState,
  useLayoutEffect,
  createContext,
  useContext,
  ReactNode,
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
 * この閾値は、`useBreakpoint`フックを使用して、カスタマイズすることができます。
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
  return currentBreakpoint ?? BREAKPOINTS[0];
};

/**
 * @see {@link BreakpointVariant}
 * @example
 * # カスタマイズ
 * `useBreakpoint`フックを使用して、閾値をカスタマイズすることができます。
 * このフックは、`BreakpointVariant`のいずれかの値を返します。
 * この戻り値は、`bp`という名前のPropsにそのまま渡すことができます。
 *
 * ```jsx
 * import { Timeline } from "wiz-ui-react";
 * import { useBreakpoint } from "wiz-ui-react/hooks/use-breakpoint";
 *
 *
 * const App = () => {
 *   const customBp = useBreakpoint({
 *     sm: 640,
 *     md: 800,
 *     lg: 1024,
 *   })
 *
 *   return (
 *     <Timeline bp={customBp} />
 *   )
 * };
 */
export const useBreakpoint = (breakpoint = DEFAULT_BREAKPOINT) => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<BreakpointVariant>(
    BREAKPOINTS[0]
  );

  useLayoutEffect(() => {
    const observer = new ResizeObserver(() => {
      setCurrentBreakpoint(getBreakpoint(breakpoint));
    });

    observer.observe(document.body);

    return () => {
      observer.disconnect();
    };
  }, []);

  return currentBreakpoint;
};

/**
 * @see {@link BreakpointVariant}
 * @example
 * # 基本的な使い方
 * もしコンポーネントがWindowサイズに依存する場合は、`bp`という名前のPropsが必要となっています。
 * このPropsは、`BreakpointVariant`のいずれかの値を取ります。
 *
 *
 * ```jsx
 * import { Timeline } from "wiz-ui-react";
 * import { BreakpointProvider, useBreakpointContext } from "wiz-ui-react/hooks/use-breakpoint";
 *
 * const App = () => {
 *   const { bp } = useBreakpointContext();
 *
 *   return (
 *     <Timeline bp={bp} />
 *   )
 * };
 */
export const BreakpointContext = createContext<BreakpointVariant | undefined>(
  undefined
);

export const useBreakpointContext = () => {
  const bp = useContext(BreakpointContext);
  if (bp === undefined) {
    throw new Error(
      "useBreakpointContextはBreakpointProvider内でのみ使用できます。"
    );
  }
  return { bp };
};

export const BreakpointProvider = ({ children }: { children: ReactNode }) => {
  const bp = useBreakpoint();

  return (
    <BreakpointContext.Provider value={bp}>
      {children}
    </BreakpointContext.Provider>
  );
};
