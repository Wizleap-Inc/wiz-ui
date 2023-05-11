export const fadeAnimation = {
  open: (target: HTMLDivElement, open: () => void) => {
    open();
    target.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 200,
      easing: "ease-in-out",
      fill: "forwards",
    });
  },
  close: (target: HTMLDivElement, close: () => void) => {
    const anime = target.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: 200,
      fill: "forwards",
      easing: "ease-in-out",
    });
    anime.onfinish = () => {
      close();
    };
  },
};
