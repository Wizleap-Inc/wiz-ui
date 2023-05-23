import { SpacingKeys } from "@wizleap-inc/wiz-ui-constants";

import { DirectionKey } from "../types/direction";

export type Pattern = {
  direction: DirectionKey;
  gap?: SpacingKeys;
};

export const popupContentStyle = {
  padding: "16px",
  backgroundColor: "white",
  borderRadius: "4px",
};
