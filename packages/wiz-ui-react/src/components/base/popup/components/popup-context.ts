import { RefObject, createContext } from "react";

import { Direction } from "../types/direction";

type TPopupContext = {
  isOpen: boolean;
  openPopup: () => void;
  closePopup: () => void;
  triggerRef: RefObject<HTMLDivElement>;
  placement: Direction;
};

export const PopupContext = createContext<TPopupContext | null>(null);
