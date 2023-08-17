<template>
  <table
    :class="[
      isSafari ? cardTableOnSafariStyle : cardTableStyle,
      fixed && cardTableFixedStyle,
    ]"
    :style="{ width }"
  >
    <slot />
  </table>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import {
  cardTableStyle,
  cardTableFixedStyle,
  cardTableOnSafariStyle,
} from "@wizleap-inc/wiz-ui-styles/bases/card-table.css";

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
