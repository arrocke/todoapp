/** @jsx jsx */
import { jsx } from "@emotion/core";
import { readerOnly } from "../styles";

interface ProgressMarkerProps {
  color: string;
  progress: number;
  label: string;
}

const ProgressMarker: React.FC<ProgressMarkerProps> = ({
  color,
  progress,
  label
}) => {
  return (
    <div
      css={{
        width: `${progress * 100}%`,
        backgroundColor: color,
        height: 8,
        "&:last-of-type": {
          borderRadius: "0 4px 4px 0"
        }
      }}
    >
      <span css={readerOnly}>
        {`${label} ${((progress || 0) * 100).toFixed(0)}%`}
      </span>
    </div>
  );
};

interface ProgressBarProps {
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ className, children }) => {
  return (
    <div
      className={className}
      css={{
        height: 8,
        borderRadius: 6,
        position: "relative",
        backgroundColor: "#e8e8e8",
        flexGrow: 1,
        overflow: "hidden",
        display: "flex"
      }}
    >
      {children}
    </div>
  );
};

export { ProgressMarker };
export default ProgressBar;
