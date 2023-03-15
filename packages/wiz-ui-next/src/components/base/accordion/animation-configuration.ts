export const animationConfiguration = {
  duration: 400,
  easing: "ease-out",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const closingAnimationKeyframes = (content: any) => [
  {
    height: content.offsetHeight + "px",
    opacity: 1,
  },
  {
    height: 0,
    opacity: 0,
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const openingAnimationKeyframes = (content: any) => [
  {
    height: 0,
    opacity: 0,
  },
  {
    height: content.offsetHeight + "px",
    opacity: 1,
  },
];
