import { onMounted, onBeforeUnmount, Ref } from "vue";

export const useClickOutside = (
  elementRef: Ref<HTMLElement | undefined>,
  cb: (event: MouseEvent) => void
) => {
  const handleDocumentClick = (event: Event) => {
    if (!(event instanceof MouseEvent)) return;

    if (elementRef.value && !elementRef.value.contains(event.target as Node)) {
      cb(event);
    }
  };

  onMounted(() => {
    document.addEventListener("mousedown", handleDocumentClick);
    document.addEventListener("touchstart", handleDocumentClick);
  });

  onBeforeUnmount(() => {
    document.removeEventListener("mousedown", handleDocumentClick);
    document.removeEventListener("touchstart", handleDocumentClick);
  });
};
