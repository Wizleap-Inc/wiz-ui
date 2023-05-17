import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type Props = {
  children: ReactNode;
};

const Portal = ({ children }: Props) => {
  const el = useRef(document.createElement("div"));
  useEffect(() => {
    const mount = document.body;
    const elNode = el.current;
    if (!mount || !elNode) return;
    mount.appendChild(elNode);
    return () => {
      mount.removeChild(elNode);
    };
  }, []);

  return createPortal(children, el.current);
};

export const WizPortal = Portal;
