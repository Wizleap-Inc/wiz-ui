<script setup lang="ts">
import { onMounted } from "vue";

const handleClick = (e: MouseEvent) => {
  e.preventDefault();
  console.log("clicked");
};

onMounted(() => {
  console.log("mounted");
});
</script>

<template>
  <button class="button" @click="handleClick">button</button>
</template>

<style scoped>
.button {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
</style>
