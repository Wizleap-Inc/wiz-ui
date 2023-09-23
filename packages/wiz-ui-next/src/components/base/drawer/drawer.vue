<template>
  <teleport to="body">
    <div
      :class="styles.drawerContainerStyle"
      :style="{
        top: offsetTop,
        bottom: 0,
        display: isActuallyOpen ? undefined : 'none',
      }"
    >
      <div
        ref="containerRef"
        :class="[
          styles.drawerContainerItemsStyle,
          shadow && styles.drawerShadowStyle,
        ]"
        :style="{
          width: width,
          right: place === 'right' ? 0 : undefined,
        }"
      >
        <slot />
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/drawer.css";
import { PropType, ref, watch } from "vue";

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
  /**
   * 左右どちらからスライドインするか指定します。
   * @type {"left" | "right"}
   * @default "left"
   */
  place: {
    type: String as PropType<"left" | "right">,
    required: false,
    default: "left",
  },
  width: {
    type: String,
    required: false,
    default: "100%",
  },
  shadow: {
    type: Boolean,
    required: false,
    default: true,
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
          transform:
            props.place === "left" ? "translateX(-100%)" : "translateX(100%)",
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
          transform:
            props.place === "left" ? "translateX(-100%)" : "translateX(100%)",
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
