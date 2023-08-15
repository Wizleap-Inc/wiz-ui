import { CSSProperties } from "react";

export const absolutePositions: CSSProperties[] = [
  {
    top: "0px",
    left: "0px",
    bottom: "initial",
    right: "initial",
    transform: "initial",
  },
  {
    top: "0px",
    left: "initial",
    bottom: "initial",
    right: "0px",
    transform: "initial",
  },
  {
    top: "initial",
    left: "0px",
    bottom: "0px",
    right: "initial",
    transform: "initial",
  },
  {
    top: "initial",
    left: "initial",
    bottom: "0px",
    right: "0px",
    transform: "initial",
  },
  {
    top: "50%",
    left: "50%",
    bottom: "initial",
    right: "initial",
    transform: "translate(-50%, -50%)",
  },
  {
    top: "50%",
    left: "0px",
    bottom: "initial",
    right: "initial",
    transform: "translate(0%, -50%)",
  },
  {
    top: "50%",
    left: "initial",
    bottom: "initial",
    right: "0px",
    transform: "translate(0%, -50%)",
  },
  {
    top: "0px",
    left: "50%",
    bottom: "initial",
    right: "initial",
    transform: "translate(-50%, 0%)",
  },
  {
    top: "initial",
    left: "50%",
    bottom: "0px",
    right: "initial",
    transform: "translate(-50%, 0%)",
  },
];
