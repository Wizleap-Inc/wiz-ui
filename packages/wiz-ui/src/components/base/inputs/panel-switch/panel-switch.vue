<template>
  <div :class="styles.panelSwitchStyle">
    <label
      v-for="(item, key) in items"
      :key="key"
      :class="[
        styles.panelSwitchBlockStyle,
        key !== items.length - 1 && styles.panelSwitchBlockDividerStyle,
        key === 0 && styles.panelSwitchBlockLeftStyle,
        key === items.length - 1 && styles.panelSwitchBlockRightStyle,
        key === switchValue - 1 && styles.panelSwitchBlockActiveStyle,
        styles.panelSwitchBlockColorStyle[panelSwitchBlockColor(key)],
      ]"
      :for="`panel${key}`"
    >
      {{ item.label }}
      <input
        :class="styles.panelSwitchInputStyle"
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
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/panel-switch-input.css";
import { computed, PropType } from "vue";

import { panelItems } from "./types";

defineOptions({
  name: ComponentName.PanelSwitch,
});

const props = defineProps({
  value: {
    type: Number,
    required: true,
  },
  items: {
    type: Array as PropType<panelItems[]>,
    required: true,
  },
});

interface Emit {
  (e: "input", value: number): void;
}

const emit = defineEmits<Emit>();

const switchValue = computed({
  get: () => props.value,
  set: (value) => emit("input", value),
});

const panelSwitchBlockColor = (key: number) =>
  key === switchValue.value - 1 ? "active" : "default";
</script>
