<template>
  <WizPopupContainer v-model="modelValue">
    <slot />
    <WizPopup layer="popover" :gap="gap">
      <div
        class="wiz-dropdown__selector"
        :class="{ 'wiz-dropdown__selector--skeleton': skeleton }"
      >
        <WizVStack p="xs" gap="xs2">
          <slot name="options" />
        </WizVStack>
      </div>
    </WizPopup>
  </WizPopupContainer>
</template>

<script setup lang="ts">
import { THEME } from "@wiz-ui/constants";
import { ComponentName } from "@wiz-ui/constants/component/name";
import { SpacingKeys } from "@wiz-ui/constants/styles/spacing";
import { computed } from "vue";

import { WizPopup, WizPopupContainer, WizVStack } from "@/components";

defineOptions({
  name: ComponentName.Dropdown,
});
interface Props {
  value: boolean; // is open
  skeleton?: boolean;
  gap?: SpacingKeys;
}

const props = defineProps<Props>();

interface Emit {
  (event: "input", value: boolean): void;
}

const emit = defineEmits<Emit>();

const modelValue = computed({
  get: () => props.value,
  set: (value: boolean) => emit("input", value),
});

const colorWhite800 = THEME.color.white[800];
const colorWhite500 = THEME.color.white[500];
const spacingXs2 = THEME.spacing.xs2;
</script>

<style lang="scss" scoped>
.wiz-dropdown__selector {
  background: v-bind(colorWhite800);
  border-radius: v-bind(spacingXs2);
  min-width: 10rem;

  &--skeleton {
    background: v-bind(colorWhite500);
  }
}
</style>
