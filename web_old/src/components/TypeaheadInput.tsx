/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useState, useRef, useEffect, KeyboardEventHandler } from "react";
import Icon from "./Icon";

interface TypeaheadItem {
  name: string;
  value: any;
}

interface TypeaheadInputProps extends React.HTMLAttributes<HTMLInputElement> {
  items: TypeaheadItem[];
  value: any;
  onChange(value: any): void;
}

let idCounter = 0;

const TypeaheadInput: React.FC<TypeaheadInputProps> = ({
  children,
  items,
  value,
  className,
  onKeyDown = () => {},
  onChange = () => {},
  onFocus = () => {},
  onBlur = () => {},
  "aria-labelledby": ariaLabelledBy,
  "aria-label": ariaLabel,
  ...props
}) => {
  const inputElement = useRef<HTMLInputElement>(null);
  const id = useState(() => idCounter++);
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  const [matchedItems, setMatchedItems] = useState(items);
  const [matchedIndex, setMatchedIndex] = useState(0);

  const setTextFromValue = () => {
    const item = items.find(item => item.value === value);
    if (item) {
      setText(item.name);
    } else {
      setText("");
    }
  };

  // Update text when value changes.
  useEffect(setTextFromValue, [items, value]);

  // Update matched items when text changes.
  useEffect(() => {
    const matcher = new RegExp(`^${text}`);
    setMatchedItems(items.filter(item => matcher.test(item.name)).slice(0, 4));
    setMatchedIndex(0);
  }, [items, text]);

  const cancel = () => {
    setTextFromValue();
    setIsOpen(false);
    inputElement.current && inputElement.current.blur();
  };

  const accept = (index: number = matchedIndex) => {
    const item = matchedItems[matchedIndex];
    if (item && item.value !== value) onChange(item.value);
    setIsOpen(false);
    inputElement.current && inputElement.current.blur();
  };

  // Cycle through the autocomplete options using the arrow keys.
  const _onKeyDown: KeyboardEventHandler<HTMLInputElement> = e => {
    switch (e.key) {
      case "ArrowUp": {
        e.preventDefault();
        if (matchedIndex === 0) {
          setMatchedIndex(Math.max(0, matchedItems.length - 1));
        } else {
          setMatchedIndex(matchedIndex - 1);
        }
        break;
      }
      case "ArrowDown": {
        e.preventDefault();
        if (matchedIndex === Math.max(0, matchedItems.length - 1)) {
          setMatchedIndex(0);
        } else {
          setMatchedIndex(matchedIndex + 1);
        }
        break;
      }
      case "Escape": {
        e.preventDefault();
        cancel();
        break;
      }
      case "Enter": {
        e.preventDefault();
        accept();
        break;
      }
    }
    onKeyDown(e);
  };

  return (
    <div
      className={className}
      css={{
        position: "relative"
      }}
      role="combobox"
      aria-haspopup="listbox"
      aria-owns={`items-${id}`}
      aria-controls={`items-${id}`}
      aria-expanded={isOpen}
    >
      <input
        {...props}
        ref={inputElement}
        value={text}
        onChange={e => {
          setText(e.target.value);
          setIsOpen(true);
        }}
        onFocus={e => {
          setIsOpen(true);
          onFocus(e);
        }}
        onBlur={e => {
          setIsOpen(false);
          onBlur(e);
        }}
        onKeyDown={_onKeyDown}
        css={{
          fontSize: "1rem",
          padding: "0 12px",
          border: "1px solid #9ca1b1",
          borderRadius: 8,
          height: 44,
          lineHeight: "44px",
          width: "calc(100% - 26px)",
          "&:focus": {
            boxShadow: "0 0 0 1px #9ca1b1",
            outline: "none"
          }
        }}
        autoComplete="off"
        aria-labelledby={ariaLabelledBy}
        aria-label={ariaLabel}
        aria-autocomplete="list"
        aria-controls="items"
        aria-activedescendant={
          typeof matchedIndex === "number"
            ? `items-${id}-${matchedIndex}`
            : undefined
        }
      />
      <button
        onClick={() => {
          setText("");
          onChange(null);
          setIsOpen(false);
        }}
        css={{
          position: "absolute",
          right: 0,
          top: 0,
          width: 46,
          height: 46,
          border: "none",
          padding: 0,
          backgroundColor: "inherit"
        }}
      >
        <Icon
          type="cross"
          css={{
            width: 16,
            height: 16
          }}
        />
      </button>
      <ul
        id={`items-${id}`}
        role="listbox"
        aria-labelledby={ariaLabelledBy}
        aria-label={ariaLabel}
        css={{
          display: isOpen ? "block" : "none",
          position: "absolute",
          background: "white",
          width: "calc(100% - 32px)",
          margin: "0 16px",
          padding: 0,
          border: "1px solid #9ca1b1",
          borderTop: "none",
          borderRadius: "0 0 8px 8px",
          maxHeight: 44 * 4,
          overflowX: "auto",
          zIndex: 1
        }}
      >
        {matchedItems.map(({ value, name }, i) => (
          <li
            key={i}
            id={`items-${id}-${i}`}
            role="option"
            css={{
              listStyle: "none",
              height: 44,
              border: "none",
              background: "inherit",
              boxSizing: "border-box",
              margin: 0,
              padding: "0 16px",
              lineHeight: "44px",
              width: "100%",
              textAlign: "left",
              backgroundColor: matchedIndex === i ? "#7fdcf1" : "inherit",
              cursor: "pointer"
            }}
            onMouseDown={() => accept(i)}
            aria-selected={matchedIndex === i}
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TypeaheadInput;
