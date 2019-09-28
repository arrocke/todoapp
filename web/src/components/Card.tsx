/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Link } from "react-router-dom";
import { History } from "history";

interface CardProps extends React.HTMLAttributes<Element> {
  to?: History.LocationDescriptor;
  replace?: boolean;
  innerRef?: React.Ref<HTMLAnchorElement>;
  tag?: keyof JSX.IntrinsicElements;
}

const Card: React.FC<CardProps> = ({
  tag: Wrapper = "div",
  to,
  replace,
  innerRef,
  children,
  ...props
}) => {
  if (to) {
    return (
      <Wrapper
        {...props}
        css={{
          borderRadius: 4,
          boxShadow: "1px 1px 3px 0 rgba(0, 0, 0, 0.2)",
          backgroundColor: "white"
        }}
      >
        <Link
          {...{ to, replace, innerRef, children }}
          css={{
            color: "inherit",
            textDecoration: "none"
          }}
        />
      </Wrapper>
    );
  } else {
    return <Wrapper {...{ ...props, children }} />;
  }
};

export default Card;
