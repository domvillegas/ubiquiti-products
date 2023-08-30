import React, { ReactNode } from 'react';
import styles from './Row.module.css';

interface Props {
  children: ReactNode;
}

const Row = ({ children }: Props) => {
  return (
    <div className={`${styles.row} ${styles.focus}`} tabIndex={0}>
      {children}
    </div>
  );
};

export default Row;
