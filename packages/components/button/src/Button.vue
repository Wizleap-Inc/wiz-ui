<script setup lang="ts">
import { defineProps, onMounted, toRefs } from "vue";

interface Props {
  logText: string;
}

const props = defineProps<Props>();

const { logText } = toRefs(props);

const handleClick = (e: MouseEvent) => {
  e.preventDefault();
  console.log("clicked");
  console.log(logText);
};

onMounted(() => {
  console.log("mounted");
});
</script>

<template>
  <button class="button" @click="handleClick">button</button>
</template>

<style lang="scss" scoped>
.button {
  background-color: #111111;
  border-radius: 0.25em;
  border: none;
  color: #ffffff;
  cursor: pointer;
  font-size: 1.5em;
}
</style>
