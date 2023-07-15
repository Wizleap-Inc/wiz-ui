<template>
  <div
    ref="containerRef"
    :class="navigationContainerStyle"
    :style="{
      position: 'absolute',
      width: '100%',
      display: isActuallyOpen ? undefined : 'none',
    }"
  >
    <div :class="navigationContainerItemsStyle">
      <slot />
    </div>
    <div v-if="slots.footer" :class="navigationContainerFooterStyle">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  navigationContainerFooterStyle,
  navigationContainerItemsStyle,
  navigationContainerStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/navigation.css";
import { ref, useSlots, watch } from "vue";

defineOptions({
  name: ComponentName.NavigationContainer,
});

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const slots = useSlots();
const containerRef = ref<HTMLElement | null>(null);
const isActuallyOpen = ref<boolean>(false);
watch(props, () => {
  if (props.isOpen) {
    // move in animation
    isActuallyOpen.value = true;
    containerRef.value?.animate(
      [
        {
          transform: "translateX(-100vw)",
        },
        {
          transform: "translateX(0)",
        },
      ],
      {
        duration: 300,
        easing: "ease",
        fill: "forwards",
      }
    );
  } else {
    // move out animation
    const animation = containerRef.value?.animate(
      [
        {
          transform: "translateX(0)",
        },
        {
          transform: "translateX(-100vw)",
        },
      ],
      {
        duration: 300,
        easing: "ease",
        fill: "forwards",
      }
    );
    if (animation)
      animation.onfinish = () => {
        isActuallyOpen.value = false;
      };
  }
});
</script>
