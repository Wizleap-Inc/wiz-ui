import { DirectionValue } from "../types/direction";

export const createDirectionValue = ({
  first,
  second,
}:
  | {
      first: "b" | "t";
      second: "l" | "c" | "r";
    }
  | {
      first: "l" | "r";
      second: "t" | "c" | "b";
    }) => {
  return `${first}${second}` as DirectionValue;
};
