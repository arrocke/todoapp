/** @jsx jsx */
import { jsx, keyframes } from "@emotion/core";
import { readerOnly } from "../styles";
import { useState, useEffect } from "react";

interface LoadingContainerProps {
  className?: string;
  isLoading: boolean;
}

const spinner = keyframes({
  "0%": {
    transform: "rotate(0deg)"
  },
  "100%": {
    transform: "rotate(360deg)"
  }
});

const LoadingContainer: React.FC<LoadingContainerProps> = ({
  className,
  isLoading,
  children
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
      <div
        css={{
          display: "inline-block",
          width: 64,
          height: 64,
          "::after": {
            content: "' '",
            display: "block",
            width: 46,
            height: 46,
            margin: 1,
            borderRadius: "50%",
            border: "5px solid black",
            borderColor: "black transparent black transparent",
            animation: `${spinner} 1.2s linear infinite`
          }
        }}
      ></div>
    </div>
  );
  return (
    <div className={className}>
      <div css={readerOnly} role="alert" aria-live="assertive">
        {!stall && <p>{isLoading ? "Content Loading" : "Content Loaded"}</p>}
      </div>
      {isLoading ? loader : children}
    </div>
  );
};

export default LoadingContainer;
