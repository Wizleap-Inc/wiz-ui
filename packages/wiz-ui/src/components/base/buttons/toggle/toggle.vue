<template>
  <button
    :class="{
      'wiz-toggle-button': true,
      'wiz-toggle-button--inActive': !isActive,
      'wiz-toggle-button--active': isActive,
      'wiz-toggle-button--disabled': disabled,
    }"
    @click="onClick"
  >
    <WizHStack align="center" gap="xs">
      <WizIcon
        :icon="isActive ? activeIcon : inActiveIcon"
        color="green.800"
        size="xl2"
      />
      <slot />
    </WizHStack>
  </button>
</template>

<script setup lang="ts">
import { THEME } from "@wizleap-inc/wiz-ui-constants";
import { ComponentName } from "@wizleap-inc/wiz-ui-constants/component/name";
import { ref } from "vue";

import WizIcon from "@/components/base/icon/icon.vue";
import WizHStack from "@/components/base/stack/h-stack.vue";
import type { TIcon } from "@/components/icons";

defineOptions({
  name: ComponentName.ToggleButton,
});
interface Props {
  inActiveIcon: TIcon;
  activeIcon: TIcon;
  disabled?: boolean;
}

interface Emits {
  (event: "click"): void;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

const isActive = ref(false);

const emits = defineEmits<Emits>();

const onClick = () => {
  if (props.disabled) return;
  isActive.value = !isActive.value;
  emits("click");
};

const spacingNo = THEME.spacing.no;
const spacingXs2 = THEME.spacing.xs2;
const spacingMd = THEME.spacing.md;
const spacingXl3 = THEME.spacing.xl3;
const colorWhite800 = THEME.color.white["800"];
const colorGreen300 = THEME.color.green["300"];
const colorGreen800 = THEME.color.green["800"];
const colorGray400 = THEME.color.gray["400"];
const shadowSm = THEME.shadow.sm;
const fontSizeSm = THEME.fontSize.sm;
</script>

<style lang="scss" scoped>
$border-width: 1px;

.wiz-toggle-button {
  height: v-bind(spacingXl3);
  width: max-content;
  color: v-bind(colorGreen800);
  border: none;
  border-radius: v-bind(spacingXs2);
  padding: v-bind(spacingNo) v-bind(spacingMd);
  font-size: v-bind(fontSizeSm);
  font-weight: bold;
  cursor: pointer;

  &:hover:not(&--disabled) {
    opacity: 0.9;
  }

  &--inActive {
    background-color: v-bind(colorWhite800);
    box-shadow: v-bind(shadowSm);
  }

  &--active {
    background-color: v-bind(colorGreen300);
    border: $border-width solid v-bind(colorGray400);
  }

  &--disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
}
</style>
