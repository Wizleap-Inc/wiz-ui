<template>
  <button
    :style="computedStyle"
    @click="onClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed, withDefaults } from "vue";
import { CSSProperties } from "vue/types/jsx";

import { THEME } from "@/constants/styles";
import { SPACING_MAP } from "@/constants/styles/spacing";

interface Props {
  variant?: "primary" | "sub";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  rounded?: boolean;
}

interface Emits {
  (e: "click"): void;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  disabled: false,
  rounded: false,
});

const emit = defineEmits<Emits>();

const onClick = () => {
  if (!props.disabled) emit("click");
};

const round = () =>  props.rounded ? "9999px" : "0.25rem"
const background = () => {
  if (props.variant === "primary")  return THEME.color.gradient
  if (props.variant === "sub") return THEME.color.white[800]
}
const color = () => {
  if (props.variant === "primary") return THEME.color.white[800]
  if (props.variant === "sub") return THEME.color.green["800"]
}
const shadow = () => {
  if (props.variant === "primary") return THEME.shadow.md
  if (props.variant === "sub") return THEME.shadow.none
}
const border = () => {
  if (props.variant === "sub") return `1px solid ${THEME.color.gray["400"]}`
  return "none"
}
const fontSize = () => {
  if (props.size === "sm") return THEME.fontSize.xs
  if (props.size === "md") return THEME.fontSize.sm
  if (props.size === "lg") return THEME.fontSize.md
}
const computedStyle = computed<CSSProperties>(() => {
  return {
    width: "100%",
    padding: `${SPACING_MAP["sm"]} ${SPACING_MAP["xl"]}`,
    fontWeight: "bold",
    fontSize: fontSize(),
    background: background(),
    color: color(),
    boxShadow: shadow(),
    borderRadius: round(),
    border: border(),
    cursor: props.disabled ? "not-allowed" : "pointer",
    opacity: props.disabled ? 0.5 : 1,
  };
});
</script>

