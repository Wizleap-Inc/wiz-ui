<template>
  <teleport to="body">
    <div
      ref="containerRef"
      :class="styles.drawerContainerStyle"
      :style="{
        top: offsetTop,
        bottom: 0,
        display: isActuallyOpen ? undefined : 'none',
      }"
    >
      <div :class="styles.drawerContainerItemsStyle">
        <slot />
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/drawer.css";
import { ref, watch } from "vue";

defineOptions({
  name: ComponentName.Drawer,
});

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  /**
   * オフセットを指定してdrawerの高さを調整します。
   * @type {string}
   * @default 0px
   * @example THEME.share.HEADER_HEIGHT
   */
  offsetTop: {
    type: String,
    required: false,
    default: "0px",
  },
});

const containerRef = ref<HTMLElement | null>(null);

const isActuallyOpen = ref<boolean>(props.isOpen);
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
