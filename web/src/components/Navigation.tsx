/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Link, LinkProps } from "react-router-dom";
import { breakpoints } from "../styles";

interface NavigationLinkProps extends LinkProps {
  children: string;
}

const NavigationLink: React.FC<NavigationLinkProps> = ({
  children,
  ...props
}) => {
  return (
    <Link
      {...props}
      css={{
        margin: "0 8px",
        textDecoration: "none",
        fontSize: 14,
        fontWeight: "bold",
        color: "black",
        height: 44,
        lineHeight: "44px"
      }}
    >
      {children.toUpperCase()}
    </Link>
  );
};

const Navigation: React.FC = () => {
  return (
    <nav
      css={{
        display: "flex",
        justifyContent: "center",
        borderTop: "1px solid black",
        [breakpoints.medium]: {
          borderTop: 0,
          borderBottom: "1px solid black"
        }
      }}
    >
      <NavigationLink to="/projects">Projects</NavigationLink>
      <NavigationLink to="/tasks">Tasks</NavigationLink>
      <NavigationLink to="/sprints">Sprints</NavigationLink>
    </nav>
  );
};

export default Navigation;
