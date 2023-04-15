<template>
  <label :class="styles.toggleSwitchStyle">
    <input
      :class="styles.toggleSwitchInputStyle"
      type="checkbox"
      :aria-label="label"
      v-model="switchValue"
    />
    <span
      :class="[
        styles.toggleSwitchSliderStyle,
        switchValue && styles.toggleSwitchSliderCheckedStyle,
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
  value: {
    type: Boolean,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});

interface Emit {
  (e: "input", value: boolean): void;
}

const emit = defineEmits<Emit>();

const switchValue = computed({
  get: () => props.value,
  set: (value) => emit("input", value),
});
</script>
