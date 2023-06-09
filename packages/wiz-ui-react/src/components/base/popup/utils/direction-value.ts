import { DirectionValue } from "../types/direction";

export const createDirectionValue = ({
  first,
  second,
}:
  | {
      first: "bottom" | "top";
      second: "Left" | "Center" | "Right";
    }
  | {
      first: "left" | "right";
      second: "Top" | "Center" | "Bottom";
    }) => {
  return `${first}${second}` as DirectionValue;
};
