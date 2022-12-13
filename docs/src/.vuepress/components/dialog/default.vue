<template>
  <div>
    <WizTextButton @click="isOpen = true">Open Dialog</WizTextButton>
    <WizDialog v-model="isOpen">
      <template #title> aaa </template>
      <template #content> Hello </template>
    </WizDialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isOpen = ref(false);
</script>
