import { onMounted, onBeforeUnmount, watch, Ref } from "vue";

export const useClickOutside = (
  elementRef: Ref<HTMLElement | undefined>,
  cb: (event: MouseEvent) => void
) => {
  let el: HTMLElement | undefined = undefined;
  const handleDocumentClick = (event: Event) => {
    if (!(event instanceof MouseEvent)) return;

    if (el) {
      if (el.contains(event.target as Node) === false) {
        cb(event);
      }
    }
  };

  watch(elementRef, () => (el = elementRef.value));

  onMounted(() => {
    document.addEventListener("mousedown", handleDocumentClick);
    document.addEventListener("touchstart", handleDocumentClick);
  });

  onBeforeUnmount(() => {
    document.removeEventListener("mousedown", handleDocumentClick);
    document.removeEventListener("touchstart", handleDocumentClick);
  });
};
