import { SpacingKeys } from "@wizleap-inc/wiz-ui-constants";

import { DirectionKeys } from "../types/direction";

export type Pattern = {
  direction: DirectionKeys;
  gap?: SpacingKeys;
};

export const popupContentStyle = {
  padding: "16px",
  backgroundColor: "white",
  borderRadius: "4px",
};
