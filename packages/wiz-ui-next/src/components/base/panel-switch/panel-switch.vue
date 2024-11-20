<template>
  <div :class="panelSwitchStyle">
    <label
      v-for="(item, key) in items"
      :key="key"
      :class="[
        panelSwitchBlockStyle,
        key !== items.length - 1 && panelSwitchBlockDividerStyle,
        key === 0 && panelSwitchBlockLeftStyle,
        key === items.length - 1 && panelSwitchBlockRightStyle,
        key === switchValue - 1 && panelSwitchBlockActiveStyle,
        panelSwitchBlockColorStyle[panelSwitchBlockColor(key)],
      ]"
      :for="`panel${key}`"
    >
      {{ item.label }}
      <input
        :class="panelSwitchInputStyle"
        type="radio"
        :id="`panel${key}`"
        :name="`panel${key}`"
        :value="item.value"
        v-model="switchValue"
      />
    </label>
  </div>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  panelSwitchStyle,
  panelSwitchBlockStyle,
  panelSwitchBlockActiveStyle,
  panelSwitchBlockDividerStyle,
  panelSwitchBlockLeftStyle,
  panelSwitchBlockRightStyle,
  panelSwitchBlockColorStyle,
  panelSwitchInputStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/panel-switch-input.css";
import { computed, PropType } from "vue";

import { panelItems } from "./types";

defineOptions({
  name: ComponentName.PanelSwitch,
});

const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
  items: {
    type: Array as PropType<panelItems[]>,
    required: true,
  },
});

interface Emit {
  (e: "update:modelValue", value: number): void;
}

const emit = defineEmits<Emit>();

const switchValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const panelSwitchBlockColor = (key: number) =>
  key === switchValue.value - 1 ? "active" : "default";
</script>
