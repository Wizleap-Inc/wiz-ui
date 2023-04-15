<template>
  <div
    :class="styles.tooltipStyle"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
  >
    <WizPopupContainer :expand="expand">
      <slot />
      <WizPopup
        v-if="$slots.content"
        :isOpen="isHover || hover"
        :direction="computedDirection"
        :shadow="false"
        :animation="true"
        @onTurn="turnPopup"
        gap="xs"
      >
        <div
          :class="[
            styles.tooltipPositionStyle[actuallyDirection],
            styles.tooltipPopupStyle,
          ]"
        >
          <div :class="styles.tooltipContentStyle">
            <slot name="content" />
          </div>
          <WizIChangeHistory
            :class="[
              styles.tooltipIconStyle,
              styles.tooltipIconDirectionStyle[actuallyDirection],
            ]"
          />
        </div>
      </WizPopup>
    </WizPopupContainer>
  </div>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/tooltip.css";
import { PropType, ref, computed } from "vue";

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
  hover: {
    type: Boolean,
    required: false,
    default: false,
  },
  expand: {
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
