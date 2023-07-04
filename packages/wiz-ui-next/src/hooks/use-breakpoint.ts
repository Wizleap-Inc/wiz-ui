import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  InjectionKey,
  PropType,
  defineComponent,
  inject,
  onBeforeMount,
  onMounted,
  provide,
  ref,
} from "vue";

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

const breakpointKey: InjectionKey<Breakpoint> = Symbol("BreakpointProvider");

/**
 * @see {@link BreakpointVariant}
 * @example
 * # カスタマイズ
 * `useBreakpoint`フックを使用して、一番近い親のprovideBreakpointの閾値を取得することができます。
 * このフックは、`BreakpointVariant`のいずれかの値を返します。
 * この戻り値は、`bp`という名前のPropsにそのまま渡すことができます。
 *
 * ```vue
 * <template>
 *  <Timeline :bp="bp">
 * </template>
 *
 * <script setup lang="ts">
 * import { Timeline } from "wiz-ui";
 * import { useBreakpoint } from "@/hooks/use-breakpoint";
 *
 * // 一番近い親のprovideBreakpointの閾値を取得する（同じキーのprovideネストは子優先挙動をするため)
 * const bp = useBreakpoint();
 * </script>
 * ```
 */
export const useBreakpoint = () => {
  const bp = inject(breakpointKey, DEFAULT_BREAKPOINT);
  const currentBreakpoint = ref<BreakpointVariant>(getBreakpoint(bp));
  onMounted(() => {
    const observer = new ResizeObserver(() => {
      currentBreakpoint.value = getBreakpoint(bp);
    });

    observer.observe(document.body);

    return () => {
      observer.disconnect();
    };
  });
  onBeforeMount(() => {
    currentBreakpoint.value = getBreakpoint(bp);
  });
  return currentBreakpoint;
};

export const BreakpointProvider = defineComponent({
  name: ComponentName.BreakpointProvider,
  props: {
    bp: {
      type: Object as PropType<Breakpoint>,
      required: true,
    },
  },
  setup({ bp }, { slots }) {
    provide(breakpointKey, bp);
    return () => slots.default?.();
  },
});
