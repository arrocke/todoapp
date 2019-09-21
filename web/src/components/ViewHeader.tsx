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
        margin: "16px 32px"
      }}
    >
      {children}
    </div>
  );
};

export default ViewHeader;
