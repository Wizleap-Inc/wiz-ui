<template>
  <label :class="styles.toggleSwitchStyle">
    <input
      v-model="switchValue"
      :class="styles.toggleSwitchInputStyle"
      type="checkbox"
      :disabled="disabled"
      :aria-label="ariaLabel"
    />
    <span
      :class="[
        styles.toggleSwitchSliderStyle[switchState],
        disabled
          ? styles.toggleSwitchDisabledColorStyle[switchState]
          : styles.toggleSwitchColorStyle[switchState],
      ]"
    ></span>
  </label>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/toggle-switch-input.css";
import { computed } from "vue";

defineOptions({
  name: ComponentName.ToggleSwitch,
});

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  ariaLabel: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
});

interface Emit {
  (e: "update:modelValue", value: boolean): void;
}

const emit = defineEmits<Emit>();

const switchValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const switchState = computed(() => {
  return switchValue.value ? "checked" : "default";
});
</script>
