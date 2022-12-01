import { onMounted, onBeforeUnmount, watch, Ref } from "vue";
import { Vue } from "vue/types/vue";

export const useClickOutside = (
  elementRef: Ref<HTMLElement | Vue | undefined>,
  cb: (event: MouseEvent) => void
) => {
  let el: HTMLElement | Vue | undefined = undefined;
  const handleDocumentClick = (event: Event) => {
    if (!(event instanceof MouseEvent)) return;

    if (el) {
      let htmlElement: Element | undefined = undefined;

      if ("$el" in el) {
        htmlElement = el.$el;
      } else {
        htmlElement = el;
      }

      if (htmlElement.contains(event.target as Node) === false) {
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
