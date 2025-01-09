<template>
  <div
    :class="tooltipStyle"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
    :style="{ width: expand ? '100%' : 'initial' }"
  >
    <WizPopupContainer :expand="expand">
      <slot />
      <WizPopup
        v-if="$slots.content"
        :isOpen="isHover || isOpen"
        :direction="computedDirection"
        :shadow="false"
        :animation="true"
        @onTurn="turnPopup"
        gap="xs2"
        layer="tooltip"
        :isDirectionFixed="isDirectionFixed"
      >
        <div
          :class="[tooltipPositionStyle[actuallyDirection], tooltipPopupStyle]"
        >
          <div :class="tooltipContentStyle">
            <slot name="content" />
          </div>
          <WizIChangeHistory
            :class="[
              tooltipIconStyle,
              tooltipIconDirectionStyle[actuallyDirection],
            ]"
          />
        </div>
      </WizPopup>
    </WizPopupContainer>
  </div>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  tooltipContentStyle,
  tooltipIconDirectionStyle,
  tooltipIconStyle,
  tooltipPopupStyle,
  tooltipPositionStyle,
  tooltipStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/tooltip.css";
import { computed, PropType, ref } from "vue";

import { WizIChangeHistory, WizPopup, WizPopupContainer } from "@/components";

defineOptions({
  name: ComponentName.Tooltip,
});

const props = defineProps({
  direction: {
    type: String as PropType<"top" | "bottom" | "left" | "right">,
    required: false,
    default: "top",
  },
  isOpen: {
    type: Boolean,
    required: false,
    default: false,
  },
  expand: {
    type: Boolean,
    required: false,
    default: false,
  },
  isDirectionFixed: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const isHover = ref(false);
const actuallyDirection = ref(props.direction);

const computedDirection = computed(() => {
  if (props.direction === "top") return "tc";
  if (props.direction === "bottom") return "bc";
  if (props.direction === "left") return "lc";
  if (props.direction === "right") return "rc";
  return "tc";
});

const turnPopup = (direction: string) => {
  if (direction[0] === "t") actuallyDirection.value = "top";
  if (direction[0] === "b") actuallyDirection.value = "bottom";
  if (direction[0] === "l") actuallyDirection.value = "left";
  if (direction[0] === "r") actuallyDirection.value = "right";
};
</script>
