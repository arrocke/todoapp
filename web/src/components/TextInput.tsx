/** @jsx jsx */
import { jsx } from "@emotion/core";
import { InputHTMLAttributes } from "react";

const TextInput: React.FC<InputHTMLAttributes<HTMLInputElement>> = props => {
  return (
    <input
      {...props}
      css={{
        fontSize: "1rem",
        padding: "0 12px",
        border: "1px solid #9ca1b1",
        borderRadius: 8,
        height: 44,
        lineHeight: "44px",
        "&:focus": {
          boxShadow: "0 0 0 1px #9ca1b1",
          outline: "none"
        }
      }}
    />
  );
};

export default TextInput;
