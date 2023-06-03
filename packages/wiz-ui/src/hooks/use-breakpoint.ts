import { InjectionKey, onBeforeMount, onMounted, ref } from "vue";

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
  return currentBreakpoint ?? BREAKPOINTS[BREAKPOINTS.length - 1];
};

/**
 * @see {@link BreakpointVariant}
 * @example
 * # カスタマイズ
 * `useBreakpoint`フックを使用して、閾値をカスタマイズすることができます。
 * このフックは、`BreakpointVariant`のいずれかの値を返します。
 * この戻り値は、`bp`という名前のPropsにそのまま渡すことができます。
 *
 *
 * ```vue
 * <template>
 *  <Timeline :bp="customBp">
 * </template>
 *
 * <script setup lang="ts">
 * import { Timeline } from "wiz-ui";
 * import { useBreakpoint } from "@/hooks/use-breakpoint";
 * import { globalInject, globalKey } from "@/hooks/use-global-provider";
 * const { bp } = globalInject(globalKey);
 * const customBp = useBreakpoint({
 *   sm: 640,
 *   md: 800,
 *   lg: 1024,
 * });
 * </script>
 * ```
 */
export const useBreakpoint = (breakpoint = DEFAULT_BREAKPOINT) => {
  const currentBreakpoint = ref<BreakpointVariant>(
    BREAKPOINTS[BREAKPOINTS.length - 1]
  );
  onMounted(() => {
    const observer = new ResizeObserver(() => {
      currentBreakpoint.value = getBreakpoint(breakpoint);
    });

    observer.observe(document.body);

    return () => {
      observer.disconnect();
    };
  });
  onBeforeMount(() => {
    currentBreakpoint.value = getBreakpoint(breakpoint);
  });
  return currentBreakpoint;
};

/**
 * @see {@link BreakpointVariant}
 * @example
 * # 基本的な使い方
 * もしコンポーネントがWindowサイズに依存する場合は、`bp`という名前のPropsが必要となっています。
 * このPropsは、`BreakpointVariant`のいずれかの値を取ります。
 *
 * ```vue
 * <template>
 *   <Timeline :bp="bp">
 * </template>
 *
 * <script setup lang="ts">
 * import { Timeline } from "wiz-ui";
 * import { globalInject, globalKey } from "@/hooks/use-global-provider";
 * const { bp } = globalInject(globalKey);
 * </script>
 * ```
 */
export const useBreakpointProvider = () => {
  const bp = useBreakpoint();
  return { bp };
};

export const breakPointKey: InjectionKey<
  ReturnType<typeof useBreakpointProvider>
> = Symbol("BreakpointProvider");
