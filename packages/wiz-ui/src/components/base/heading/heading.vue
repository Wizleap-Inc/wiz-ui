<template>
  <component
    :is="headingHTML"
    :class="[
      headingStyle[level],
      fontSize && fontSizeStyle[fontSize],
      color && colorStyle[color],
    ]"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import {
  ComponentName,
  ColorKeys,
  FontSizeKeys,
} from "@wizleap-inc/wiz-ui-constants";
import { headingStyle } from "@wizleap-inc/wiz-ui-styles/bases/heading.css";
import { colorStyle, fontSizeStyle } from "@wizleap-inc/wiz-ui-styles/commons";
import { computed, withDefaults } from "vue";

defineOptions({
  name: ComponentName.Heading,
});

interface Props {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  color?: ColorKeys;
  fontSize?: FontSizeKeys;
}

const props = withDefaults(defineProps<Props>(), {
  level: 1,
});

const headingHTML = computed(() => `h${props.level}`);
</script>
