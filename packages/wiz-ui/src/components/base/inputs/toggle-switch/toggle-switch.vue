<template>
  <label :class="toggleSwitchStyle">
    <input
      :class="toggleSwitchInputStyle"
      type="checkbox"
      :area-label="label"
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
