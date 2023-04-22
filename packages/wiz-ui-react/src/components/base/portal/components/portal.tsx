import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { PORTAL_ID } from "@/constants/id";

type Props = {
  children: ReactNode;
};

const _Portal = ({ children }: Props) => {
  const mount = useRef(document.getElementById(PORTAL_ID));
  const el = useRef(document.createElement("div"));

  useEffect(() => {
    const mountNode = mount.current;
    const elNode = el.current;

    if (!mountNode || !elNode) return;

    mountNode.appendChild(elNode);

    return () => {
      mountNode.removeChild(elNode);
    };
  }, [mount]);

  return createPortal(children, el.current);
};

export const WizPortal = _Portal;
