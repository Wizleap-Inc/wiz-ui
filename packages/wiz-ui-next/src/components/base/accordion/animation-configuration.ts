export const ANIMATION_CONFIGURATION = {
  duration: 400,
  easing: "ease-out",
};

export const closingAnimationKeyframes = (content: HTMLElement) => [
  {
    height: content.offsetHeight + "px",
    opacity: 1,
  },
  {
    height: 0,
    opacity: 1,
  },
];

export const openingAnimationKeyframes = (content: HTMLElement) => [
  {
    height: 0,
    opacity: 1,
  },
  {
    height: content.offsetHeight + "px",
    opacity: 1,
  },
];
