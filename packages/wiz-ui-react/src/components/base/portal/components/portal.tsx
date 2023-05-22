import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type Props = {
  container: HTMLElement;
  children: ReactNode;
};

const Portal = ({ container, children }: Props) => {
  const el = useRef(document.createElement("div"));
  useEffect(() => {
    const elNode = el.current;
    container.appendChild(elNode);
    return () => {
      container.removeChild(elNode);
    };
  }, [container]);

  return createPortal(children, el.current);
};

export const WizPortal = Portal;
