<template>
  <td
    :class="isSafari ? styles.cardTdOnSafariStyle : styles.cardTdStyle"
    :rowSpan="rowSpan"
    :colSpan="colSpan"
  >
    <slot />
  </td>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/card-table.css";

import { useIsSafari } from "./hooks/use-is-safari";

defineOptions({
  name: ComponentName.CardTd,
});

defineProps({
  rowSpan: {
    type: Number,
    required: false,
  },
  colSpan: {
    type: Number,
    required: false,
  },
});

const isSafari = useIsSafari();
</script>
