import { ReactNode, useEffect, useState } from "react";
import ReactDOM, { unmountComponentAtNode } from "react-dom";

type Props = {
  children: ReactNode;
};

export const usePortal = (el: Element) => {
  const [portal, setPortal] = useState<{
    render: (props: Props) => void;
    remove: () => void;
  }>();

  const createPortal = (el: Element) => {
    const Portal = (props: Props) => {
      ReactDOM.createPortal(props.children, el);
    };
    const remove = () => {
      unmountComponentAtNode(el);
    };
    return {
      render: Portal,
      remove,
    };
  };

  useEffect(() => {
    if (el && portal) portal.remove();
    const newPortal = createPortal(el);
    setPortal(newPortal);
    return () => {
      newPortal.remove();
    };
  }, [el]);
};
