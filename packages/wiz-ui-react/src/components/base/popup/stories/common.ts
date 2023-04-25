import { SpacingKeys } from "@wizleap-inc/wiz-ui-constants";

import { Direction } from "../types/direction";

export type Pattern = {
  direction: Direction;
  gap?: SpacingKeys;
};

export const popupContentStyle = {
  padding: "16px",
  backgroundColor: "white",
  borderRadius: "4px",
};
