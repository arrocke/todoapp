/** @jsx jsx */
import { jsx } from "@emotion/core";

interface LoadingContainerProps {
  isLoading: boolean;
}

const LoadingContainer: React.FC<LoadingContainerProps> = ({
  isLoading,
  children
}) => {
  const loader = <div>Loading...</div>;
  return <div>{isLoading ? loader : children}</div>;
};

export default LoadingContainer;
