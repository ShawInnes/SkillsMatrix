import React, {FC} from "react";
import {Container, Spinner} from "react-bootstrap";

export type LoadingContainerProps = {
  isLoading: boolean;
}
export const LoadingContainerTable: FC<LoadingContainerProps> = ({isLoading, children, ...props}) => {
  return isLoading ? (
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  ) : (
    <Container {...props}>
      {children}
    </Container>
  );
};
