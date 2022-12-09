<template>
  <table class="wiz-flat-table">
    <slot />
  </table>
</template>

<script setup lang="ts">
import { ComponentName } from "@/constants/component/name";

defineOptions({
  name: ComponentName.FlatTable,
});
</script>

<style lang="scss" scoped>
.wiz-flat-table {
  border-spacing: 0;
}
</style>
