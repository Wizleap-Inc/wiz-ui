<template>
  <div :class="styles.searchInputTagStyle">{{ label }}</div>
</template>

<script setup lang="ts">
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/search-input.css";

import { ComponentName } from "@/index";
defineOptions({
  name: ComponentName.SearchInputTag,
});
defineProps({
  label: {
    type: String,
    required: true,
  },
});
</script>
