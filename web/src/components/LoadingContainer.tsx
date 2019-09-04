/** @jsx jsx */
import { jsx } from "@emotion/core";

interface LoadingContainerProps {
  className?: string;
  isLoading: boolean;
}

const LoadingContainer: React.FC<LoadingContainerProps> = ({
  className,
  isLoading,
  children
}) => {
  const loader = <div>Loading...</div>;
  return <div className={className}>{isLoading ? loader : children}</div>;
};

export default LoadingContainer;
