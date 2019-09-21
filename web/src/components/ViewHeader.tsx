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
        margin: 16
      }}
    >
      {children}
    </div>
  );
};

export default ViewHeader;
