/** @jsx jsx */
import { jsx } from "@emotion/core";
import { readerOnly } from "../styles";
import { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";

interface LoadingContainerProps {
  className?: string;
  isLoading: boolean;
  loadingText?: string;
  loadedText?: string;
}

const LoadingContainer: React.FC<LoadingContainerProps> = ({
  className,
  isLoading,
  children,
  loadingText = "Content Loading",
  loadedText = "Content Loaded"
}) => {
  const [stall, setStall] = useState<boolean>(true);

  useEffect(() => {
    setStall(false);
  }, []);

  const loader = (
    <div
      css={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <LoadingSpinner size="large" />
    </div>
  );
  return (
    <div className={className}>
      <div css={readerOnly} role="alert" aria-live="assertive">
        {!stall && <p>{isLoading ? loadingText : loadedText}</p>}
      </div>
      {isLoading ? loader : children}
    </div>
  );
};

export default LoadingContainer;
