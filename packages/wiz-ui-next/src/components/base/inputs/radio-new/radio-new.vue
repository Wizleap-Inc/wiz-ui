<template>
  <label :class="labelClass">
    <input
      type="radio"
      :class="styles.inputStyle"
      :checked="actualChecked"
      :value="value"
      :id="id"
      :name="name"
      :disabled="disabled"
      @change="handleChange"
    />
    <div :class="styles.markerStyle" />
    <slot />
  </label>
</template>

<script setup lang="ts">
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/radio-new.css";
import { computed, ref, watch } from "vue";
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
</script>
