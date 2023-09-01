import React, { ReactNode } from 'react';
import Row from './Components/Row';

interface Props {
  rows: ReactNode[] | undefined;
}

const Table = ({ rows }: Props) => {
  return rows?.map((row, index) => {
    return <Row key={index}>{row}</Row>;
  });
};

export default Table;
