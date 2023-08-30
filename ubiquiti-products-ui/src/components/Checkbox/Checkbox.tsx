import React, { use, useState } from 'react';
import styles from './Checkbox.module.css';

interface Props {
  labelName: string;
  checkboxEffect: () => void;
  className?: string;
}

const Checkbox = ({ labelName, checkboxEffect, className }: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={checkboxEffect}
      className={`${styles.checkbox} ${
        className ? className : ''
      } generalFocus`}
      tabIndex={0}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div></div>
      <input
        type="checkbox"
        id={labelName}
        className={isHovered ? styles.hovered : ''}
      ></input>
      <label htmlFor={labelName}>{labelName}</label>
    </div>
  );
};

export default Checkbox;
