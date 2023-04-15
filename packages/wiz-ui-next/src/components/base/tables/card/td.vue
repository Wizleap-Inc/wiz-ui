<template>
  <td :class="styles.cardTdStyle">
    <slot />
  </td>
</template>

<script setup lang="ts">
import { ComponentName } from "@wizleap-inc/wiz-ui-constants";
import * as styles from "@wizleap-inc/wiz-ui-styles/bases/card-table.css";

defineOptions({
  name: ComponentName.CardTd,
});
</script>
