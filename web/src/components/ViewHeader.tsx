/** @jsx jsx */
import { jsx } from "@emotion/core";

interface ViewHeaderProps {
  className?: string;
}

const ViewHeader: React.FC<ViewHeaderProps> = ({ className, children }) => {
  return (
    <div
      className={className}
      css={{
        margin: 16,
        display: "flex",
        alignItems: "center"
      }}
    >
      {children}
    </div>
  );
};

export default ViewHeader;
