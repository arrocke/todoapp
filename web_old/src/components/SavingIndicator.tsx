/** @jsx jsx */
import { jsx } from "@emotion/core";
import LoadingSpinner from "./LoadingSpinner";
import { useState, useLayoutEffect } from "react";
import { readerOnly } from "../styles";

interface SavingIndicatorProps {
  saving?: boolean;
  savingText?: string;
  savedText?: string;
}

const SavingIndicator: React.FC<SavingIndicatorProps> = ({
  saving,
  savingText = "Saving",
  savedText = "Saved"
}) => {
  const [stall, setStall] = useState(false);

  useLayoutEffect(() => {
    if (saving) {
      setStall(true);
      setTimeout(() => setStall(false), 500);
    }
  }, [saving]);

  return (
    <div>
      <div css={readerOnly} role="alert" aria-live="assertive">
        <p>{saving || stall ? savingText : savedText}</p>
      </div>
      <LoadingSpinner
        css={{
          flexShrink: 0,
          display: saving || stall ? "block" : "none",
          margin: "0 8px"
        }}
        size="small"
      />
    </div>
  );
};

export default SavingIndicator;
