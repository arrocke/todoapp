/** @jsx jsx */
import { jsx, keyframes } from "@emotion/core";

interface LoadingSpinnerProps {
  className?: string;
  size?: "large" | "small";
}

const spinner = keyframes({
  "0%": {
    transform: "rotate(0deg)"
  },
  "100%": {
    transform: "rotate(360deg)"
  }
});

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  className,
  size = "large"
}) => {
  const spinnerSize = size === "large" ? 56 : 20;
  const spinnerWidth = size === "large" ? 5 : 2;
  return (
    <div
      className={className}
      css={{
        display: "inline-block",
        width: spinnerSize,
        height: spinnerSize,
        "::after": {
          content: "' '",
          boxSizing: "border-box",
          display: "block",
          width: spinnerSize,
          height: spinnerSize,
          margin: 1,
          borderRadius: "50%",
          border: `${spinnerWidth}px solid black`,
          borderColor: "black transparent black transparent",
          animation: `${spinner} 1.2s linear infinite`
        }
      }}
      aria-hidden
    />
  );
};

export default LoadingSpinner;
