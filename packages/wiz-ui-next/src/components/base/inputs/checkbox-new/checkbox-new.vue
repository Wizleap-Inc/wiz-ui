<template>
  <label :class="labelClass">
    <input
      :id="id"
      type="checkbox"
      :class="[styles.inputStyle, styles.inputMarginStyle[borderState]]"
      :checked="actualChecked"
      :value="value"
      :name="name"
      :disabled="disabled"
      @change="handleChange"
    />
    <div
      :class="[styles.iconWrapperStyle, styles.inputMarginStyle[borderState]]"
    >
      <div :class="styles.iconPositionStyle">
        <WizIcon :icon="WizICheckBold" color="white.800" size="md" />
      </div>
    </div>
    <slot />
  </label>
</template>

<script setup lang="ts">
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/checkbox-new.css";
import { computed, ref, watch } from "vue";

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

const actualChecked = ref(props.checked);

watch(
  () => props.checked,
  () => {
    actualChecked.value = props.checked;
  }
);

const labelClass = computed(() => {
  const borderedState = (() => {
    if (props.disabled) {
      return "disabled";
    }
    if (props.error) {
      return "error";
    }
    if (actualChecked.value) {
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
    actualChecked.value = e.target.checked;
  }
};

const borderState: "bordered" | "default" = props.bordered
  ? "bordered"
  : "default";
</script>
