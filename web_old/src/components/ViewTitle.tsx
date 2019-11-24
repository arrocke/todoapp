/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useState, useRef, useEffect } from "react";
import Icon from "./Icon";

interface ViewTitleProps {
  title?: string;
  placeholder?: string;
  onChange?(title?: string): void;
}

const ViewTitle: React.FC<ViewTitleProps> = ({
  title,
  onChange,
  placeholder
}) => {
  const input = useRef<HTMLInputElement>(null);
  const timeout = useRef<number>();
  const [mutableTitle, setTitle] = useState(title);
  const [isFocused, setFocus] = useState(false);

  const canEdit = !!onChange;

  useEffect(() => {
    setTitle(title);
  }, [title]);

  function onFocus() {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    setFocus(true && canEdit);
  }

  function onBlur() {
    timeout.current = setTimeout(() => setFocus(false));
  }

  return (
    <form
      css={{
        flexGrow: 1,
        display: "flex",
        alignItems: "center"
      }}
      onSubmit={e => {
        e.preventDefault();
        onChange && mutableTitle !== title && onChange(mutableTitle);
        setFocus(false);
        input.current && input.current.blur();
      }}
      onKeyDown={e => {
        if (e.key === "Escape") {
          setFocus(false);
          input.current && input.current.blur();
        }
      }}
      onClick={() => {
        if (!isFocused) {
          setFocus(true && canEdit);
          input.current && input.current.focus();
        }
      }}
    >
      <h1
        css={{
          fontSize: "2em",
          margin: 0,
          flexGrow: 1
        }}
      >
        <input
          name="title"
          placeholder={placeholder || "Enter title..."}
          ref={input}
          css={{
            boxSizing: "border-box",
            width: "100%",
            fontSize: "1em",
            fontWeight: "bold",
            padding: "4px 12px",
            borderRadius: 8,
            border: "2px solid transparent",
            ...(isFocused && {
              borderColor: "black"
            }),
            "&:focus": {
              zIndex: 1,
              position: "relative",
              boxShadow: "0 0 0 1px black",
              outline: 0
            },
            "&:disabled": {
              color: "inherit",
              backgroundColor: "inherit"
            }
          }}
          disabled={!canEdit}
          value={isFocused ? mutableTitle : title}
          onChange={e => {
            setTitle(e.target.value);
          }}
          aria-label="Title"
          autoComplete="off"
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </h1>
      <Icon
        type="pencil"
        css={{
          flexShrink: 0,
          width: 16,
          height: 16,
          margin: 8,
          ...((isFocused || !canEdit) && {
            display: "none"
          })
        }}
      />
      <button
        type="submit"
        css={{
          flexShrink: 0,
          border: "none",
          backgroundColor: "inherit",
          height: 44,
          width: 44,
          padding: 0,
          ...(!isFocused && {
            display: "none"
          }),
          "&:focus": {
            zIndex: 1,
            position: "relative"
          }
        }}
        onFocus={onFocus}
        onBlur={onBlur}
        aria-label="Save"
      >
        <Icon
          type="check"
          css={{
            width: 20,
            height: 20
          }}
        />
      </button>
      <button
        type="button"
        css={{
          flexShrink: 0,
          border: "none",
          backgroundColor: "inherit",
          height: 44,
          width: 44,
          padding: 0,
          ...(!isFocused && {
            display: "none"
          }),
          "&:focus": {
            zIndex: 1,
            position: "relative"
          }
        }}
        onClick={() => setFocus(false)}
        onFocus={onFocus}
        onBlur={onBlur}
        aria-label="Cancel"
      >
        <Icon
          type="cross"
          css={{
            width: 16,
            height: 16
          }}
        />
      </button>
    </form>
  );
};

export default ViewTitle;
