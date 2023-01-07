<template>
  <label :class="toggleSwitchStyle">
    <input
      :class="toggleSwitchInputStyle"
      type="checkbox"
      v-model="switchValue"
    />
    <span
      :class="[
        toggleSwitchSliderStyle,
        switchValue && toggleSwitchSliderCheckedStyle,
      ]"
    ></span>
  </label>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  toggleSwitchStyle,
  toggleSwitchInputStyle,
  toggleSwitchSliderStyle,
  toggleSwitchSliderCheckedStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/toggle-switch-input.css";
import { computed } from "vue";

defineOptions({
  name: ComponentName.ToggleSwitch,
});

interface Props {
  modelValue: boolean;
}

const props = defineProps<Props>();

interface Emit {
  (e: "update:modelValue", value: boolean): void;
}

const emit = defineEmits<Emit>();

const switchValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>
