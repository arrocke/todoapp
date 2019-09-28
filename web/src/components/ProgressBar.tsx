/** @jsx jsx */
import { jsx } from "@emotion/core";

interface ProgressMarkerProps {
  color: string;
  progress: number;
}

const ProgressMarker: React.FC<ProgressMarkerProps> = ({ color, progress }) => {
  return (
    <div
      css={{
        width: `${progress * 100}%`,
        backgroundColor: color,
        position: "absolute",
        borderRadius: 4,
        height: 8
      }}
    />
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
        flexGrow: 1
      }}
    >
      {children}
    </div>
  );
};

export { ProgressMarker };
export default ProgressBar;
