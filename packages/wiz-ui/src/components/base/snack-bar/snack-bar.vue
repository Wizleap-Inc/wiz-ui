<template>
  <transition>
    <div v-if="visible" :class="[]">
      <slot />
    </div>
  </transition>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const props = defineProps({
  duration: {
    type: Number,
    required: false,
    default: 4500,
  },
});

const visible = ref(false);

// watch(props, () => {
//   visible.value = true;
//   setTimeout(() => {
//     visible.value = false;
//   }, props.duration);
// });

onMounted(() => {
  visible.value = true;
  setTimeout(() => {
    visible.value = false;
  }, props.duration);
});
</script>
