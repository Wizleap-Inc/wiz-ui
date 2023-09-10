<template>
  <table
    :class="[
      isSafari ? styles.cardTableOnSafariStyle : styles.cardTableStyle,
      fixed && styles.cardTableFixedStyle,
    ]"
    :style="{ width }"
  >
    <slot />
  </table>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/card-table.css";

import { useIsSafari } from "./hooks/use-is-safari";

defineOptions({
  name: ComponentName.CardTable,
});

defineProps({
  fixed: {
    type: Boolean,
    required: false,
    default: false,
  },
  width: {
    type: String,
    required: false,
  },
});

const isSafari = useIsSafari();
</script>
