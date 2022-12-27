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
      ]"
      :style="{ color: panelSwitchBlockColor(key) }"
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
import { ComponentName, THEME } from "@wizleap-inc/wiz-ui-constants";
import {
  panelSwitchStyle,
  panelSwitchBlockStyle,
  panelSwitchBlockActiveStyle,
  panelSwitchBlockDividerStyle,
  panelSwitchBlockLeftStyle,
  panelSwitchBlockRightStyle,
  panelSwitchInputStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/panel-switch-input.css";
import { computed } from "vue";

import { panelItems } from "./types";

defineOptions({
  name: ComponentName.PanelSwitch,
});

interface Props {
  value: number;
  items: panelItems[];
}

const props = defineProps<Props>();

interface Emit {
  (e: "input", value: number): void;
}

const emit = defineEmits<Emit>();

const switchValue = computed({
  get: () => props.value,
  set: (value) => emit("input", value),
});

const panelSwitchBlockColor = (key: number) =>
  key === switchValue.value - 1
    ? THEME.color.white["800"]
    : THEME.color.gray["600"];
</script>
