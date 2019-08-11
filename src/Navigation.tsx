/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Link } from "react-router-dom";

const linkStyles = css({
  margin: 8
});

const Navigation: React.FC = () => {
  return (
    <nav
      css={{
        display: "flex"
      }}
    >
      <Link css={linkStyles} to="/projects">
        Projects
      </Link>
      <Link css={linkStyles} to="/tasks">
        Tasks
      </Link>
      <Link css={linkStyles} to="/sprints">
        Sprints
      </Link>
    </nav>
  );
};

export default Navigation;
