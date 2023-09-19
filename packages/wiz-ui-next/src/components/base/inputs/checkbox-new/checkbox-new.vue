<template>
  <label :class="labelClass">
    <input
      type="checkbox"
      :class="styles.inputStyle"
      :checked="checked"
      :value="value"
      :id="id"
      :name="name"
      :disabled="disabled"
      @change="handleChange"
    />
    <span :class="styles.iconWrapperStyle">
      <WizIcon :icon="WizICheckBold" color="white.800" size="md" />
    </span>
    <slot />
  </label>
</template>

<script setup lang="ts">
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/checkbox-new.css";
import { computed } from "vue";

import { WizICheckBold, WizIcon } from "@/components";

interface Props {
  checked: boolean;
  value?: string | number | string[];
  id?: string;
  name?: string;
  disabled?: boolean;
  strikeThrough?: boolean;
  bordered?: boolean;
  error?: boolean;
}
const props = defineProps<Props>();

interface Emits {
  (e: "update:checked", checked: boolean): void;
}
const emit = defineEmits<Emits>();

const labelClass = computed(() => {
  const borderedState = (() => {
    if (props.disabled) {
      return "disabled";
    }
    if (props.error) {
      return "error";
    }
    if (props.checked) {
      return "checked";
    }
    return "default";
  })();

  return [
    styles.labelStyle[props.disabled ? "disabled" : "default"],
    props.strikeThrough && styles.strikeThroughStyle,
    props.bordered && styles.borderedStyle[borderedState],
  ];
});

const handleChange = (e: Event) => {
  if (e.target instanceof HTMLInputElement) {
    emit("update:checked", e.target.checked);
  }
};
</script>
