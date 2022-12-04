<template>
  <label class="wiz-panel-switch">
    <input class="wiz-panel-switch__input" type="radio" v-model="switchValue" />
    <span class="wiz-panel-switch__slider"></span>
  </label>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  value: boolean;
}

const props = defineProps<Props>();

interface Emit {
  (e: "input", value: boolean): void;
}

const emit = defineEmits<Emit>();

const switchValue = computed({
  get: () => props.value,
  set: (value) => emit("input", value),
});
</script>

<style lang="scss" scoped></style>
