<template>
  <table class="wiz-unstyled-table">
    <slot />
  </table>
</template>

<script setup lang="ts">
import {
  ComponentName,
  SpacingKeys,
  getSpacingCss,
} from "@wizleap-inc/wiz-ui-constants";
import { computed } from "vue";

defineOptions({
  name: ComponentName.UnstyledTable,
});

interface Props {
  space?: SpacingKeys;
}

const props = withDefaults(defineProps<Props>(), {
  space: "no",
});

const computedSpace = computed(() => getSpacingCss(props.space));
</script>

<style lang="scss" scoped>
.wiz-unstyled-table {
  border-spacing: v-bind(computedSpace);
}
</style>
