<template>
  <WizPopupContainer>
    <slot />
    <WizPopup :isOpen="modelValue" @onClose="modelValue = false" :gap="gap">
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
import { computed, PropType } from "vue";

import { WizPopup, WizPopupContainer, WizVStack } from "@/components";

defineOptions({
  name: ComponentName.Dropdown,
});

const props = defineProps({
  value: {
    type: Boolean,
    required: true,
  },
  skeleton: {
    type: Boolean,
    required: false,
  },
  gap: {
    type: String as PropType<SpacingKeys>,
    required: false,
  },
});

interface Emit {
  (event: "input", value: boolean): void;
}

const emit = defineEmits<Emit>();

const modelValue = computed({
  get: () => props.value,
  set: (value: boolean) => emit("input", value),
});
</script>
