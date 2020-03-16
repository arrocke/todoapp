import { ComponentProps } from "react";

const UILabel: React.FC<ComponentProps<"label">> = ({
  className,
  ...props
}) => (
  <label
    className={`font-bold text-base inline-block ${className}`}
    {...props}
  />
);

export default UILabel;
