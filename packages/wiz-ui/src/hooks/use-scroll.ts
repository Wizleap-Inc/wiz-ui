import { onMounted, onBeforeUnmount } from "vue";

export const useScroll = (cb: (event: Event) => void) => {
  onMounted(() => {
    window.addEventListener("scroll", cb);
  });
  onBeforeUnmount(() => {
    window.removeEventListener("scroll", cb);
  });
};
