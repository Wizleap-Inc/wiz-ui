<template>
  <div
    :class="navigationContentStyle"
    :style="{ marginLeft: computedMarginLeft }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import { navigationContentStyle } from "@wizleap-inc/wiz-ui-styles/bases/navigation.css";
import { computed } from "vue";

defineOptions({
  name: ComponentName.NavigationContent,
});

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const computedMarginLeft = computed(() => (props.isOpen ? "181px" : "61px"));
</script>
