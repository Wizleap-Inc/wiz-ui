import { SpacingKeys } from "@wizleap-inc/wiz-ui-constants";

import { DirectionKey } from "../types/direction";

export type Pattern = {
  direction: DirectionKey;
  gap?: Exclude<SpacingKeys, "at">;
};

export const popupContentStyle = {
  padding: "16px",
  backgroundColor: "white",
  borderRadius: "4px",
};
