import React from "react";

interface IconEditProps {
  className?: string;
}

const IconEdit: React.FC<IconEditProps> = ({ className }) => (
  <svg
    className={className}
    // style="enable-background:new 0 0 459 459;"
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

export default IconEdit;
