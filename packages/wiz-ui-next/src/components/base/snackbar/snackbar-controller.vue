<template>
  <div :class="snackbarControllerStyle" ref="containerRef">
    <WizSnackbar
      v-for="(option, i) in snackbarOptions"
      :key="option.created"
      :expand="option.options?.expand"
      :message="option.message"
      @delete="option.delete"
      :bottom="`${calcBottom(i)}px`"
      :left="`${md}px`"
    />
  </div>
</template>

<script setup lang="ts">
import { getSpacingCss, SpacingKeys } from "@wizleap-inc/wiz-ui-constants";
import { snackbarControllerStyle } from "@wizleap-inc/wiz-ui-styles/bases/snackbar.css";
import { ref } from "vue";

import { WizSnackbar } from "@/components";
import { globalInject, globalKey } from "@/hooks/use-global-provider";

const { snackbarOptions } = globalInject(globalKey);

const containerRef = ref<HTMLElement | undefined>();

const space2px = (key: SpacingKeys) => {
  if (!window) return 0;
  const rem = getSpacingCss(key);
  if (!rem || rem === "0") return 0;
  if (rem === "auto") return 0;
  if (rem === "9999px") return 9999;
  return (
    parseFloat(rem) *
    parseFloat(window.getComputedStyle(document.documentElement).fontSize)
  );
};

const md = space2px("md");

const calcBottom = (i: number) => {
  const children = Array.from(containerRef.value?.children ?? []);
  const totalOffset = children
    .filter((child) => !child.className.includes("Hidden"))
    .slice(0, i)
    .reduce((acc, child) => {
      if (child.className.includes("Hidden")) return acc;
      const rect = child.getBoundingClientRect();
      return acc + rect.height + md;
    }, 0);
  return totalOffset + md;
};
</script>
