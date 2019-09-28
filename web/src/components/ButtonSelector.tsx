/** @jsx jsx */
import { jsx } from "@emotion/core";
import React, { Fragment, useState } from "react";

type ButtonSelectorDirection = "vertical" | "horizontal";

interface ButtonSelectorOption {
  title: string;
  value: any;
  name?: string;
  selectedValue?: any;
  onChange?(value: any): void;
  direction?: ButtonSelectorDirection;
}

const ButtonSelectorOption: React.FC<ButtonSelectorOption> = ({
  onChange = () => {},
  value,
  selectedValue,
  name,
  title,
  direction = "vertical"
}) => {
  return (
    <Fragment>
      <input
        key={`${value}-input`}
        id={`${name}-${value}`}
        name={name}
        type="radio"
        css={{
          opacity: 0,
          position: "absolute"
        }}
        value={value}
        checked={selectedValue === value}
        onChange={() => {
          onChange(value);
        }}
      />
      <label
        key={`${value}-label`}
        htmlFor={`${name}-${value}`}
        css={{
          fontSize: 12,
          fontWeight: "bold",
          textAlign: "center",
          height: 44,
          lineHeight: "44px",
          padding: "0 16px",
          border: "solid #9ca1b1",
          borderWidth: direction === "vertical" ? "0 0 1px 0" : "0 1px 0 0",
          "&:first-of-type": {
            borderRadius:
              direction === "vertical" ? "8px 8px 0 0" : "8px 0 0 8px"
          },
          "&:last-of-type": {
            borderBottomWidth: 0,
            borderRightWidth: 0,
            borderRadius:
              direction === "vertical" ? "0 0 8px 8px" : "0 8px 8px 0"
          },
          "input:checked + &": {
            backgroundColor: "#81dafc"
          }
        }}
      >
        {title.toUpperCase()}
      </label>
    </Fragment>
  );
};

export interface ButtonSelectorProps {
  className?: string;
  value: any;
  onChange?(value: any): void;
  direction?: "vertical" | "horizontal";
}

let idCounter = 0;

const ButtonSelector: React.FC<ButtonSelectorProps> = ({
  children,
  className,
  value,
  onChange = () => {},
  direction = "vertical"
}) => {
  const [name] = useState(() => `button-selector-${idCounter++}`);

  return (
    <div
      role="group"
      className={className}
      css={{
        display: "flex",
        flexDirection: direction === "vertical" ? "column" : "row",
        border: "1px solid #9ca1b1",
        borderRadius: 8,
        backgroundColor: "white",
        "&:focus-within": {
          boxShadow: "0 0 0 1px #9ca1b1"
        }
      }}
    >
      {React.Children.map(children, child =>
        React.isValidElement(child)
          ? React.cloneElement(child, {
              selectedValue: value,
              name: name,
              direction: direction,
              onChange: child.props.onChange
                ? (e: any) => {
                    onChange(e);
                    child.props.onChange(e);
                  }
                : onChange
            })
          : child
      )}
    </div>
  );
};

export { ButtonSelectorOption };
export default ButtonSelector;
