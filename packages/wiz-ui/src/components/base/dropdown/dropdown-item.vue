<template>
  <div class="wiz-dropdown-item" @click="onClick">
    <WizHStack align="center">
      <slot />
      <WizIcon v-if="icon" size="md" :icon="icon" />
    </WizHStack>
  </div>
</template>

<script setup lang="ts">
import { THEME } from "@wizleap-inc/wiz-ui-constants";
import { ComponentName } from "@wizleap-inc/wiz-ui-constants/component/name";

import { WizIcon, WizHStack } from "@/components";
import type { TIcon } from "@/components/icons";

defineOptions({
  name: ComponentName.DropdownItem,
});
interface Props {
  icon?: TIcon;
}

defineProps<Props>();

interface Emit {
  (event: "click"): void;
}

const emit = defineEmits<Emit>();

const onClick = () => emit("click");
const colorGreen300 = THEME.color.green[300];
const colorGreen800 = THEME.color.green[800];
const colorWhite800 = THEME.color.white[800];
const spacingXs2 = THEME.spacing.xs2;
const spacingXs = THEME.spacing.xs;
const fontSizeSm = THEME.fontSize.sm;
const fontSizeXl = THEME.fontSize.xl;
</script>

<style lang="scss" scoped>
.wiz-dropdown-item {
  padding: v-bind(spacingXs) v-bind(spacingXs2);
  cursor: pointer;
  font-size: v-bind(fontSizeSm);
  line-height: v-bind(fontSizeXl);
  user-select: none;

  &:hover {
    background: v-bind(colorGreen300);
    color: v-bind(colorGreen800);

    svg {
      fill: v-bind(colorGreen800);
    }
  }

  &:active {
    background: v-bind(colorGreen800);
    color: v-bind(colorWhite800);

    svg {
      fill: v-bind(colorWhite800);
      vertical-align: middle;
    }
  }
}
</style>
