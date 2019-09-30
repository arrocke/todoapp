/** @jsx jsx */
import { jsx } from "@emotion/core";
import { LabelHTMLAttributes } from "react";

const FormLabel: React.FC<LabelHTMLAttributes<HTMLLabelElement>> = props => {
  return (
    <label
      {...props}
      css={{
        height: 46,
        lineHeight: "46px"
      }}
    />
  );
};

export default FormLabel;
