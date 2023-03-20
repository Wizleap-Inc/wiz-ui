export const ANIMATION_CONFIGURATION = {
  duration: 400,
  easing: "ease-out",
};

export const closingAnimationKeyframes = (content: HTMLElement) => [
  {
    height: `${content.getBoundingClientRect().height}px`,
  },
  {
    height: 0,
  },
];

export const openingAnimationKeyframes = (content: HTMLElement) => [
  {
    height: 0,
  },
  {
    height: `${content.getBoundingClientRect().height}px`,
  },
];
