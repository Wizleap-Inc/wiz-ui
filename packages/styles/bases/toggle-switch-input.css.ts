import { style } from "@vanilla-extract/css";
import { THEME } from "@wizleap-inc/wiz-ui-constants";

// const colorGreen800 = THEME.color.green["800"];
// const colorWhite800 = THEME.color.white["800"];
// const spacingXs2 = THEME.spacing.xs2;
// const spacingLg = THEME.spacing.lg;
// const spacingXl = THEME.spacing.xl;
// const spacingXl3 = THEME.spacing.xl3;
// const spacingMax = THEME.spacing.max;
// </script>

// <style lang="scss" scoped>
// $border-width: 1px;
// $switch-width: v-bind(spacingXl3);
// $switch-height: v-bind(spacingLg);

// .wiz-toggle-switch {
//   position: relative;
//   display: inline-block;
//   width: $switch-width;
//   height: $switch-height;

//   &__input {
//     opacity: 0;
//     width: 0;
//     height: 0;

//     &:checked + .wiz-toggle-switch__slider:before {
//       -webkit-transform: translateX(
//         calc(
//           $switch-width - calc((v-bind(spacingXs2) + $border-width) * 2) -
//             calc($switch-width / 3)
//         )
//       );
//       -ms-transform: translateX(
//         calc(
//           $switch-width - calc((v-bind(spacingXs2) + $border-width) * 2) -
//             calc($switch-width / 3)
//         )
//       );
//       transform: translateX(
//         calc(
//           $switch-width - calc((v-bind(spacingXs2) + $border-width) * 2) -
//             calc($switch-width / 3)
//         )
//       );
//     }
//   }

//   &__slider {
//     position: absolute;
//     cursor: pointer;
//     top: 0;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     background-color: v-bind(colorWhite800);
//     border: $border-width solid v-bind(colorGreen800);
//     border-radius: v-bind(spacingXl);
//     box-sizing: border-box;

//     &:before {
//       position: absolute;
//       content: "";
//       height: calc($switch-width / 3);
//       width: calc($switch-width / 3);
//       top: calc(
//         (calc($switch-height - $border-width * 2) - calc($switch-width / 3)) / 2
//       );
//       left: v-bind(spacingXs2);
//       background-color: v-bind(colorGreen800);
//       border-radius: v-bind(spacingMax);
//       -webkit-transition: 0.4s;
//       transition: 0.4s;
//     }
//   }
// }
// </style>

const borderWidth = "1px";
const switchWidth = THEME.spacing.xl3;
const switchHeight = THEME.spacing.lg;

export const toggleSwitchStyle = style({
  position: "relative",
  display: "inline-block",
  width: switchWidth,
  height: switchHeight,
});

export const toggleSwitchInputStyle = style({
  opacity: 0,
  width: 0,
  height: 0,
});

export const toggleSwitchSliderStyle = style({
  position: "absolute",
  cursor: "pointer",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: THEME.color.white["800"],
  border: `${borderWidth} solid ${THEME.color.green["800"]}`,
  borderRadius: THEME.spacing.xl,
  boxSizing: "border-box",
  ":before": {
    position: "absolute",
    content: '""',
    height: `calc(${switchWidth} / 3)`,
    width: `calc(${switchWidth} / 3)`,
    top: `calc((${switchHeight} - ${borderWidth} * 2 - calc(${switchWidth} / 3)) / 2)`,
    left: THEME.spacing.xs2,
    backgroundColor: THEME.color.green["800"],
    borderRadius: THEME.spacing.max,
    transition: "0.4s",
  },
});

export const toggleSwitchSliderCheckedStyle = style({
  ":before": {
    WebkitTransform: `translateX(calc(${switchWidth} - calc((${THEME.spacing.xs2} + ${borderWidth}) * 2) - calc(${switchWidth} / 3)))`,
    msTransform: `translateX(calc(${switchWidth} - calc((${THEME.spacing.xs2} + ${borderWidth}) * 2) - calc(${switchWidth} / 3)))`,
    transform: `translateX(calc(${switchWidth} - calc((${THEME.spacing.xs2} + ${borderWidth}) * 2) - calc(${switchWidth} / 3)))`,
  },
});
