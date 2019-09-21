/** @jsx jsx */
import { jsx } from "@emotion/core";

interface ViewTitleProps {
  title?: string;
}

const ViewTitle: React.FC<ViewTitleProps> = ({ title, children }) => {
  return (
    <h1
      css={{
        margin: 0,
        fontSize: "2em",
        fontWeight: "bold"
      }}
    >
      {title}
    </h1>
  );
};

export default ViewTitle;
