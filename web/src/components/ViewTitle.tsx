/** @jsx jsx */
import { jsx } from "@emotion/core";

const ViewTitle: React.FC = ({ children }) => {
  return (
    <h1
      css={{
        margin: "16px 32px",
        fontSize: "2em",
        fontWeight: "bold"
      }}
    >
      {children}
    </h1>
  );
};

export default ViewTitle;
