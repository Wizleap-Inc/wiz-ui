<template>
  <div
    :class="tooltipStyle"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
  >
    <slot />
    <div
      :class="[tooltipPopupStyle, tooltipPositionStyle[direction]]"
      :style="{
        opacity: isHover || hover ? 1 : 0,
      }"
    >
      <div :class="tooltipContentStyle">
        <slot name="content" />
      </div>
      <WizIChangeHistory
        :class="[tooltipIconStyle, tooltipIconDirectionStyle[direction]]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  tooltipStyle,
  tooltipContentStyle,
  tooltipIconStyle,
  tooltipIconDirectionStyle,
  tooltipPositionStyle,
  tooltipPopupStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/tooltip.css";
import { PropType, ref } from "vue";

import { WizIChangeHistory } from "@/components/icons";

defineOptions({
  name: ComponentName.Tooltip,
});

const isHover = ref(false);

defineProps({
  direction: {
    type: String as PropType<"top" | "bottom" | "left" | "right">,
    required: false,
    default: "top",
  },
  hover: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>
