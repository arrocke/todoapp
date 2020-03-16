import { ComponentProps } from "react";

const UITextInput: React.FC<ComponentProps<"input">> = ({
  className,
  ...props
}) => (
  <input
    className={`h-10 p-2 border border-gray-900 shadow-inner ${className}`}
    {...props}
  />
);

export default UITextInput;
