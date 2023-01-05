<template>
  <WizPopupContainer v-model="modelValue">
    <slot />
    <WizPopup layer="popover" :gap="gap">
      <div :class="[dropdownStyle, skeleton && dropdownSkeletonStyle]">
        <WizVStack p="xs" gap="xs2">
          <slot name="options" />
        </WizVStack>
      </div>
    </WizPopup>
  </WizPopupContainer>
</template>

<script setup lang="ts">
import { ComponentName, SpacingKeys } from "@wizleap-inc/wiz-ui-constants";
import {
  dropdownStyle,
  dropdownSkeletonStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/dropdown.css";
import { computed } from "vue";

import { WizPopup, WizPopupContainer, WizVStack } from "@/components";

defineOptions({
  name: ComponentName.Dropdown,
});

interface Props {
  modelValue: boolean; // is open
  skeleton?: boolean;
  gap?: SpacingKeys;
}

const props = defineProps<Props>();

interface Emit {
  (event: "update:modelValue", value: boolean): void;
}

const emit = defineEmits<Emit>();

const modelValue = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit("update:modelValue", value),
});
</script>
