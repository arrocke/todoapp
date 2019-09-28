/** @jsx jsx */
import { jsx } from "@emotion/core";
import { readerOnly } from "../styles";
import { useState, useEffect, useLayoutEffect, ReactNode } from "react";
import LoadingSpinner from "./LoadingSpinner";

interface LoadingContainerProps {
  className?: string;
  isLoading: boolean;
  loadingText?: string;
  loadedText?: string;
  children?: () => ReactNode;
}

const LoadingContainer: React.FC<LoadingContainerProps> = ({
  className,
  isLoading,
  children,
  loadingText = "Content Loading",
  loadedText = "Content Loaded"
}) => {
  const [stall, setStall] = useState<boolean>(false);
  const [defer, setDefer] = useState<boolean>(true);

  useEffect(() => {
    setDefer(false);
  }, []);

  useLayoutEffect(() => {
    if (isLoading) {
      setStall(true);
      setTimeout(() => setStall(false), 500);
    }
  }, [isLoading]);

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
        {!defer && <p>{isLoading || stall ? loadingText : loadedText}</p>}
      </div>
      {isLoading || stall ? loader : children && children()}
    </div>
  );
};

export default LoadingContainer;
