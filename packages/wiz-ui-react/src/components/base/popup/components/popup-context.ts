import { ZIndexKeys, SpacingKeys } from "@wizleap-inc/wiz-ui-constants";
import { RefObject, createContext } from "react";

import { Direction } from "../types/direction";

type TPopupContext = {
  isOpen: boolean;
  openPopup: () => void;
  closePopup: () => void;
  triggerRef: RefObject<HTMLDivElement>;

  closeOnBlur?: boolean;
  layer: Exclude<ZIndexKeys, "dialog">;
  gap: SpacingKeys;
  direction: Direction;
  shadow?: boolean;
  animation?: boolean;

  expand?: boolean;
};

export const PopupContext = createContext<TPopupContext | null>(null);
