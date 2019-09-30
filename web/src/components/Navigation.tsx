/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Link, LinkProps } from "react-router-dom";
import { breakpoints } from "../styles";
import { useAuth } from "../contexts/auth";

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
  const { logout } = useAuth();

  return (
    <nav
      css={{
        display: "flex",
        justifyContent: "center",
        borderTop: "1px solid black",
        zIndex: 1,
        background: "white",
        [breakpoints.medium]: {
          borderTop: 0,
          borderBottom: "1px solid black"
        }
      }}
    >
      <NavigationLink to="/projects">Projects</NavigationLink>
      <NavigationLink to="/tasks">Tasks</NavigationLink>
      {/* <NavigationLink to="/sprints">Sprints</NavigationLink> */}
      <NavigationLink to="/account">Account</NavigationLink>
      <NavigationLink
        to="/logout"
        onClick={e => {
          e.preventDefault();
          logout();
        }}
      >
        Log Out
      </NavigationLink>
    </nav>
  );
};

export default Navigation;
