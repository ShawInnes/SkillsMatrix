import React, {FC} from "react";
import {Spinner, Table} from "react-bootstrap";

export type LoadingTableProps = {
  isLoading: boolean;
}

export const LoadingTable: FC<LoadingTableProps> = ({isLoading, children, ...props}) => {
  return isLoading ? (
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  ) : (
    <Table {...props}>
      {children}
    </Table>
  );
};
