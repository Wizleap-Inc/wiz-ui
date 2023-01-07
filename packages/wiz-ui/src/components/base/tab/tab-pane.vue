<template>
  <div
    :class="[tabPaneStyle, tabPaneVariantStyle[variant]]"
    :style="{ width }"
    @click="onClick"
  >
    <span :class="tabPaneLabelStyle">{{ label }}</span>
    <span v-if="notificationCount" :class="tabPaneNotificationStyle">{{
      notificationCount
    }}</span>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  tabPaneStyle,
  tabPaneVariantStyle,
  tabPaneLabelStyle,
  tabPaneNotificationStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/tab.css";
import { computed } from "vue";

defineOptions({
  name: ComponentName.TabPane,
});

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: false,
  },
  disabled: {
    type: Boolean,
    required: false,
  },
  notificationCount: {
    type: Number,
    required: false,
  },
  width: {
    type: String,
    required: false,
    default: "100%",
  },
});

interface Emits {
  (event: "click"): void;
}

const emit = defineEmits<Emits>();

const onClick = () => props.disabled || emit("click");
const variant = computed(() => {
  if (props.disabled) return "disabled";
  if (props.active) return "active";
  return "default";
});
</script>
