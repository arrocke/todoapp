import { Interpolation } from "@emotion/css";

export const breakpoints = {
  medium: "@media (min-width: 768px)"
};

export const readerOnly: Interpolation = {
  border: 0,
  clip: "rect(0 0 0 0)",
  height: 1,
  margin: -1,
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  width: 1
};
