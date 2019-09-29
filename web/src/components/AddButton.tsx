/** @jsx jsx */
import { jsx } from "@emotion/core";
import Icon from "./Icon";

const AddButton: React.FC<React.HTMLAttributes<HTMLButtonElement>> = props => {
  return (
    <button
      {...props}
      type="button"
      css={{
        zIndex: 10,
        position: "absolute",
        margin: 26,
        borderRadius: "100%",
        width: 56,
        height: 56,
        padding: 0,
        border: "none",
        background: "red",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        right: 0,
        bottom: 0,
        boxShadow: "1px 1px 3px 1px rgb(0, 0, 0, 0.5)"
      }}
    >
      <Icon
        type="plus"
        css={{
          width: 24,
          height: 24,
          fill: "white"
        }}
      />
    </button>
  );
};

export default AddButton;
