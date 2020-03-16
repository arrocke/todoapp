import { ComponentProps } from "react";

const UITextInput: React.FC<ComponentProps<"button">> = ({
  className,
  type = "button",
  ...props
}) => (
  <button
    type={type}
    className={`h-10 py-2 px-4 bg-gray-900 text-white font-bold ${className}`}
    {...props}
  />
);

export default UITextInput;
