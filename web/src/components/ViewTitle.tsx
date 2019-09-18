/** @jsx jsx */
import { jsx } from "@emotion/core";
import { breakpoints } from "../styles";

const ViewTitle: React.FC = ({ children }) => {
  return (
    <h1
      css={{
        margin: "16px 28px",
        fontSize: "2em",
        fontWeight: "bold",
        [breakpoints.medium]: {
          margin: "16px 32px"
        }
      }}
    >
      {children}
    </h1>
  );
};

export default ViewTitle;
