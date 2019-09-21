import React from "react";

interface IconProps {
  type: "cross" | "check" | "pencil";
  className?: string;
}

const Icon: React.FC<IconProps> = ({ className, type }) => {
  switch (type) {
    case "cross":
      return (
        <svg
          className={className}
          width="255.258px"
          height="255.258px"
          viewBox="0 0 255.258 255.258"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            points="255.258,53.496 201.744,0.007 127.629,74.129 53.506,0.007 0,53.496 74.115,127.635 0,201.756 53.506,255.251 
	127.629,181.12 201.744,255.251 255.258,201.756 181.135,127.635 "
          />
        </svg>
      );
    case "check":
      return (
        <svg
          aria-hidden
          className={className}
          width="342.357px"
          height="342.357px"
          viewBox="0 0 342.357 342.357"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon points="290.04,33.286 118.861,204.427 52.32,137.907 0,190.226 118.862,309.071 342.357,85.606 " />
        </svg>
      );
    case "pencil":
      return (
        <svg
          aria-hidden
          className={className}
          viewBox="0 0 459 459"
          height="459px"
          width="459px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <g id="create">
              <path d="M0,362.1V459h96.9l280.5-283.05l-96.9-96.9L0,362.1z M451.35,102c10.2-10.2,10.2-25.5,0-35.7L392.7,7.649    c-10.2-10.2-25.5-10.2-35.7,0l-45.9,45.9l96.9,96.9L451.35,102z" />
            </g>
          </g>
        </svg>
      );
  }
};

export default Icon;
