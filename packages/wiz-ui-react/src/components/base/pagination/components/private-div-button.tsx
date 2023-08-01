import { ComponentProps } from "react";

export const DivButton = ({ onKeyDown, ...props }: ComponentProps<"div">) => {
  return (
    <div
      role="button"
      tabIndex={0}
      {...props}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (e.key === "Enter" || e.key === " ") {
          if (e.target instanceof HTMLElement) {
            e.stopPropagation();
            e.target.click();
          }
        }
      }}
    />
  );
};
